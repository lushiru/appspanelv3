import { View, Text, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import { useRef, useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from "react-native-paper";
import { styles } from './MejorasTomarFotoScreen.styles';
import { Layout } from '../../../layouts';
import { mejorasfotoCtrl } from '../../../api';

export function MejorasTomarFotoScreen(props) {

    const {
        route: { params },
      } = props;

      const id = params?.id;
      const nombre = params?.nombre;   

      const [facing, setFacing] = useState('back');
      const [permission, requestPermission] = useCameraPermissions();

    const cameraRef = useRef(null);

    const [ photo, setPhoto ] = useState(null);
    
      if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }
    
      if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
          <View style={styles.container2}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button
                mode="contained"
                style={styles.button}
                onPress={requestPermission}
            >
                grant permission
            </Button>
          </View>
        );
      }
    
      function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const foto = await cameraRef.current.takePictureAsync({ quality: 0.3, skipProcessing: false, base64: true });
                setPhoto(foto.base64);
            } catch (error) {
                ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
            }
        }
    };

    const guardarFoto = async () => {
      try{
        const d = new Date();
        await mejorasfotoCtrl.crearMejoraFoto(id,`foto_${d.getTime()}`,`data:image/jpeg;base64,${photo}`);
        setPhoto(null);
        ToastAndroid.show( "Foto Guardada " , ToastAndroid.SHORT);
      } catch (error) {
        ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
      }  
    }

  return (
    <Layout.Basic>
    <View>
      <Text style={styles.titulo}>{nombre}</Text>
      <View style={styles.container3}>  
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Cambiar Camara</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      </View>  
        <Button
            mode="contained"
            style={styles.btnSubmit}
            onPress={takePicture}
        >
            Tomar Foto
        </Button>  

    { photo ? 
    <>
    <Image source={{ uri: `data:image/jpeg;base64,${photo}` }} style={{ width: 200, height: 200 }} />

    <Button
            mode="contained"
            style={styles.btnSubmit}
            onPress={guardarFoto}
        >
            Guardar Foto
        </Button> 
    </>  
    : "" }
    </View>
    </Layout.Basic>
  )
}
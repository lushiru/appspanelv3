import { View, Text, ToastAndroid, Image, Alert } from 'react-native'
import { useState, useEffect } from 'react'
import { Button } from "react-native-paper";
import { Layout } from '../../../layouts'
import { styles } from "./MejorasVerFotosScreen.styles"
import { mejorasfotoCtrl } from '../../../api'


export function MejorasVerFotosScreen(props) {

    const {
        route: { params },
      } = props;

      const id = params?.id;
      const nombre = params?.nombre;  
      
      const [fotos,setFotos] = useState(null);

      useEffect(() => {
        if (id) {
          getFotos(id);
        }
      }, [id]);

      const getFotos = async (id) => {
            
        try {
            const response = await mejorasfotoCtrl.verMejorasFoto(id);
            setFotos(response.arrfoto);
        } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }      

      }

      const goToEliminar = (idf) => {
              Alert.alert('Eliminar', 'Esta seguro de eliminar ?', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => eliminando(idf) },
              ]);
           };
          
            const eliminando = async (idf) => {
              try {
                await mejorasfotoCtrl.deleteMejoraFoto(idf);
                getFotos(id);
              }catch(error){
                ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
              }  
            }

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombre}</Text>
      {
        fotos ? 
        <>
           { fotos.map((item, index)=>(
                <View key={"v"+index}>
                <Image key={"img"+index} source={{ uri: item.foto }} style={{ width: 200, height: 200, margin:10 }} />
                <Button
                    mode="contained"
                    style={styles.btnSubmit}
                    onPress={() => {goToEliminar(item.id)}}
                >
                    Eliminar Foto
                </Button>
                </View>
           )) }

        </>
        : ""
      }  

    </Layout.Basic>
  )
}
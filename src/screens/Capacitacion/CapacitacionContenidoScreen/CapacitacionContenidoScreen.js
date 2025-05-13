import { useState, useEffect } from "react";
import { Text, ToastAndroid } from 'react-native'
import { Button } from 'react-native-paper';
import { screensName } from '../../../utils';
import { Layout } from '../../../layouts';
import { styles } from './CapacitacionContenidoScreen.styles';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { capacitacioncontenidoCtrl } from "../../../api";
import { CapacitacionContenidoDataTable } from "../../../components/Capacitacion"

export function CapacitacionContenidoScreen(props) {

  const {
        route: { params },
      } = props;

    const id = params?.id;
    const nombre = params?.nombre;

  const [ contenido, setContenido ] = useState(null);

      const isVisible = useIsFocused();
      const navigation = useNavigation();
      const [reload, setReload] = useState(false);
    
      useEffect(() => {
          if(isVisible) getCapacitacionesContenido();                    
      }, [isVisible]);

      useEffect(() => {
          if(reload) getCapacitacionesContenido();                    
      }, [reload]);
  
      const getCapacitacionesContenido = async () => {
        try {
          const response = await capacitacioncontenidoCtrl.verCapacitacionescontenido(id);
          setContenido(response.arrcontenidos);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener capacitaciones contenido" , ToastAndroid.SHORT);
        }
      };

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombre}</Text>
      <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.capacitacionContenidoCrear, { id:id}) } style={styles.btn}>
            Crear Contenido
      </Button>  
      {

        contenido ?
          
          <CapacitacionContenidoDataTable contenido={contenido} setReload={setReload} />

        : ""

      }

    </Layout.Basic>
  )
}
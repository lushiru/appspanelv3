import { useState, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { Layout } from '../../../layouts';
import { capacitacionasignarevaluacionCtrl } from '../../../api';
import { styles } from './CapacitacionAsignarEvaluacionScreen.styles';
import { CapacitacionAsignarTarjeta } from "../../../components/Capacitacion";

export function CapacitacionAsignarEvaluacionScreen(props) {

    const {
        route: { params },
      } = props;

    const id = params?.id;
    const nombre = params?.nombre;

    const [ contenidos, setContenidos ] = useState(null);
    const [ verificacion, setVerificacion ] = useState(null);
    
    useEffect(() => {
        if (id) {
            getAsignar();
        }
        }, [id]);

    const getAsignar = async () => {

        try {
            const response = await capacitacionasignarevaluacionCtrl.verCapacitacionesLista(id);
            setContenidos(response.arrcontenidos);
            setVerificacion(response.arrver);
        } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }

    }    

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombre}</Text>

      {
        contenidos && verificacion ?
            contenidos.map((item, index) => (
                <CapacitacionAsignarTarjeta item={item} index={index} verificacion={verificacion} getAsignar={getAsignar} key={"cap"+index} />
            ))
        : ""
      } 
    </Layout.Basic>
  )
}
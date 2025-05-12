import { Text, ToastAndroid } from 'react-native'
import { useState, useEffect} from 'react'
import { useIsFocused } from "@react-navigation/native";
import { mejorasplanCtrl } from '../../../api';
import { Layout } from '../../../layouts';
import { styles } from './MejorasPlanSeguimientoScreen.styles';
import { MejorasPlanTarjeta } from '../../../components/Mejoras';

export function MejorasPlanSeguimientoScreen(props) {

    const {
        route: { params },
      } = props;

    const id = params?.id; 
    const nombre = params?.nombre;  

    const isVisible = useIsFocused();  

    const [ planmejora, setPlanmejora ] = useState(null);
    
    useEffect(() => {
        if (isVisible) {
            getPlanmejora();
        }
        }, [isVisible]);  

    const getPlanmejora = async () => {

        try {
            const response = await mejorasplanCtrl.verMejorasPlanes(id);
            setPlanmejora(response.array);
        } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }

    }  
    
    

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombre}</Text>

        {  
            planmejora ? 

                planmejora.map((item, index) => (
                    <MejorasPlanTarjeta item={item} index={index} getPlanmejora={getPlanmejora} key={"mp"+index} />
                ))

            : ""
        }

    </Layout.Basic>
  )
}
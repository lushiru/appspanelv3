import { useState, useEffect } from "react";
import { ToastAndroid, Text, View } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./MejorasScreen.styles";
import { screensName } from "../../../utils";
import { mejorasCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MejorasDataTable } from "../../../components/Mejoras";


export function MejorasScreen() {

    const [mejoras, setMejoras] = useState(null);
    const isVisible = useIsFocused();
    const navigation = useNavigation();
    const [reload, setReload] = useState(false);
  
      useEffect(() => {
          if(isVisible) getMejoras();                    
      }, [isVisible]);

      useEffect(() => {
            if(reload) getMejoras();                    
        }, [reload]);
  
      const getMejoras = async () => {
        try {
          const response = await mejorasCtrl.verMejoras();
          setMejoras(response.arrproc);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener mejoras" , ToastAndroid.SHORT);
        }
      };
      
    return (
      <Layout.Basic>
          <Text style={styles.titulo}>Mejoras</Text>
          <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.mejorasCrear)} style={styles.btn}>
              Crear Propuesta de Mejora
          </Button>                   
          <Text style={styles.titulo}>Lista</Text>          

          { mejoras ? 
          <MejorasDataTable mejoras={mejoras} setReload={setReload} />
          : ""
          }
  
      </Layout.Basic>
    )
}
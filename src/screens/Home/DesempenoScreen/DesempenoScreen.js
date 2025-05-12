import { useState, useEffect } from "react";
import { ToastAndroid, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./DesempenoScreen.styles";
import { screensName } from "../../../utils";
import { desempeniosCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DesempenoDataTable } from "../../../components/Home";

export function DesempenoScreen() {

  const [desempenios, setDesempenios] = useState(null);
  const isVisible = useIsFocused();
  const navigation = useNavigation();
  const [reload, setReload] = useState(false);

    useEffect(() => {
        if(isVisible) getDesempenios();                    
    }, [isVisible]);

    useEffect(() => {
        if(reload) getDesempenios();                    
    }, [reload]);

    const getDesempenios = async () => {
      try {
        const response = await desempeniosCtrl.verDesempeniosEvaluacion();
        setDesempenios(response.arrnom);        
      } catch (error) {
          ToastAndroid.show( "Error al obtener colaboradores" , ToastAndroid.SHORT);
      }
    };
    
  return (
    <Layout.Basic>
        <Text style={styles.titulo}>Desempeño</Text>
        <Button mode="contained" onPress={() => navigation.navigate(screensName.home.desempenoCrear)} style={styles.btn}>
            Crear Evaluación
        </Button>
        <Text style={styles.titulo}>Lista</Text>

        { desempenios ? 
        <DesempenoDataTable desempenios={desempenios} setReload={setReload} />
        : <Text>nada</Text>
        }

    </Layout.Basic>
  )
}
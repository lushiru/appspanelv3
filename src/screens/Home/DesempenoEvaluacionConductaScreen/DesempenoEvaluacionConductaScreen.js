import { useState, useEffect } from "react";
import { ToastAndroid, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./DesempenoEvaluacionConductaScreen.styles";
import { screensName } from "../../../utils";
import { desempenoconductaCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DesempenoConductaDataTable } from "../../../components/Home";

export function DesempenoEvaluacionConductaScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoSubId = params?.desempenoSubId;
      const nombre = params?.nombre;

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
        const response = await desempenoconductaCtrl.verDesempeniosConducta(desempenoSubId);
        setDesempenios(response.arrtar);      
      } catch (error) {
          ToastAndroid.show( "Error al obtener colaboradores" , ToastAndroid.SHORT);
      }
    };
    
  return (
    <Layout.Basic>
        <Text style={styles.titulo}>{nombre}</Text>
        
        <Button mode="contained" onPress={() => navigation.navigate(screensName.home.desempenoEvaluacionConductaCrear , {desempenoSubId:desempenoSubId, nombre: nombre})} style={styles.btn}>
            Crear Conducta Observable
        </Button> 

        <Text style={styles.titulo}>Lista</Text>

        { desempenios ? 
        <DesempenoConductaDataTable desempeniostar={desempenios} setReload={setReload} nombre={nombre} />
        : ""
        }

    </Layout.Basic>
  )
}
import { useState, useEffect } from "react";
import { ToastAndroid, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./DesempenoEvaluacionScreen.styles";
import { screensName } from "../../../utils";
import { desempeniosevaluacionCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DesempenoEvaluacionDataTable } from "../../../components/Home";

export function DesempenoEvaluacionScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoId = params?.id;
      const nombredes = params?.nombre;

  const [desempenios, setDesempenios] = useState(null);
  const [porcentaje, setPorcentaje] = useState(null);
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
        const response = await desempeniosevaluacionCtrl.verDesempeniosEvaluacion(desempenoId);
        setDesempenios(response.arrdes);   
        setPorcentaje(response.porcentaje);     
      } catch (error) {
          ToastAndroid.show( "Error al obtener colaboradores" , ToastAndroid.SHORT);
      }
    };
    
  return (
    <Layout.Basic>
        <Text style={styles.titulo}>{nombredes}</Text>
        { porcentaje<100 ? 
        <Button mode="contained" onPress={() => navigation.navigate(screensName.home.desempenoEvaluacionCrear , {desempenoId:desempenoId, nombredes: nombredes})} style={styles.btn}>
            Crear Categoría de Competencia
        </Button> : "" }
        <Text style={styles.titulo}>Lista</Text>

        { desempenios ? 
        <DesempenoEvaluacionDataTable desempenios={desempenios} setReload={setReload} nombredes={nombredes} />
        : ""
        }

    </Layout.Basic>
  )
}
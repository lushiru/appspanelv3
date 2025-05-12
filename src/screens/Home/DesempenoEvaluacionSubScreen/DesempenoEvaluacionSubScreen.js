import { useState, useEffect } from "react";
import { ToastAndroid, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./DesempenoEvaluacionSubScreen.styles";
import { screensName } from "../../../utils";
import { desempenosubcategoriaCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DesempenoSubcategoriaDataTable } from "../../../components/Home";

export function DesempenoEvaluacionSubScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoEvaluacionId = params?.desempenoEvaluacionId;
      const nombre = params?.nombre;

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
        const response = await desempenosubcategoriaCtrl.verDesempeniosSub(desempenoEvaluacionId);
        setDesempenios(response.arrsub);   
        setPorcentaje(response.porcentaje);     
      } catch (error) {
          ToastAndroid.show( "Error al obtener colaboradores" , ToastAndroid.SHORT);
      }
    };
    
  return (
    <Layout.Basic>
        <Text style={styles.titulo}>{nombre}</Text>
        { porcentaje<100 ? 
        <Button mode="contained" onPress={() => navigation.navigate(screensName.home.desempenoEvaluacionSubCrear , {desempenoEvaluacionId:desempenoEvaluacionId, nombre: nombre})} style={styles.btn}>
            Crear Subcategoria de Competencia
        </Button> : "" }
        <Text style={styles.titulo}>Lista</Text>

        { desempenios ? 
        <DesempenoSubcategoriaDataTable desempeniossub={desempenios} setReload={setReload} nombrecat={nombre} />
        : ""
        }

    </Layout.Basic>
  )
}
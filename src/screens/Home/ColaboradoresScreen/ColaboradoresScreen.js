import { useState, useEffect } from "react";
import { ToastAndroid, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./ColaboradoresScreen.styles";
import { screensName } from "../../../utils";
import { colaboradoresCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ColaboradoresDataTable } from "../../../components/Home";

export function ColaboradoresScreen() {

  const [colaboradores, setColaboradores] = useState(null);
  const isVisible = useIsFocused();
  const navigation = useNavigation();

    useEffect(() => {
        if(isVisible) getColaboradores();                    
    }, [isVisible]);

    const getColaboradores = async () => {
      try {
        const response = await colaboradoresCtrl.verColaboradores();
        setColaboradores(response.arrcol);        
      } catch (error) {
          ToastAndroid.show( "Error al obtener colaboradores" , ToastAndroid.SHORT);
      }
    };
    
  return (
    <Layout.Basic>
        <Text style={styles.titulo}>Colaboradores</Text>
        <Button mode="contained" onPress={() => navigation.navigate(screensName.home.colaboradoresCrear)} style={styles.btn}>
            Crear colaborador
        </Button>
        <Text style={styles.titulo}>Lista</Text>

        { colaboradores ? 
        <ColaboradoresDataTable colaboradores={colaboradores} />
        : <Text>nada</Text>
        }

    </Layout.Basic>
  )
}
import { useState, useEffect } from "react";
import { ToastAndroid, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Layout } from "../../../layouts";
import { styles } from "./PlanSupervisionScreen.styles";
import { screensName } from "../../../utils";
import { plansupervisionCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { PlanSupervisionDataTable } from "../../../components/PlanSupervision";

const Item = Picker.Item;

export function PlanSupervisionScreen() {

    const [tareas, setTareas] = useState(null);
    const isVisible = useIsFocused();
    const navigation = useNavigation();
    const [reload, setReload] = useState(false);
  
      useEffect(() => {
          if(isVisible) getPlanes();                    
      }, [isVisible]);
  
      const getPlanes = async () => {
        try {
          const response = await plansupervisionCtrl.verPlanes();
          setTareas(response.arrtareas);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener planes" , ToastAndroid.SHORT);
        }
      };

      const getFiltro = async (valor) => {
        try {
          const response = await plansupervisionCtrl.verFiltrar(valor);
          setTareas(response.arrtareas);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener planes" , ToastAndroid.SHORT);
        }
      };
      
    return (
      <Layout.Basic>
          <Text style={styles.titulo}>Plan de Supervisión</Text>
          <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.plansupervisionCrear)} style={styles.btn}>
              Crear Plan de Supervisión
          </Button>
          <Text style={styles.titulo}>Lista</Text>

          <Picker
              selectedValue={""}
              onValueChange={(v) => getFiltro(v)}
              >
              <Item label="Ver/Filtro" value="" enabled={false} />  
              <Item label="Proceso" value="Proceso" />
              <Item label="Producto" value="Producto" />
              <Item label="Persona" value="Persona" />
          </Picker>

          { tareas ? 
          <PlanSupervisionDataTable tareas={tareas} />
          : ""
          }
  
      </Layout.Basic>
    )
}
import { useState, useEffect } from "react";
import { ToastAndroid, Text, View } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./ChecklistScreen.styles";
import { screensName } from "../../../utils";
import { checklistCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CheckListDataTable } from "../../../components/CheckList";


export function ChecklistScreen() {

    const [checklists, setChecklists] = useState(null);
    const isVisible = useIsFocused();
    const navigation = useNavigation();
    const [reload, setReload] = useState(false);
  
      useEffect(() => {
          if(isVisible) getChecklist();                    
      }, [isVisible]);

      useEffect(() => {
            if(reload) getChecklist();                    
        }, [reload]);
  
      const getChecklist = async () => {
        try {
          const response = await checklistCtrl.verChecks();
          setChecklists(response.arrver);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener checklists" , ToastAndroid.SHORT);
        }
      };
      
    return (
      <Layout.Basic>
          <Text style={styles.titulo}>Check List</Text>
          <View style={styles.contenedor} >
          <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.checklistCrear)} style={styles.btn}>
              Crear  Lista de Verificación
          </Button>
          <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.checklistaplicarFechas)} style={styles.btn}>
              Ver verificaciones
          </Button>
          </View>
          <Text style={styles.titulo}>Lista</Text>          

          { checklists ? 
          <CheckListDataTable checklists={checklists} setReload={setReload} />
          : ""
          }
  
      </Layout.Basic>
    )
}
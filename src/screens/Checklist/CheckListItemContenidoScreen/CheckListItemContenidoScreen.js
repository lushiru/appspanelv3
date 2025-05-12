import { useState, useEffect } from "react";
import { ToastAndroid, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./CheckListItemContenidoScreen.styles";
import { screensName } from "../../../utils";
import { checklistitemcontenidoCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CheckListItemContenidoDataTable } from "../../../components/CheckList";


export function CheckListItemContenidoScreen(props) {

    const {
        route: { params },
      } = props;

    const id = params?.id;   
    const nombreitem = params?.nombreitem;

    const [checklistsitemcontenido, setChecklistsitemcontenido] = useState(null);
    const isVisible = useIsFocused();
    const navigation = useNavigation();
    const [reload, setReload] = useState(false);
  
      useEffect(() => {
          if(isVisible) getChecklistitemcontenido();                    
      }, [isVisible]);

      useEffect(() => {
            if(reload) getChecklistitemcontenido();                    
        }, [reload]);
  
      const getChecklistitemcontenido = async () => {
        try {
          const response = await checklistitemcontenidoCtrl.verChecksitemcontenido(id);
          setChecklistsitemcontenido(response.arrversubitem);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener checklists items contenido" , ToastAndroid.SHORT);
        }
      };
      
    return (
      <Layout.Basic>
          <Text style={styles.titulo}>{nombreitem}</Text>
          <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.checklistitemcontenidoCrear, { id: id })} style={styles.btn}>
              Crear Contenido
          </Button>
          <Text style={styles.titulo}>Lista</Text>          

          { checklistsitemcontenido ? 
          <CheckListItemContenidoDataTable checklistsitemcontenido={checklistsitemcontenido} setReload={setReload} />
          : ""
          }
  
      </Layout.Basic>
    )
}
import { useState, useEffect } from "react";
import { ToastAndroid, Text } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./CheckListItemScreen.styles";
import { screensName } from "../../../utils";
import { checklistitemCtrl } from "../../../api";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { CheckListItemDataTable } from "../../../components/CheckList";


export function CheckListItemScreen(props) {

    const {
        route: { params },
      } = props;

    const id = params?.id;   
    const nombrever = params?.nombrever;

    const [checklistsitem, setChecklistsitem] = useState(null);
    const isVisible = useIsFocused();
    const navigation = useNavigation();
    const [reload, setReload] = useState(false);
  
      useEffect(() => {
          if(isVisible) getChecklistitem();                    
      }, [isVisible]);

      useEffect(() => {
            if(reload) getChecklistitem();                    
        }, [reload]);
  
      const getChecklistitem = async () => {
        try {
          const response = await checklistitemCtrl.verChecksitem(id);
          setChecklistsitem(response.arrveritem);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener checklists items" , ToastAndroid.SHORT);
        }
      };
      
    return (
      <Layout.Basic>
          <Text style={styles.titulo}>{nombrever}</Text>
          <Button mode="contained" onPress={() => navigation.navigate(screensName.homeplan.checklistitemCrear, { id: id })} style={styles.btn}>
              Crear Item
          </Button>
          <Text style={styles.titulo}>Lista</Text>          

          { checklistsitem ? 
          <CheckListItemDataTable checklistsitem={checklistsitem} setReload={setReload} />
          : ""
          }
  
      </Layout.Basic>
    )
}
import { useState, useEffect } from "react";
import { ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DataTable, Button } from 'react-native-paper';
import { checklistitemCtrl } from "../../../api";
import { screensName, ENV } from "../../../utils";
import { styles } from "./CheckListItemDataTable.styles";

export function CheckListItemDataTable(props) {

    const { checklistsitem, setReload  } = props;
    const navigation = useNavigation();

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([6, 7, 8]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, checklistsitem.length);

  const goToEditar = (id) => {
     navigation.navigate(screensName.homeplan.checklistitemEditar, { id: id });
  };

    const goToEliminar = (id,nombre) => {
        Alert.alert('Eliminar', 'Esta seguro de eliminar '+nombre+' ?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => eliminando(id) },
        ]);
     };
    
      const eliminando = async (id) => {
        try {
          setReload(false);
          await checklistitemCtrl.deleteCheckitem(id);
          setReload(true);
        }catch(error){
          ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }  
      }
      
    const goToVerContenido = (id,nombreitem) => {
      navigation.navigate(screensName.homeplan.checklistitemcontenido, { id: id, nombreitem: nombreitem });
    };  

    let nro=1;

  return (
    
    <DataTable>
        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
            <DataTable.Header>
                <DataTable.Title style={{ width: 30 }}>N°</DataTable.Title>
                <DataTable.Title style={{ width: 400 }}>Item</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Editar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Eliminar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Ver Contenido</DataTable.Title>
            </DataTable.Header>
            
            {checklistsitem.slice(from, to).map((item) => (
                <DataTable.Row style={{ flex: 1, width: '100%', height: 50 }} key={item.id}  >
                <DataTable.Cell style={{ width: 30 }}>{`${nro++}`}</DataTable.Cell>    
                <DataTable.Cell style={{ width: 400 }}>{item.nombreitem}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEditar(item.id)} style={styles.btnEdit}>Editar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEliminar(item.id,item.nombreitem)} style={styles.btnEdit}>Eliminar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToVerContenido(item.id,item.nombreitem)} style={styles.btnEdit}>Ver Contenido</Button></DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(checklistsitem.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${checklistsitem.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={''}
                style={{ alignSelf:"flex-start" }}
            />
            </ScrollView>
    </DataTable>
    
  )
}
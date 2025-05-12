import { useState, useEffect } from "react";
import { ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DataTable, Button } from 'react-native-paper';
import { storageCrtl, checklistCtrl } from "../../../api";
import { screensName, ENV } from "../../../utils";
import { styles } from "./CheckListDataTable.styles";
import { openURL } from "expo-linking";

export function CheckListDataTable(props) {

    const { checklists, setReload  } = props;
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
  const to = Math.min((page + 1) * itemsPerPage, checklists.length);

  const goToEditar = (id) => {
     navigation.navigate(screensName.homeplan.checklistEditar, { id: id });
  };

  const goToImprimir = async (id,nombre) => {
      
        const token = await storageCrtl.getToken();
        openURL(`${ENV.IMPRIMIR}imprimirverificacionpdf.php?id=${id}&nombretext=${nombre}&token=${token}`);
  
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
          await checklistCtrl.deleteCheck(id);
          setReload(true);
        }catch(error){
          ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }  
      }
      
    const goToVerItem = (id,nombrever) => {
      navigation.navigate(screensName.homeplan.checklistitem, { id: id, nombrever: nombrever });
    }; 
    
    const goToAplicar = (id,nombrever,tipo) => {
      if(tipo == "Capacitacion" || tipo == "Proceso"){
        ToastAndroid.show( "es " +tipo+ "no se puede aplicar aqui" , ToastAndroid.SHORT);
      }else{
        navigation.navigate(screensName.homeplan.checklistaplicar, { id: id, nombrever:nombrever });
      }      
    };

    let nro=1;

  return (
    
    <DataTable>
        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
            <DataTable.Header>
                <DataTable.Title style={{ width: 30 }}>N°</DataTable.Title>
                <DataTable.Title style={{ width: 400 }}>Lista de Verificación</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Tipo Verificación</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Fecha</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Imprimir</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Editar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Eliminar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Ver Item</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Aplicar</DataTable.Title>
            </DataTable.Header>
            
            {checklists.slice(from, to).map((item) => (
                <DataTable.Row style={{ flex: 1, width: '100%', height: 50 }} key={item.id}  >
                <DataTable.Cell style={{ width: 30 }}>{`${nro++}`}</DataTable.Cell>    
                <DataTable.Cell style={{ width: 400 }}>{item.nombre}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.tipo}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.creacion}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToImprimir(item.id,item.nombre)} style={styles.btnEdit}>Imprimir</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEditar(item.id)} style={styles.btnEdit}>Editar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEliminar(item.id,item.nombre)} style={styles.btnEdit}>Eliminar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToVerItem(item.id,item.nombre)} style={styles.btnEdit}>Ver Item</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToAplicar(item.id,item.nombre,item.tipo)} style={styles.btnEdit}>Aplicar</Button></DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(checklists.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${checklists.length}`}
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
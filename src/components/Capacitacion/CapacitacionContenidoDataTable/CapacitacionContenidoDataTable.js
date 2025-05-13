import { useState, useEffect } from "react";
import { ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DataTable, Button } from 'react-native-paper';
import { capacitacioncontenidoCtrl } from "../../../api";
import { screensName } from "../../../utils";
import { styles } from "./CapacitacionContenidoDataTable.styles";

export function CapacitacionContenidoDataTable(props) {

    const { contenido, setReload  } = props;
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
  const to = Math.min((page + 1) * itemsPerPage, contenido.length);

  const goToEditar = (id) => {
     navigation.navigate(screensName.homeplan.capacitacionContenidoEditar , { id: id });
  };

  
    const goToEliminar = (id,idi,nombre) => {
        Alert.alert('Eliminar', 'Esta seguro de eliminar '+nombre+' ?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => eliminando(id,idi) },
        ]);
     };
    
      const eliminando = async (id,idi) => {
        try {
          setReload(false);
          await capacitacioncontenidoCtrl.deleteCapacitacioncontenido(idi,id);
          setReload(true);
        }catch(error){
          ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }  
      }

    let nro=1;

  return (
    
    <DataTable>
        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
            <DataTable.Header>
                <DataTable.Title style={{ width: 30 }}>N°</DataTable.Title>
                <DataTable.Title style={{ width: 300 }}>Contenido</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Estrategia</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Tiempo</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Editar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Eliminar</DataTable.Title>
            </DataTable.Header>
            
            {contenido.slice(from, to).map((item) => (
                <DataTable.Row style={{ flex: 1, width: '100%', height: 50 }} key={item.id}  >
                <DataTable.Cell style={{ width: 30 }}>{`${nro++}`}</DataTable.Cell>    
                <DataTable.Cell style={{ width: 300 }}>{item.contenido}</DataTable.Cell>
                <DataTable.Cell style={{ width: 200 }}>{item.estrategia}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.tiempo}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEditar(item.id)} style={styles.btnEdit}>Editar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEliminar(item.id,item.id_instruccionplanes,item.contenido)} style={styles.btnEdit}>Eliminar</Button></DataTable.Cell>
               </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(contenido.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${contenido.length}`}
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
import { useState, useEffect } from "react";
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DataTable, Button } from 'react-native-paper';
import { desempeniosevaluacionCtrl } from "../../../api";
import { screensName } from "../../../utils";
import { styles } from "./DesempenoEvaluacionDataTable.styles";

export function DesempenoEvaluacionDataTable(props) {

    const { desempenios, setReload, nombredes } = props;
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
  const to = Math.min((page + 1) * itemsPerPage, desempenios.length);

  const goToEditar = (desempenoEvaluacionId) => {
     navigation.navigate(screensName.home.desempenoEvaluacionEditar, { desempenoEvaluacionId: desempenoEvaluacionId, nombredes: nombredes });
  };

  const goToSubcategoria = (desempenoEvaluacionId,nombre) => {
    navigation.navigate(screensName.home.desempenoEvaluacionSub, { desempenoEvaluacionId: desempenoEvaluacionId, nombre: nombre });
 };

  const goToEliminar = (desempenoId) => {
    Alert.alert('Eliminar', 'Esta seguro de eliminar ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => eliminando(desempenoId) },
    ]);
 };

  const eliminando = async (id) => {
    try {
      setReload(false);
      await desempeniosevaluacionCtrl.deleteDesempenioEvaluacion(id);
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
                <DataTable.Title style={{ width: 400 }}>Categoría de competencia</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Porcentaje</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Editar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Eliminar</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Subcategoría de Competencia</DataTable.Title>
            </DataTable.Header>
            
            {desempenios.slice(from, to).map((item) => (
                <DataTable.Row style={{ flex: 1, width: '100%', height: 50 }} key={item.id}  >
                <DataTable.Cell style={{ width: 30 }}>{`${nro++}`}</DataTable.Cell>    
                <DataTable.Cell style={{ width: 400 }}>{item.nombre}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.porcentaje}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEditar(item.id)} style={styles.btnEdit}>Editar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEliminar(item.id)} style={styles.btnEdit}>Eliminar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 200 }}><Button mode="contained" onPress={() => goToSubcategoria(item.id,item.nombre)} style={styles.btnEdit}>Subcategoría</Button></DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(desempenios.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${desempenios.length}`}
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
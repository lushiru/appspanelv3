import { useState, useEffect } from "react";
import { ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DataTable, Button } from 'react-native-paper';
import { desempeniosCtrl, storageCrtl, desempeniosporcentajeCtrl } from "../../../api";
import { screensName, ENV } from "../../../utils";
import { styles } from "./DesempenoDataTable.styles";
import { openURL } from "expo-linking";

export function DesempenoDataTable(props) {

    const { desempenios, setReload } = props;
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

  const goToEditar = (desempenoId) => {
     navigation.navigate(screensName.home.desempenoEditar, { desempenoId: desempenoId });
  };

  const goToCategoria = (id,nombre) => {
    navigation.navigate(screensName.home.desempenoEvaluacion, { id: id, nombre: nombre });
 };

  const goToDefinir = (id,nombre) => {
    navigation.navigate(screensName.home.desempenoPorcentajeOptimo, { id: id, nombre: nombre });
  };

  const goToImprimir = async (id,nombre) => {
    
      const token = await storageCrtl.getToken();
      openURL(`${ENV.IMPRIMIR}imprimirevaluacionpdf2.php?id=${id}&nombretext=${nombre}&token=${token}`);

  };

  const goToEvaluacion = async (id,nombre) => {

    const respor = await desempeniosporcentajeCtrl.verUnPorcentajeoptimo(id);
    
    if(respor.porcentaje==0){
      ToastAndroid.show( "El Porcentaje óptimo de Desempeño no se ha creado o es 0" , ToastAndroid.LONG);
    }else{
      navigation.navigate(screensName.home.desempenoRegistrarEvaluacion, { id: id, nombre: nombre });
    }

  };

  const goToReporteindividual = async (id,nombre) => {

    const respor = await desempeniosporcentajeCtrl.verUnPorcentajeoptimo(id);
    
    if(respor.porcentaje==0){
      ToastAndroid.show( "El Porcentaje óptimo de Desempeño no se ha creado o es 0" , ToastAndroid.LONG);
    }else{
      navigation.navigate(screensName.home.desempenoReporteIndividual, { id: id, nombre: nombre });
    }

  };

  const goToReporteGeneral = async (id,nombre) => {

    const respor = await desempeniosporcentajeCtrl.verUnPorcentajeoptimo(id);
    
    if(respor.porcentaje==0){
      ToastAndroid.show( "El Porcentaje óptimo de Desempeño no se ha creado o es 0" , ToastAndroid.LONG);
    }else{
      navigation.navigate(screensName.home.desempenoReporteGeneral, { id: id, nombre: nombre });
    }

  };

  const goToReporteCategoria = async (id,nombre) => {

    const respor = await desempeniosporcentajeCtrl.verUnPorcentajeoptimo(id);
    
    if(respor.porcentaje==0){
      ToastAndroid.show( "El Porcentaje óptimo de Desempeño no se ha creado o es 0" , ToastAndroid.LONG);
    }else{
      navigation.navigate(screensName.home.desempenoReporteCategoria, { id: id, nombre: nombre });
    }

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
      await desempeniosCtrl.deleteDesempenioEvaluacion(id);
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
                <DataTable.Title style={{ width: 400 }}>Evaluación</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Editar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Eliminar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Categoria</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Definir Porcentaje óptimo de Desempeño</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Imprimir Evaluación</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Registrar Evaluación</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Reporte Individual</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Reporte General</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Reporte Categoria</DataTable.Title>
            </DataTable.Header>
            
            {desempenios.slice(from, to).map((item) => (
                <DataTable.Row style={{ flex: 1, width: '100%', height: 50 }} key={item.id}  >
                <DataTable.Cell style={{ width: 30 }}>{`${nro++}`}</DataTable.Cell>    
                <DataTable.Cell style={{ width: 400 }}>{item.nombre}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEditar(item.id)} style={styles.btnEdit}>Editar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEliminar(item.id)} style={styles.btnEdit}>Eliminar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToCategoria(item.id,item.nombre)} style={styles.btnEdit}>Categoria</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToDefinir(item.id,item.nombre)} style={styles.btnEdit}>Definir Porcentaje</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToImprimir(item.id,item.nombre)} style={styles.btnEdit}>Imprimir Evaluación</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEvaluacion(item.id,item.nombre)} style={styles.btnEdit}>Registrar Evaluación</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToReporteindividual(item.id,item.nombre)} style={styles.btnEdit}>Reporte Individual</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToReporteGeneral(item.id,item.nombre)} style={styles.btnEdit}>Reporte General</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToReporteCategoria(item.id,item.nombre)} style={styles.btnEdit}>Reporte Categoria</Button></DataTable.Cell>
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
import { useState, useEffect } from "react";
import { ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DataTable, Button } from 'react-native-paper';
import { mejorasCtrl } from "../../../api";
import { screensName } from "../../../utils";
import { styles } from "./MejorasDataTable.styles";

export function MejorasDataTable(props) {

    const { mejoras, setReload  } = props;
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
  const to = Math.min((page + 1) * itemsPerPage, mejoras.length);

  const goToEditar = (id) => {
     navigation.navigate(screensName.homeplan.mejorasEditar, { id: id });
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
          await mejorasCtrl.deleteMejora(id);
          setReload(true);
        }catch(error){
          ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }  
      }
      
      const goToTomarFotos = (id, nombre) => {
          navigation.navigate(screensName.homeplan.mejorasTomarfoto, { id: id, nombre:nombre });
      };

      const goToVerFotos = (id, nombre) => {
            navigation.navigate(screensName.homeplan.mejorasVerFotos, { id: id, nombre: nombre });
        };

      const goToCrearPlan = (id, nombre, tipo) => {
            navigation.navigate(screensName.homeplan.mejorasPlanCrear, { id: id, nombre: nombre, tipo: tipo });
        };

      const goToSeguimiento = (id, nombre) => {
          navigation.navigate(screensName.homeplan.mejorasPlanSeguimiento, { id: id, nombre: nombre });
        };

    let nro=1;

  return (
    
    <DataTable>
        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
            <DataTable.Header>
                <DataTable.Title style={{ width: 30 }}>N°</DataTable.Title>
                <DataTable.Title style={{ width: 400 }}>Iniciativa</DataTable.Title>
                <DataTable.Title style={{ width: 400 }}>Descripción</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Tipo mejora</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Fecha</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Editar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Eliminar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Tomar Fotos</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Ver Fotos</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Crear Plan Mejora</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Seguimiento Plan Mejora</DataTable.Title>
            </DataTable.Header>
            
            {mejoras.slice(from, to).map((item) => (
                <DataTable.Row style={{ flex: 1, width: '100%', height: 50 }} key={item.id}  >
                <DataTable.Cell style={{ width: 30 }}>{`${nro++}`}</DataTable.Cell>    
                <DataTable.Cell style={{ width: 400 }}>{item.iniciativa}</DataTable.Cell>
                <DataTable.Cell style={{ width: 400 }}>{item.descripcion}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.tipo}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.fecha}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEditar(item.id)} style={styles.btnEdit}>Editar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEliminar(item.id,item.iniciativa)} style={styles.btnEdit}>Eliminar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToTomarFotos(item.id,item.iniciativa)} style={styles.btnEdit}>Tomar Fotos</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToVerFotos(item.id,item.iniciativa)} style={styles.btnEdit}>Ver Fotos</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToCrearPlan(item.id,item.iniciativa,item.tipo)} style={styles.btnEdit}>Crear Plan</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToSeguimiento(item.id,item.iniciativa)} style={styles.btnEdit}>Seguimiento</Button></DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(mejoras.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${mejoras.length}`}
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
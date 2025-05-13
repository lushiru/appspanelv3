import { useState, useEffect } from "react";
import { ScrollView, Alert, ToastAndroid } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { DataTable, Button } from 'react-native-paper';
import { storageCrtl, capacitacionCtrl } from "../../../api";
import { screensName, ENV } from "../../../utils";
import { useAuth } from "../../../hooks";
import { styles } from "./CapacitacionDataTable.styles";
import { openURL } from "expo-linking";

export function CapacitacionDataTable(props) {

    const { capacitacion, setReload  } = props;
    const navigation = useNavigation();

    const { user } = useAuth();

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([6, 7, 8]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, capacitacion.length);

  const goToEditar = (id) => {
     navigation.navigate(screensName.homeplan.capacitacionEditar, { id: id });
  };

  const goToImprimir = async (id,nombre) => {
      
        const token = await storageCrtl.getToken();
        openURL(`${ENV.IMPRIMIR}imprimirinfocurso.php?id=${id}&nombretext=${nombre}&nombreusuario=${user.usuario}&token=${token}`);
  
    };

  const goToImprimir2 = async (id,nombre) => {
      
        const token = await storageCrtl.getToken();

        try {
          const response = await capacitacionCtrl.leerimp(id);
          response.arrcontenidos.map((item)=>(
            openURL(`${ENV.IMPRIMIR}imprimirverificacionpdfnuevo.php?id=${id}&nombretext=${nombre}&nombreusuario=${user.usuario}&idverificacion=${item.id_verificacion}&token=${token}`)
          ));
        } catch (error) {
          ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }
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
          await capacitacionCtrl.deleteCapacitacion(id);
          setReload(true);
        }catch(error){
          ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }  
      }

    const goToContenido = (id,nombre) => {
      navigation.navigate(screensName.homeplan.capacitacionContenido, { id: id, nombre: nombre });
    };  
      
    const goToAsignarEva = (id,nombre) => {
      navigation.navigate(screensName.homeplan.capacitacionAsignarEvaluacion, { id: id, nombre: nombre });
    }; 
    
    const goToAsignarPart = (id,nombre) => {
      
        navigation.navigate(screensName.homeplan.capacitacionAsignarParticipante, { id: id, nombre:nombre });
            
    };

    let nro=1;

  return (
    
    <DataTable>
        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
            <DataTable.Header>
                <DataTable.Title style={{ width: 30 }}>N°</DataTable.Title>
                <DataTable.Title style={{ width: 400 }}>Capacitación</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Tipo</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Editar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Eliminar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Contenido</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Información Actividad</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Asignar Evaluación</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Participante</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Evaluación</DataTable.Title>
            </DataTable.Header>
            
            {capacitacion.slice(from, to).map((item) => (
                <DataTable.Row style={{ flex: 1, width: '100%', height: 50 }} key={item.id}  >
                <DataTable.Cell style={{ width: 30 }}>{`${nro++}`}</DataTable.Cell>    
                <DataTable.Cell style={{ width: 400 }}>{item.nombreplan}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.tipo}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEditar(item.id)} style={styles.btnEdit}>Editar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEliminar(item.id,item.nombreplan)} style={styles.btnEdit}>Eliminar</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToContenido(item.id,item.nombreplan)} style={styles.btnEdit}>Contenido</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToImprimir(item.id,item.nombreplan)} style={styles.btnEdit}>Información Actividad</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToAsignarEva(item.id,item.nombreplan)} style={styles.btnEdit}>Asignar Evaluación</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToAsignarPart(item.id,item.nombreplan)} style={styles.btnEdit}>Asignar Participante</Button></DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToImprimir2(item.id,item.nombreplan)} style={styles.btnEdit}>Evaluación</Button></DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(capacitacion.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${capacitacion.length}`}
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
import { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import {  DataTable, Button } from 'react-native-paper';
import { screensName } from "../../../utils";
import { styles } from "./PlanSupervisionDataTable.styles";

export function PlanSupervisionDataTable(props) {

    const { tareas } = props;
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
  const to = Math.min((page + 1) * itemsPerPage, tareas.length);

  const goToEditar = (idp) => {
     navigation.navigate(screensName.homeplan.plansupervisionEditar, { idp: idp });
  };

    let nro=1;

  return (
    
    <DataTable>
        <ScrollView horizontal contentContainerStyle={{ flexDirection: 'column' }}>
            <DataTable.Header>
                <DataTable.Title style={{ width: 30 }}>N°</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Fecha</DataTable.Title>
                <DataTable.Title style={{ width: 400 }}>Actividad a Supervisar</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Tipo</DataTable.Title>
                <DataTable.Title style={{ width: 300 }}>Nombre</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Frecuencia</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Inicio</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Check List</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Indicador</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Tipo de Reporte</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Observación</DataTable.Title>
                <DataTable.Title style={{ width: 100 }}>Editar</DataTable.Title>
            </DataTable.Header>
            
            {tareas.slice(from, to).map((item) => (
                <DataTable.Row style={{ flex: 1, width: '100%', height: 50 }} key={item.id}  >
                <DataTable.Cell style={{ width: 30 }}>{`${nro++}`}</DataTable.Cell>    
                <DataTable.Cell style={{ width: 100 }}>{item.creacion}</DataTable.Cell>
                <DataTable.Cell style={{ width: 400 }}>{item.actividadasup}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.supervisar}</DataTable.Cell>
                <DataTable.Cell style={{ width: 300 }}>{item.tarea}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.frecuencia}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.inicio}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.checklist}</DataTable.Cell>
                <DataTable.Cell style={{ width: 200 }}>{item.indicador}</DataTable.Cell>
                <DataTable.Cell style={{ width: 200 }}>{item.tipodereporte}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>{item.observacion}</DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}><Button mode="contained" onPress={() => goToEditar(item.id)} style={styles.btnEdit}>Editar</Button></DataTable.Cell>
                </DataTable.Row>
            ))}

            <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(tareas.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${tareas.length}`}
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
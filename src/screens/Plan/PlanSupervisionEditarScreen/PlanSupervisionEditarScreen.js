import { useState, useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useFormik } from "formik";
import { plansupervisionCtrl } from "../../../api";
import { initialValues, validationSchema } from "./PlanSupervisionEditarScreen.form";
import { styles } from "./PlanSupervisionEditarScreen.styles";

const Item = Picker.Item;

export function PlanSupervisionEditarScreen(props) {

    const {
        route: { params },
      } = props;

    const idp = params?.idp;

     useEffect(() => {
        if (idp) {
            retrivePlan(idp);
        }
        }, [idp]);

    const [show, setShow] = useState(false);
    const [inicio, setInicio] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(undefined);
    const [selectedValuePicker, setSelectedValuePicker] = useState("");
    const [valueDateTimePicker, setValueDateTimePicker ] = useState(new Date());

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { actividadasup,supervisar,tarea,frecuencia,inicio,checklist,indicador,tipodereporte,observacion } = formValue;
          try {
            await plansupervisionCtrl.actualizarPlan(idp,actividadasup,supervisar,tarea,frecuencia,inicio,checklist,indicador,tipodereporte,observacion);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      });

      const retrivePlan = async (idp) => {
                const response = await plansupervisionCtrl.verUnPlan(idp);
                await formik.setFieldValue("actividadasup", response.arrtareas.actividadasup);
                await formik.setFieldValue("supervisar", response.arrtareas.supervisar); setSelectedValuePicker(response.arrtareas.supervisar);
                await formik.setFieldValue("tarea", response.arrtareas.tarea);
                await formik.setFieldValue("frecuencia", response.arrtareas.frecuencia);
                await formik.setFieldValue("inicio", response.arrtareas.inicio); setValueDateTimePicker(response.arrtareas.inicio); setInicio(response.arrtareas.inicio);
                await formik.setFieldValue("checklist", response.arrtareas.checklist); setSelectedIndex(response.arrtareas.checklist =="si" ? 0 : 1);
                await formik.setFieldValue("indicador", response.arrtareas.indicador);
                await formik.setFieldValue("tipodereporte", response.arrtareas.tipodereporte);
                await formik.setFieldValue("observacion", response.arrtareas.observacion);
                 
        }
 
      const setear = () => {
        setShow(true);
      }

      const _onChange = (event) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
      };

      const obtenerDatos = ({type},selectedDate) => {
        formik.setFieldValue("inicio", selectedDate); 
        setShow(false);
        const mes = selectedDate.getMonth()+1;
        setInicio(selectedDate.getDate()+"-"+mes+"-"+selectedDate.getFullYear());
      }

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Plan de Supervisión</Text>
      <View style={styles.container}>
        <TextInput
          label="Actividad a Supervisar"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("actividadasup", text)}
          value={formik.values.actividadasup}
          error={formik.errors.actividadasup}
        />
        <Picker
            selectedValue={selectedValuePicker}
            onValueChange={(v) => formik.setFieldValue("supervisar", v)}
            >
            <Item label="Correspondiente a" value="" enabled={false} />  
            <Item label="Proceso" value="Proceso" />
            <Item label="Producto" value="Producto" />
            <Item label="Persona" value="Persona" />
        </Picker>
        <TextInput
          label="Tarea a Supervisar"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("tarea", text)}
          value={formik.values.tarea}
          error={formik.errors.tarea}
        />
        <TextInput
          label="Frecuencia de Supervisión"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("frecuencia", text)}
          value={formik.values.frecuencia}
          error={formik.errors.frecuencia}
        />
        <Text style={styles.fecha}>Inicio: {inicio ? inicio : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={setear}
        >
           Seleccionar Fecha
        </Button> 
        { show ?       
        <DateTimePicker
            value={ new Date(valueDateTimePicker) }
            //timeZoneName={'America/Santiago'}
            onChange={obtenerDatos}
            //display="spinner"
            mode="date"
            /> : ""}
        <Text>Check List</Text>    
        <SegmentedControl
            values={['si', 'no']}
            tintColor="#00ff00"
            onChange={_onChange}
            onValueChange={(text) => formik.setFieldValue("checklist", text)}
            backgroundColor="#0000ff"
            selectedIndex={selectedIndex}
          />    
        <TextInput
          label="Indicador"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("indicador", text)}
          value={formik.values.indicador}
          error={formik.errors.indicador}
        />
        <TextInput
          label="Tipo de Reporte"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("tipodereporte", text)}
          value={formik.values.tipodereporte}
          error={formik.errors.tipodereporte}
        />
        <TextInput
          label="Observación"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("observacion", text)}
          value={formik.values.observacion}
          error={formik.errors.observacion}
        />
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Actualizar Plan Supervisión
        </Button>
      </View>
    </Layout.Basic>
  )
}
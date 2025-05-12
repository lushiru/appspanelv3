import { useState } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from "formik";
import { mejorasplanCtrl } from "../../../api";
import { initialValues, validationSchema } from "./MejorasPlanCrearScreen.form";
import { styles } from "./MejorasPlanCrearScreen.styles";

export function MejorasPlanCrearScreen(props) {

  const {
    route: { params },
  } = props;

  const id = params?.id;  
  const nombre = params?.nombre;  
  const tipo = params?.tipo;  

   const [show, setShow] = useState(false);
   const [inicio, setInicio] = useState(null);
   const [show2, setShow2] = useState(false);
   const [final, setFinal] = useState(null);

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { plandeaccion,indicador,indiceactual,meta,verificador,recursos,responsable,fecha,fecha2 } = formValue;
          try {
            await mejorasplanCtrl.crearMejoraPlan(id,plandeaccion,indicador,indiceactual,meta,verificador,recursos,responsable,fecha,fecha2);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      }); 

    const obtenerInicio = ({type},selectedDate) => {
      formik.setFieldValue("fecha", selectedDate); 
      setShow(false);
      const mes = selectedDate.getMonth()+1;
      setInicio(selectedDate.getDate()+"-"+mes+"-"+selectedDate.getFullYear());
    }  

    const obtenerFinal = ({type},selectedDate) => {
      formik.setFieldValue("fecha2", selectedDate); 
      setShow2(false);
      const mes = selectedDate.getMonth()+1;
      setFinal(selectedDate.getDate()+"-"+mes+"-"+selectedDate.getFullYear());
    } 
      

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Iniciativa : {nombre}</Text>
      <Text style={styles.titulo2}>Tipo de Mejora : {tipo}</Text>
      <View style={styles.container}>
        <TextInput
          label="Plan de Acción"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("plandeaccion", text)}
          value={formik.values.plandeaccion}
          error={formik.errors.plandeaccion}
        />
        <TextInput
          label="Indicador de Logro"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("indicador", text)}
          value={formik.values.indicador}
          error={formik.errors.indicador}
        />
        <TextInput
          label="Indice Actual"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("indiceactual", text)}
          value={formik.values.indiceactual}
          error={formik.errors.indiceactual}
        />
        <TextInput
          label="Meta"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("meta", text)}
          value={formik.values.meta}
          error={formik.errors.meta}
        />
        <TextInput
          label="Verificador"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("verificador", text)}
          value={formik.values.verificador}
          error={formik.errors.verificador}
        />
        <TextInput
          label="Recursos"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("recursos", text)}
          value={formik.values.recursos}
          error={formik.errors.recursos}
        />
        <TextInput
          label="Responsable"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("responsable", text)}
          value={formik.values.responsable}
          error={formik.errors.responsable}
        />
        <Text style={styles.fecha}>Fecha Inicial : {inicio ? inicio : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={() => { setShow(true); }}
        >
           Seleccionar Fecha Inicial
        </Button> 
        { show ?       
        <DateTimePicker
            value={ new Date() }
            onChange={obtenerInicio}
            mode="date"
            /> : ""}

        <Text style={styles.fecha}>Fecha Final : {final ? final : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={() => { setShow2(true); }}
        >
           Seleccionar Fecha Final
        </Button> 
        { show2 ?       
        <DateTimePicker
            value={ new Date() }
            onChange={obtenerFinal}
            mode="date"
            /> : ""}  

        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Crear Plan
        </Button>
      </View>
    </Layout.Basic>
  )
}
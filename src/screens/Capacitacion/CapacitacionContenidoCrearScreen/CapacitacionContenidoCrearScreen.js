import { useState } from 'react';
import { View, Text, ToastAndroid } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { capacitacioncontenidoCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CapacitacionContenidoCrearScreen.form";
import { styles } from "./CapacitacionContenidoCrearScreen.styles";


export function CapacitacionContenidoCrearScreen(props) {

  const {
        route: { params },
      } = props;

  const id = params?.id;

  const navigation = useNavigation();

      const [show, setShow] = useState(false);
      const [tiempo, setTiempo] = useState(null);

      const setear = () => {
        setShow(true);
      }

      const obtenerDatos = ({type},selectedDate) => {
        formik.setFieldValue("tiempo", selectedDate); 
        setShow(false);
        setTiempo(selectedDate.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }));

      }    

  
      const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: validationSchema(),
          validateOnChange: false,
          onSubmit: async (formValue) => {
            const { contenido,estrategia,tiempo } = formValue;
            try {
              await capacitacioncontenidoCtrl.crearCapacitacioncontenido(id,contenido,estrategia,tiempo);
              navigation.goBack();
            } catch (error) {
              ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
            }
          },
        });


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Crear Contenido</Text>
      <View style={styles.container}>
        <TextInput
          label="Contenido"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("contenido", text)}
          value={formik.values.contenido}
          error={formik.errors.contenido}
        />
        <TextInput
          label="Estrategia"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("estrategia", text)}
          value={formik.values.estrategia}
          error={formik.errors.estrategia}
        />
        <Text style={styles.fecha}>Tiempo: {tiempo ? tiempo : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={setear}
        >
           Seleccionar Tiempo
        </Button> 
        { show ?       
        <DateTimePicker
            value={ new Date(0) }
            is24Hour={true}
            onChange={obtenerDatos}
            display="spinner"
            mode="time"
            /> : ""}      
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Crear Contenido
        </Button>
      </View>
    </Layout.Basic>
  )
}
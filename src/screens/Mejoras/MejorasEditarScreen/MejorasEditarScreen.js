import { useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { Picker } from '@react-native-picker/picker';
import { useFormik } from "formik";
import { mejorasCtrl } from "../../../api";
import { initialValues, validationSchema } from "./MejorasEditarScreen.form";
import { styles } from "./MejorasEditarScreen.styles";

const Item = Picker.Item;

export function MejorasEditarScreen(props) {

    const {
        route: { params },
      } = props;

    const navigation = useNavigation();

    const id = params?.id;  

    useEffect(() => {
        if (id) {
          retriveMejora(id);
        }
      }, [id]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { iniciativa,descripcion,tipo } = formValue;
          try {
            await mejorasCtrl.updateMejora(id,iniciativa,descripcion,tipo);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      }); 

    const retriveMejora = async (id) => {
            const response = await mejorasCtrl.verUnMejora(id);
            await formik.setFieldValue("iniciativa", response.arrproc.iniciativa);
            await formik.setFieldValue("descripcion", response.arrproc.descripcion);
            await formik.setFieldValue("tipo", response.arrproc.tipo);              
        }; 
      

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Check List</Text>
      <View style={styles.container}>
        <TextInput
          label="Iniciativa"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("iniciativa", text)}
          value={formik.values.iniciativa}
          error={formik.errors.iniciativa}
        />
        <TextInput
          label="Descripción"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("descripcion", text)}
          value={formik.values.descripcion}
          error={formik.errors.descripcion}
        />
        <Picker
            selectedValue={formik.values.tipo}
            onValueChange={(v) => formik.setFieldValue("tipo", v)}
            >
            <Item label="Tipo de Mejora" value="" enabled={false} />  
            <Item label="Protocolo de Seguridad /Salud y MA" value="Protocolo de Seguridad /Salud y MA" />
            <Item label="Gestión de Personas" value="Gestión de Personas" />
            <Item label="Control de Calidad" value="Control de Calidad" />
            <Item label="Procedimiento de Trabajo" value="Procedimiento de Trabajo" />
            <Item label="Infraestructura / Instalaciones / Mq. y Eq." value="Infraestructura / Instalaciones / Mq. y Eq." />
            <Item label="Producto / Servicio" value="Producto / Servicio" />
            <Item label="Reducción de Costos / Mermas" value="Reducción de Costos / Mermas" />
            <Item label="Mantenimiento" value="Mantenimiento" />
            <Item label="Proceso / Condiciones de Operación" value="Proceso / Condiciones de Operación" />
        </Picker>
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Actualizar Mejora
        </Button>
      </View>
    </Layout.Basic>
  )
}
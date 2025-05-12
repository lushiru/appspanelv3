import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { Picker } from '@react-native-picker/picker';
import { useFormik } from "formik";
import { checklistCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CheckListCrearScreen.form";
import { styles } from "./CheckListCrearScreen.styles";

const Item = Picker.Item;

export function CheckListCrearScreen() {

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { nombre,tipo } = formValue;
          try {
            await checklistCtrl.crearChecklist(nombre,tipo);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      }); 
      

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Check List</Text>
      <View style={styles.container}>
        <TextInput
          label="Crear Nombre de la Lista"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("nombre", text)}
          value={formik.values.nombre}
          error={formik.errors.nombre}
        />
        <Picker
            selectedValue={""}
            onValueChange={(v) => formik.setFieldValue("tipo", v)}
            >
            <Item label="Tipo Verificación" value="" enabled={false} />  
            <Item label="Proceso" value="Proceso" />
            <Item label="Producto" value="Producto" />
            <Item label="Personas" value="Personas" />
            <Item label="Capacitacion" value="Capacitacion" />
        </Picker>
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Crear Check List
        </Button>
      </View>
    </Layout.Basic>
  )
}
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { checklistitemcontenidoCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CheckListItemContenidoCrearScreen.form";
import { styles } from "./CheckListItemContenidoCrearScreen.styles";


export function CheckListItemContenidoCrearScreen(props) {

    const {
        route: { params },
      } = props;

    const id = params?.id;

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { nombre } = formValue;
          try {
            await checklistitemcontenidoCtrl.crearChecklistitemcontenido(id,nombre);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      }); 
      

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Crear Contenido Item</Text>
      <View style={styles.container}>
        <TextInput
          label="Nombre Contenido Item"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("nombre", text)}
          value={formik.values.nombre}
          error={formik.errors.nombre}
        />
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Crear Contenido Item
        </Button>
      </View>
    </Layout.Basic>
  )
}
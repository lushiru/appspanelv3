import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { checklistitemCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CheckListItemCrearScreen.form";
import { styles } from "./CheckListItemCrearScreen.styles";


export function CheckListItemCrearScreen(props) {

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
            await checklistitemCtrl.crearChecklistitem(id,nombre);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      }); 
      

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Crear Item</Text>
      <View style={styles.container}>
        <TextInput
          label="Nombre Item"
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
           Crear Item
        </Button>
      </View>
    </Layout.Basic>
  )
}
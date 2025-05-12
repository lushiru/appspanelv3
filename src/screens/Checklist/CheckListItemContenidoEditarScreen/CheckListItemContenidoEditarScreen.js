import { useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { checklistitemcontenidoCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CheckListItemContenidoEditarScreen.form";
import { styles } from "./CheckListItemContenidoEditarScreen.styles";


export function CheckListItemContenidoEditarScreen(props) {

    const {
        route: { params },
      } = props;

    const id = params?.id;

    const navigation = useNavigation();

    useEffect(() => {
            if (id) {
              retriveItemContenido(id);
            }
          }, [id]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { nombre } = formValue;
          try {
            await checklistitemcontenidoCtrl.updateCheckitemcontenido(id,nombre);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      }); 

      const retriveItemContenido = async (id) => {
                  const response = await checklistitemcontenidoCtrl.verUnCheckitemcontenido(id);
                  await formik.setFieldValue("nombre", response.arrversubitem.nombresubitem);             
              };
      

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Actualizar Item Contenido</Text>
      <View style={styles.container}>
        <TextInput
          label="Nombre Item Contenido"
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
           Actualizar Item Contenido
        </Button>
      </View>
    </Layout.Basic>
  )
}
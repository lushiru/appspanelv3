import { useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { checklistitemCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CheckListItemEditarScreen.form";
import { styles } from "./CheckListItemEditarScreen.styles";


export function CheckListItemEditarScreen(props) {

    const {
        route: { params },
      } = props;

    const id = params?.id;

    const navigation = useNavigation();

    useEffect(() => {
            if (id) {
              retriveItem(id);
            }
          }, [id]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { nombre } = formValue;
          try {
            await checklistitemCtrl.updateCheckitem(id,nombre);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      }); 

      const retriveItem = async (id) => {
                  const response = await checklistitemCtrl.verUnCheckitem(id);
                  await formik.setFieldValue("nombre", response.arrveritem.nombreitem);             
              };
      

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Actualizar Item</Text>
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
           Actualizar Item
        </Button>
      </View>
    </Layout.Basic>
  )
}
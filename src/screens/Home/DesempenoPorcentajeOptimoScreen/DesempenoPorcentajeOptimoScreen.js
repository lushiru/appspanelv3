import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { desempeniosporcentajeCtrl } from "../../../api";
import { initialValues, validationSchema } from "./DesempenoPorcentajeOptimoScreen.form";
import { styles } from "./DesempenoPorcentajeOptimoScreen.styles";

export function DesempenoPorcentajeOptimoScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoId = params?.id;
      const nombredes = params?.nombre;

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { porcentaje } = formValue;
          try {
            const res = await desempeniosporcentajeCtrl.crearPorcentajeoptimo(desempenoId,porcentaje);
            console.log(res.resultado);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      });


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombredes}</Text>
      <View style={styles.container}>
        <TextInput
          label="Porcentaje"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("porcentaje", text)}
          value={formik.values.porcentaje}
          error={formik.errors.porcentaje}
        />
        
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Crear
        </Button>
      </View>
    </Layout.Basic>
  )
}
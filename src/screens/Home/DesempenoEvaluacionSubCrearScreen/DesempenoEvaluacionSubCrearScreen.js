import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { desempenosubcategoriaCtrl } from "../../../api";
import { initialValues, validationSchema } from "./DesempenoEvaluacionSubCrearScreen.form";
import { styles } from "./DesempenoEvaluacionSubCrearScreen.styles";

export function DesempenoEvaluacionSubCrearScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoEvaluacionId = params?.desempenoEvaluacionId;
      const nombre = params?.nombre;

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { nombre, porcentaje } = formValue;
          try {
            await desempenosubcategoriaCtrl.crearDesempenoSub(desempenoEvaluacionId,nombre,porcentaje);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      });


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombre}</Text>
      <View style={styles.container}>
        <TextInput
          label="Nombre"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("nombre", text)}
          value={formik.values.nombre}
          error={formik.errors.nombre}
        />

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
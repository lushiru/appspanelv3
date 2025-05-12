import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { desempenoconductaCtrl } from "../../../api";
import { initialValues, validationSchema } from "./DesempenoEvaluacionConductaCrearScreen.form";
import { styles } from "./DesempenoEvaluacionConductaCrearScreen.styles";

export function DesempenoEvaluacionConductaCrearScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoSubId = params?.desempenoSubId;
      const nombre = params?.nombre;

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { tarea } = formValue;
          try {
            await desempenoconductaCtrl.crearDesempenoConducta(desempenoSubId,tarea);
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
          label="Conducta Observable"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("tarea", text)}
          value={formik.values.tarea}
          error={formik.errors.tarea}
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
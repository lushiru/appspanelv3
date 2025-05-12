import { useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { desempeniosevaluacionCtrl } from "../../../api";
import { initialValues, validationSchema } from "./DesempenoEvaluacionEditarScreen.form";
import { styles } from "./DesempenoEvaluacionEditarScreen.styles";

export function DesempenoEvaluacionEditarScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoEvaluacionId = params?.desempenoEvaluacionId;
      const nombredes = params?.nombredes;

    const navigation = useNavigation();

    useEffect(() => {
                if (desempenoEvaluacionId) {
                  retriveDesempeno(desempenoEvaluacionId);
                }
              }, [desempenoEvaluacionId]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { nombre, porcentaje } = formValue;
          try {
            await desempeniosevaluacionCtrl.updateDesempenioEvaluacion(desempenoEvaluacionId,nombre,porcentaje);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      });

      const retriveDesempeno = async (Id) => {
                const response = await desempeniosevaluacionCtrl.verUnDesempenioEvaluacion(Id);
                await formik.setFieldValue("nombre", response.arrdes.nombre);  
                await formik.setFieldValue("porcentaje", response.arrdes.porcentaje);  
          }


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombredes}</Text>
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
           Actualizar
        </Button>
      </View>
    </Layout.Basic>
  )
}
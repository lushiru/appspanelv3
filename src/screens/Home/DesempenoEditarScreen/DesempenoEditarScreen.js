import { useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { desempeniosCtrl } from "../../../api";
import { initialValues, validationSchema } from "./DesempenoEditarScreen.form";
import { styles } from "./DesempenoEditarScreen.styles";

export function DesempenoEditarScreen(props) {

    const {
        route: { params },
      } = props;

    const navigation = useNavigation();

    const desempenoId = params?.desempenoId;
    
        useEffect(() => {
            if (desempenoId) {
              retriveDesempeno(desempenoId);
            }
          }, [desempenoId]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { nombre } = formValue;
          try {
            await desempeniosCtrl.updateDesempenioEvaluacion(desempenoId,nombre);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      });

    const retriveDesempeno = async (desempenoId) => {
            const response = await desempeniosCtrl.verUnDesempenioEvaluacion(desempenoId);
            await formik.setFieldValue("nombre", response.nombredes);  
    }

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Evaluación</Text>
      <View style={styles.container}>
        <TextInput
          label="Nombre"
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
           Actualizar Evaluación
        </Button>
      </View>
    </Layout.Basic>
  )
}
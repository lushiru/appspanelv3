import { useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { desempenosubcategoriaCtrl } from "../../../api";
import { initialValues, validationSchema } from "./DesempenoEvaluacionSubEditarScreen.form";
import { styles } from "./DesempenoEvaluacionSubEditarScreen.styles";

export function DesempenoEvaluacionSubEditarScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoSubId = params?.desempenoSubId;
      const nombrecat = params?.nombrecat;

       useEffect(() => {
                      if (desempenoSubId) {
                        retriveDesempenoSub(desempenoSubId);
                      }
                    }, [desempenoSubId]);

    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { nombre, porcentaje } = formValue;
          try {
            await desempenosubcategoriaCtrl.updateDesempenioSub(desempenoSubId,nombre,porcentaje);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      });

      const retriveDesempenoSub = async (Id) => {
                      const response = await desempenosubcategoriaCtrl.verUnDesempenioSub(Id);
                      await formik.setFieldValue("nombre", response.arrsub.nombre);  
                      await formik.setFieldValue("porcentaje", response.arrsub.porcentaje);  
                }


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombrecat}</Text>
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
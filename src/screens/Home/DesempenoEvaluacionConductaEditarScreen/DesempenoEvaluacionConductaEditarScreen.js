import { useEffect } from "react";
import { View, Text, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { desempenoconductaCtrl } from "../../../api";
import { initialValues, validationSchema } from "./DesempenoEvaluacionConductaEditarScreen.form";
import { styles } from "./DesempenoEvaluacionConductaEditarScreen.styles";

export function DesempenoEvaluacionConductaEditarScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoTareaId = params?.desempenoTareaId;
      const nombre = params?.nombre;

    const navigation = useNavigation();

    useEffect(() => {
        if (desempenoTareaId) {
        retriveDesempenoSub(desempenoTareaId);
        }
    }, [desempenoTareaId]);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { tarea } = formValue;
          try {
            await desempenoconductaCtrl.updateDesempenioConducta(desempenoTareaId,tarea);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      });

    const retriveDesempenoSub = async (Id) => {
                const response = await desempenoconductaCtrl.verUnDesempenioConducta(Id);
                await formik.setFieldValue("tarea", response.arrtar.tarea);  
        }  


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
           Actualizar
        </Button>
      </View>
    </Layout.Basic>
  )
}
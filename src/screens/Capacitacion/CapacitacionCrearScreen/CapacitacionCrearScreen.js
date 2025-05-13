import { View, Text, ToastAndroid } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { Picker } from '@react-native-picker/picker';
import { useFormik } from "formik";
import { capacitacionCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CapacitacionCrearScreen.form";
import { styles } from "./CapacitacionCrearScreen.styles";

const Item = Picker.Item;

export function CapacitacionCrearScreen() {

  const navigation = useNavigation();
  
      const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: validationSchema(),
          validateOnChange: false,
          onSubmit: async (formValue) => {
            const { instruccion,tipo,dirigidoa,objetivo,metodologia } = formValue;
            try {
              await capacitacionCtrl.crearCapacitacion(instruccion,tipo,dirigidoa,objetivo,metodologia);
              navigation.goBack();
            } catch (error) {
              ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
            }
          },
        });


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Crear Actividad</Text>
      <View style={styles.container}>
        <TextInput
          label="Nueva Capacitación"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("instruccion", text)}
          value={formik.values.instruccion}
          error={formik.errors.instruccion}
        />
        <Picker
            selectedValue={""}
            onValueChange={(v) => formik.setFieldValue("tipo", v)}
            >
            <Item label="Seleccione Tipo" value="" enabled={false} />  
            <Item label="Inducción" value="Inducción" />
            <Item label="Re - Inducción" value="Re - Inducción" />
            <Item label="Entrenamiento" value="Entrenamiento" />
            <Item label="Instrucción" value="Instrucción" />
        </Picker>
        <TextInput
          label="Dirigido a	"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("dirigidoa", text)}
          value={formik.values.dirigidoa}
          error={formik.errors.dirigidoa}
        />
        <TextInput
          label="Objetivo"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("objetivo", text)}
          value={formik.values.objetivo}
          error={formik.errors.objetivo}
        />
        <TextInput
          label="Metodología"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("metodologia", text)}
          value={formik.values.metodologia}
          error={formik.errors.metodologia}
        />        
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Crear Actividad
        </Button>
      </View>
    </Layout.Basic>
  )
}
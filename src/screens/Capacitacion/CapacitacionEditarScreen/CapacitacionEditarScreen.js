import { useState, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native'
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { Picker } from '@react-native-picker/picker';
import { useFormik } from "formik";
import { capacitacionCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CapacitacionEditarScreen.form";
import { styles } from "./CapacitacionEditarScreen.styles";


const Item = Picker.Item;

export function CapacitacionEditarScreen(props) {

  const {
        route: { params },
      } = props;

    const id = params?.id;

    const [selectedValuePicker, setSelectedValuePicker] = useState("");

    useEffect(() => {
            if (id) {
                retriveCap(id);
            }
            }, [id]);

  const navigation = useNavigation();
  
      const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: validationSchema(),
          validateOnChange: false,
          onSubmit: async (formValue) => {
            const { instruccion,tipo,dirigidoa,objetivo,metodologia } = formValue;
            try {
              await capacitacionCtrl.updateCapacitacion(id,instruccion,tipo,dirigidoa,objetivo,metodologia);
              navigation.goBack();
            } catch (error) {
              ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
            }
          },
        });

  const retriveCap = async (idp) => {
            const response = await capacitacionCtrl.verUnCapacitacion(idp);
            await formik.setFieldValue("instruccion", response.arrinst.nombreplan);
            await formik.setFieldValue("tipo", response.arrinst.tipo); setSelectedValuePicker(response.arrinst.tipo);
            await formik.setFieldValue("dirigidoa", response.arrinst.dirigidoa);
            await formik.setFieldValue("objetivo", response.arrinst.objetivo);
            await formik.setFieldValue("metodologia", response.arrinst.metodologia);             
    }      


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Actualizar Actividad</Text>
      <View style={styles.container}>
        <TextInput
          label="Nueva Capacitación"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("instruccion", text)}
          value={formik.values.instruccion}
          error={formik.errors.instruccion}
        />
        <Picker
            selectedValue={selectedValuePicker}
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
           Actualizar Actividad
        </Button>
      </View>
    </Layout.Basic>
  )
}
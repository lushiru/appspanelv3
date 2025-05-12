import { useEffect, useState } from "react";
import { View, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { Picker } from '@react-native-picker/picker';
import { useFormik } from "formik";
import { colaboradoresCtrl } from "../../../api";
import { initialValues, validationSchema } from "./ColaboradoresEditarScreen.form";
import { styles } from "./ColaboradoresEditarScreen.styles";

const Item = Picker.Item;

export function ColaboradoresEditarScreen(props) {

    const {
        route: { params },
      } = props;

    const navigation = useNavigation();
    const colaboradorId = params?.colaboradorId;

    useEffect(() => {
        if (colaboradorId) {
          retriveColaborador(colaboradorId);
        }
      }, [colaboradorId]);
    

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
          const { rut, nombres, apaterno, amaterno, direccion, telefono, correo, ciudad, sexo, nacionalidad, cargo } = formValue;
          try {
            await colaboradoresCtrl.updateColaborador(colaboradorId, rut, nombres, apaterno, amaterno, direccion, telefono, correo, ciudad, sexo, nacionalidad, cargo);
            navigation.goBack();
          } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
          }
        },
      });

      const retriveColaborador = async (colaboradorId) => {
        const response = await colaboradoresCtrl.verUnColaborador(colaboradorId);
        await formik.setFieldValue("rut", response.arrcol.rut);
        await formik.setFieldValue("nombres", response.arrcol.nombres);
        await formik.setFieldValue("apaterno", response.arrcol.apaterno);
        await formik.setFieldValue("amaterno", response.arrcol.amaterno);
        await formik.setFieldValue("direccion", response.arrcol.direccion);
        await formik.setFieldValue("telefono", response.arrcol.telefono);
        await formik.setFieldValue("correo", response.arrcol.correo);
        await formik.setFieldValue("cargo", response.arrcol.cargo);
        await formik.setFieldValue("ciudad", response.arrcol.ciudad);
        await formik.setFieldValue("sexo", response.arrcol.sexo);
        await formik.setFieldValue("nacionalidad", response.arrcol.nacionalidad);
        
      };  


  return (
    <Layout.Basic>
      <View style={styles.container}>
        <TextInput
          label="Rut"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("rut", text)}
          value={formik.values.rut}
          error={formik.errors.rut}
        />
        <TextInput
          label="Nombres"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("nombres", text)}
          value={formik.values.nombres}
          error={formik.errors.nombres}
        />
        <TextInput
          label="Apellido paterno"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("apaterno", text)}
          value={formik.values.apaterno}
          error={formik.errors.apaterno}
        />
        <TextInput
          label="Apellido materno"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("amaterno", text)}
          value={formik.values.amaterno}
          error={formik.errors.amaterno}
        />
        <TextInput
          label="Direccion"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("direccion", text)}
          value={formik.values.direccion}
          error={formik.errors.direccion}
        />
        <TextInput
          label="Telefono"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("telefono", text)}
          value={formik.values.telefono}
          error={formik.errors.telefono}
        />
        <TextInput
          label="Correo"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("correo", text)}
          value={formik.values.correo}
          error={formik.errors.correo}
        />
        <Picker
            selectedValue={formik.values.ciudad}
            onValueChange={(v) => formik.setFieldValue("ciudad", v)}
            >
            <Item label="Ciudad" value="" enabled={false} />  
            <Item label="Iquique" value="Iquique" />
            <Item label="Alto Hospicio" value="Alto Hospicio" />
            <Item label="Pica" value="Pica" />
            <Item label="Pozo Almonte" value="Pozo Almonte" />
            <Item label="La Tirana" value="La Tirana" />
            <Item label="La Huayca" value="La Huayca" />
        </Picker>
        <Picker
            selectedValue={formik.values.sexo}
            onValueChange={(v) => formik.setFieldValue("sexo", v)}
            >
            <Item label="Sexo" value="" enabled={false} />    
            <Item label="Masculino" value="Masculino" />
            <Item label="Femenino" value="Femenino" />
        </Picker>
        <Picker
            selectedValue={formik.values.nacionalidad}
            onValueChange={(v) => formik.setFieldValue("nacionalidad", v)}
            >
            <Item label="Nacionalidad" value="" enabled={false} />  
            <Item label="Chilena" value="Chilena" />
            <Item label="Boliviana" value="Boliviana" />
            <Item label="Peruana" value="Peruana" />
        </Picker>
        <TextInput
          label="Cargo"
          style={styles.input}
          onChangeText={(text) => formik.setFieldValue("cargo", text)}
          value={formik.values.cargo}
          error={formik.errors.cargo}
        />
        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Actualizar colaborador
        </Button>
      </View>
    </Layout.Basic>
  )
}
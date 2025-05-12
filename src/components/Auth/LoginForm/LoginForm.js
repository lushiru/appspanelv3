import { View, ToastAndroid } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import { authCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { globalStyles } from "../../../styles";
import { initialValues, validationSchame } from "./LoginForm.form";

export function LoginForm() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchame(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { usuario, password } = formValue;
        const response = await authCtrl.login(usuario, password);
        if(!response.token){
          if(response.numfallos){            
            ToastAndroid.show( "Error = " + response.resultado + " fallos = " + response.numfallos , ToastAndroid.LONG);
          }else{
            ToastAndroid.show( "Error = " + response.resultado , ToastAndroid.LONG);
          }
        }
        else{login(response.token);}
      } catch (error) {
        ToastAndroid.show( "Error = " + error , ToastAndroid.LONG);
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Usuario"
        style={globalStyles.form.input}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue("usuario", text)}
        value={formik.values.usuario}
        error={formik.errors.usuario}
      />
      <TextInput
        label="Contraseña"
        style={globalStyles.form.input}
        secureTextEntry
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Entrar
      </Button>

    </View>
  );
}
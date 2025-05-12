import { View, Image, KeyboardAvoidingView, Platform } from "react-native";
import { LoginForm } from "../../../components/Auth";
import logo from "../../../../assets/logo.jpg";
import { styles } from "./AuthScreen.styles";

export function AuthScreen() {

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
          <LoginForm />        
      </KeyboardAvoidingView>
    </View>
  );
}
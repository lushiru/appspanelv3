import { Alert } from "react-native";
import { List } from "react-native-paper";
import { useAuth } from "../../../hooks";
import { styles } from "./Menu.styles";

export function Menu() {
  const { logout } = useAuth();

  const alertLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estas seguro de que quieres salir de tu cuenta?",
      [
        {
          text: "NO",
        },
        {
          text: "SI",
          onPress: logout,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        <List.Item
          title="Cerrar sesión"
          titleStyle={styles.titleLogoutItem}
          description="Cerrar esta sesion e iniciar con otra"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={alertLogout}
        />
      </List.Section>
    </>
  );
}
import { Layout } from "../../layouts";
import { UserInfo } from "../../components/Account";
import { MenuHome } from '../../components/Home';
import { Image } from "react-native";
import { styles } from "./HomeScreen.styles";
import logo from "../../../assets/logo.jpg";

export function HomeScreen() {
  return (
    <Layout.Basic>
      <Image source={logo} style={styles.logo} />
      <UserInfo />
      <MenuHome />
    </Layout.Basic>
  )
}
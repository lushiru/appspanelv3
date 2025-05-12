import { Layout } from "../../layouts";
import { UserInfo } from "../../components/Account";
import { MenuPlan } from '../../components/MenuPlan';
import { Image } from "react-native";
import { styles } from "./PlanScreen.styles";
import logo from "../../../assets/logo.jpg";

export function PlanScreen() {
  return (
    <Layout.Basic>
      <Image source={logo} style={styles.logo} />
      <UserInfo />
      <MenuPlan />
    </Layout.Basic>
  )
}
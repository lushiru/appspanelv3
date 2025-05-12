import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { screensName } from "../../utils";
import { HomeStack, AccountStack, PlanStack } from "../stacks";
import { styles } from "./TabNavigation.styles";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (routeStatus) => setIcon(route, routeStatus),
        tabBarActiveTintColor: "#000",
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={screensName.home.root}
        component={HomeStack}
        options={{ title: "Inicio" }}
      /> 
      <Tab.Screen
        name={screensName.homeplan.root}
        component={PlanStack}
        options={{ title: "plan" }}
      />      
      <Tab.Screen
        name={screensName.account.root}
        component={AccountStack}
        options={{ title: "Cerrar sesion" }}
      />
    </Tab.Navigator>
  );
}

function setIcon(route, routeStatus) {

  let iconName = "";
  let color = "#fff";

  if (routeStatus.focused) {
    color = "#0098d3";
  }

  if (route.name === screensName.home.root) {
    iconName = "home";
  }
  if (route.name === screensName.homeplan.root) {
    iconName = "bars";
  }
  if (route.name === screensName.account.root) {
    iconName = "user";
  } 

  return <AwesomeIcon name={iconName} color={color} style={styles.icon} />;
}
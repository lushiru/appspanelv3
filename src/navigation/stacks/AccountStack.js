import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from "../../screens/Account";
import { screensName } from "../../utils";

const Stack = createNativeStackNavigator();

export function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screensName.account.account} component={AccountScreen} />
    </Stack.Navigator>
  );
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, ColaboradoresScreen, ColaboradoresCrearScreen, ColaboradoresEditarScreen,
  DesempenoScreen, DesempenoCrearScreen, DesempenoEditarScreen, 
  DesempenoEvaluacionScreen, DesempenoEvaluacionCrearScreen, DesempenoEvaluacionEditarScreen,
  DesempenoEvaluacionSubScreen, DesempenoEvaluacionSubCrearScreen, DesempenoEvaluacionSubEditarScreen,
  DesempenoEvaluacionConductaScreen, DesempenoEvaluacionConductaCrearScreen, DesempenoEvaluacionConductaEditarScreen,
  DesempenoPorcentajeOptimoScreen,
  DesempenoRegistrarEvaluacionScreen, DesempenoReporteIndividualScreen, DesempenoReporteGeneralScreen, DesempenoReporteCategoriaScreen
 } from "../../screens/Home";
import { screensName } from "../../utils";

const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screensName.home.home} component={HomeScreen} />
      <Stack.Screen name={screensName.home.colaboradores} component={ColaboradoresScreen} />
      <Stack.Screen name={screensName.home.colaboradoresCrear} component={ColaboradoresCrearScreen} />
      <Stack.Screen name={screensName.home.colaboradoresEditar} component={ColaboradoresEditarScreen} />
      <Stack.Screen name={screensName.home.desempeno} component={DesempenoScreen} />
      <Stack.Screen name={screensName.home.desempenoCrear} component={DesempenoCrearScreen} />
      <Stack.Screen name={screensName.home.desempenoEditar} component={DesempenoEditarScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacion} component={DesempenoEvaluacionScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacionCrear} component={DesempenoEvaluacionCrearScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacionEditar} component={DesempenoEvaluacionEditarScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacionSub} component={DesempenoEvaluacionSubScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacionSubCrear} component={DesempenoEvaluacionSubCrearScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacionSubEditar} component={DesempenoEvaluacionSubEditarScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacionConducta} component={DesempenoEvaluacionConductaScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacionConductaCrear} component={DesempenoEvaluacionConductaCrearScreen} />
      <Stack.Screen name={screensName.home.desempenoEvaluacionConductaEditar} component={DesempenoEvaluacionConductaEditarScreen} />
      <Stack.Screen name={screensName.home.desempenoPorcentajeOptimo} component={DesempenoPorcentajeOptimoScreen} />
      <Stack.Screen name={screensName.home.desempenoRegistrarEvaluacion} component={DesempenoRegistrarEvaluacionScreen} />
      <Stack.Screen name={screensName.home.desempenoReporteIndividual} component={DesempenoReporteIndividualScreen} />
      <Stack.Screen name={screensName.home.desempenoReporteGeneral} component={DesempenoReporteGeneralScreen} />
      <Stack.Screen name={screensName.home.desempenoReporteCategoria} component={DesempenoReporteCategoriaScreen} />
    </Stack.Navigator>
  );
}
import { useState, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native'
import { desempeniosregistrarCtrl } from "../../../api";
import { styles } from "./DesempenoReporteGeneralScreen.styles";
import { BarChart } from "react-native-gifted-charts";
import { Layout } from "../../../layouts";

export function DesempenoReporteGeneralScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoId = params?.id;
      const nombredes = params?.nombre;


    const [reporte, setReporte] = useState(null);

    useEffect(() => {
        getReporteGral();
      }, []);

    const getReporteGral = async () => {
        try{
        const response = await desempeniosregistrarCtrl.getreportegral(desempenoId);
        setReporte(response.arrr);
        }catch(error){
            ToastAndroid.show( Error , ToastAndroid.SHORT);
        }    
    }  
    
    const handleBarPress = (item) => {
        ToastAndroid.show( item.texto , ToastAndroid.SHORT);
      };

  return (
        <Layout.Basic>
            <View>
            <Text style={styles.titulo}>{nombredes}</Text>
            {
                reporte ?
                <View style={styles.container}>
                    <BarChart
                        barWidth={20}
                        barBorderRadius={4}
                        frontColor="lightgray"
                        data={reporte}
                        yAxisThickness={1}
                        xAxisThickness={1}
                        yAxisAtTop={40}
                        onPress={handleBarPress}
                    />
                </View>
                : ""
            }  
            </View>
        </Layout.Basic>
  )
}
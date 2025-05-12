import { useState, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native'
import { desempeniosregistrarCtrl } from "../../../api";
import { styles } from "./DesempenoReporteCategoriaScreen.styles";
import { BarChart } from "react-native-gifted-charts";
import { Picker } from '@react-native-picker/picker';
import { Layout } from "../../../layouts";

export function DesempenoReporteCategoriaScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoId = params?.id;
      const nombredes = params?.nombre;


    const [reporte, setReporte] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [categoriasnombre, setCategoriasnombre] = useState(null);
    const [categoria, setCategoria] = useState(null);

    useEffect(() => {
        getCategorias();
      }, []);

      useEffect(() => {
        if(categoria)getReporteCategoria();
      }, [categoria]);  

    const getCategorias = async () => {
        try{
        const response = await desempeniosregistrarCtrl.getCategorias(desempenoId);
        setCategorias(response.arrdes);
        }catch(error){
            ToastAndroid.show( Error , ToastAndroid.SHORT);
        }    
    }    

    const getReporteCategoria = async () => {
        console.log(categoria);
        try{
        const response = await desempeniosregistrarCtrl.getEvaluacionCategoria(desempenoId,categoria);
        console.log(response.arrr);
        setReporte(response.arrr);
        }catch(error){
            ToastAndroid.show( Error , ToastAndroid.SHORT);
        }    
    }  
    
    const handleBarPress = (item) => {
        ToastAndroid.show( item.texto , ToastAndroid.SHORT);
      };

    const seguiraEvaluacion = (cat) => {

        if(cat!=""){            

            categorias.map((item)=>{
                if(item.id == cat){
                    setCategoriasnombre(`${item.nombre} ${item.porcentaje}%`);
                }
            });         
            setCategoria(cat);
        }

    }


  return (
        <Layout.Basic>
            
            <Text style={styles.titulo}>{nombredes}</Text>
            { categorias ?

                <Picker key={"cat"+Date.now()}
                    selectedValue={""}
                    onValueChange={(v)=> { seguiraEvaluacion(v); }}
                    >
                    <Picker.Item label="Seleccione Categoría de competencia" value="" enabled={false} />  
                    {
                        categorias.map((it) => { return <Picker.Item key={"cat"+it.id} label={ it.nombre } value={it.id} /> })
                    }
                </Picker>

                : ""
            }

            {
                reporte ?
                <>
                    <Text style={styles.titulo}>{categoriasnombre}</Text>
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
                </>
                : ""
            }


        </Layout.Basic>
  )
}
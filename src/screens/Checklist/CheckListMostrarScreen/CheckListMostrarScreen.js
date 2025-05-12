import { useState, useEffect } from "react";
import { ToastAndroid, Text, View } from "react-native";
import { Layout } from "../../../layouts";
import { styles } from "./CheckListMostrarScreen.styles";
import { checklistaplicarCtrl } from "../../../api";
import { useAuth } from "../../../hooks";


export function CheckListMostrarScreen(props) {

    const {
        route: { params },
      } = props;

      const Id = params?.id;
      const idfechas = params?.idfechas;
      const nombretext = params?.nombretext;

      const { user } = useAuth();
      
      const [fecha, setFecha] = useState(null);
      const [mostrar, setMostrar] = useState(null);
      const [observacion, setObservacion] = useState(null);
      const [nombre, setNombre] = useState(null);  

    useEffect(() => {
        if(Id){getMostrar();}                     
    }, [Id]);

    const getMostrar = async () => {
        try {
          const response = await checklistaplicarCtrl.verUnCheckmostrar(Id,idfechas,nombretext);
          setMostrar(response.array); 
          setFecha(response.fecha); 
          setObservacion(response.observacion); 
          setNombre(response.nombretext); 
        } catch (error) {
            ToastAndroid.show( "error =" + error , ToastAndroid.SHORT);
        }
      };

    

    const EscribirEvaluacion = (props) => {   
        
        return (
            <View>
                <View key={Date.now()} style={styles.table}>
                { props.evaluacion.map((item,index1) => 
                     (      <View key={"viewi"+index1}>
                                <View key={"viewit"+index1} style={styles.table_head}>
                                    <View key={"viewitem"+index1} style={{width:"70%"}}>
                                        <Text key={"viewitemnombre"+index1}>{item.nombreitem}</Text>
                                    </View>
                                    <View key={"viewitemc"+index1} style={{width:"30%"}}>
                                        <Text key={"viewitemcumple"+index1}>Cumple</Text>
                                    </View>                                    
                                </View>
                               { item.arrversubitem?.map((item2,index2) => 
                                        ( <View key={"viewsubitem"+index1+index2}>
                                            <View key={"viewsubitemv"+index1+index2} style={styles.table_tar}>
                                                <View key={"viewsubitemn"+index1+index2} style={{width:"70%"}}>
                                                    <Text key={"viewsubitemnombre"+index1+index2}>{item2.nombresubitem}</Text>
                                                </View>
                                                <View key={"viewsubitemvc"+index1+index2} style={{width:"30%"}}>
                                                    <Text key={"viewsubitemnombreval"+index1+index2}>{item2.valor}</Text>    
                                                </View>                                                
                                            </View>
                                                                             
                                    </View>    )
                                )} 
                        </View>    )
                 )}
                </View>
                   
            </View>         
        );
    }
    
  return (
    <Layout.Basic>
        { mostrar && fecha ?
        <>
        <Text style={styles.titulo}>Lista de Verificación : {nombre}</Text>
        <View key={"viewprin"}>
                <View key={"viewprinh"} style={styles.table_head}>
                    <View key={"viewprinvn"} style={{width:"25%"}}>
                        <Text key={"viewprinvnombre"}>Nombre Inspector</Text>
                    </View>
                    <View key={"viewprinvnom"} style={{width:"30%"}}>
                        <Text key={"viewprinvnombrei"}>{user.usuario ? `${user.usuario}` : 'sin nombre'}</Text>
                    </View>
                    <View key={"viewprinf"} style={{width:"20%"}}>
                        <Text key={"viewprinfecha"}>Fecha</Text>
                    </View>
                    <View key={"viewprinfv"} style={{width:"25%"}}>
                        <Text key={"viewprinfechasel"}>{fecha}</Text>
                    </View>
                </View>
            </View>
            <EscribirEvaluacion evaluacion={mostrar} />
            <Text style={styles.titulo}>Observación</Text>
            <Text>{observacion}</Text>
        </>    
        : "" }    
    </Layout.Basic>
  )
}
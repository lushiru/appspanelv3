import { useState, useEffect, useRef } from "react";
import { ToastAndroid, Text, View } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./DesempenoReporteIndividualScreen.styles";
import { desempeniosregistrarCtrl } from "../../../api";
import { Picker } from '@react-native-picker/picker';
import { useIsFocused, useNavigation } from "@react-navigation/native";

//const Item = Picker.Item;

export function DesempenoReporteIndividualScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoId = params?.id;
      const nombredes = params?.nombre;

  const [evaluacion, setEvaluacion] = useState(null);
  const [nota, setNota] = useState(null);      
  const [fechas, setFechas] = useState(null);
  const [trabajadores, setTrabajadores] = useState(null);
  const [trabajador, setTrabajador] = useState(null);
  const [trabajadornombre, setTrabajadornombre] = useState("");
  const isVisible = useIsFocused();
  const navigation = useNavigation();
  const [mostrarEvaluacion, setMostrarEvaluacion] = useState(false);

    useEffect(() => {
        if(isVisible){getDesempenios();}                     
    }, [isVisible]);

    useEffect(() => {
        if(trabajador){
            getEvaluaciones();
        }        
    }, [trabajador]);

    
    const getDesempenios = async () => {
        try {
          const response = await desempeniosregistrarCtrl.verTrabajadores();
          setTrabajadores(response.arrpers);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener colaboradores" , ToastAndroid.SHORT);
        }
      };

    const getEvaluaciones = async () => {
        try {
            const response = await desempeniosregistrarCtrl.getEvalucionindividuales(trabajador,desempenoId);
            setFechas(response.arrfecha);        
        } catch (error) {
            ToastAndroid.show( "Error al obtener fechas" , ToastAndroid.SHORT);
        }
    };

    const gotoVerResultado = async (fecha2) => {

        try {
            const response = await desempeniosregistrarCtrl.getmostrarevaluacionfecha(trabajador,fecha2,desempenoId);
            setEvaluacion(response.arrr);  setNota(response.final);      
        } catch (error) {
            ToastAndroid.show( "Error al obtener fechas" , ToastAndroid.SHORT);
        }

    }
      
    const seguiraEvaluacion = async (trabaj) => {

        if(trabaj!=""){
            

            trabajadores.map((item)=>{
                if(item.id == trabaj){
                    setTrabajadornombre(`${item.nombres} ${item.apellidos1} ${item.apellidos2}`);
                }
            });         
            setTrabajador(trabaj);
        }

    }

    const EvaluacionFechas = () => {
        return (
            <View><View key={"prin"} style={styles.table_head}>
                        <View key={"nomi"} style={{width:"55%"}}>
                            <Text key={"nom"}>Evaluación</Text>
                        </View>
                        <View key={"fechi"} style={{width:"20%"}}>
                            <Text key={"fech"}>Fecha</Text>
                        </View>
                        <View key={"btni"} style={{width:"25%"}}>
                            <Text key={"btn"}>Acción</Text>
                        </View>
                    </View>
                { fechas.map((item,index)=>
                    <View key={"prin"+index} style={styles.table_tar}>
                        <View key={"nomi"+index} style={{width:"55%"}}>
                            <Text key={"nom"+index}>{item.nombre}</Text>
                        </View>
                        <View key={"fechi"+index} style={{width:"20%"}}>
                            <Text key={"fech"+index}>{item.fecha}</Text>
                        </View>
                        <View key={"btni"+index} style={{width:"25%"}}>
                            <Button mode="contained" onPress={() => gotoVerResultado(item.fecha2)} style={styles.btn}>
                                        Ver
                            </Button>
                        </View>
                    </View>
                )
                }
            </View>
        )    
    }

    const EscribirEvaluacion = () => {        
         
            
    
            return (
                    <View key={Date.now()} style={styles.table}>
                    { evaluacion.map((item,index1) => 
                         (      <View key={"viewcat"+item.id+index1}>
                                <View key={"princat"+item.id+index1} style={styles.table_head}>
                                    <View key={"cat"+item.id+index1} style={{width:"25%"}}>
                                        <Text key={"catt"+item.id+index1}>Categoria de competencia</Text>
                                    </View>
                                    <View key={"catnom"+item.id+index1} style={{width:"50%"}}>
                                        <Text key={"catnomt"+item.id+index1}>{item.nombre}</Text>
                                    </View>
                                    <View key={"catpond"+item.id+index1} style={{width:"25%"}}>
                                        <Text key={"catpondt"+item.id+index1}>Ponderacion {item.porcentaje}%</Text>
                                    </View>
                                </View>
                                   { item.arrsub?.map((item2,index2) => 
                                            ( <View key={"viewsub"+item2.id+index1+index2}>
                                                <View key={"prinsub"+item2.id+index1+index2} style={styles.table_sub}>
                                                    <View key={"subc"+item2.id+index1+index2} style={{width:"25%"}}>
                                                        <Text key={"subct"+item2.id+index1+index2}>subcategoria</Text>
                                                    </View>
                                                    <View key={"subcnom"+item2.id+index1+index2} style={{width:"50%"}}>
                                                        <Text key={"subcnomt"+item2.id+index1+index2}>{item2.nombre}</Text>
                                                    </View>
                                                    <View key={"subcpon"+item2.id+index1+index2} style={{width:"10%"}}>
                                                        <Text key={"subcpont"+item2.id+index1+index2}>Ponderacion</Text>
                                                    </View>      
                                                    <View key={"subcporc"+item2.id+index1+index2} style={{width:"15%"}}>
                                                        <Text key={"subcporct"+item2.id+index1+index2} style={{ textAlign: "center"}}>{item2.porcentaje}%</Text>
                                                    </View>
                                                </View>
                                                {
                                                    item2.arrtar?.map((item3,index3) => 
                                                        (
                                                        <View key={"printar"+item3.id+index1+index2+index3} style={styles.table_tar}>
                                                            <View key={"tar"+item3.id+index1+index2+index3} style={{width:"85%"}}>
                                                                <Text key={"tart"+item3.id+index1+index2+index3} style={{fontSize: 18}}>{item3.tarea}</Text>
                                                            </View>
                                                            <View key={"tart"+item3.id+index1+index2+index3} style={{width:"15%"}}>
                                                                <Text key={"tart"+item3.id+index1+index2+index3} style={{fontSize: 18}}>{item3.ponderacion}</Text>
                                                            </View>
                                                        </View>)
                                                    )
                                                }                                    
                                        </View>    )
                                    )} 
                            </View>    )
                     )}
                    </View>
    
                         
            );
        }
        
    
  return (
    <Layout.Basic>
        <Text style={styles.titulo}>{nombredes}</Text>
        {trabajadores ? 
            <Picker key={"pcolab"+Date.now()}
                selectedValue={""}
                onValueChange={(v)=> { seguiraEvaluacion(v); }}
                >
                <Picker.Item label="Seleccione Trabajador" value="" enabled={false} />  
                {
                    trabajadores.map((it) => { return <Picker.Item key={"colab"+it.id} label={it.nombres + " " + it.apellidos1 + " " + it.apellidos2 } value={it.id} /> })
                }
            </Picker>

            : ""        
        }
        {
            fechas ?
            <>
                <Text>{trabajadornombre}</Text>
                <EvaluacionFechas />
            </>
            : ""
        }
        {
            evaluacion && fechas ?
                <>
                    <EscribirEvaluacion />
                    <Text style={styles.nota}>EVALUACIÓN FINAL = {nota}%</Text>
                </>    
            : ""

        }
        

    </Layout.Basic>
  )
}
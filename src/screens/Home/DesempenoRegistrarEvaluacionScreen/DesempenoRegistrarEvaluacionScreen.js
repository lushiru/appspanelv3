import { useState, useEffect, useRef } from "react";
import { ToastAndroid, Text, View } from "react-native";
import { Button } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./DesempenoRegistrarEvaluacionScreen.styles";
import { desempeniosregistrarCtrl } from "../../../api";
import { Picker } from '@react-native-picker/picker';
import { useIsFocused, useNavigation } from "@react-navigation/native";

//const Item = Picker.Item;

export function DesempenoRegistrarEvaluacionScreen(props) {

    const {
        route: { params },
      } = props;

      const desempenoId = params?.id;
      const nombredes = params?.nombre;

  const [evaluar, setEvaluar] = useState(null);
  const [trabajadores, setTrabajadores] = useState(null);
  const [trabajador, setTrabajador] = useState(null);
  const [trabajadornombre, setTrabajadornombre] = useState("");
  const isVisible = useIsFocused();
  const navigation = useNavigation();
  const [mostrarEvaluacion, setMostrarEvaluacion] = useState(false);

  const tareas = useRef([]);
  const [tarea, setTarea] = useState(null);

    useEffect(() => {
        if(isVisible){getDesempenios();}                     
    }, [isVisible]);

    useEffect(() => {
        if(desempenoId){ getEvaluar(); }                     
    }, [desempenoId]);

    useEffect(() => {
        if(trabajador){
            setMostrarEvaluacion(false);
            setMostrarEvaluacion(true);
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

    const getEvaluar = async () => {
        try {
          const response = await desempeniosregistrarCtrl.verEvaluacion(desempenoId);
          setEvaluar(response.arrr); 
                
        } catch (error) {
            ToastAndroid.show( "Error al obtener colaboradores" , ToastAndroid.SHORT);
        }
      };

      const gotoGuardar = async () => {
        try {
          const response = await desempeniosregistrarCtrl.guardarTareas(trabajador,tareas.current);
          navigation.goBack();                
        } catch (error) {
            ToastAndroid.show( "Error = " + error , ToastAndroid.LONG);
        }
      };

    const seguiraEvaluacion = async (trabaj) => {

        if(trabaj!=""){
            await cargarTareas();
            setTrabajador(trabaj);

            trabajadores.map((item)=>{
                if(item.id == trabaj){
                    setTrabajadornombre(`${item.nombres} ${item.apellidos1} ${item.apellidos2}`);
                }
            });         

        }

    }

    const cargarTareas = async () => {

        tareas.current = null;

        const array = [];

        await evaluar?.forEach(element => {            
            element.arrsub?.forEach(element2 => {
                element2.arrtar?.forEach(element3 => {
                            array.push({ idtarea : element3.id, valor: 0});
                        })
                });
        });
        tareas.current = array;

    }

    const cambiarPorcentaje = (v, Idtarea) => {

        if(tareas.current == null){
            cargarTareas();
        }
        
        const array = tareas.current.map(element => {
            if(element.idtarea == Idtarea){
                return { idtarea:Idtarea, valor:v };          
            }else{
                return { idtarea:element.idtarea, valor:element.valor };
            }
        });
        tareas.current = array;
        
    }

    const EscribirEvaluacion = () => {        
     
        

        return (
                <View key={Date.now()} style={styles.table}>
                { evaluar.map((item,index1) => 
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
                                                            <Picker key={"tartp"+item3.id+index1+index2+index3}
                                                                selectedValue={""}
                                                                onValueChange={(v) => { cambiarPorcentaje(v, item3.id); }}
                                                                >
                                                                <Picker.Item key={"itn"+item3.id+index1+index2+index3} label="Seleccione Puntaje" value="" enabled={false} />
                                                                <Picker.Item key={"itn0"+item3.id+index1+index2+index3} label="0%" value="0" />    
                                                                <Picker.Item key={"itn25"+item3.id+index1+index2+index3} label="25%" value="25" />
                                                                <Picker.Item key={"itn50"+item3.id+index1+index2+index3} label="50%" value="50" />
                                                                <Picker.Item key={"itn75"+item3.id+index1+index2+index3} label="75%" value="75" />
                                                                <Picker.Item key={"itn100"+item3.id+index1+index2+index3} label="100%" value="100" />
                                                            </Picker>
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
            mostrarEvaluacion && evaluar ? 
                <>
                    <Text>{trabajadornombre}</Text>
                    <EscribirEvaluacion />
                    <Button mode="contained" onPress={() => gotoGuardar()} style={styles.btn}>
                                Guardar Evaluacion
                    </Button>
                </>    
            : ""
        }
        

    </Layout.Basic>
  )
}
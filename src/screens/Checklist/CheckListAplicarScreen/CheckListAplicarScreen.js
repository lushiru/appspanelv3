import { useState, useEffect, useRef } from "react";
import { ToastAndroid, Text, View } from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { Layout } from "../../../layouts";
import { styles } from "./CheckListAplicarScreen.styles";
import { checklistaplicarCtrl } from "../../../api";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../hooks";

const Item = Picker.Item;

export function CheckListAplicarScreen(props) {

    const {
        route: { params },
      } = props;

      const Id = params?.id;
      const nombrever = params?.nombrever;
      
      const [show, setShow] = useState(false);
      const [fecha, setFecha] = useState(null);
  const [evaluar, setEvaluar] = useState(null);
  const navigation = useNavigation();

  const { user } = useAuth();
  
  const cumple = useRef([]);
  const observacion = useRef("");

    useEffect(() => {
        if(Id){getEvaluar();}                     
    }, [Id]);

    const setear = () => {
        setShow(true);
      }

    const cambiarObs = (v) => {
        observacion.current = v;
    }      

    const obtenerDatos = ({type},selectedDate) => {
        const mes = selectedDate.getMonth()+1;
        setFecha(selectedDate.getFullYear()+"-"+mes+"-"+selectedDate.getDate()); 
        setShow(false);
        cargarCumple(); 
    }  

    const getEvaluar = async () => {
        try {
          const response = await checklistaplicarCtrl.verChecksaplicar(Id);
          setEvaluar(response.array); 
                
        } catch (error) {
            ToastAndroid.show( "error =" + error , ToastAndroid.SHORT);
        }
      };

      const gotoGuardar = async () => {
        try {
          const response = await checklistaplicarCtrl.crearChecklistaplicar(Id, fecha, observacion.current , cumple.current);
          navigation.goBack();                
        } catch (error) {
            ToastAndroid.show( "Error = " + error , ToastAndroid.LONG);
        }
      };

    const cargarCumple = async () => {

        const array = [];

        await evaluar?.forEach(element => {            
            element.arrversubitem?.forEach(element2 => {
               array.push({ idsubitem : element2.id, valor: "N/A"});                       
                });
        });
        cumple.current = array;

    }

    const cambiarCumple = (v, Idsubitem) => {
        
        const array = cumple.current.map(element => {
            if(element.idsubitem == Idsubitem){
                return { idsubitem:Idsubitem, valor:v };          
            }else{
                return { idsubitem:element.idsubitem, valor:element.valor };
            }
        });
        cumple.current = array;
        
    }

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
                                                    <Picker key={"picker"+index1+index2}
                                                            selectedValue={"N/A"}
                                                            onValueChange={(v) => {cambiarCumple(v,item2.id);} }
                                                            >
                                                            <Item key={"itemsi"+index1+index2} label="SI" value="SI" />    
                                                            <Item key={"itemno"+index1+index2} label="NO" value="NO" />
                                                            <Item key={"itemna"+index1+index2} label="N/A" value="N/A" />
                                                    </Picker>
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
        <Text style={styles.titulo}>{nombrever}</Text>
        <View key={"viewprin"}>
                <View key={"viewprinh"} style={styles.table_head}>
                    <View key={"viewprinvn"} style={{width:"25%"}}>
                        <Text key={"viewprinvnombre"}>Nombre Inspector</Text>
                    </View>
                    <View key={"viewprinvnom"} style={{width:"30%"}}>
                        <Text key={"viewprinvnombrei"}>{user.usuario ? `${user.usuario}` : 'sin nombre'}</Text>
                    </View>
                    <View key={"viewprinf"} style={{width:"20%"}}>
                        <Text key={"viewprinfecha"}>{fecha ? fecha : "fecha"}</Text>
                    </View>
                    <View key={"viewprinfv"} style={{width:"25%"}}>
                        <Text key={"viewprinfechasel"}> 
                        { !fecha ? <><Button
                            style={styles.btnFecha}
                            onPress={setear}
                            >
                            Seleccionar Fecha
                            </Button> 
                            { show ?       
                            <DateTimePicker
                                value={ new Date() }
                                onChange={obtenerDatos}
                                mode="date"
                                /> : ""} </>
                            : "" 
                            }                                                
                        </Text>
                    </View>
                </View>
            </View>
        {
            fecha ? 
                <>
                    <EscribirEvaluacion evaluacion={evaluar} />
                    <TextInput
                        label="Observaciones"
                        style={styles.input}
                        onChangeText={cambiarObs}
                        value={observacion}
                        />
                    <Button mode="contained" onPress={() => gotoGuardar()} style={styles.btn}>
                                Guardar Evaluacion
                    </Button>
                </>    
            : ""
        }
        

    </Layout.Basic>
  )
}
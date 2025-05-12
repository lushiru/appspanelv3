import { View, Text, ToastAndroid } from 'react-native'
import { useState } from 'react'
import { TextInput, Button } from "react-native-paper";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useNavigation } from "@react-navigation/native";
import { mejorasplanCtrl } from '../../../api';
import { styles } from "./MejorasPlanTarjeta.styles"
import { screensName } from '../../../utils';

export function MejorasPlanTarjeta({item, index, getPlanmejora}) {

    const [ observacion, setObservacion ] = useState("");

    const navigation = useNavigation();

    const gotoEditar = (idp) => {

        navigation.navigate(screensName.homeplan.mejorasPlanEditar, { id: idp });

    }

    const obtenerEstado = (estado) => {
        if(estado == 1){return 0;}
        if(estado == 2){return 1;}
        if(estado == 3){return 2;} 
    }



    const cambiarEstado = async (estado,idp) => {

        if(estado=="Pendiente"){ estado=1; }
        else if(estado=="En Desarrollo"){ estado=2; }
        else if(estado=="Realizado"){ estado=3; }

        try {
            const response = await mejorasplanCtrl.updateMejoraplanEstado(idp,estado);
            getPlanmejora();
        } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }
    }

    const gotoObservacion = async (idp) => {
        try {
        const response = await mejorasplanCtrl.crearMejoraPlanObservacion(idp,observacion);
        getPlanmejora();
        } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }    
    }


  return (
    
                <View key={"v"+index} style={styles.tarjeta}>
                        <View key={"vv01"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Plan de Acción :</Text><Text style={styles.texto}>{item.plandeaccion}</Text></View>
                        <View key={"vv02"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Indicador de Logro :</Text><Text style={styles.texto}>{item.indicador}</Text></View>
                        <View key={"vv03"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Indice Actual :</Text><Text style={styles.texto}>{item.indiceactual}</Text></View>
                        <View key={"vv04"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Meta :</Text><Text style={styles.texto}>{item.meta}</Text></View>
                        <View key={"vv05"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Verificador :</Text><Text style={styles.texto}>{item.verificador}</Text></View>
                        <View key={"vv06"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Recursos :</Text><Text style={styles.texto}>{item.recursos}</Text></View>
                        <View key={"vv07"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Responsable :</Text><Text style={styles.texto}>{item.responsable}</Text></View>
                        <View key={"vv08"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha Inicial :</Text><Text style={styles.texto}>{item.fecha}</Text></View>
                        <View key={"vv09"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha Final :</Text><Text style={styles.texto}>{item.fecha2}</Text></View>
                        <View key={"vv10"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Fecha Creación :</Text><Text style={styles.texto}>{item.fechacreacion}</Text></View>
                        <View key={"vv11"+index} style={styles.textcolumn}>
                            <Button
                                mode="contained"
                                style={styles.btnSubmit}
                                onPress={()=>{gotoEditar(item.id)}}                                      
                            >
                                Editar
                            </Button>
                        </View>
                        <View key={"vv12"+index}>
                            <SegmentedControl
                                values={['Pendiente', 'En Desarrollo', 'Realizado']}
                                tintColor="#00ff00"
                                onValueChange={(text) => {cambiarEstado(text, item.id)}}
                                backgroundColor="#0000ff"
                                selectedIndex={obtenerEstado(item.estado)}
                                /> 
                        </View>
                        <View key={"vv13"+index}>
                            <TextInput
                                label="Ingresar Observacion"
                                style={styles.input}
                                onChangeText={(text) => setObservacion(text)}
                                value={observacion}                                
                            />
                            <Button
                                mode="contained"
                                style={styles.btnSubmit}
                                onPress={()=> { gotoObservacion(item.id)} }                                      
                            >
                                Ingresar Observacion
                            </Button>
                        </View>
                        <View key={"vv14"+index}>
                            {
                                item.arrobs ?
                                    <View key={"vvv14"+index}><Text style={styles.titulo2}>Observaciones :</Text>
                                    {    
                                    item.arrobs.map((it,index2) => (
                                        <Text key={"vv14"+index+"t"+index2}>{it.observacion}</Text>
                                    ))
                                    }
                                    </View>

                                : <Text>no hay resultados</Text>
                            }
                        </View>
                    </View>

  )
}
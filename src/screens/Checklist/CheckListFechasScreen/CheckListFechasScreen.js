import { View, Text } from 'react-native'
import { useState, useEffect } from "react";
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { Layout } from "../../../layouts";
import { screensName } from "../../../utils";
import { checklistaplicarCtrl } from "../../../api";
import { styles } from "./CheckListFechasScreen.styles";


export function CheckListFechasScreen() {

    const [ personas, setPersonas ] = useState(null);
    const [ proceso, setProceso ] = useState(null);
    const [ producto, setProducto ] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        getFechas();                     
    }, []);

  const getFechas = async () => {
          try {
            const response = await checklistaplicarCtrl.verCheckfecha();
            setPersonas(response.arrverpresonas); 
            setProceso(response.arrverproceso);
            setProducto(response.arrverproducto);
                  
          } catch (error) {
              ToastAndroid.show( "error =" + error , ToastAndroid.SHORT);
          }
        }; 
        
  const gotoVer = (id,idfechas,nombretext) => {
    navigation.navigate(screensName.homeplan.checklistaplicarMostrar, {id,idfechas,nombretext});
  }      

  return (
    <Layout.Basic>
      <Text style={styles.titulo}>Personas</Text>
      {
        personas ? 
          <View>
            <View style={styles.table_head}>
                <View style={{width:"60%"}}>
                    <Text>Verificación Realizada</Text>
                </View>
                <View style={{width:"20%"}}>
                    <Text>Fecha</Text>
                </View>
                <View style={{width:"20%"}}>
                    <Text>Acción</Text>
                </View>
            </View>    
            {
                personas.map((item,index) => (
                    <View key={"viewp"+index} style={styles.table_tar}>
                        <View key={"vpnombre"+index} style={{width:"60%"}}>
                            <Text key={"pnombre"+index}>{item.nombre}</Text>
                        </View>
                        <View key={"vpfecha"+index} style={{width:"20%"}}>
                            <Text key={"pfecha"+index}>{item.fecha}</Text>
                        </View>
                        <View key={"vpaccion"+index} style={{width:"20%"}}>
                            <Text key={"paccion"+index}>
                                <Button mode="contained" onPress={() => gotoVer(item.idverificacion,item.id,item.nombre) } style={styles.btn}>Ver</Button>
                            </Text>
                        </View>
                    </View>       
                ))
            }
          </View>    
        : <Text>No hay registros</Text>
      } 
      <Text style={styles.titulo}>Proceso</Text>
      {
        proceso ? 
          <View>
            <View style={styles.table_head}>
                <View style={{width:"60%"}}>
                    <Text>Verificación Realizada</Text>
                </View>
                <View style={{width:"20%"}}>
                    <Text>Fecha</Text>
                </View>
                <View style={{width:"20%"}}>
                    <Text>Acción</Text>
                </View>
            </View>    
            {
                proceso.map((item,index) => (
                    <View key={"viewp"+index} style={styles.table_tar}>
                        <View key={"vpnombre"+index} style={{width:"60%"}}>
                            <Text key={"pnombre"+index}>{item.nombre}</Text>
                        </View>
                        <View key={"vpfecha"+index} style={{width:"20%"}}>
                            <Text key={"pfecha"+index}>{item.fecha}</Text>
                        </View>
                        <View key={"vpaccion"+index} style={{width:"20%"}}>
                            <Text key={"paccion"+index}>
                                <Button mode="contained" onPress={() => gotoVer(item.idverificacion,item.id,item.nombre) } style={styles.btn}>Ver</Button>
                            </Text>
                        </View>
                    </View>       
                ))
            }
          </View>    
        : <Text>No hay registros</Text>
      } 
      <Text style={styles.titulo}>Producto</Text>
      {
        producto ? 
          <View>
            <View style={styles.table_head}>
                <View style={{width:"60%"}}>
                    <Text>Verificación Realizada</Text>
                </View>
                <View style={{width:"20%"}}>
                    <Text>Fecha</Text>
                </View>
                <View style={{width:"20%"}}>
                    <Text>Acción</Text>
                </View>
            </View>    
            {
                producto.map((item,index) => (
                    <View key={"viewp"+index} style={styles.table_tar}>
                        <View key={"vpnombre"+index} style={{width:"60%"}}>
                            <Text key={"pnombre"+index}>{item.nombre}</Text>
                        </View>
                        <View key={"vpfecha"+index} style={{width:"20%"}}>
                            <Text key={"pfecha"+index}>{item.fecha}</Text>
                        </View>
                        <View key={"vpaccion"+index} style={{width:"20%"}}>
                            <Text key={"paccion"+index}>
                                <Button mode="contained" onPress={() => gotoVer(item.idverificacion,item.id,item.nombre) } style={styles.btn}>Ver</Button>
                            </Text>
                        </View>
                    </View>       
                ))
            }
          </View>    
        : <Text>No hay registros</Text>
      }
    </Layout.Basic>
  )
}
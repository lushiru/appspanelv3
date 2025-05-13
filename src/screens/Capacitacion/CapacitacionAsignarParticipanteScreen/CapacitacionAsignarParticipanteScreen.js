import { useState, useEffect } from 'react';
import { View, Text, ToastAndroid } from 'react-native'
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Layout } from "../../../layouts";
import { useFormik } from "formik";
import { Picker } from '@react-native-picker/picker';
import { capacitacionasignarparticipanteCtrl } from "../../../api";
import { initialValues, validationSchema } from "./CapacitacionAsignarParticipanteScreen.form";
import { styles } from "./CapacitacionAsignarParticipanteScreen.styles";

const Item = Picker.Item;

export function CapacitacionAsignarParticipanteScreen(props) {

  const {
        route: { params },
      } = props;

  const id = params?.id;
  const nombre = params?.nombre;

  const navigation = useNavigation();

      const [show, setShow] = useState(false);
      const [fechaver, setFechaver] = useState(null);
      const [ colaboradores, setColaboradores ] = useState(null);
      const [ nombrecol, setNombrecol ] = useState(null);

      useEffect(() => {            
                getColaboradores();
             }, []);

      
      const getColaboradores = async () => {

        try {
            const response = await capacitacionasignarparticipanteCtrl.verParticipantes();
            setColaboradores(response.arrpers);
        } catch (error) {
            ToastAndroid.show( "Error participantes" + error , ToastAndroid.SHORT);
        }       

      }
      
      const setear = () => {
        setShow(true);
      }

      const setearNombre = (val) => {

        colaboradores.forEach(element => {
            if(element.id == val){setNombrecol(element.nombres+" "+element.apellidos1+" "+element.apellidos2);} 
        });
      }

      const obtenerDatos = ({type},selectedDate) => {
        formik.setFieldValue("fecha", selectedDate); 
        setShow(false);
        const mes = selectedDate.getMonth()+1;
        setFechaver(selectedDate.getDate()+"-"+mes+"-"+selectedDate.getFullYear());
      }    

  
      const formik = useFormik({
          initialValues: initialValues(),
          validationSchema: validationSchema(),
          validateOnChange: false,
          onSubmit: async (formValue) => {
            const { fecha,idtrabajador } = formValue;
            try {
              await capacitacionasignarparticipanteCtrl.asignarParticipante(id,fecha,nombrecol,idtrabajador);
              navigation.goBack();
            } catch (error) {
              ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
            }
          },
        });


  return (
    <Layout.Basic>
      <Text style={styles.titulo}>{nombre}</Text>

      { colaboradores ?  

      <View style={styles.container}>
        <Text style={styles.fecha}>Fecha: {fechaver ? fechaver : ""}</Text>
        <Button
          style={styles.btnFecha}
          onPress={setear}
        >
           Seleccionar Fecha
        </Button> 
        { show ?       
        <DateTimePicker
            value={ new Date() }
            onChange={obtenerDatos}
            display="default"
            mode="date"
            /> : ""} 

        <Picker
            selectedValue={""}
            onValueChange={(v) => { formik.setFieldValue("idtrabajador", v); setearNombre(v); }}
            >
            <Item key={"par0"} label="Seleccione Participante" value="" enabled={false} />  
            {
                colaboradores.map((it, index) => (
                    <Item key={"par0"+index} label={it.nombres+" "+it.apellidos1+" "+it.apellidos2 } value={it.id} />
                ))
            }                
        </Picker>    

        <Button
          mode="contained"
          style={styles.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
           Asignar Participante
        </Button>
      </View>

      : "" }      

    </Layout.Basic>
  )
}
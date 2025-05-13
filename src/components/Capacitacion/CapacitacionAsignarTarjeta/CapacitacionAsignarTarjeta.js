import { View, Text, ToastAndroid } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { capacitacionasignarevaluacionCtrl } from '../../../api';
import { styles } from "./CapacitacionAsignarTarjeta.styles";

const Item = Picker.Item;

export function CapacitacionAsignarTarjeta({item, index, verificacion, getAsignar}) {

    const cambiarVerificacion = async (ver) => {

        try {
            
            await capacitacionasignarevaluacionCtrl.updateCapacitacionLista(item.id, ver);
            getAsignar();

        } catch (error) {
            ToastAndroid.show( "Error " + error , ToastAndroid.SHORT);
        }

    }

  return (
    <View key={"v"+index} style={styles.tarjeta}>
            <View key={"vv01"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Contenido :</Text><Text style={styles.texto}>{item.contenido}</Text></View>
            <View key={"vv02"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Estrategia :</Text><Text style={styles.texto}>{item.estrategia}</Text></View>
            <View key={"vv03"+index} style={styles.textcolumn}><Text style={styles.titulo2}>Tiempo :</Text><Text style={styles.texto}>{item.tiempo}</Text></View>
            <Picker
                selectedValue={item.id_verificacion}
                onValueChange={(v) => { cambiarVerificacion(v); }}
                >
                <Item key={"ver0"+index} label="" value="0" />  
                {
                    verificacion.map((it, index2) => (
                        <Item key={"ver0"+index+index2} label={it.nombre} value={it.id} />
                    ))
                }                
            </Picker>
    </View>                        
  )
}
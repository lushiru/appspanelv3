import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { Menu } from "./MenuPlan.data";
import { styles } from "./MenuPlan.styles";

export function MenuPlan() {
  const navigation = useNavigation();
 
  return (
    <>
      <List.Section>
        <List.Subheader>Opciones</List.Subheader>
        {map(Menu, (item, index) => (
          <List.Item
            key={index}
            title={item.title}
            titleStyle={styles.titleItem}
            onPress={() => navigation.navigate(item.screen)}
          />
        ))}
      </List.Section>
      
    </>
  );
}
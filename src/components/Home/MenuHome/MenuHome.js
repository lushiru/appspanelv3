import { List } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { Menu } from "./MenuHome.data";
import { styles } from "./MenuHome.styles";

export function MenuHome() {
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
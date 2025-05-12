import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titulo: {
    fontWeight:900,
    margin: 10,
    fontSize: 20
  },  
  btn: {
    backgroundColor: "#254ffd",
    borderRadius: 10,
    margin: 0,
  },

  table_head: {
    flexDirection: "row",
    backgroundColor: "#3bcd6b",
    padding: 10,
    borderWidth: 1,    
  },
  table_sub: {
    flexDirection: "row",
    backgroundColor: "#71d9ee",
    padding: 5,
    
  },
  table_tar: {
    flexDirection: "row",
    borderColor: "#1f2020",
    borderWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  
});
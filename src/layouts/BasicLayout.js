import {
    StatusBar as StatusBarRN,
    ScrollView,
    SafeAreaView,
  } from "react-native";
  import * as ScreenOrientation from 'expo-screen-orientation';
  
  export function BasicLayout(props) {
    const { children } = props;

    ScreenOrientation.unlockAsync();
  
    return (
      <>
        <StatusBarRN backgroundColor="#5ac343" />
        <SafeAreaView />
        <ScrollView>{children}</ScrollView>
      </>
    );
  }
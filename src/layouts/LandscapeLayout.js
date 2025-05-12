import {
    StatusBar as StatusBarRN,
    ScrollView,
    SafeAreaView,
  } from "react-native";
  import * as ScreenOrientation from 'expo-screen-orientation';
  
  export function LandscapeLayout(props) {
    
    const { children } = props;
    ScreenOrientation.unlockAsync();
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

    return (
      <>
        <StatusBarRN backgroundColor="#5ac343" />
        <SafeAreaView />
        <ScrollView>{children}</ScrollView>
      </>
    );
  }
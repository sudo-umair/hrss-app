import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Navigator from "./navigators/Navigator";
import registerNNPushToken from "native-notify";
import { GLOBALS } from "./utilities/constants/config";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const { appId, appToken } = GLOBALS;
  registerNNPushToken(appId, appToken);

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <Navigator />
      </SafeAreaView>
      <FlashMessage
        hideOnPress={true}
        duration={2500}
        animated={true}
        position="top"
        style={{ zIndex: 100, paddingTop: 35 }}
      />
    </Provider>
  );
}

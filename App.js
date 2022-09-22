import "react-native-gesture-handler";
import React from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Navigator from "./navigators/Navigator";
import registerNNPushToken from "native-notify";
import { GLOBALS } from "./utilities/constants/config";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { appId, appToken } = GLOBALS;
  registerNNPushToken(appId, appToken);

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <Navigator />
      </Provider>
      <StatusBar style="dark" />
      <FlashMessage
        hideOnPress={true}
        duration={2000}
        animated={true}
        position="top"
        style={{ zIndex: 100, paddingTop: "10%" }}
      />
    </View>
  );
}

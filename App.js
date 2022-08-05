import "react-native-gesture-handler";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Navigator from "./navigators/Navigator";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigator />
      </SafeAreaView>
    </Provider>
  );
}

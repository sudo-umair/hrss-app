import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabIcon from "./components/UI/Icon";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import React, { useEffect, useLayoutEffect, useState } from "react";
import LandingScreen from "./screens/LandingScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeSreen from "./screens/HomeScreen";
import Notifications from "./screens/Notifications";
import Icon from "./components/UI/Icon";
import { checkCredentials } from "./utils/auth";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
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

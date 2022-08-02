import "react-native-gesture-handler";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import TabIcon from "./components/UI/TabIcon";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Platform } from "react-native";
import LandingScreen from "./screens/LandingScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const platform = Platform.OS;

const Authentication = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="log-in" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Signup"
        component={Signup}
        options={{
          tabBarLabel: "Signup",
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="ios-person-add-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppOnFirstLaunch = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="Authentication" component={Authentication} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AppOnFirstLaunch" component={AppOnFirstLaunch} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor="black" />
    </SafeAreaView>
  );
}

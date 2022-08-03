import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabIcon from "./components/UI/TabIcon";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import LandingScreen from "./screens/LandingScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./screens/Home";
import { checkCredentials } from "./utils/utilities";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const platform = Platform.OS;

const AuthenticationTabs = () => {
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
      <Stack.Screen name="Authentication" component={AuthenticationTabs} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            checkCredentials() === true ? "Home" : "LandingScreen"
          }
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="AppOnFirstLaunch" component={AppOnFirstLaunch} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" backgroundColor="black" />
    </SafeAreaView>
  );
}

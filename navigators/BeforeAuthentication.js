import React from "react";
import LandingScreen from "../screens/LandingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import AuthenticationTabs from "./AuthenticationTabs";

export default function BeforeAuthentication() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Authentication" component={AuthenticationTabs} />
    </Stack.Navigator>
  );
}

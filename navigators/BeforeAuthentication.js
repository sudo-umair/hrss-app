import React from "react";
import LandingScreen from "../screens/LandingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Authentication from "./Authentication";

export default function BeforeAuthentication() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{}}
      />
      <Stack.Screen name="Authentication" component={Authentication} />
    </Stack.Navigator>
  );
}

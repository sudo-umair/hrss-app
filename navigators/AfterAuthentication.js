import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeSreen from "../screens/HomeScreen";
import LogoutScreen from "../screens/LogoutScreen";
import NotificationsScreen from "../screens/NotificationsScreen";

export default function AfterAuthentication() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeSreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
}

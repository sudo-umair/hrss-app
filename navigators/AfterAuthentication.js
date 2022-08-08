import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import HomeSreen from "../screens/HomeScreen";
import LogoutScreen from "../screens/LogoutScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import RequestResourceScreen from "../screens/RequestResourceScreen";

export default function AfterAuthentication() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="HomeScreen" component={HomeSreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Group name="Resources">
        <Stack.Screen name="Resources" component={ResourcesScreen} />
        <Stack.Screen
          name="RequestResource"
          component={RequestResourceScreen}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Group>
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
}

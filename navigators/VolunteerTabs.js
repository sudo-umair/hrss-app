import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeedScreen from "../screens/Volunteers/FeedScreen";

const Tab = createMaterialTopTabNavigator();

export default function VolunteerTabs({ navigation, route }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        options={{
          tabBarLabel: "Feed",
        }}
        component={FeedScreen}
        initialParams={{
          screen: "VolunteerRequests",
        }}
      />
      <Tab.Screen
        name="MyRequests"
        options={{
          tabBarLabel: "My Requests",
        }}
        component={FeedScreen}
        initialParams={{
          screen: "MyRequests",
        }}
      />
    </Tab.Navigator>
  );
}

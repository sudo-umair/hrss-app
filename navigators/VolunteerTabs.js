import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import VolunteersRequestsScreen from "../screens/Volunteers/VolunteersRequestsScreen";
import MyVolunteerRequestsScreen from "../screens/Volunteers/MyVolunteerRequestsScreen";

const Tab = createMaterialTopTabNavigator();

export default function VolunteerTabs({ navigation, route }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        options={{
          tabBarLabel: "Feed",
        }}
        component={VolunteersRequestsScreen}
        initialParams={{
          filterType: "all",
        }}
      />
      <Tab.Screen
        name="MyRequests"
        options={{
          tabBarLabel: "My Requests",
        }}
        component={MyVolunteerRequestsScreen}
        initialParams={{
          filterType: "myRequests",
        }}
      />
    </Tab.Navigator>
  );
}

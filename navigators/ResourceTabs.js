import React, { useLayoutEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeedScreen from "../screens/Resources/FeedScreen";

const Tab = createMaterialTopTabNavigator();

export default function ResourceTabs({ navigation, route }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        options={{
          tabBarLabel: "Feed",
        }}
        component={FeedScreen}
        initialParams={{
          filterType: "all",
        }}
      />
      <Tab.Screen
        name="My Requests"
        options={{
          tabBarLabel: "My Requests",
        }}
        component={FeedScreen}
        initialParams={{
          filterType: "myRequests",
        }}
      />
      <Tab.Screen
        name="ApprovedRequests"
        options={{
          tabBarLabel: "Approved By Me",
        }}
        component={FeedScreen}
        initialParams={{
          filterType: "approved",
        }}
      />
    </Tab.Navigator>
  );
}

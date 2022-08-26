import React, { useLayoutEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeedScreen from "../screens/Resources/FeedScreen";

const Tab = createMaterialTopTabNavigator();

export default function ResourcesTabs({ navigation, route }) {
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
        name="MyRequests"
        options={{
          tabBarLabel: "MyRequests",
        }}
        component={FeedScreen}
        initialParams={{
          filterType: "myRequests",
        }}
      />
      <Tab.Screen
        name="ApprovedRequests"
        options={{
          tabBarLabel: "Approved",
        }}
        component={FeedScreen}
        initialParams={{
          filterType: "approved",
        }}
      />
    </Tab.Navigator>
  );
}

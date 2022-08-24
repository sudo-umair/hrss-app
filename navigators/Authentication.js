import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../components/UI/Icon";
import SigninScreen from "../screens/User/SigninScreen";
import SignupScreen from "../screens/User/SignupScreen";

export default function Authentication() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Signin"
        component={SigninScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon mode="tb" name="log-in" color={color} size={size} />
          ),
          headerTitle: "Sign In",
        }}
      />
      <Tab.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon
              mode="tb"
              name="ios-person-add-outline"
              color={color}
              size={size}
            />
          ),
          headerTitle: "Sign Up",
        }}
      />
    </Tab.Navigator>
  );
}

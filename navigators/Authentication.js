import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "../components/UI/Icon";
import SigninScreen from "../screens/User/SigninScreen";
import SignupScreen from "../screens/User/SignupScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { GlobalStyles as gs } from "../utilities/constants/styles";

export default function Authentication() {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={styles.rootContainer}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: gs.colors.background,
  },
});

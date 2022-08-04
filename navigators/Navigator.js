import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AfterAuthentication from "./AfterAuthentication";
import BeforeAuthentication from "./BeforeAuthentication";
import { useSelector, useDispatch } from "react-redux";
import { checkCredentials } from "../utils/auth";

export default function Navigator() {
  const Stack = createStackNavigator();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen
            name="AfterAuthentication"
            component={AfterAuthentication}
          />
        ) : (
          <Stack.Screen
            name="BeforeAuthentication"
            component={BeforeAuthentication}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

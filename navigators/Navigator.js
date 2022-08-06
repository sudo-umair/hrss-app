import React, { useLayoutEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AfterAuthentication from "./AfterAuthentication";
import BeforeAuthentication from "./BeforeAuthentication";
import { useSelector, useDispatch } from "react-redux";
import { checkCredentials } from "../utils/auth";
import { setIsLoggedIn } from "../store/user";

export default function Navigator() {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useLayoutEffect(() => {
    const check = async () => {
      const res = await checkCredentials();
      if (res) {
        dispatch(setIsLoggedIn(true));
      }
    };

    check();
  }, [dispatch]);

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

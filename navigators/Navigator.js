import React, { useLayoutEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AfterAuthentication from "./AfterAuthentication";
import BeforeAuthentication from "./BeforeAuthentication";
import { useSelector, useDispatch } from "react-redux";
import { checkCredentials } from "../utilities/routes/user";
import {
  setUser,
  setIsConnected,
  setIsLoading,
  setIsLoggedIn,
} from "../store/user";
import { checkForConnectionOnce } from "../utilities/helpers/intenet-connection";
import LoadingScreen from "../screens/LoadingScreen";
import NoConnectionScreen from "../screens/NoConnectionScreen";
import ServerDownScreen from "../screens/ServerDownScreen";

export default function Navigator() {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.user.isLoading);
  const isConnected = useSelector((state) => state.user.isConnected);

  const checkForInternetConnection = async () => {
    if (await checkForConnectionOnce()) {
      dispatch(setIsConnected(true));
    }
  };

  const checkForCredentialsInLocalStorage = async () => {
    const res = await checkCredentials();
    if (res.status) {
      dispatch(setUser(res?.user));
      dispatch(setIsLoggedIn(true));
    }
    dispatch(setIsLoading(false));
  };

  useLayoutEffect(() => {
    checkForInternetConnection();
    checkForCredentialsInLocalStorage();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : isConnected ? (
          isLoggedIn ? (
            <Stack.Screen
              name="AfterAuthentication"
              component={AfterAuthentication}
            />
          ) : (
            <Stack.Screen
              name="BeforeAuthentication"
              component={BeforeAuthentication}
            />
          )
        ) : (
          <Stack.Screen name="NoConnection" component={NoConnectionScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

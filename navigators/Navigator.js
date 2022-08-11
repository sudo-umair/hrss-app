import React, { useLayoutEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AfterAuthentication from "./AfterAuthentication";
import BeforeAuthentication from "./BeforeAuthentication";
import { useSelector, useDispatch } from "react-redux";
import { checkCredentials } from "../utils/auth";
import { setIsLoggedIn, setUser } from "../store/user";
import { checkForConnectionOnce } from "../utils/intenet-connection";
import LoadingScreen from "../screens/LoadingScreen";
import NoConnectionScreen from "../screens/NoConnectionScreen";

export default function Navigator() {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const checkForInternetConnection = async () => {
    const res = await checkForConnectionOnce();
    if (res) {
      setIsConnected(true);
    }
  };

  const checkForCredentialsInLocalStorage = async () => {
    const response = await checkCredentials();
    if (response.status === true) {
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(response.user));
    }
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    checkForInternetConnection();
    if (isConnected) {
      checkForCredentialsInLocalStorage();
    }
  }),
    [isConnected];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isConnected) {
    return <NoConnectionScreen />;
  }

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

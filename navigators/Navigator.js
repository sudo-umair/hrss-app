import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AfterAuthentication from "./AfterAuthentication";
import BeforeAuthentication from "./BeforeAuthentication";
import { useSelector, useDispatch } from "react-redux";
import { checkCredentials } from "../utilities/routes/user";
import { setUser, setIsConnected, setIsLoading } from "../store/user";
import { checkForConnectionOnce } from "../utilities/helpers/intenet-connection";
import LoadingScreen from "../screens/LoadingScreen";
import NoConnectionScreen from "../screens/NoConnectionScreen";

export default function Navigator() {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { isLoggedIn, isConnected, isLoading } = user;

  const checkForInternetConnection = async () => {
    const status = await checkForConnectionOnce();
    if (status) {
      dispatch(setIsConnected(true));
    }
    console.log("connected", status);
  };

  const checkForCredentialsInLocalStorage = async () => {
    const res = await checkCredentials();
    if (res.status) {
      dispatch(setUser(res?.user));
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
        id="navigator"
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
          <Stack.Screen
            name="NoConnection"
            options={{
              presentation: "modal",
            }}
            component={NoConnectionScreen}
            initialParams={{
              checkForInternetConnection,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

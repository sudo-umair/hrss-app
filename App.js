import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabIcon from "./components/UI/Icon";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import React, { useEffect, useLayoutEffect, useState } from "react";
import LandingScreen from "./screens/LandingScreen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeSreen from "./screens/HomeScreen";
import Notifications from "./screens/Notifications";
import Icon from "./components/UI/Icon";
import useUserStore from "./store/userStore";
import { checkCredentials } from "./utils/utilities";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const AuthenticationTabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabIcon mode="tb" name="log-in" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Signup"
          component={Signup}
          options={{
            tabBarLabel: "Signup",
            tabBarIcon: ({ color, size }) => (
              <Icon
                mode="tb"
                name="ios-person-add-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const BeforeAuthentication = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="Authentication" component={AuthenticationTabs} />
      </Stack.Navigator>
    );
  };

  const AfterAuthentication = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeSreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    );
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    async function check() {
      // await checkCredentials();
      const user = await checkCredentials();
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
    check();
  }, []);
  const Navigation = () => {
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
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigation />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

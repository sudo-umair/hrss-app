import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "./screens/LandingScreen";
import Login from "./screens/Login";
import Signup from "./screens/Signup";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserBefAuthTabs = () => {
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
            <Ionicons name="ios-log-in-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Signup"
        component={Signup}
        options={{
          tabBarLabel: "Signup",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person-add-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// const UserAftAuthTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarHideOnKeyboard: true,
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="ios-home-outline" color={color} size={size} />
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="ios-person-outline" color={color} size={size} />
//           ),
//           headerShown: false,
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="USER_AUTH"
          component={UserBefAuthTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LANDING_SCREEN"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

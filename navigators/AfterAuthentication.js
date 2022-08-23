import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeSreen from "../screens/HomeScreen";
import SignoutScreen from "../screens/SignoutScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ResourcesScreen from "../screens/ResourcesScreen";
import NoConnectionScreen from "../screens/NoConnectionScreen";
import AccountScreen from "../screens/AccountScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import DonationsScreen from "../screens/DonationsScreen";
import ResourceRequestScreen from "../screens/ResourceRequestScreen";
import DonationDetailsScreen from "../screens/DonationDetailsScreen";
import ResourceRequestsByUserScreen from "../screens/ResourceRequestsByUserScreen";
import ResourceRequestDetailsScreen from "../screens/ResourceRequestDetailsScreen";

export default function AfterAuthentication() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="HomeScreen" component={HomeSreen} />
      <Stack.Screen name="NoInternet" component={NoConnectionScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Group name="Resources">
        <Stack.Screen name="Resources" component={ResourcesScreen} />
        <Stack.Screen
          name="RequestResource"
          component={ResourceRequestScreen}
          // options={{
          //   presentation: "modal",
          // }}
        />
        <Stack.Screen
          name="UserRequests"
          component={ResourceRequestsByUserScreen}
        />
        <Stack.Screen
          name="ResourceRequestDetails"
          component={ResourceRequestDetailsScreen}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Group>
      <Stack.Group name="Donations">
        <Stack.Screen name="Donations" component={DonationsScreen} />
        <Stack.Screen
          name="DonationDetails"
          component={DonationDetailsScreen}
          options={{
            presentation: "modal",
          }}
        />
      </Stack.Group>
      <Stack.Screen name="Signout" component={SignoutScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

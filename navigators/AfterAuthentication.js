import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeSreen from "../screens/HomeScreen";
import SignoutScreen from "../screens/User/SignoutScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import NoConnectionScreen from "../screens/NoConnectionScreen";
import AccountScreen from "../screens/User/AccountScreen";
import DeleteAccountScreen from "../screens/User/DeleteAccountScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import DonationsScreen from "../screens/Donation/DonationsScreen";
import DonationDetailsScreen from "../screens/Donation/DonationDetailsScreen";
import ResourcesScreen from "../screens/Resources/ResourcesScreen";
import ResourceRequestScreen from "../screens/Resources/ResourceRequestScreen";
import RequestDetailsScreen from "../screens/Resources/RequestDetailsScreen";
import ResourceTabs from "./ResourceTabs";

export default function AfterAuthentication() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen name="HomeScreen" component={HomeSreen} />
      <Stack.Screen name="NoInternet" component={NoConnectionScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
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
      <Stack.Screen name="Resources" component={ResourcesScreen} />
      <Stack.Screen
        name="RequestResource"
        options={{
          presentation: "modal",
        }}
        component={ResourceRequestScreen}
      />
      <Stack.Screen name="ResourceTabs" component={ResourceTabs} />
      <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
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

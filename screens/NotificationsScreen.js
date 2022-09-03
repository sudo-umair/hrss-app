import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { getIndieNotificationInbox } from "native-notify";
import { useSelector } from "react-redux";
import { GLOBALS } from "../utilities/constants/config";
import RenderItem from "../components/Notifications/RenderItem";
import NoNotifications from "../components/Notifications/NoNotifications";
import Loader from "../components/UI/Loader";

export default function NotificationsScreen({ navigation, route }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user);
  const { email } = user;

  const { appId, appToken } = GLOBALS;

  const getNotificationInbox = async () => {
    const inbox = await getIndieNotificationInbox(email, appId, appToken);
    setNotifications(inbox);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    getNotificationInbox();
    console.log("notifications", notifications);

    return () => {
      setNotifications([]);
    };
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>
        Your notifications for resource requests and volunteer applications will
        be displayed here.
      </Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.notification_id}
        renderItem={({ item }) => (
          <RenderItem setNotifications={setNotifications} item={item} />
        )}
        ListEmptyComponent={isLoading ? Loader : NoNotifications}
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 14,
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: "center",
  },
  subtitle: {},
  contentContainer: {
    marginTop: 10,
  },
  content: {},
});

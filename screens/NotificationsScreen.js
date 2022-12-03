import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { getIndieNotificationInbox } from 'native-notify';
import { useSelector } from 'react-redux';
import { GLOBALS } from '../utilities/constants/config';
import RenderItem from '../components/Notifications/RenderItem';
import NoNotifications from '../components/Notifications/NoNotifications';

export default function NotificationsScreen({ navigation, route }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const { email } = user;

  const { appId, appToken } = GLOBALS;

  const getNotificationInbox = async () => {
    setIsLoading(true);
    const inbox = await getIndieNotificationInbox(email, appId, appToken);
    setNotifications(inbox);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    getNotificationInbox();
    console.log('notifications', notifications);

    return () => {
      setNotifications([]);
    };
  }, []);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.notification_id}
        renderItem={({ item }) => (
          <RenderItem setNotifications={setNotifications} item={item} />
        )}
        onRefresh={getNotificationInbox}
        refreshing={isLoading}
        ListEmptyComponent={!isLoading && <NoNotifications />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 14,
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  subtitle: {},
  contentContainer: {},
  content: {},
});

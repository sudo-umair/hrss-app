import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from '../UI/Icon';
import { deleteIndieNotificationInbox } from 'native-notify';
import { GLOBALS } from '../../utilities/constants/config';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { add5Hours } from '../../utilities/helpers/date-time';
import * as Haptics from 'expo-haptics';

const RenderItem = React.memo(({ item, onPress, setNotifications }) => {
  const user = useSelector((state) => state.user);
  const { email } = user;

  const { appId, appToken } = GLOBALS;

  const deleteNotification = async (notification_id) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const notifications = await deleteIndieNotificationInbox(
      email,
      notification_id,
      appId,
      appToken
    );
    setNotifications(notifications);
    showMessage({
      message: 'Notification deleted',
      type: 'success',
      icon: 'success',
    });
  };

  console.log('item', item);

  return (
    <View style={styles.notificationContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Icon
          onPress={() => {
            deleteNotification(item.notification_id);
          }}
          lib='m'
          name='clear'
          color={'red'}
          size={20}
        />
      </View>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>
        {add5Hours(item.date_sent ?? item.date)}
      </Text>
    </View>
  );
});

export default RenderItem;

const styles = StyleSheet.create({
  notificationContainer: {
    marginHorizontal: '2%',
    marginBottom: '2%',
    padding: '2%',
    // paddingVertical: '3%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '90%',
  },
  notificationMessage: {
    marginRight: '5%',
    fontSize: 12,
  },
  notificationDate: {
    marginRight: '2%',
    fontSize: 12,
    textAlign: 'right',
  },
});

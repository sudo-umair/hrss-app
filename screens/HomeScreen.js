import { View, StyleSheet } from 'react-native';
import {
  getUnreadIndieNotificationInboxCount,
  getPushDataObject,
} from 'native-notify';
import React, { useLayoutEffect, useEffect, useState } from 'react';
import TopDisplay from '../components/HomeScreen/TopDisplay';
import BottomDisplay from '../components/HomeScreen/BottomDisplay';
import { GlobalStyles as gs } from '../utilities/constants/styles';
import Icon from '../components/UI/Icon';
import { useSelector } from 'react-redux';
import { GLOBALS } from '../utilities/constants/config';
import * as Haptics from 'expo-haptics';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation, route }) {
  const { email } = useSelector((state) => state.user);
  const { appId, appToken } = GLOBALS;

  const [unReadCount, setUnReadCount] = useState(0);

  const isFocused = useIsFocused();
  let pushData = getPushDataObject();

  const screens = ['Resources', 'Volunteers', 'Account'];

  const getUnreadNotificationCount = async () => {
    const count = await getUnreadIndieNotificationInboxCount(
      email,
      appId,
      appToken
    );
    setUnReadCount(count);
  };

  useEffect(() => {
    isFocused && getUnreadNotificationCount();
  }, []);

  useEffect(() => {
    // console.log(pushData);
    if (pushData.screen) {
      if (screens.includes(pushData.screen)) {
        navigation.navigate(pushData.screen);
      } else {
        navigation.navigate('Notifications');
      }
    }
  }, [pushData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Share & Care',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      headerRightContainerStyle: {
        marginRight: 10,
      },
      headerLeftContainerStyle: {
        marginLeft: 10,
      },
      headerRight: () => (
        <Icon
          onPress={goToNotificationsScreen}
          lib='i'
          mode={'badge'}
          name='ios-notifications'
          color={gs.colors.primary}
          size={26}
          count={unReadCount}
          style={{
            backgroundColor: '#e3edfa',
            borderRadius: 50,
            padding: 5,
          }}
        />
      ),
    });
  }, [unReadCount]);

  const goToNotificationsScreen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Notifications');
  };

  return (
    <View style={styles.rootContainer}>
      <TopDisplay />
      <BottomDisplay />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: gs.colors.background,
  },
});

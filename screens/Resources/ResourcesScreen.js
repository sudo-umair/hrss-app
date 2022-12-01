import React, { useLayoutEffect } from 'react';
import ResourcesTabs from '../../navigators/ResourcesTabs';
import Icon from '../../components/UI/Icon';
import * as Haptics from 'expo-haptics';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

export default function ResourcesScreen({ navigation }) {
  const { address } = useSelector((state) => state.user);

  const goToRequestResourceScreen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (address.trim() === '') {
      Alert.alert(
        'Address Required',
        'You need to add your address before you can request a resource.',
        [
          {
            text: 'OK',
            style: 'default',
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate('PostRequest');
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          lib={'i'}
          size={26}
          color={'blue'}
          name={'ios-create-outline'}
          onPress={goToRequestResourceScreen}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, []);

  return <ResourcesTabs />;
}

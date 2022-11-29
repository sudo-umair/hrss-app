import React, { useLayoutEffect } from 'react';
import ResourcesTabs from '../../navigators/ResourcesTabs';
import Icon from '../../components/UI/Icon';
import * as Haptics from 'expo-haptics';

export default function ResourcesScreen({ navigation }) {
  const goToRequestResourceScreen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('PostRequest');
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

import { View, StyleSheet } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import TopDisplay from "../components/HomeScreen/TopDisplay";
import BottomDisplay from "../components/HomeScreen/BottomDisplay";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import Icon from "../components/UI/Icon";
import { useSelector } from "react-redux";
import { getUnreadIndieNotificationInboxCount } from "native-notify";
import { GLOBALS } from "../utilities/constants/config";
import { useFocusEffect } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

export default function HomeScreen({ navigation, route }) {
  const user = useSelector((state) => state.user);
  const { email } = user;
  const [unReadCount, setUnReadCount] = useState(0);
  const { appId, appToken } = GLOBALS;

  useFocusEffect(() => {
    const getUnreadNotificationCount = async () => {
      setUnReadCount(
        await getUnreadIndieNotificationInboxCount(email, appId, appToken)
      );
    };
    getUnreadNotificationCount();

    return () => {};
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Share & Care",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: "bold",
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
          lib="i"
          mode={"badge"}
          name="ios-notifications"
          color={gs.colors.primary}
          size={26}
          count={unReadCount}
          style={{
            backgroundColor: "#e3edfa",
            borderRadius: 50,
            padding: 5,
          }}
        />
      ),
    });
  }, [unReadCount]);

  const goToNotificationsScreen = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate("Notifications");
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
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: gs.colors.background,
  },
});

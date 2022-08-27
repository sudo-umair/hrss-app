import { View, StyleSheet } from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import TopDisplay from "../components/HomeScreen/TopDisplay";
import BottomDisplay from "../components/HomeScreen/BottomDisplay";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import Icon from "../components/UI/Icon";
import { useSelector } from "react-redux";
import {
  getPushDataObject,
  getUnreadIndieNotificationInboxCount,
} from "native-notify";
import { GLOBALS } from "../utilities/constants/config";

export default function HomeSreen({ navigation, route }) {
  let pushDataObject = getPushDataObject();
  const user = useSelector((state) => state.user);
  const { email } = user;
  const [unreadCount, setUnreadCount] = useState(0);

  const { appId, appToken } = GLOBALS;

  useEffect(() => {
    const getUnreadNotificationCount = async () => {
      let unreadCount = await getUnreadIndieNotificationInboxCount(
        email,
        appId,
        appToken
      );
      setUnreadCount(unreadCount);
      console.log(unreadCount);
    };
    getUnreadNotificationCount();

    return () => {};
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Share And Care",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: "bold",
      },
      headerRight: () => (
        <Icon
          onPress={goToNotificationsScreen}
          lib="i"
          mode={"badge"}
          name="ios-notifications"
          color={gs.colors.primary}
          size={26}
          count={unreadCount}
          style={{
            backgroundColor: "#e3edfa",
            borderRadius: 50,
            padding: 5,
          }}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
      headerLeftContainerStyle: {
        marginLeft: 10,
      },
    });
  }, [navigation]);

  const goToNotificationsScreen = () => {
    navigation.navigate("Notifications");
  };

  useEffect(() => {
    if (pushDataObject.screenName === "Resources") {
      navigation.navigate("Resources");
    }
  }, []);

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

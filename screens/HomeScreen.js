import { View, Text, StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import TopDisplay from "../components/HomeScreen/TopDisplay";
import BottomDisplay from "../components/HomeScreen/BottomDisplay";
import { GlobalStyles as gs } from "../utils/styles";
import Icon from "../components/UI/Icon";

export default function HomeSreen({ navigation, route }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Share And Care",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 24,
        fontWeight: "bold",
      },
      headerRightContainerStyle: {
        marginRight: 10,
      },
      headerRight: () => (
        <Icon
          onPress={goToNotificationsScreen}
          lib="i"
          name="notifications-outline"
          color="blue"
          size={26}
          style={{ backgroundColor: "#e3edfa", borderRadius: 50, padding: 5 }}
        />
      ),
    });
  }, [navigation]);

  const goToNotificationsScreen = () => {
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
    backgroundColor: gs.colors.homeScreenBackground,
  },
});

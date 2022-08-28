import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HomeScreenButton from "./HomeScreenButton";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useNavigation } from "@react-navigation/native";

export default function BottomDisplay() {
  const navigation = useNavigation();

  const goToAccountScreen = () => {
    navigation.navigate("Account");
  };

  const goToResourcesScreen = () => {
    navigation.navigate("Resources");
  };

  const goToDontationsScreen = () => {
    navigation.navigate("Donations");
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <HomeScreenButton
          name="news"
          size={24}
          color={gs.colors.primary}
          lib="e"
          title="Resources"
          onPress={goToResourcesScreen}
        />
        <HomeScreenButton
          name="volunteer-activism"
          size={24}
          color={gs.colors.primary}
          title="Volunteer"
          lib="m"
        />
      </View>
      <View style={styles.buttonContainer}>
        <HomeScreenButton
          name="heart-plus"
          size={24}
          color={gs.colors.primary}
          title="Donatations"
          lib="mc"
          onPress={goToDontationsScreen}
        />
        <HomeScreenButton
          lib="mc"
          name="account-circle"
          size={24}
          color={gs.colors.primary}
          title="Profile"
          onPress={goToAccountScreen}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gs.colors.background,
    marginTop: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

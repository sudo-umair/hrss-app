import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HomeScreenButton from "./HomeScreenButton";
import { GlobalStyles as gs } from "../../utils/styles";
import { useNavigation } from "@react-navigation/native";

export default function BottomDisplay() {
  const navigation = useNavigation();

  const goToSignoutScreen = () => {
    navigation.navigate("Signout");
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
          name="clinic-medical"
          size={24}
          color="blue"
          lib="f"
          title="Requests for Resources"
          onPress={goToResourcesScreen}
        />
        <HomeScreenButton
          name="volunteer-activism"
          size={24}
          color={gs.colors.primary}
          title="Want to Volunteer?"
          lib="m"
        />
      </View>
      <View style={styles.buttonContainer}>
        <HomeScreenButton
          name="heart-plus"
          size={24}
          color="blue"
          title="Donatations"
          lib="mc"
          onPress={goToDontationsScreen}
        />

        <HomeScreenButton
          name="logout"
          size={24}
          color="red"
          lib="m"
          title="Signout"
          onPress={goToSignoutScreen}
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
    // borderWidth: 1,
  },
});

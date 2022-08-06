import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles as gs } from "../utils/styles";
import React from "react";
import Button from "../components/UI/Button";

export default function ResourcesScreen({ navigation }) {
  const goToRequestResourceScreen = () => {
    navigation.navigate("RequestResource");
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={goToRequestResourceScreen}
          buttonColor={gs.colors.primary}
          textSize={18}
        >
          Post A New Request
        </Button>
      </View>
      <View style={styles.divider}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    alignItems: "center",
    backgroundColor: gs.colors.background,
  },
  buttonContainer: {
    width: "100%",
    marginVertical: "5%",
  },
  divider: {
    borderBottomColor: gs.colors.primary,
    borderBottomWidth: 1,
    width: "100%",
  },
});

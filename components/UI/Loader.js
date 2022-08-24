import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import React from "react";

export default function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <Text style={styles.loaderText}>Loading...</Text>
      <ActivityIndicator size="large" color={gs.colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loaderText: {
    marginVertical: "5%",
    fontSize: 18,
    fontWeight: "bold",
  },
});

import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ImageBackground } from "react-native";
import React from "react";
import SplashScreenImage from "../assets/splash.png";

export default function LoadingScreen() {
  return (
    <ImageBackground
      source={SplashScreenImage}
      resizeMode="cover"
      style={styles.rootContainer}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>App Is Loading, Please Wait.</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    marginTop: "70%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

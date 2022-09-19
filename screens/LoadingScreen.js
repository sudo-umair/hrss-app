import { View, Text, StyleSheet } from "react-native";
import { ImageBackground } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import SplashScreenImage from "../assets/splash.png";
import AppLoadingAnimation from "../assets/animations/app-loading.json";
import { useRef } from "react";

export default function LoadingScreen() {
  const animation = useRef(null);
  return (
    <ImageBackground
      source={SplashScreenImage}
      resizeMode="cover"
      style={styles.rootContainer}
    >
      <View style={styles.container}>
        <Text style={styles.text}>App Is Loading, Please Wait.</Text>
        <LottieView
          loop={true}
          autoPlay={true}
          ref={animation}
          style={{
            width: 150,
            marginTop: "-10%",
          }}
          source={AppLoadingAnimation}
        />
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
    marginTop: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },
});

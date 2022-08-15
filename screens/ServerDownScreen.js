import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import Button from "../components/UI/Button";

export default function ServerDownScreen({ onPress }) {
  const animation = useRef(null);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <LottieView
          loop={true}
          autoPlay={true}
          ref={animation}
          style={{
            width: 300,
            height: 300,
          }}
          source={require("../assets/animations/error-404.json")}
        />
        <Text style={styles.text}>Error Reaching Server</Text>
        <Text style={styles.subTitle}>
          Looks like the server is down. Please try again later.
        </Text>
      </View>
      <Button onPress={onPress}>Retry</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: gs.colors.background,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
    padding: "5%",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: gs.colors.text,
    marginTop: 15,
    textAlign: "center",
  },
});

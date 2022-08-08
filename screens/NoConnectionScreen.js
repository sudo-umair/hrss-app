import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles as gs } from "../utils/styles";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import Button from "../components/UI/Button";

export default function NoConnectionScreen({ onPress }) {
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
            marginTop: -40,
          }}
          source={require("../assets/no-internet-connection.json")}
        />
        <Text style={styles.text}>No internet connection</Text>
        <Text style={styles.subTitle}>
          Please check your Wifi or Cellular Connection
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress}>Retry</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: gs.colors.background,
    justifyContent: "center",
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
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 18,
    color: gs.colors.text,
    marginVertical: 5,
    alignSelf: "center",
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    width: "40%",
  },
});

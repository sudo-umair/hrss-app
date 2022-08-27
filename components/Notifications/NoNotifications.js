import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

export default function NoNotifications() {
  const animation = useRef(null);

  return (
    <View style={styles.container}>
      <LottieView
        loop={true}
        autoPlay={true}
        ref={animation}
        style={{
          width: 300,
          height: 300,
        }}
        source={require("../../assets/animations/no-notifications.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
    padding: "5%",
  },
});

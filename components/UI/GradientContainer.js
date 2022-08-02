import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientContainer({
  colors,
  centerContent,
  stylesProp,
  children,
}) {
  return (
    <LinearGradient
      colors={colors}
      style={[
        styles.container,
        centerContent === true ? styles.containerCenter : "",
        stylesProp,
      ]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

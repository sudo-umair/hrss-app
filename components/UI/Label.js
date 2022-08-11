import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function Label({ children }) {
  return <Text style={style.label}>{children}</Text>;
}

const style = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#ffffff",
    paddingLeft: 5,
    marginBottom: -5,
  },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Icon from "../UI/Icon";
import { GlobalStyles as gs } from "../../utils/styles";

export default function HomeScreenButton({ onPress, name, lib, color, title }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Icon
        lib={lib}
        onPress={onPress}
        color={color}
        name={name}
        size={26}
        style={styles.icon}
      />
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#e5ffed",
    width: 130,
    height: 130,
    paddingHorizontal: 10,
    elevation: 5,
    margin: "5%",
  },
  icon: {
    backgroundColor: "#b2ffd1",
    padding: 15,
    borderRadius: 50,
  },
  text: {
    marginTop: 5,
    textAlign: "center",
    // color: "white",
  },
});

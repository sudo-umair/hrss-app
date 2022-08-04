import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import Icon from "../UI/Icon";

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
    // justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#e2fcea",
    width: 130,
    height: 130,
    paddingHorizontal: 10,
    elevation: 5,
    marginVertical: 10,
    paddingTop: 25,
  },
  icon: {
    backgroundColor: "#b2ffd1",
    padding: 15,
    borderRadius: 50,
  },
  text: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
});

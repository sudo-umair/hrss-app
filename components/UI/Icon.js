import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";

export default function Icon({
  color,
  size,
  name,
  lib,
  onPress,
  style,
  mode,
  count,
}) {
  let Icon;
  if (lib === "m") {
    Icon = <MaterialIcons name={name} color={color} size={size} />;
  } else if (lib === "mc") {
    Icon = <MaterialCommunityIcons name={name} color={color} size={size} />;
  } else if (lib === "a") {
    Icon = <AntDesign name={name} color={color} size={size} />;
  } else if (lib === "f") {
    Icon = <FontAwesome5 name={name} color={color} size={size} />;
  } else if (lib === "i") {
    Icon = <Ionicons name={name} color={color} size={size} />;
  } else if (lib === "e") {
    Icon = <Entypo name={name} color={color} size={size} />;
  }

  if (mode === "tb") {
    return <Ionicons name={name} color={color} size={size} />;
  } else if (mode === "badge") {
    return (
      <Pressable onPress={onPress}>
        {Icon}
        {count > 0 && <Text style={styles.badge}>{count}</Text>}
      </Pressable>
    );
  } else {
    return (
      <Pressable style={style} onPress={onPress}>
        {Icon}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    color: "white",
    fontSize: 12,
    paddingHorizontal: 5,
    borderRadius: 50,
    textAlign: "center",
  },
});

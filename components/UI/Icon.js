import React from "react";
import { Pressable } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

export default function Icon({ color, size, name, lib, onPress, style, mode }) {
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
  }

  if (mode === "tb") {
    return <Ionicons name={name} color={color} size={size} />;
  } else {
    return (
      <Pressable style={style} onPress={onPress}>
        {Icon}
      </Pressable>
    );
  }
}

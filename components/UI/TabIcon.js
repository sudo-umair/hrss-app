import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabIcon({ color, size, name }) {
  return <Ionicons name={name} color={color} size={size} />;
}

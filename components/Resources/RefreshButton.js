import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "../UI/Icon";

export default function RefreshButton({ onPress }) {
  return (
    <View
      style={{
        marginRight: 10,
      }}
    >
      <Icon lib="m" name="refresh" color="black" size={30} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({});

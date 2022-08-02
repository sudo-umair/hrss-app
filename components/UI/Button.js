import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../utils/styles";

export default function Button({
  children,
  onPress,
  mode,
  style,
  buttonColor,
}) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View
          style={[
            styles.button,
            {
              backgroundColor: buttonColor,
            },
            mode === "flat" && styles.flat,
          ]}
        >
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: GlobalStyles.colors.buttonColor,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    // color: GlobalStyles.colors.primary200,
    color: "white",
  },
  pressed: {
    backgroundColor: GlobalStyles.colors.inputBgColor,
    opacity: 0.75,
    borderRadius: 4,
  },
});

import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utils/styles";

export default function Button({
  children,
  onPress,
  mode,
  style,
  buttonColor,
  textSize,
  textColor,
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
            buttonColor && { backgroundColor: buttonColor },
            mode === "flat" && styles.flat,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              textSize && { fontSize: textSize },
              textColor && { color: textColor },
              mode === "flat" && styles.flatText,
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: gs.colors.buttonColor1,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: "white",
  },
  pressed: {
    opacity: 0.75,
  },
});

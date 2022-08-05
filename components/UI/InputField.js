import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utils/styles";

export default function InputField({
  style,
  placeholder,
  value,
  innerRef,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
  keyboardType,
  returnKeyType,
  onSubmitEditing,
}) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder || "Enter text"}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize || "none"}
      // autoComplete={false}
      secureTextEntry={secureTextEntry || false}
      keyboardType={keyboardType || "default"}
      ref={innerRef}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
      returnKeyType={returnKeyType || "next"}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    marginTop: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    elevation: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

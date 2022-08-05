import { View, Text } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { clearData } from "../utils/local-storage";
import { useDispatch } from "react-redux";
import { removeUser, setIsLoggedIn } from "../store/user";

export default function LogoutScreen() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    clearData();
    dispatch(removeUser());
    dispatch(setIsLoggedIn(false));
  });

  return (
    <View>
      <Text>LogoutScreen</Text>
    </View>
  );
}

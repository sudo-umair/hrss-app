import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { GlobalStyles as gs } from "../../utils/styles";
import UserAvatar from "react-native-user-avatar";
import Icon from "../UI/Icon";
import { useSelector } from "react-redux";

export default function TopDisplay() {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [fName, setFName] = useState("");

  useLayoutEffect(() => {
    if (user.name === null) {
      setName("");
      setFName("");
    } else {
      setName(user.name);
      setFName(name.split(" ")[0]);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.userDetails}>
          <UserAvatar size={45} name={name} />
          <Text style={styles.userName}>Welcome, {fName}</Text>
        </View>
        <View style={styles.userCompleteDetails}>
          <Icon
            lib="m"
            name="navigate-next"
            color="white"
            size={30}
            style={{
              backgroundColor: "blue",
              borderRadius: 50,
            }}
          />
        </View>
      </View>
      <Pressable style={styles.resources}>
        <Text style={styles.requests}>Total Requests:</Text>
        <Text style={styles.requestsNumber}>10</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: gs.colors.primary,
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  user: {
    flexDirection: "row",
  },
  userDetails: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  userCompleteDetails: {
    alignItems: "center",
    justifyContent: "center",
    width: "10%",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: gs.colors.titleColor,
  },
  resources: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: gs.colors.background,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  requests: {
    fontSize: 20,
    color: "black",
    paddingRight: 5,
  },
  requestsNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

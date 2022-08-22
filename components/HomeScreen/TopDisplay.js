import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import UserAvatar from "react-native-user-avatar";
import Icon from "../UI/Icon";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getTotalNumberOfRequests } from "../../utilities/routes/resource";

export default function TopDisplay() {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [fName, setFName] = useState("");
  const [requestsCount, setRequestsCount] = useState(5);

  const navigation = useNavigation();

  const getTotalNumberOfRequestsForUser = async (email) => {
    const response = await getTotalNumberOfRequests(email);
    if (response.status === "200") {
      setRequestsCount(response.data);
    }
  };

  useLayoutEffect(() => {
    setName(user.name ? user.name : "");
    setFName(name?.split(" ")[0]);
  });

  useLayoutEffect(() => {
    getTotalNumberOfRequestsForUser(user.email);
  }, [user.email]);

  const goToProfile = () => {
    navigation.navigate("Account");
  };

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.userDetails}>
          <UserAvatar size={45} name={name} />
          <Text style={styles.userName}>Welcome, {fName}</Text>
        </View>
        <View style={styles.userCompleteDetails}>
          <Icon
            lib="mc"
            name="account-cog-outline"
            color="white"
            size={30}
            onPress={goToProfile}
          />
        </View>
      </View>
      <Pressable style={styles.resources}>
        <Text style={styles.requests}>Your Total Requests:</Text>
        <Text style={styles.requestsNumber}>{requestsCount}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: gs.colors.primary,
    margin: "5%",
    padding: "5%",
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
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    color: gs.colors.titleColor,
  },
  resources: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: gs.colors.background,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  requests: {
    fontSize: 16,
    color: "black",
    paddingRight: 10,
  },
  requestsNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

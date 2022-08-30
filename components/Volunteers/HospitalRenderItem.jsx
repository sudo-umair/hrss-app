import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useNavigation } from "@react-navigation/native";

function HospitalRenderItem({ item }) {
  const navigation = useNavigation();

  const goToVolunteerRequest = () => {
    navigation.navigate("VolunteerRequests", {
      item,
    });
  };

  return (
    <Pressable onPress={goToVolunteerRequest} style={styles.container}>
      <Text style={styles.title}>{item.volunteerRequestTitle}</Text>
      <Text style={styles.text}>Requested By: {item.hospitalName}</Text>
      <Text style={styles.text}>Contact Number: {item.hospitalPhone}</Text>
    </Pressable>
  );
}

export default React.memo(HospitalRenderItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: gs.colors.primary,
    padding: "5%",
    marginVertical: "2%",
    marginHorizontal: "4%",
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
  },
  counter: {
    fontSize: 12,
    color: "white",
    textAlign: "left",
    marginTop: "3%",
  },
  text: {
    fontSize: 14,
    marginTop: "1%",
    color: "white",
    textAlign: "left",
  },
});

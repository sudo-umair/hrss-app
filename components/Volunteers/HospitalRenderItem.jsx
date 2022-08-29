import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useNavigation } from "@react-navigation/native";

export default function HospitalRenderItem({ item }) {
  const navigation = useNavigation();

  const goToVolunteerRequest = () => {
    navigation.navigate("VolunteerRequests", { volunteer: item });
  };

  return (
    <Pressable onPress={goToVolunteerRequest} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.hospitalName}</Text>
        <Text style={styles.counter}>
          Volunteer Requests: {item.volunteerRequests.length}
        </Text>
      </View>
      <View style={styles.bodyRow}>
        <Text style={styles.text}>{item.hospitalEmail}</Text>
        <Text style={styles.text}>{item.hospitalPhone}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: gs.colors.primary,
    padding: "5%",
    marginVertical: "2%",
    marginHorizontal: "4%",
    borderRadius: 15,
  },
  header: {
    justifyContent: "space-between",
  },
  bodyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 2,
  },
  text: {
    fontSize: 14,
    color: "white",
    textAlign: "left",
    marginTop: "3%",
  },
});

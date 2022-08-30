import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useNavigation } from "@react-navigation/native";

function HospitalRenderItem({ item }) {
  const navigation = useNavigation();

  const goToVolunteerRequest = () => {
    navigation.navigate("VolunteerRequests", {
      requests: item,
    });
  };

  return (
    <Pressable onPress={goToVolunteerRequest} style={styles.container}>
      <Text style={styles.title}>{item.hospitalName}</Text>
      <View style={styles.bodyRow}>
        <Text style={styles.text}>{item.hospitalEmail}</Text>
        <Text style={styles.text}>{item.hospitalPhone}</Text>
      </View>
      <Text style={styles.counter}>
        Total Requests: {item.volunteerRequests.length}
      </Text>
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
    marginTop: "3%",
  },
  text: {
    fontSize: 14,
    marginTop: "1%",
    color: "white",
    textAlign: "left",
  },
});

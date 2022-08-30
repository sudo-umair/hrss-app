import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import Button from "../UI/Button";

function VolunteerRequestRenderItem({ item }) {
  console.log("item", item);

  const volunteerHandler = () => {
    if (item.requestStatus === "Disabled") {
      alert("Hospial is not accepting volunteers anymore");
    } else {
      alert("Volunteer Request");
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.name}>{item.volunteerRequestTitle}</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Tasks</Text>
          <Text style={styles.details}>{item.volunteerTasks}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Skills</Text>
          <Text style={styles.details}>{item.volunteersSkills}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Duration</Text>
          <Text style={styles.details}>{item.timeDuration}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Volunteers Required</Text>
          <Text style={styles.details}>{item.volunteersRequired}</Text>
        </View>
        {item.additionalNotes !== "" && (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Additional Notes</Text>
            <Text style={styles.details}>{item.additionalNotes}</Text>
          </View>
        )}
        {item.requestStatus === "Enabled" && (
          <Button onPress={volunteerHandler} style={styles.button}>
            Volunteer
          </Button>
        )}
      </View>
    </View>
  );
}

export default React.memo(VolunteerRequestRenderItem);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: gs.colors.primary,
    marginHorizontal: "5%",
    marginVertical: "2%",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  detailsContainer: {
    marginVertical: "2%",
  },
  title: {
    color: "white",
    fontSize: 14,
    marginHorizontal: "2%",
    textAlign: "center",
  },
  details: {
    color: "white",
    fontSize: 18,
    marginHorizontal: "2%",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "5%",
    width: "60%",
  },
  button: {
    marginTop: "5%",
  },
});

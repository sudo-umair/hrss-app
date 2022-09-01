import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

function VolunteerRequestRenderItem({ item, screen }) {
  const [applicantStatus, setApplicantStatus] = useState("");
  const navigation = useNavigation();

  const user = useSelector((state) => state.user);
  const { email } = user;

  const checkApplicantStatus = () => {
    item.applicants.forEach((applicant) => {
      if (applicant.applicantEmail === email) {
        setApplicantStatus(applicant.applicantRequestStatus);
      }
    });
  };

  {
    screen === "MyRequests" &&
      useLayoutEffect(() => {
        checkApplicantStatus();
      }, [navigation]);
  }

  const goToVolunteerRequest = () => {
    navigation.navigate("VolunteerRequestDetails", {
      item,
      screen,
    });
  };

  return (
    <Pressable onPress={goToVolunteerRequest} style={styles.container}>
      <View style={styles.headerRow}>
        <Text
          style={[
            styles.title,
            screen === "MyRequests" && {
              width: "80%",
            },
          ]}
        >
          {item.volunteerRequestTitle}
        </Text>
        {screen === "MyRequests" && (
          <Text
            style={[
              styles.requestStatus,
              applicantStatus === "Denied" && styles.denied,
              applicantStatus === "Approved" && styles.approved,
              applicantStatus === "Applied" && styles.applied,
            ]}
          >
            {applicantStatus}
          </Text>
        )}
      </View>
      <Text style={styles.text}>Requested By: {item.hospitalName}</Text>
      <Text style={styles.text}>Contact: {item.hospitalPhone}</Text>
    </Pressable>
  );
}

export default React.memo(VolunteerRequestRenderItem);

const styles = StyleSheet.create({
  container: {
    backgroundColor: gs.colors.primary,
    padding: "5%",
    marginVertical: "2%",
    marginHorizontal: "4%",
    borderRadius: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "left",
  },
  counter: {
    width: "20%",
    fontSize: 12,
    color: "white",
    textAlign: "left",
    marginTop: "3%",
  },
  text: {
    fontSize: 12,
    marginTop: "1%",
    color: "white",
    textAlign: "left",
  },
  requestStatus: {
    maxHeight: 25,
    maxWidth: 60,
    fontSize: 12,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 25,
    marginLeft: "auto",
    textAlign: "center",
  },
  applied: {
    backgroundColor: "yellow",
    color: "black",
  },
  approved: {
    backgroundColor: "green",
  },
  rejected: {
    backgroundColor: "red",
  },
});

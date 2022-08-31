import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import Button from "../../components/UI/Button";
import { Linking } from "react-native";
import { applyForVolunteerRequest } from "../../utilities/routes/volunteers";
import { useSelector } from "react-redux";

export default function VolunteerRequestsDetailsScreen({ navigation, route }) {
  const [applicantStatus, setApplicantStatus] = useState("");
  const user = useSelector((state) => state.user);
  const { name, email, phone, cnic } = user;
  const { item, screen } = route.params;

  //for my requests
  const checkApplicantStatus = () => {
    item.applicants.forEach((applicant) => {
      if (applicant.applicantEmail === email) {
        setApplicantStatus(applicant.applicantRequestStatus);
      }
    });
  };

  const acceptVolunteerRequest = async () => {
    if (item.requestStatus === "Disabled") {
      alert("Hospial is not accepting volunteers anymore");
    } else if (
      item.applicants.find((applicant) => applicant.applicantEmail === email)
    ) {
      alert("You have already applied for this request");
    } else {
      const record = {
        volunteerRequestId: item._id,
        applicantName: name,
        applicantEmail: email,
        applicantPhone: phone,
        applicantCnic: cnic,
      };
      const response = await applyForVolunteerRequest(record);

      if (response.status === "200") {
        navigation.navigate("Volunteers");
      }
      alert(response.message);
    }
  };

  const callHospital = () => {
    const phoneNumber = item.hospitalPhone === NaN ? false : item.hospitalPhone;

    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      alert("Phone Number is not available");
    }
  };

  const sendEmail = () => {
    const email = item.hospitalEmail === NaN ? false : item.hospitalEmail;

    if (email) {
      const url = `mailto:${email}`;
      Linking.openURL(url);
    } else {
      alert("Email is not available");
    }
  };

  {
    screen === "MyVolunteerRequests" &&
      useLayoutEffect(() => {
        checkApplicantStatus();
      }, [navigation]);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: item?.hospitalName,
    });
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.requestTitle}>{item.volunteerRequestTitle}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.details}>{item.volunteerRequestDescription}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Duration</Text>
          <Text style={styles.details}>{item.timeDuration}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Volunteers Required</Text>
          <Text style={styles.details}>{item.volunteersRequired}</Text>
        </View>

        {screen === "MyVolunteerRequests" && (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Request Status</Text>
            <Text style={styles.details}>{applicantStatus}</Text>
          </View>
        )}

        {screen === "VolunteerRequests" && (
          <Button onPress={acceptVolunteerRequest} style={styles.button}>
            {item.requestStatus === "Enabled" && "Apply for Volunteer"}
          </Button>
        )}

        <View style={styles.divider}></View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Hospital Name</Text>
          <Text style={styles.details}>{item.hospitalName}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Contact</Text>
          <Text style={styles.details}>{item.hospitalPhone}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Email</Text>
          <Text onPress={sendEmail} style={[styles.details, styles.email]}>
            {item.hospitalEmail}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Hospital Address</Text>
          <Text style={styles.details}>{item.hospitalLocation}</Text>
        </View>
        <Button onPress={callHospital} style={styles.button}>
          Call Hospital
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: gs.colors.primary,
    margin: "5%",
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
  requestTitle: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "2%",
  },
  detailsContainer: {
    marginVertical: "2%",
  },
  title: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  details: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  email: {
    textDecorationLine: "underline",
  },
  button: {
    marginVertical: "2%",
  },
  divider: {
    borderColor: "white",
    borderBottomWidth: 1,
    borderRadius: 10,
    width: "80%",
    marginVertical: "5%",
  },
});

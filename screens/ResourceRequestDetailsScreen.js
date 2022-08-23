import { StyleSheet, Text, View, Linking } from "react-native";
import React, { useLayoutEffect } from "react";
import Button from "../components/UI/Button";
import { GlobalStyles as gs } from "../utilities/constants/styles";

export default function ResourceRequestDetailsScreen({ navigation, route }) {
  const request = route.params.request;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: request.userName,
    });
  }),
    [navigation, request];

  const openDialer = () => {
    const phoneNumber =
      request.phone === "Not Available" ? false : request.phone;
    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      alert("Phone Number is not available");
    }
  };

  const openWebsite = () => {
    const url = request.website === "Not Available" ? false : request.website;
    if (url) {
      Linking.openURL(url);
    } else {
      alert("Website is not available");
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <Text style={styles.name}>{request.name}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Type</Text>
          <Text style={styles.details}>{request.type}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Address</Text>
          <Text style={styles.details}>{request.address}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Website</Text>
          <Text onPress={openWebsite} style={[styles.details, styles.website]}>
            {request.website}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Contact Number</Text>
          <Text style={styles.details}>{request.phone ?? "null"}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} textSize={16} onPress={openDialer}>
            Call
          </Button>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          These details are provided by Google Maps.
        </Text>
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
  name: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  detailsContainer: {
    // flexDirection: "row",
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
  website: {
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginTop: "5%",
    width: "60%",
  },
  button: {
    marginTop: "5%",
  },
  infoContainer: {
    margin: "5%",
    padding: "2%",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
  },
});

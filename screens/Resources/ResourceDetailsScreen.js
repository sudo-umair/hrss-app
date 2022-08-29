import { StyleSheet, Text, View, Linking, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import Button from "../../components/UI/Button";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { updateResourceRequest } from "../../utilities/routes/resource";
import { useSelector } from "react-redux";

export default function ResourceDetailsScreen({ navigation, route }) {
  const request = route.params.item;

  const user = useSelector((state) => state.user);
  const { name, email, phone } = user;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: request.resourceName,
    });
  }),
    [navigation, request];

  const callRequestor = () => {
    const phoneNumber =
      request.requestedByPhone === "Not Available"
        ? false
        : request.requestedByPhone;
    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      alert("Phone Number is not available");
    }
  };

  const callAcceptor = () => {
    const phoneNumber =
      request.phone === "Not Available" ? false : request.approvedByPhone;

    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      alert("Phone Number is not available");
    }
  };

  const approveRequest = async () => {
    if (request.requestedByEmail === user.email) {
      alert("You can't accept your own request");
    } else {
      const record = {
        id: request._id,
        requestStatus: "Approved",
        approvedByName: name,
        approvedByEmail: email,
        approvedByPhone: phone,
      };
      const response = await updateResourceRequest(record);
      alert(response.message);
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Resource Requested</Text>
          <Text style={styles.details}>{request.resourceName}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Duration</Text>
            <Text style={styles.details}>{request.resourceDuration}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Quantity</Text>
            <Text style={styles.details}>{request.resourceQuantity}</Text>
          </View>
        </View>
        {request.resourceNotes !== "" && (
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Additional Notes</Text>
            <Text style={styles.details}>{request.resourceNotes}</Text>
          </View>
        )}
        <View style={styles.divider}></View>

        {request.requestedByEmail !== email && (
          <>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Requested By:</Text>
              <Text style={styles.details}>{request.requestedByName}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Contact Number</Text>
              <Text style={styles.details}>{request.requestedByPhone}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Email</Text>
              <Text style={styles.details}>{request.requestedByEmail}</Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Address</Text>
              <Text style={styles.details}>{request.requestedByAddress}</Text>
            </View>

            <View style={styles.divider}></View>
          </>
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Request Status</Text>
          <Text style={styles.details}>{request.requestStatus}</Text>
        </View>

        {request.requestStatus !== "Pending" &&
          request.requestedByEmail === email && (
            <>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Request Approved By</Text>
                <Text style={styles.details}>{request.approvedByName}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Contact Number</Text>
                <Text style={styles.details}>{request.approvedByPhone}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.details}>{request.approvedByEmail}</Text>
              </View>
            </>
          )}

        {request.requestStatus !== "Approved" &&
          request.requestedByEmail !== email && (
            <Button
              style={styles.button}
              textSize={16}
              onPress={approveRequest}
            >
              Approve Request
            </Button>
          )}

        {request.requestStatus === "Approved" &&
          request.approvedByEmail !== email && (
            <Button style={styles.button} textSize={16} onPress={callAcceptor}>
              Call {request.approvedByName.split(" ")[0]}
            </Button>
          )}

        {request.requestedByEmail !== email && (
          <Button style={styles.button} textSize={16} onPress={callRequestor}>
            Call {request.requestedByName.split(" ")[0]}
          </Button>
        )}
      </View>
    </ScrollView>
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
    marginVertical: "2%",
    marginHorizontal: "5%",
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
  button: {
    marginTop: "5%",
    minWidth: "60%",
    maxWidth: "70%",
  },
  infoContainer: {
    margin: "5%",
    padding: "2%",
  },
  infoText: {
    fontSize: 14,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divider: {
    borderColor: "white",
    borderBottomWidth: 1,
    borderRadius: 10,
    width: "80%",
    marginVertical: "5%",
  },
});

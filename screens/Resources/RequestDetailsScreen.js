import { StyleSheet, Text, View, Linking, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import Button from "../../components/UI/Button";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { updateResourceRequest } from "../../utilities/routes/resource";
import { useSelector } from "react-redux";

export default function RequestDetailsScreen({ navigation, route }) {
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
      request.phone === "Not Available" ? false : request.phone;
    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      alert("Phone Number is not available");
    }
  };

  const callAcceptor = () => {
    const phoneNumber =
      request.phone === "Not Available"
        ? false
        : request.requestApprovedByPhone;

    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      alert("Phone Number is not available");
    }
  };

  const approveRequest = async () => {
    if (request.email === user.email) {
      alert("You can't accept your own request");
    } else {
      const record = {
        id: request._id,
        requestStatus: "Approved",
        requestApprovedByName: name,
        requestApprovedByEmail: email,
        requestApprovedByPhone: phone,
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
            <Text style={styles.details}>{request.duration}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.title}>Quantity</Text>
            <Text style={styles.details}>{request.quantity}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Requested By:</Text>
          <Text style={styles.details}>{request.name}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Contact Number</Text>
          <Text style={styles.details}>{request.phone}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.details}>{request.email}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Additional Notes</Text>
          <Text style={styles.details}>
            {request.notes === "" ? "None" : request.notes}
          </Text>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Request Status</Text>
          <Text style={styles.details}>{request.requestStatus}</Text>
        </View>

        {request.requestStatus !== "Pending" && (
          <>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Request Approved By</Text>
              <Text style={styles.details}>
                {request.requestApprovedByName}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Contact Number</Text>
              <Text style={styles.details}>
                {request.requestApprovedByPhone}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Email</Text>
              <Text style={styles.details}>
                {request.requestApprovedByEmail}
              </Text>
            </View>
          </>
        )}

        {request.requestStatus !== "Approved" && request.email !== email && (
          <Button style={styles.button} textSize={16} onPress={approveRequest}>
            Approve Request
          </Button>
        )}

        {request.requestStatus === "Approved" &&
          request.requestApprovedByEmail !== email && (
            <Button style={styles.button} textSize={16} onPress={callAcceptor}>
              Call Acceptor
            </Button>
          )}

        {request.email !== email && (
          <Button style={styles.button} textSize={16} onPress={callRequestor}>
            Call Requestor
          </Button>
        )}

        {/* <Button style={styles.button} textSize={16} onPress={callRequestor}>
          Call Requestor
        </Button>
        <Button style={styles.button} textSize={16} onPress={callAcceptor}>
          Call Acceptor
        </Button> */}
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
    width: "60%",
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

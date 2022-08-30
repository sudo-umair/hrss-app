import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Resources/NoResults";
import VolunteerRequestRenderItem from "../../components/Volunteers/VolunteerRequestRenderItem";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import Button from "../../components/UI/Button";
import { Linking } from "react-native";

export default function VolunteerRequestsScreen({ navigation, route }) {
  const [volunteerRequests, setVolunteerRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { requests } = route.params;

  const callHospital = () => {
    const phoneNumber =
      requests.hospitalPhone === NaN ? false : requests.hospitalPhone;

    if (phoneNumber) {
      const url = `tel:${phoneNumber}`;
      Linking.openURL(url);
    } else {
      alert("Phone Number is not available");
    }
  };

  useLayoutEffect(() => {
    setVolunteerRequests(requests?.volunteerRequests);
    setIsLoading(false);
  }),
    [];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: requests?.hospitalName,
    });
  }),
    [navigation];

  return (
    <View style={styles.rootContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{requests.hospitalName}</Text>
        <View style={styles.cardRow}>
          <Text style={styles.subtitle}>Email: {requests.hospitalEmail}</Text>
          <Text style={styles.subtitle}>Phone: {requests.hospitalPhone}</Text>
        </View>
        <Text style={styles.subtitle}>
          Location: {requests.hospitalLocation}
        </Text>
        <Button onPress={callHospital} style={styles.button}>
          Call {requests.hospitalName}
        </Button>
      </View>
      <FlatList
        data={volunteerRequests}
        renderItem={({ item }) => <VolunteerRequestRenderItem item={item} />}
        keyExtractor={(item) => item._id}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={isLoading ? Loader : NoResults}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        windowSize={10}
        contentContainerStyle={styles.listContent}
        style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  card: {
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    marginBottom: "4%",
    marginHorizontal: "4%",

    backgroundColor: gs.colors.primary,
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginTop: "1%",
  },
  button: {
    marginTop: "2%",
    minWidth: "50%",
    maxWidth: "70%",
    alignSelf: "center",
  },
  listContainer: {},
  listContent: {},
});

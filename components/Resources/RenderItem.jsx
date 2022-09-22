import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useNavigation } from "@react-navigation/native";
import { ignoreResourceRequest } from "../../utilities/routes/resource";
import { useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";
import * as Haptics from "expo-haptics";

const RenderItem = React.memo(({ item }) => {
  const navigation = useNavigation();

  const user = useSelector((state) => state.user);
  const { email } = user;

  const goToDetailsScreen = () => {
    navigation.navigate("ResourceDetails", { item });
  };

  const ignoreRequest = async (id) => {
    const record = {
      id,
      email,
    };
    const response = await ignoreResourceRequest(record);
    showMessage({
      message: response.message,
      type: response.status === "200" ? "success" : "warning",
      icon: response.status === "200" ? "success" : "warning",
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <Pressable
      onLongPress={() => ignoreRequest(item._id)}
      onPress={goToDetailsScreen}
      style={styles.itemContainer}
    >
      <View style={styles.row}>
        <Text style={styles.title}>{item.resourceName}</Text>
        <Text
          style={[
            styles.requestStatus,
            item.requestStatus === "Pending" ? styles.pending : styles.approved,
          ]}
        >
          {item.requestStatus}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.details}>Quantity: {item.resourceQuantity}</Text>
        <Text style={styles.details}>Duration: {item.resourceDuration}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.details}>Requested by: {item.requestedByName}</Text>
      </View>
    </Pressable>
  );
});

export default RenderItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: gs.colors.primary,
    padding: "5%",
    marginVertical: "2%",
    borderRadius: 7,
    justifyContent: "space-between",
    elevation: 5,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  requestStatus: {
    fontSize: 12,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 25,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  pending: {
    backgroundColor: "yellow",
    color: "black",
  },
  approved: {
    backgroundColor: "green",
  },
  details: {
    fontSize: 12,
    color: "white",
  },
});

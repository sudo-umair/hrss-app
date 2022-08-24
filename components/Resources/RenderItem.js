import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useNavigation } from "@react-navigation/native";

const RenderItem = React.memo(({ item }) => {
  const navigation = useNavigation();

  const goToDetailsScreen = () => {
    navigation.navigate("RequestDetails", { item });
  };

  return (
    <Pressable onPress={goToDetailsScreen} style={styles.itemContainer}>
      <View style={styles.row}>
        <Text style={styles.userName}>{item.name}</Text>
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
        <Text style={styles.resourceName}>{item.resourceName}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.duration}>Duration: {item.duration}</Text>
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
    height: 130,
    elevation: 5,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  requestStatus: {
    fontSize: 12,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
  pending: {
    backgroundColor: "yellow",
    color: "black",
  },
  approved: {
    backgroundColor: "green",
  },
  resourceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  quantity: {
    fontSize: 14,
    color: "white",
  },
  duration: {
    fontSize: 14,
    color: "white",
  },
});

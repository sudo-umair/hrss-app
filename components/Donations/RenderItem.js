import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useNavigation } from "@react-navigation/native";

const RenderItem = React.memo(({ item }) => {
  const navigation = useNavigation();

  const goToDonationDetails = () => {
    navigation.navigate("DonationDetails", { donation: item });
  };

  return (
    <Pressable onPress={goToDonationDetails} style={styles.itemContainer}>
      <View style={styles.itemNameContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.itemDetailsContainer}>
        <Text style={styles.itemDetails}>{item.type}</Text>
        <Text style={styles.itemDetails}>{item.website}</Text>
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
    marginHorizontal: "4%",
    borderRadius: 7,
    justifyContent: "space-between",
    height: 130,
    elevation: 5,
    borderRadius: 15,
  },
  itemName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  itemDetailsContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDetails: {
    fontSize: 14,
    color: "white",
  },
});

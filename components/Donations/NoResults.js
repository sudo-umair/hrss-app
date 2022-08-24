import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function NoResults({ searchText }) {
  return (
    <View style={styles.noResultsContainer}>
      <Text style={styles.noResultsText}>
        Sorry, no results found for
        {"\n"}
        {searchText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
  },
  noResultsText: {
    marginVertical: "10%",
    paddingHorizontal: "10%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

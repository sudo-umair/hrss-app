import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import { getDonationsList } from "../utilities/routes/dontations";
import SearchBar from "../components/UI/SearchBar";

export default function DonationsScreen({ navigation, route }) {
  const [donationResults, setDonationResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useLayoutEffect(() => {
    getDonationsList()
      .then((response) => {
        setDonationResults(response.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const goToDonationDetails = (donation) => {
    navigation.navigate("DonationDetails", { donation });
  };

  const onSearch = (text) => {
    const results = donationResults.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResults(results);
    setSearchText(text);
  };

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <Pressable
          onPress={() => {
            goToDonationDetails(item);
          }}
          style={styles.itemContainer}
        >
          <View style={styles.itemNameContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
          </View>
          <View style={styles.itemDetailsContainer}>
            <Text style={styles.itemDetails}>{item.type}</Text>
            <Text style={styles.itemDetails}>{item.website}</Text>
          </View>
        </Pressable>
      );
    },
    [donationResults]
  );

  const NoResults = () => {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>
          Sorry, no results found for
          {"\n"}
          {searchText}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <SearchBar
        onChangeText={onSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <FlatList
        data={searchText === "" ? donationResults : searchResults}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={NoResults}
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
  },
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
  searchBar: {
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 10,
    // margin: "5%",
    borderRadius: 7,
  },
  searchBarText: {
    color: "black",
    fontSize: 18,
  },
  listContainer: {},
  listContent: {},
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
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 7,
  },
});

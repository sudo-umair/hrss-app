import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { getDonationsList } from "../../utilities/routes/dontations";
import SearchBar from "../../components/UI/SearchBar";
import RenderItem from "../../components/Donations/RenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Donations/NoResults";

export default function DonationsScreen({ navigation, route }) {
  const [donationResults, setDonationResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchDonations = useCallback(async () => {
    setIsLoading(true);
    const response = await getDonationsList();
    if (response.status === "200") {
      setDonationResults(response.results);
    } else {
      alert(response.message);
    }
    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    fetchDonations();
    return () => {
      setDonationResults([]);
    };
  }, [fetchDonations]);

  const onSearch = (text) => {
    const results = donationResults.filter((item) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResults(results);
    setSearchText(text);
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
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item._id}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          isLoading ? Loader : NoResults.bind(this, { searchText })
        }
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
  loaderContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loaderText: {
    marginVertical: "5%",
    fontSize: 18,
    fontWeight: "bold",
  },
});

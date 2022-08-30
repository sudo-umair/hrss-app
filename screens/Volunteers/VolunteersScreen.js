import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import HospitalRenderItem from "../../components/Volunteers/HospitalRenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Resources/NoResults";
import { getVolunteersRequest } from "../../utilities/routes/volunteers";
import SearchBar from "../../components/UI/SearchBar";

export default function VolunteersScreen({ navigation }) {
  const [volunteers, setVolunteers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchVolunteers = useCallback(async () => {
    setIsLoading(true);
    const response = await getVolunteersRequest();
    if (response.status === "200") {
      const filtered = response?.results.filter(
        (item) => item.requestStatus === "Enabled"
      );
      setVolunteers(filtered);
    } else {
      alert(response.message);
    }
    setIsLoading(false);
  }, []);

  const onSearch = (text) => {
    const results = volunteers.filter((item) => {
      return item.volunteerRequestTitle
        .toLowerCase()
        .includes(text.toLowerCase());
    });
    setSearchResults(results);
    setSearchText(text);
  };

  useLayoutEffect(() => {
    fetchVolunteers();
    return () => {
      setVolunteers([]);
    };
  }),
    [fetchVolunteers];

  return (
    <View style={styles.rootContainer}>
      <SearchBar
        onChangeText={onSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <FlatList
        data={searchText === "" ? volunteers : searchResults}
        // data={volunteers}
        renderItem={({ item }) => <HospitalRenderItem item={item} />}
        keyExtractor={(item) => item._id}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={isLoading ? Loader : NoResults}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        windowSize={10}
        contentContainerStyle={styles.listContent}
        // style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    marginVertical: "2%",
    marginHorizontal: "4%",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  listContainer: {},
  listContent: {},
});

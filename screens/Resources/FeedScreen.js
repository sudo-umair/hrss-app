import { StyleSheet, FlatList, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import RenderItem from "../../components/Resources/RenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Resources/NoResults";
import SearchBar from "../../components/UI/SearchBar";

import { useSelector } from "react-redux";

export default function FeedScreen({ navigation, route }) {
  const { filterType } = route.params;
  const resourceRequests = useSelector((state) => state.resources.resources);
  const isLoading = useSelector((state) => state.resources.isLoading);

  const user = useSelector((state) => state.user);
  const { email } = user;

  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  const filterRequests = (requests) => {
    if (filterType === "all") {
      const filteredRequestsReversed = requests.filter(
        (item) =>
          item.requestStatus === "Pending" && item.requestedByEmail !== email
      );
      setFilteredRequests(filteredRequestsReversed);
    } else if (filterType === "myRequests") {
      const filteredRequestsReversed = requests
        .filter((item) => item.requestedByEmail === email)
        .reverse();
      setFilteredRequests(filteredRequestsReversed);
    } else if (filterType === "approved") {
      const filteredRequestsReversed = requests
        .filter(
          (item) =>
            item.approvedByEmail === email && item.requestStatus === "Approved"
        )
        .reverse();
      setFilteredRequests(filteredRequestsReversed);
    }
  };

  const onSearch = (text) => {
    const results = filteredRequests.filter((item) => {
      return item.resourceName.toLowerCase().includes(text.toLowerCase());
    });
    setSearchResults(results);
    setSearchText(text);
  };

  useLayoutEffect(() => {
    filterRequests(resourceRequests);

    return () => {
      setFilteredRequests([]);
    };
  }, [resourceRequests, filterType]);

  return (
    <View style={styles.rootContainer}>
      <SearchBar
        onChangeText={onSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <FlatList
        data={searchText === "" ? filteredRequests : searchResults}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={isLoading ? Loader : NoResults}
        keyboardDismissMode="on-drag"
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
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
    paddingTop: "4%",
  },

  listContainer: {
    width: "100%",
  },
  listContent: {
    paddingBottom: "4%",
    paddingHorizontal: "4%",
  },
});

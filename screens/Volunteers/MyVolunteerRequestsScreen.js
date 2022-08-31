import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import VolunteerRequestRenderItem from "../../components/Volunteers/VolunteerRequestRenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Resources/NoResults";
import SearchBar from "../../components/UI/SearchBar";
import { useSelector } from "react-redux";

export default function MyVolunteerRequestsScreen({ navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  const user = useSelector((state) => state.user);
  const { myRequests, myRequestsLoading } = useSelector(
    (state) => state.volunteers
  );

  const onSearch = (text) => {
    const results = myRequests.filter((item) => {
      return item.volunteerRequestTitle
        .toLowerCase()
        .includes(text.toLowerCase());
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
        data={searchText === "" ? myRequests : searchResults}
        renderItem={({ item }) => (
          <VolunteerRequestRenderItem
            item={item}
            screen="MyVolunteerRequests"
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          myRequestsLoading ? Loader : NoResults.bind(this, { searchText })
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
    paddingVertical: "4%",
  },

  listContainer: {},
  listContent: {},
});

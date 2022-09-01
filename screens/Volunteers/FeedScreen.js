import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import VolunteerRequestRenderItem from "../../components/Volunteers/VolunteerRequestRenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Resources/NoResults";
import SearchBar from "../../components/UI/SearchBar";
import { useSelector } from "react-redux";

export default function FeedScreen({ navigation, route }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);
  const { screen } = route.params;

  const user = useSelector((state) => state.user);
  const { volunteers, volunteersLoading } = useSelector(
    (state) => state.volunteers
  );

  const filterRequests = useCallback(() => {
    if (screen === "MyRequests") {
      const filtered = volunteers.filter((request) =>
        request.applicants.filter(
          (applicant) => applicant.applicantEmail === user.email
        )
      );

      setFilteredRequests(filtered.reverse());
    } else if (screen === "VolunteerRequests") {
      const filtered = volunteers.filter(
        (item) =>
          item.requestStatus === "Enabled" &&
          !item.applicants.find(
            (applicant) => applicant.applicantEmail === user.email
          )
      );
      setFilteredRequests(filtered.reverse());
    }
  });

  const onSearch = (text) => {
    const results = filteredRequests.filter((item) => {
      return item.volunteerRequestTitle
        .toLowerCase()
        .includes(text.toLowerCase());
    });
    setSearchResults(results);
    setSearchText(text);
  };

  useLayoutEffect(() => {
    filterRequests(volunteers);

    return () => {
      setFilteredRequests([]);
    };
  }, [volunteers, screen]);

  return (
    <View style={styles.rootContainer}>
      <SearchBar
        onChangeText={onSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <FlatList
        data={searchText === "" ? filteredRequests : searchResults}
        renderItem={({ item }) => (
          <VolunteerRequestRenderItem item={item} screen={screen} />
        )}
        keyExtractor={(item) => item._id.toString()}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          volunteersLoading ? Loader : NoResults.bind(this, { searchText })
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

import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import VolunteerRequestRenderItem from "../../components/Volunteers/VolunteerRequestRenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Donations/NoResults";
import { getMyVolunteerRequests } from "../../utilities/routes/volunteers";
import SearchBar from "../../components/UI/SearchBar";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

export default function MyVolunteerRequestsScreen({ navigation }) {
  const [volunteers, setVolunteers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user);

  const fetchMyVolunteerRequests = useCallback(async () => {
    const response = await getMyVolunteerRequests({
      applicantEmail: user.email,
    });
    if (response.status === "200") {
      setVolunteers(response.results.reverse());
    } else {
      alert(response.message);
    }
    setIsLoading(false);
  }, [navigation]);

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
    fetchMyVolunteerRequests();

    return () => {
      setVolunteers([]);
    };
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "My Volunteer Requests",
    });
  }, [navigation]);

  return (
    <View style={styles.rootContainer}>
      <SearchBar
        onChangeText={onSearch}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <FlatList
        data={searchText === "" ? volunteers : searchResults}
        renderItem={({ item }) => (
          <VolunteerRequestRenderItem
            item={item}
            screen={{ screen: "MyVolunteerRequests" }}
          />
        )}
        keyExtractor={(item) => item._id.toString()}
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

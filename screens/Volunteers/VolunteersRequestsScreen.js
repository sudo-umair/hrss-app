import { StyleSheet, View, FlatList } from "react-native";
import React, { useState, useCallback, useLayoutEffect } from "react";
import VolunteerRequestRenderItem from "../../components/Volunteers/VolunteerRequestRenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Donations/NoResults";
import { getVolunteerRequests } from "../../utilities/routes/volunteers";
import SearchBar from "../../components/UI/SearchBar";
import Icon from "../../components/UI/Icon";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

export default function VolunteersRequestsScreen({ navigation, route }) {
  const [volunteers, setVolunteers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state) => state.user);

  const fetchVolunteerRequests = useCallback(async () => {
    const response = await getVolunteerRequests();
    if (response.status === "200") {
      console.log(response.results);
      const filtered = response?.results.filter(
        (item) =>
          item.requestStatus === "Enabled" &&
          !item.applicants.find(
            (applicant) => applicant.applicantEmail === user.email
          )
      );
      setVolunteers(filtered.reverse());
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
    fetchVolunteerRequests();

    // return () => {
    //   setVolunteers([]);
    // };
  }, []);

  const goToMyRequests = () => {
    navigation.navigate("MyVolunteerRequests");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Volunteer Requests",
      headerRight: () => (
        <Icon
          lib="mc"
          name="face-man-profile"
          color={gs.colors.primary}
          size={26}
          onPress={goToMyRequests}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
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
            screen={{ screen: "VolunteerRequests" }}
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

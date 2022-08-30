import { StyleSheet, Text, View, FlatList } from "react-native";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import HospitalRenderItem from "../../components/Volunteers/HospitalRenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Resources/NoResults";
import { getVolunteersRequest } from "../../utilities/routes/volunteers";
import { useFocusEffect } from "@react-navigation/native";

export default function VolunteersScreen({ navigation }) {
  const [volunteers, setVolunteers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVolunteers = useCallback(async () => {
    const response = await getVolunteersRequest();

    // const filtered = response?.results.filter(
    //   (item) =>
    //     item.volunteerRequests.length > 0 &&
    //     item.volunteerRequests.requestStatus === "Enabled"
    // );
    // setVolunteers(filtered);

    setVolunteers(response?.results);
    setIsLoading(false);
  }, []);

  // useLayoutEffect(() => {
  //   fetchVolunteers();
  // }, []);

  useFocusEffect(() => {
    fetchVolunteers();
  }),
    [];

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>
        Following are the hospitals that have requested for volunteers
      </Text>

      <FlatList
        // data={searchText === "" ? volunteers : filteredVolunteers}
        data={volunteers}
        renderItem={({ item }) => <HospitalRenderItem item={item} />}
        keyExtractor={(item) => item._id}
        keyboardDismissMode="on-drag"
        ListEmptyComponent={isLoading ? Loader : NoResults}
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

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

export default function VolunteersScreen({ navigation }) {
  const [volunteers, setVolunteers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVolunteers = useCallback(async () => {
    const response = await getVolunteersRequest();

    // const filtered = response?.results.filter(
    //   (item) => item.volunteerRequests.length > 0
    // );
    // setVolunteers(filtered);

    setVolunteers(response?.results);
    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    fetchVolunteers();
  }, []);

  return (
    <View style={styles.rootContainer}>
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
  listContainer: {},
  listContent: {},
});

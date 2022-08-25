import { StyleSheet, FlatList } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import RenderItem from "../../components/Resources/RenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Resources/NoResults";
import { useSelector } from "react-redux";

export default function FeedScreen({ navigation, route }) {
  const { filterType } = route.params;
  const resourceRequests = useSelector((state) => state.resources.resources);
  const isLoading = useSelector((state) => state.resources.isLoading);

  const user = useSelector((state) => state.user);
  const { email } = user;

  const [filteredRequests, setFilteredRequests] = useState([]);

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

  useLayoutEffect(() => {
    filterRequests(resourceRequests);
  }, [resourceRequests, filterType]);

  return (
    <FlatList
      data={filteredRequests}
      renderItem={({ item }) => <RenderItem item={item} />}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={isLoading ? Loader : NoResults}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={100}
      contentContainerStyle={styles.listContent}
      style={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  },
  listContent: {
    paddingVertical: "3%",
    paddingHorizontal: "4%",
  },
});

// const results = response.results.filter((item) => item.email === email);
// userRequest

// const result = response.results.filter(
//   (item) =>
//     item.requestApprovedByEmail !== email && item.requestStatus === "Approved"
// );
// approvedRequest

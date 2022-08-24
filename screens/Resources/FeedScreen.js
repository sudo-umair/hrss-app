import { StyleSheet, FlatList } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import RenderItem from "../../components/Resources/RenderItem";
import Loader from "../../components/UI/Loader";
import NoResults from "../../components/Resources/NoResults";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import { useSelector } from "react-redux";

export default function FeedScreen({ navigation, route }) {
  const { filterType } = route.params;
  const resourceRequests = useSelector((state) => state.resources.resources);
  const isLoading = useSelector((state) => state.resources.isLoading);

  const user = useSelector((state) => state.user);
  const { name, email, phone } = user;

  const [filteredRequests, setFilteredRequests] = useState([]);

  const filterRequests = (requests) => {
    if (filterType === "all") {
      setFilteredRequests(
        requests.filter(
          (request) =>
            request.requestStatus === "Pending" && request.name !== name
        )
      );
    } else if (filterType === "myRequests") {
      setFilteredRequests(requests.filter((item) => item.email === email));
    } else if (filterType === "approved") {
      setFilteredRequests(
        requests.filter(
          (item) =>
            item.requestApprovedByEmail === email &&
            item.requestStatus === "Approved"
        )
      );
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

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import Icon from "../components/UI/Icon";
import { GlobalStyles as gs } from "../utilities/constants/styles";
import React, { useState, useCallback, useLayoutEffect } from "react";
import Button from "../components/UI/Button";
import { getResourceRequestsList } from "../utilities/routes/resource";
import { useFocusEffect } from "@react-navigation/native";

export default function ResourcesScreen({ navigation }) {
  const [resourceRequests, setResourceRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const goToRequestResourceScreen = () => {
    navigation.navigate("RequestResource");
  };

  const goToRequestDetailsScreen = (request) => {
    navigation.navigate("ResourceRequestDetails", { request });
  };

  const getResourceRequestsListAll = useCallback(async () => {
    setIsLoading(true);
    const response = await getResourceRequestsList();
    if (response.status === "200") {
      setResourceRequests(response.results);
    } else {
      alert(response.message);
    }
    setIsLoading(false);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <RefreshButton />,
    });
    getResourceRequestsListAll();
    return () => {
      setResourceRequests([]);
    };
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <Pressable
        onPress={() => {
          goToRequestDetailsScreen(item);
        }}
        style={styles.itemContainer}
      >
        <View style={styles.row}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text
            style={[
              styles.requestStatus,
              item.requestStatus === "Pending"
                ? styles.pending
                : styles.approved,
            ]}
          >
            {item.requestStatus}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.resourceName}>{item.resourceName}</Text>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.duration}>Duration: {item.duration}</Text>
        </View>
      </Pressable>
    );
  });

  const RefreshButton = () => {
    return (
      <View
        style={{
          marginRight: 10,
        }}
      >
        <Icon
          lib="m"
          name="refresh"
          color="black"
          size={30}
          onPress={() => {
            getResourceRequestsListAll();
          }}
        />
      </View>
    );
  };

  const Loader = () => {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.loaderText}>Loading...</Text>
        <ActivityIndicator size="large" color={gs.colors.primary} />
      </View>
    );
  };

  const NoResults = () => {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResultsText}>Sorry, no data Found</Text>
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={goToRequestResourceScreen}
          buttonColor={gs.colors.primary}
          textSize={18}
        >
          Post A New Request
        </Button>
      </View>
      <View style={styles.divider}></View>
      <FlatList
        data={resourceRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={isLoading ? Loader : NoResults}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={100}
        // windowSize={10}
        contentContainerStyle={styles.listContent}
        style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    // paddingHorizontal: "5%",
    alignItems: "center",
    backgroundColor: gs.colors.background,
  },
  buttonContainer: {
    width: "90%",
    marginTop: "2%",
  },
  divider: {
    borderBottomColor: gs.colors.primary,
    borderBottomWidth: 1,
    width: "70%",
    marginVertical: "3%",
  },

  noResultsContainer: {
    flex: 1,
    alignItems: "center",
  },
  noResultsText: {
    marginVertical: "10%",
    paddingHorizontal: "10%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  listContainer: {
    width: "100%",
    paddingHorizontal: "5%",
  },
  listContent: {},
  itemContainer: {
    backgroundColor: gs.colors.primary,
    padding: "5%",
    marginBottom: "5%",
    borderRadius: 7,
    justifyContent: "space-between",
    height: 130,
    elevation: 5,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  requestStatus: {
    fontSize: 12,
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
  pending: {
    backgroundColor: "yellow",
    color: "black",
  },
  approved: {
    backgroundColor: "green",
  },
  resourceName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  quantity: {
    fontSize: 14,
    color: "white",
  },
  duration: {
    fontSize: 14,
    color: "white",
  },
  loaderContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loaderText: {
    marginVertical: "5%",
    fontSize: 18,
    fontWeight: "bold",
  },
});

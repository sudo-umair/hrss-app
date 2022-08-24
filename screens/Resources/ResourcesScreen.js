import { StyleSheet, View } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import ResourceTabs from "../../navigators/ResourceTabs";
import { GlobalStyles as gs } from "../../utilities/constants/styles";
import Button from "../../components/UI/Button";
import { getResourceRequestsList } from "../../utilities/routes/resource";
import RefreshButton from "../../components/Resources/RefreshButton";
import { useDispatch } from "react-redux";
import { setResources, setIsLoading } from "../../store/resources";
import { useFocusEffect } from "@react-navigation/native";

export default function ResourcesScreen({ navigation }) {
  const goToRequestResourceScreen = () => {
    navigation.navigate("RequestResource");
  };

  const dispatch = useDispatch();

  const getResourceRequests = useCallback(async () => {
    const response = await getResourceRequestsList({
      userType: "user",
    });
    if (response.status === "200") {
      dispatch(setResources(response.results));
      dispatch(setIsLoading(false));
    } else {
      alert(response.message);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <RefreshButton onPress={getResourceRequests} />,
    });
  }),
    [navigation, getResourceRequests];

  useFocusEffect(() => {
    getResourceRequests();
  }),
    [getResourceRequests];

  return (
    <>
      <View style={styles.rootContainer}>
        <Button
          style={styles.button}
          onPress={goToRequestResourceScreen}
          buttonColor={gs.colors.primary}
          textSize={18}
        >
          Post A New Request
        </Button>
      </View>
      <ResourceTabs />
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    alignItems: "center",
    backgroundColor: gs.colors.background,
  },
  button: {
    width: "98%",
    marginVertical: "2%",
  },
});

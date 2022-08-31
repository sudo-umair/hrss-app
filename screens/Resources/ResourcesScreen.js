import { StyleSheet } from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import ResourcesTabs from "../../navigators/ResourcesTabs";
import { getResourceRequestsList } from "../../utilities/routes/resource";
import { useDispatch } from "react-redux";
import { setResources, setIsLoading } from "../../store/resources";
import Icon from "../../components/UI/Icon";
import { useFocusEffect } from "@react-navigation/native";

export default function ResourcesScreen({ navigation }) {
  const goToRequestResourceScreen = () => {
    navigation.navigate("PostRequest");
  };

  const dispatch = useDispatch();

  const getResourceRequests = useCallback(async () => {
    dispatch(setIsLoading(true));
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          lib={"i"}
          size={26}
          color={"blue"}
          name={"ios-create-outline"}
          onPress={goToRequestResourceScreen}
        />
      ),
      headerRightContainerStyle: {
        marginRight: 10,
      },
    });
  }, []);

  useFocusEffect(() => {
    getResourceRequests();
  });

  useLayoutEffect(() => {
    return () => {
      dispatch(setResources([]));
      dispatch(setIsLoading(true));
    };
  }, []);

  return <ResourcesTabs />;
}

const styles = StyleSheet.create({});

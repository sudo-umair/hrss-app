import { StyleSheet } from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import VolunteerTabs from "../../navigators/VolunteerTabs";
import { getVolunteerRequests } from "../../utilities/routes/volunteers";
import { useDispatch } from "react-redux";
import {
  setVolunteers,
  removeVolunteers,
  setIsLoading,
} from "../../store/volunteers";
import { useFocusEffect } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";

export default function VolunteersScreen({ navigation }) {
  const dispatch = useDispatch();

  const fetchVolunteerRequests = useCallback(async () => {
    dispatch(setIsLoading(true));
    const response = await getVolunteerRequests();
    if (response.status === "200") {
      dispatch(setVolunteers(response.results));
      dispatch(setIsLoading(false));
    } else {
      showMessage({
        message: "Something went wrong",
        type: "warning",
        icon: "warning",
      });
    }
  }, []);

  useFocusEffect(() => {
    fetchVolunteerRequests();
  });

  useLayoutEffect(() => {
    return () => {
      dispatch(removeVolunteers());
      dispatch(setIsLoading(true));
    };
  }, []);

  return <VolunteerTabs />;
}

const styles = StyleSheet.create({});

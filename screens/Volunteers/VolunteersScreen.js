import { StyleSheet } from "react-native";
import React, { useCallback } from "react";
import VolunteerTabs from "../../navigators/VolunteerTabs";
import { getVolunteerRequests } from "../../utilities/routes/volunteers";
import { useDispatch } from "react-redux";
import {
  setVolunteers,
  removeVolunteers,
  setIsLoading,
} from "../../store/volunteers";
import { showMessage } from "react-native-flash-message";
import { useFocusEffect } from "@react-navigation/native";

export default function VolunteersScreen({ navigation }) {
  const dispatch = useDispatch();

  const fetchVolunteerRequests = useCallback(async () => {
    dispatch(setIsLoading(true));
    const response = await getVolunteerRequests();
    if (response.status === "200") {
      dispatch(setVolunteers(response.results));
    } else {
      showMessage({
        message: response.message,
        description: "Couldn't reach servers at the moment",
        type: "warning",
        icon: "warning",
      });
    }
    dispatch(setIsLoading(false));
  }, []);

  useFocusEffect(() => {
    fetchVolunteerRequests();

    return () => {
      dispatch(removeVolunteers());
      dispatch(setIsLoading(false));
    };
  });

  return <VolunteerTabs />;
}

const styles = StyleSheet.create({});

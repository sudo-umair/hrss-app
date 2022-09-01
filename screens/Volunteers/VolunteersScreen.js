import { StyleSheet } from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import VolunteerTabs from "../../navigators/VolunteerTabs";
import { getVolunteerRequests } from "../../utilities/routes/volunteers";
import { useDispatch } from "react-redux";
import {
  setVolunteers,
  removeVolunteers,
  setVolunteersLoading,
} from "../../store/volunteers";
import { useFocusEffect } from "@react-navigation/native";

export default function VolunteersScreen({ navigation }) {
  const dispatch = useDispatch();

  const fetchVolunteerRequests = useCallback(async () => {
    dispatch(setVolunteersLoading(true));
    const response = await getVolunteerRequests();
    if (response.status === "200") {
      dispatch(setVolunteers(response.results));
      dispatch(setVolunteersLoading(false));
    } else {
      alert(response.message);
    }
  }, []);

  useFocusEffect(() => {
    fetchVolunteerRequests();

    return () => {
      dispatch(removeVolunteers());
      dispatch(setVolunteersLoading(true));
    };
  });

  return <VolunteerTabs />;
}

const styles = StyleSheet.create({});

import { StyleSheet } from "react-native";
import React, { useCallback, useLayoutEffect } from "react";
import VolunteerTabs from "../../navigators/VolunteerTabs";
import {
  getVolunteerRequests,
  getMyVolunteerRequests,
} from "../../utilities/routes/volunteers";
import { useDispatch } from "react-redux";
import {
  setVolunteers,
  setMyRequests,
  removeMyRequests,
  removeVolunteers,
  setMyRequestsLoading,
  setVolunteersLoading,
} from "../../store/volunteers";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

export default function VolunteersScreen({ navigation }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchVolunteerRequests = useCallback(async () => {
    dispatch(setVolunteersLoading(true));
    const response = await getVolunteerRequests();
    if (response.status === "200") {
      const filtered = response?.results.filter(
        (item) =>
          item.requestStatus === "Enabled" &&
          !item.applicants.find(
            (applicant) => applicant.applicantEmail === user.email
          )
      );
      dispatch(setVolunteers(filtered.reverse()));
      dispatch(setVolunteersLoading(false));
    } else {
      alert(response.message);
    }
  }, []);

  const fetchMyVolunteerRequests = useCallback(async () => {
    dispatch(setMyRequestsLoading(true));
    const response = await getMyVolunteerRequests({
      applicantEmail: user.email,
    });
    if (response.status === "200") {
      dispatch(setMyRequests(response.results.reverse()));
      dispatch(setMyRequestsLoading(false));
    } else {
      alert(response.message);
    }
  }, []);

  useFocusEffect(() => {
    fetchVolunteerRequests();
    fetchMyVolunteerRequests();

    return () => {
      dispatch(removeVolunteers());
      dispatch(removeMyRequests());

      dispatch(setVolunteersLoading(true));
      dispatch(setMyRequestsLoading(true));
    };
  });

  return <VolunteerTabs />;
}

const styles = StyleSheet.create({});

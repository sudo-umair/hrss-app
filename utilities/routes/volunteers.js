import axios from "axios";
import { GLOBALS } from "../constants/config";

export async function getVolunteerRequests() {
  try {
    const response = await axios.get(
      `${GLOBALS.BASE_URL}/volunteers/fetchAllRequests`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function applyForVolunteerRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/volunteers/applyForVolunteerRequest`,
      record
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function withdrawVolunteerRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/volunteers/withdrawVolunteerRequest`,
      record
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function hideVolunteerRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/volunteers/hideVolunteerRequest`,
      record
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

import axios from "axios";
import { GLOBALS } from "../constants/config";

export async function postResourceRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/postRequest`,
      record
    );
    return (res = {
      status: response.data.status,
      message: response.data.message,
    });
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function getResourceRequestsList(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/fetchRequests`,
      record
    );
    return (res = {
      status: response.data.status,
      message: response.data.message,
      results: response.data.results,
    });
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function getTotalNumberOfRequests(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/totalNumberOfRequests`,
      record
    );
    return (res = {
      status: response.data.status,
      message: response.data.message,
      data: response.data?.data,
    });
  } catch (err) {
    console.log(err, "ddd");
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function getResourceRequestsListByEmail(email) {
  try {
    const response = await axios.get(
      `${GLOBALS.BASE_URL}/resources/fetchRequestsByEmail`,
      email
    );
    return (res = {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function updateResourceRequest(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/resources/updateRequest`,
      record
    );
    return (res = {
      status: response.data.status,
      message: response.data.message,
    });
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

import axios from "axios";
import { GLOBALS } from "../constants/config";

export async function postResourceRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/postRequest`,
      record
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

export async function getResourceRequestsList(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/fetchRequests`,
      record
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

export async function getTotalNumberOfRequests(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/totalNumberOfRequests`,
      record
    );
    return response.data;
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
    return response.data;
  } catch (err) {
    console.log(err);
    return (res = {
      status: "error",
      message: err.message,
    });
  }
}

export async function approveResourceRequest(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/resources/approveRequest`,
      record
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

export async function deleteResourceRequest(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/resources/deleteRequest`,
      record
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

export async function ignoreResourceRequest(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/resources/ignoreRequest`,
      record
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

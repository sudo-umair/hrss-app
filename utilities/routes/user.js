import axios from "axios";
import { GLOBALS } from "../constants/config";
import { getDataFromLocalStorage } from "../helpers/local-storage";

export async function checkCredentials() {
  try {
    const data = await getDataFromLocalStorage();
    if (data != null) {
      try {
        const response = await signIn(data);
        if (response.status === "200") {
          return (res = {
            status: true,
            message: response.message,
            user: { ...response.user, password: data.password },
          });
        } else {
          return (res = {
            status: false,
            message: response.message,
          });
        }
      } catch (error) {
        console.log(error, "Error checkCredentials");
        return (res = {
          status: false,
          message: error.message,
        });
      }
    } else {
      return (res = {
        status: false,
        message: "No data found in local storage",
      });
    }
  } catch (error) {
    console.log(error);
    return (res = {
      status: "error retrieving data from local storage",
      message: error.message,
    });
  }
}

export async function signIn(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/signin`,
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

export async function signUp(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/signup`,
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

export async function updateAccount(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/users/updateAccount`,
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

export async function deleteAccount(record) {
  try {
    console.log(record);
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/deleteAccount`,
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

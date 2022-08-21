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
          console.log(response.message);
          return (res = {
            status: true,
            message: response.message,
            user: { ...response.user, password: data.password },
          });
        } else {
          console.log(response.message);
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
    return (res = {
      status: response.data.status,
      message: response.data.message,
      user: response.data.user,
    });
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

export async function update(record) {
  try {
    const response = await axios.put(
      `${GLOBALS.BASE_URL}/users/update`,
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

export async function deleteAccount(record) {
  try {
    const response = await axios.post(
      `${GLOBALS.BASE_URL}/users/delete`,
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

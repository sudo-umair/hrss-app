import axios from "axios";
import { GLOBALS } from "../constants/config";
import { getDataFromLocalStorage } from "../helpers/local-storage";

export async function checkCredentials() {
  try {
    const data = await getDataFromLocalStorage();
    console.log(data);
    if (data != null) {
      const response = await signIn(data);
      const status = response.status;
      console.log(status);
      if (status === "200") {
        console.log(response.message);
        return {
          status: true,
          message: response.message,
          user: { ...response.user, password: data.password },
          // storing plain text password in user object instead of hashed password
        };
      } else {
        console.log({
          status: false,
          message: response.message,
        });
        return false;
      }
    } else {
      console.log("No data found");
      return {
        status: false,
        message: "No data found",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      status: false,
      message: err.message,
    };
  }
}

export async function signIn(record) {
  try {
    const response = await axios.post(`${GLOBALS.BASE_URL}/user/login`, record);
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
      `${GLOBALS.BASE_URL}/user/signup`,
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
    const response = await axios.put(`${GLOBALS.BASE_URL}/user/update`, record);
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
      `${GLOBALS.BASE_URL}/user/delete`,
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

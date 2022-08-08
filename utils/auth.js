import axios from "axios";
import { GLOBALS } from "./config";
import { getData } from "./local-storage";

export const checkCredentials = async () => {
  try {
    const data = await getData();
    console.log(data);
    if (data != null) {
      const res = await login(data);
      const status = res.status;
      console.log(status);
      if (status === "200") {
        console.log(res.message);
        return {
          status: true,
          message: res.message,
          user: res.user,
        };
      } else {
        console.log({
          status: false,
          message: res.message,
        });
        return false;
      }
    } else {
      console.log("No data found");
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export async function login(record) {
  try {
    const response = await axios.post(`${GLOBALS.BASE_URL}/login`, record);
    return (res = {
      status: response.data.status,
      message: response.data.message,
      user: response.data.user,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function signup(record) {
  try {
    const response = await axios.post(`${GLOBALS.BASE_URL}/signup`, record);
    return (res = {
      status: response.data.status,
      message: response.data.message,
    });
  } catch (err) {
    console.log(err);
  }
}

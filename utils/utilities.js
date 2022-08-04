import AsyncStorage from "@react-native-async-storage/async-storage";
import { GLOBALS } from "./config";
import axios from "axios";
import useUserStore from "../store/userStore";

export const getData = async () => {
  try {
    const jsonRecord = await AsyncStorage.getItem("userCreds");
    return jsonRecord != null ? JSON.parse(jsonRecord) : null;
  } catch (e) {
    console.log(e);
  }
};

export const checkCredentials = async () => {
  try {
    const data = await getData();
    console.log(data);
    if (data != null) {
      const { email, password } = data;
      const res = await axios.post(`${GLOBALS.BASE_URL}/login`, {
        email,
        password,
      });
      const status = res.data.status;
      console.log(status);
      if (status === "200") {
        console.log(res.data.message);
        // useUserStore.setIsLoggedIn(true);
        return true;
      } else {
        console.log(res.data.message);
        // useUserStore.setIsLoggedIn(false);
        return false;
      }
    } else {
      // useUserStore.setIsLoggedIn(false);
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

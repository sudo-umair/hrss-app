import AsyncStorage from "@react-native-async-storage/async-storage";
import { GLOBALS } from "./config";
import axios from "axios";

export const getData = async () => {
  try {
    const jsonRecord = await AsyncStorage.getItem("userCreds");
    return jsonRecord != null ? JSON.parse(jsonRecord) : null;
  } catch (e) {
    console.log(e);
  }
};

const checkCredentials = async () => {
  const data = await getData();
  console.log(data);
  if (data != null) {
    const { email, password } = data;

    axios
      .post(`${GLOBALS.BASE_URL}/login`, {
        email,
        password,
      })
      .then((res) => {
        const status = res.data.status;
        console.log(status);
        if (status === "200") {
          console.log(res.data.message);
          return true;
        } else {
          console.log(res.data.message);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    return false;
  }
};

module.exports = {
  checkCredentials,
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const jsonRecord = await AsyncStorage.getItem("userCreds");
    console.log("localstorage.js", jsonRecord);
    return jsonRecord != null ? JSON.parse(jsonRecord) : null;
  } catch (e) {
    console.log(e);
  }
};

export const setData = async (jsonRecord) => {
  try {
    const record = JSON.stringify(jsonRecord);
    await AsyncStorage.setItem("userCreds", record);
    console.log("localstorage.js", record);
  } catch (e) {
    console.log(e);
  }
};

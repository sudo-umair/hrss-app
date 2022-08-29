import axios from "axios";
import { GLOBALS } from "../constants/config";

export async function getVolunteersRequest() {
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

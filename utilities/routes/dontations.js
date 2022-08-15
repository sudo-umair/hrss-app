import axios from "axios";
import { GLOBALS } from "../constants/config";

export async function getDonationsList(record) {
  try {
    const response = await axios.get(
      `${GLOBALS.BASE_URL}/donations/getDonationsList`
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

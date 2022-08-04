import axios from "axios";
import { GLOBALS } from "./config";

export async function login(rec) {
  try {
    const res = await axios.post(`${GLOBALS.BASE_URL}/login`, rec);
    const status = res.data.status;
    if (status === "200") {
      return res.data.message;
    } else {
      return res.data.message;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function signup(rec) {
  try {
    const res = await axios.post(`${GLOBALS.BASE_URL}/signup`, rec);
    const status = res.data.status;
    if (status === "200") {
      return res.data.message;
    } else {
      return res.data.message;
    }
  } catch (err) {
    console.log(err);
  }
}

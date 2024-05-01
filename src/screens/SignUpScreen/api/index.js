import axios from "axios";
import { ipLogin } from "@env";
export async function signUp(data) {
  if (data) {
    try {
      let result = await axios.post(`${ipLogin}/signUp`, data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}

import axios from "axios";
import { ipPassword } from "@env";

export async function updatePassword(data) {
  if (data) {
    try {
      let result = await axios.post(`${ipPassword}/updatePassword`, data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}

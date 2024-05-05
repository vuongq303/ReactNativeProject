import axios from "axios";
import { ip_password } from "../../../service/.env";

export async function updatePassword(data) {
  if (data) {
    try {
      let result = await axios.post(`${ip_password}/updatePassword`, data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}

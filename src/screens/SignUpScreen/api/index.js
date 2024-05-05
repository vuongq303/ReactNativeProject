import axios from "axios";
import { ip_login } from "../../../service/.env";
export async function signUp(data) {
  if (data) {
    try {
      let result = await axios.post(`${ip_login}/signUp`, data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}

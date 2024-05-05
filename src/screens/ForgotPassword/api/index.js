import axios from "axios";
import { ip_password } from "../../../service/.env";

export async function findEmail(data) {
  try {
    let result = await axios.post(`${ip_password}/findEmail`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

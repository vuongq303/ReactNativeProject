import axios from "axios";
import { ip_password } from "../../../service/.env";

export async function createOtp(data) {
  try {
    let result = await axios.post(`${ip_password}/createOtp`, { to: data });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

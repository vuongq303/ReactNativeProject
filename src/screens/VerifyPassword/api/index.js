import axios from "axios";
import { ipPassword } from "@env";

export async function createOtp(data) {
  try {
    let result = await axios.post(`${ipPassword}/createOtp`, { to: data });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

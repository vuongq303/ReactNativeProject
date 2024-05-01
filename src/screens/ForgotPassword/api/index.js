import axios from "axios";
import { ipPassword } from "@env";

export async function findEmail(data) {
  try {
    let result = await axios.post(`${ipPassword}/findEmail`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

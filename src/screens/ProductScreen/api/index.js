import { ipCart } from "@env";
import axios from "axios";
export async function addProductToCart(data) {
  try {
    let result = await axios.post(`${ipCart}/addProductToCart`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

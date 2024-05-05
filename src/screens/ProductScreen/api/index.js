import axios from "axios";
import { ip_cart } from "../../../service/.env";
export async function addProductToCart(data) {
  try {
    let result = await axios.post(`${ip_cart}/addProductToCart`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

import axios from "axios";
import { ip_cart } from "../../../service/.env";

export async function removeProduct(data) {
  try {
    let result = await axios.post(`${ip_cart}/removeProductCart`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductId(data) {
  try {
    let result = await axios.post(`${ip_cart}/getProductId`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductToCart(data) {
  try {
    let result = await axios.post(`${ip_cart}/updateProductToCart`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

import axios from "axios";
import { ipCart } from "@env";

export async function removeProduct(data) {
  try {
    let result = await axios.post(`${ipCart}/removeProductCart`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductId(data) {
  try {
    let result = await axios.post(`${ipCart}/getProductId`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductToCart(data) {
  try {
    let result = await axios.post(`${ipCart}/updateProductToCart`, data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

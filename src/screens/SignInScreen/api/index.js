import axios from "axios";
import { setStorage } from "../../../service/storageService";
import { ip_login } from "../../../service/.env";

export async function signIn(data) {
  console.log(ip_login);
  if (data) {
    try {
      let result = await axios.post(`${ip_login}/signIn`, data);
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}

export async function encryptionLogin(data, idUser) {
  await setStorage("@infoUser", idUser);
  console.log("Saved id User");
  if (data) {
    try {
      let result = await axios.post(`${ip_login}/encryptionLogin`, data);
      await setStorage("@keyUser", result.data);
      console.log("Save key complete");
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}

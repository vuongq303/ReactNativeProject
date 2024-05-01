import axios from "axios";
import { ipLogin } from "@env";
import { setStorage } from "../../../service/storageService";

export async function signIn(data) {
  if (data) {
    try {
      let result = await axios.post(`${ipLogin}/signIn`, data);
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
      let result = await axios.post(`${ipLogin}/encryptionLogin`, data);
      await setStorage("@keyUser", result.data);
      console.log("Save key complete");
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  return false;
}

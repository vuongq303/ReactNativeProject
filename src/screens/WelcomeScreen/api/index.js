import axios from "axios";
import { getStorage } from "../../../service/storageService";
import { ipLogin } from "@env";

export async function decryptionLogin() {
  const token = await getStorage("@keyUser");
  console.log(token);
  if (token) {
    let { data } = await axios.post(`${ipLogin}/decryptionLogin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return data;
  }
  return false;
}

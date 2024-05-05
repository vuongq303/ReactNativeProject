import axios from "axios";
import { getStorage } from "../../../service/storageService";
import { ip_login } from "../../../service/.env";

export async function decryptionLogin() {
  const token = await getStorage("@keyUser");
  if (token) {
    let { data } = await axios.post(`${ip_login}/decryptionLogin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log(data);
    return data;
  }
  return false;
}

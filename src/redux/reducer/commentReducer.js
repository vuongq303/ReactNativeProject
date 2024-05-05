import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from "../../service/toastService";
import { getStorage } from "../../service/storageService";
import { ip_commnet } from "../../service/.env";

export const sendComment = createAsyncThunk(
  "comment/sendComment",
  async (val) => {
    const idUser = await getStorage("@infoUser");
    try {
      let { data } = await axios.post(`${ip_commnet}/addComment`, {
        idUser,
        idProduct: val.itemId,
        text: val.text,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (val) => {
    try {
      let { data } = await axios.get(`${ip_commnet}/getComment`, {
        params: {
          idProduct: val.itemId,
        },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const slice = createSlice({
  name: "comment",
  initialState: {
    data: [],
    loading: true,
    err: null,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(sendComment.fulfilled, (s, a) => {
      s.data.push(a.payload);
      Toast("Send comment complete !");
    });
    b.addCase(getComment.fulfilled, (s, a) => {
      s.data = a.payload;
      s.loading = false;
      s.err = null;
    });
  },
});
export default slice.reducer;

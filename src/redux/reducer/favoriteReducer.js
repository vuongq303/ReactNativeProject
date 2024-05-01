import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ipFavorite } from "@env";
import axios from "axios";
import Storage from "../../../key/Storage";
import Toast from "../../service/toastService";

export const getProductFavorite = createAsyncThunk(
  "favorite/getProduct",
  async () => {
    try {
      const idUser = await Storage.getData("@infoUser");
      let { data } = await axios.get(`${ipFavorite}/getProductFavorite`, {
        params: { id: idUser },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProductToFavorite = createAsyncThunk(
  "favorite/addProduct",
  async (val) => {
    try {
      let { data } = await axios.post(`${ipFavorite}/addToFavorite`, val);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeFromFavorite = createAsyncThunk(
  "favorite/removeProduct",
  async (val) => {
    try {
      let { data } = await axios.post(`${ipFavorite}/removeFromFavorite`, val);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const checkInFavorite = createAsyncThunk(
  "favorite/checkIn",
  async (val) => {
    try {
      let { data } = await axios.post(`${ipFavorite}/checkInFavorite`, val);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const slice = createSlice({
  name: "favorite",
  initialState: {
    data: [],
    err: null,
    loading: true,
    heart: "",
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getProductFavorite.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.err = null;
    });
    b.addCase(addProductToFavorite.fulfilled, (state, action) => {
      state.data.push(action.payload);
      Toast("Add to favorite complete !");
      state.heart = "heart";
      state.err = null;
    });
    b.addCase(removeFromFavorite.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (e) => e.idProduct !== action.payload.idProduct
      );
      state.err = null;
      state.heart = "hearto";
      Toast("Remove from favorite complete !");
    });
    b.addCase(checkInFavorite.fulfilled, (state, action) => {
      state.heart = action.payload == 1 ? "heart" : "hearto";
      state.err = null;
    });
  },
});
export default slice.reducer;

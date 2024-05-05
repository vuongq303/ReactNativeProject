import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ip_product } from "../../service/.env";

export const getProducts = createAsyncThunk("product/getProduct", async () => {
  try {
    const { data } = await axios.get(`${ip_product}/getProducts`);
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const getItemProduct = createAsyncThunk(
  "product/getItemProduct",
  async (val) => {
    try {
      let { data } = await axios.post(`${ip_product}/getItemProduct`, val);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const slice = createSlice({
  name: "listProduct",
  initialState: {
    data: [],
    dataSearch: [],
    loading: true,
    err: null,
    item: {},
    loadingItem: true,
  },
  reducers: {
    searchProduct: (state, action) => {
      state.dataSearch = state.data.filter((e) => {
        if (
          e.productName.toLowerCase().includes(action.payload.toLowerCase())
        ) {
          return e;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.err = null;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = true;
      state.err = action.payload;
    });
  },
});
export const { searchProduct } = slice.actions;
export default slice.reducer;

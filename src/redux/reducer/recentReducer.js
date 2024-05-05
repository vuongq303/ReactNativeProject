import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getStorage } from "../../service/storageService";
import { ip_rencent } from "../../service/.env";

export const getRecent = createAsyncThunk("product/getRecent", async () => {
  try {
    const id = await getStorage("@infoUser");
    let { data } = await axios.get(`${ip_rencent}/getRecent?id=${id}`);
    return data;
  } catch (error) {
    console.log("getRecent: " + error);
  }
});

export const addRecent = createAsyncThunk("product/addRecent", async (val) => {
  try {
    let { data } = await axios.post(`${ip_rencent}/addRecent`, val);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removeRecent = createAsyncThunk(
  "product/removeRecent",
  async (val) => {
    try {
      let { data } = await axios.post(`${ip_rencent}/removeRecent`, { id: val });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const slice = createSlice({
  name: "recent",
  initialState: {
    data: [],
    loading: true,
    err: false,
  },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(getRecent.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.err = null;
    });
    b.addCase(getRecent.rejected, (state, action) => {
      state.loading = true;
      state.err = action.payload;
      
    });
    b.addCase(addRecent.fulfilled, (state, action) => {
      if (action.payload) {
        console.log(action.payload);
        state.data.push(action.payload);
        state.err = null;
      }
    });
    b.addCase(removeRecent.fulfilled, (state, action) => {
      state.data = [];
      state.err = null;
    });
  },
});
export default slice.reducer;

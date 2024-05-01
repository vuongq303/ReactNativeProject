import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Storage from "../../../key/Storage";
import axios from "axios";
import { ipRecent } from "@env";

export const getRecent = createAsyncThunk("product/getRecent", async () => {
  try {
    const id = await Storage.getData("@infoUser");
    let { data } = await axios.get(`${ipRecent}/getRecent?id=${id}`);
    return data;
  } catch (error) {
    console.log("getRecent: " + error);
  }
});

export const addRecent = createAsyncThunk("product/addRecent", async (val) => {
  try {
    let { data } = await axios.post(`${ipRecent}/addRecent`, val);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removeRecent = createAsyncThunk(
  "product/removeRecent",
  async (val) => {
    try {
      let { data } = await axios.post(`${ipRecent}/removeRecent`, { id: val });
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

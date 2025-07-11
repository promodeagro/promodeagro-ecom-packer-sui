import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

export const authSignOut = createAsyncThunk(
  "auth/signOut",
  async (_, { rejectWithValue }) => { // No payload needed
    try {
      const url = config.SIGNOUT;
      const response = await postLoginService.post(url, {}); // Send empty object
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: 'Unknown error' });
    }
  }
);

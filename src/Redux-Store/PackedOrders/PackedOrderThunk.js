import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";
// import axios from "axios";

// Fetch all packed orders
export const fetchpackedOrders = createAsyncThunk(
  'packedOrders/fetchpackedOrders',
  async (params) => {
    try {
      let url = config.FETCH_PACKEDORDERS;
      const response = await postLoginService.get(url);
         console.log(response,"packed order");
        return response.data
   
      // return orderslist;
    } catch (error) {
      return error
      // return orderslist;
    }
  }
);

export const fetchOrderDetailsById = createAsyncThunk(
'packedOrders/fetchOrderDetailsById',
  async (orderId, { rejectWithValue }) => {
    try {
      const url = `${config.FETCH_ORDERSDETAILs_BY_ID}/${orderId}`;
      const response = await postLoginService.get(url);
      console.log(response.data, "async specific data");
      return response.data;
    
    } catch (error) {
      console.error("API error:", error); // Log API error
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


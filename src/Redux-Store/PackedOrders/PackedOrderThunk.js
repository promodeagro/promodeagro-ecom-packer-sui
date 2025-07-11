import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

// Fetch packed orders (already defined)
export const fetchpackedOrders = createAsyncThunk(
  'packedOrders/fetchpackedOrders',
  async (params, { rejectWithValue }) => {
    try {
      let url = config.ORDERS_PACKED; // Use the correct local endpoint
      const response = await postLoginService.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch order details by orderId
export const fetchOrderDetailsById = createAsyncThunk(
  'packedOrders/fetchOrderDetailsById',
  async (orderId, { rejectWithValue }) => {
    try {
      let url = `${config.FETCH_ORDERSDETAILs_BY_ID}/${orderId}`; // Assuming config.ORDER_DETAILS is the base URL
      const response = await postLoginService.get(url);
      console.log(response, "order details");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

export const fetchUnpackedOrders = createAsyncThunk(
  "orders/unpacked",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postLoginService.get(config.ORDERS_UNPACKED);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPackedOrders = createAsyncThunk(
  "orders/packed",
  async (_, { rejectWithValue }) => {
    try {
      const response = await postLoginService.get(config.ORDERS_PACKED);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "orders/details",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await postLoginService.get(`${config.ORDER_DETAILS}/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const completeOrder = createAsyncThunk(
  "orders/complete",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await postLoginService.post(config.ORDER_COMPLETE, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


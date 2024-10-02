import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

export const fetchOrders = createAsyncThunk(
  "orders",
  async (params) => {
    try {
      let url = config.FETCH_ORDERS;
      const response = await postLoginService.get(url);
         console.log(response,"order");
        return response.data
   
      // return orderslist;
    } catch (error) {
      return error
      // return orderslist;
    }
  }
);
// Thunk to upload photo (POST request)
export const uploadPhotoThunk = createAsyncThunk(
  'packedOrders/uploadPhoto',
  async ({ orderId, photo }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://3ncf9yui1h.execute-api.us-east-1.amazonaws.com/dev/orders/${orderId}/upload-photo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: photo }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }

      return await response.json(); // Return the response data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to complete packed order (PUT request)
export const completePackedOrderThunk = createAsyncThunk(
  'packedOrders/completePackedOrder',
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://3ncf9yui1h.execute-api.us-east-1.amazonaws.com/dev/orders/${orderId}/CompletePacked`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Status: 'Packed' }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to complete packing the order');
      }

      return await response.json(); // Return the response data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


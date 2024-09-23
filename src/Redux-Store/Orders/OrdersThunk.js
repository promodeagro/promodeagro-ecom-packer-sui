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


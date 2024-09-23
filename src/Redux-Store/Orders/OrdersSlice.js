import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrders,

} from "Redux-Store/Orders/OrdersThunk";
import status from "Redux-Store/Constants";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    ordersData: {
      status: null,
    },
    order_details: {
      status: null,
    },
    order_viewattachments: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending.toString(), (state, action) => {
        return {
          ...state,
          ordersData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchOrders.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          ordersData: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(fetchOrders.rejected.toString(), (state, action) => {
        return {
          ...state,
          ordersData: {
            status: status.FAILURE,
          },
        };

      });
  },
});

export default OrderSlice.reducer;

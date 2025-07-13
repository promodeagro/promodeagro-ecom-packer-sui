import { createSlice } from "@reduxjs/toolkit";
import { fetchUnpackedOrders, fetchPackedOrders, fetchOrderDetails, completeOrder } from "./OrdersThunk";

const initialState = {
  ordersData: {
    status: null,
    data: null,
    error: null,
  },
  packedOrdersData: {
    status: null,
    data: null,
    error: null,
  },
  order_details: {
    status: null,
    data: null,
    error: null,
  },
  completeOrderStatus: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Unpacked Orders
      .addCase(fetchUnpackedOrders.pending, (state) => {
        state.ordersData.status = "loading";
        state.ordersData.error = null;
      })
      .addCase(fetchUnpackedOrders.fulfilled, (state, { payload }) => {
        state.ordersData.status = "succeeded";
        state.ordersData.data = payload;
      })
      .addCase(fetchUnpackedOrders.rejected, (state, action) => {
        state.ordersData.status = "failed";
        state.ordersData.error = action.payload || action.error.message;
      })
      // Fetch Packed Orders (if you want to store them here too)
      .addCase(fetchPackedOrders.pending, (state) => {
        state.packedOrdersData.status = "loading";
        state.packedOrdersData.error = null;
      })
      .addCase(fetchPackedOrders.fulfilled, (state, { payload }) => {
        state.packedOrdersData.status = "succeeded";
        state.packedOrdersData.data = payload;
      })
      .addCase(fetchPackedOrders.rejected, (state, action) => {
        state.packedOrdersData.status = "failed";
        state.packedOrdersData.error = action.payload || action.error.message;
      })
      // Fetch Order Details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.order_details.status = "loading";
        state.order_details.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, { payload }) => {
        state.order_details.status = "succeeded";
        state.order_details.data = payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.order_details.status = "failed";
        state.order_details.error = action.payload || action.error.message;
      })
      // Complete Order
      .addCase(completeOrder.pending, (state) => {
        state.completeOrderStatus = "loading";
      })
      .addCase(completeOrder.fulfilled, (state) => {
        state.completeOrderStatus = "succeeded";
      })
      .addCase(completeOrder.rejected, (state) => {
        state.completeOrderStatus = "failed";
      });
  },
});

export default OrderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, uploadPhotoThunk, completePackedOrderThunk } from "Redux-Store/Orders/OrdersThunk";
import status from "Redux-Store/Constants";

const OrderSlice = createSlice({
  name: "orders",
  initialState: {
    ordersData: {
      status: null,
      data: null,
    },
    order_details: {
      status: null,
      data: null,
    },
    order_viewattachments: {
      status: null,
      data: null,
    },
    uploadPhotoStatus: null,
    completeOrderStatus: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.ordersData.status = status.IN_PROGRESS;
      })
      .addCase(fetchOrders.fulfilled, (state, { payload }) => {
        state.ordersData.status = status.SUCCESS;
        state.ordersData.data = payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.ordersData.status = status.FAILURE;
      })
      
      // Upload Photo
      .addCase(uploadPhotoThunk.pending, (state) => {
        state.uploadPhotoStatus = status.IN_PROGRESS;
      })
      .addCase(uploadPhotoThunk.fulfilled, (state, { payload }) => {
        state.uploadPhotoStatus = status.SUCCESS;
        state.order_viewattachments.data = payload;  // Handle photo upload response
      })
      .addCase(uploadPhotoThunk.rejected, (state) => {
        state.uploadPhotoStatus = status.FAILURE;
      })

      // Complete Packed Order
      .addCase(completePackedOrderThunk.pending, (state) => {
        state.completeOrderStatus = status.IN_PROGRESS;
      })
      .addCase(completePackedOrderThunk.fulfilled, (state, { payload }) => {
        state.completeOrderStatus = status.SUCCESS;
        // Handle complete packed order response if needed
      })
      .addCase(completePackedOrderThunk.rejected, (state) => {
        state.completeOrderStatus = status.FAILURE;
      });
  },
});

export default OrderSlice.reducer;

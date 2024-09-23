import { createSlice } from "@reduxjs/toolkit";
import { fetchpackedOrders, fetchOrderDetailsById } from "./PackedOrderThunk"; // Import the required thunks

const packedOrdersSlice = createSlice({
  name: 'packedOrders',
  initialState: {
    ordersData: {
      data: null,
      status: 'idle',
      error: null,
    },
    orderDetails: {
      data: null,  // Holds specific order details
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling packed orders fetching
    builder
      .addCase(fetchpackedOrders.pending, (state) => {
        state.ordersData.status = 'loading';
      })
      .addCase(fetchpackedOrders.fulfilled, (state, action) => {
        state.ordersData.data = action.payload;
        state.ordersData.status = 'succeeded';
      })
      .addCase(fetchpackedOrders.rejected, (state, action) => {
        state.ordersData.status = 'failed';
        state.ordersData.error = action.error.message;
      });

    // Handling fetching a specific order by ID
    builder
      .addCase(fetchOrderDetailsById.pending, (state) => {
        state.orderDetails.status = 'loading';
      })
      .addCase(fetchOrderDetailsById.fulfilled, (state, action) => {
        state.orderDetails.data = action.payload;
        state.orderDetails.status = 'succeeded';
      })
      .addCase(fetchOrderDetailsById.rejected, (state, action) => {
        state.orderDetails.status = 'failed';
        state.orderDetails.error = action.error.message;
      });
  },
});

export default packedOrdersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomers } from "Redux-Store/Customers/CustomersThunk";
import status from "../Constants";

const CustomersSlice = createSlice({
  name: "quataions",
  initialState: {
    customers: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending.toString(), (state, action) => {
        return {
          ...state,
          customers: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchCustomers.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          customers: {
            status: status.SUCCESS,
            data: payload.data,
          },
        };
      })
      .addCase(fetchCustomers.rejected.toString(), (state, action) => {
        return {
          ...state,
          customers: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default CustomersSlice.reducer;

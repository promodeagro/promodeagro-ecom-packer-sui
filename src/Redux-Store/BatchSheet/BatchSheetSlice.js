import { createSlice } from "@reduxjs/toolkit";
import {
fetchBatchSheet
} from "Redux-Store/BatchSheet/BatchThunk";
import status from "Redux-Store/Constants";

const BatchSheetSlice = createSlice({
  name: "batchsheet",
  initialState: {
    batchSheetData: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBatchSheet.pending.toString(), (state, action) => {
        return {
          ...state,
          batchSheetData: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchBatchSheet.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          batchSheetData: {
            status: status.SUCCESS,
            data: payload.data,
          },
        };
      })
      .addCase(fetchBatchSheet.rejected.toString(), (state, action) => {
        return {
          ...state,
          batchSheetData: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default BatchSheetSlice.reducer;

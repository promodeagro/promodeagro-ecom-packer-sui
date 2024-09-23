import { createSlice } from "@reduxjs/toolkit";
import { fetchQuotations } from "Redux-Store/Quotations/QuotationsThunk";
import status from "../Constants";

const QuotationsSlice = createSlice({
  name: "quataions",
  initialState: {
    quotations: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotations.pending.toString(), (state, action) => {
        return {
          ...state,
          quotations: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchQuotations.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          quotations: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(fetchQuotations.rejected.toString(), (state, action) => {
        return {
          ...state,
          quotations: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default QuotationsSlice.reducer;

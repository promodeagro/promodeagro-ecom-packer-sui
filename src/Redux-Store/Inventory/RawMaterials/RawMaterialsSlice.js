import { createSlice } from "@reduxjs/toolkit";
import { fetchRawMaterials } from "Redux-Store/Inventory/RawMaterials/RawMaterialsThunk";
import status from "Redux-Store/Constants";

const RawMaterialsSlice = createSlice({
  name: "rawmaterials",
  initialState: {
    rawmaterialslist: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRawMaterials.pending.toString(), (state, action) => {
        return {
          ...state,
          rawmaterialslist: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchRawMaterials.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          rawmaterialslist: {
            status: status.SUCCESS,
            data: payload,
          },
        };
      })
      .addCase(fetchRawMaterials.rejected.toString(), (state, action) => {
        return {
          ...state,
          rawmaterialslist: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default RawMaterialsSlice.reducer;

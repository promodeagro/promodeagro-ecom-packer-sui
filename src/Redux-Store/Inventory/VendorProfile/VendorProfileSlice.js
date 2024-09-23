import { createSlice } from "@reduxjs/toolkit";
import { fetchVendorProfiles } from "Redux-Store/Inventory/VendorProfile/VendorProfileThunk";
import status from "Redux-Store/Constants";

const VendorProfileSlice = createSlice({
  name: "vendorprofiles",
  initialState: {
    vendorlist: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProfiles.pending.toString(), (state, action) => {
        return {
          ...state,
          vendorlist: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchVendorProfiles.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            vendorlist: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchVendorProfiles.rejected.toString(), (state, action) => {
        return {
          ...state,
          vendorlist: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default VendorProfileSlice.reducer;

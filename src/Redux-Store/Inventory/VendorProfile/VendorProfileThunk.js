import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

import vendorlist from "Redux-Store/Inventory/dummy/vendor_list.json";

export const fetchVendorProfiles = createAsyncThunk(
  "vendorprofiles/fetchVendorProfiles",
  async (params) => {
    try {
      let url = config.VENDOR_PROFILE;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return vendorlist;
    } catch (error) {
      // return error
      return vendorlist;
    }
  }
);

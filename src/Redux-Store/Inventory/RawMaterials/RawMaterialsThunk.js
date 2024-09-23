import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

import rawmaterial from "Redux-Store/Inventory/dummy/rawmaterial.json";

export const fetchRawMaterials = createAsyncThunk(
  "rawmaterials",
  async (params) => {
    try {
      let url = config.FETCH_RAW_MATERIALS;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return rawmaterial;
    } catch (error) {
      // return error
      return rawmaterial;
    }
  }
);

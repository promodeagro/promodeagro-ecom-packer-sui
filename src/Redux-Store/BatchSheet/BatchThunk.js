
import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

import batchsheet from "Redux-Store/BatchSheet/dummy/batchsheet.json";

export const fetchBatchSheet = createAsyncThunk(
  "batchsheets",
  async (params) => {
    try {
      let url = config.FETCH_BATCH_SHEET;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return batchsheet;
    } catch (error) {
      // return error
      return batchsheet;
    }
  }
);



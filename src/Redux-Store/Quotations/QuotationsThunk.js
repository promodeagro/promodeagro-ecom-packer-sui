import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "../../Services";

import quotationsRes from "Redux-Store/Quotations/dummy/quotation_list.json";

export const fetchQuotations = createAsyncThunk(
  "quotations",
  async (params) => {
    try {
      let url = config.FETCH_QUOTATIONS;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return quotationsRes;
    } catch (error) {
      // return error
      return quotationsRes;
    }
  }
);
//

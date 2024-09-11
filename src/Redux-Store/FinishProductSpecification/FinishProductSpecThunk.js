import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

import finishprudcts from "Redux-Store/FinishProductSpecification/dummy/finish_production_spec_list.json";
import viewattachment from "Redux-Store/FinishProductSpecification/dummy/view_attachments.json";
import finishproductdetails from "Redux-Store/FinishProductSpecification/dummy/finish_product_details.json";
export const fetchFinishProductSpecification = createAsyncThunk(
  "finishproductspecitfication",
  async (params) => {
    try {
      let url = config.FINISH_PRODUCT_SPECIFICATIONS;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return finishprudcts;
    } catch (error) {
      // return error
      return finishprudcts;
    }
  }
);

export const finishProductViewAttachment = createAsyncThunk(
  "finishproductspecitfication/view-attachment",
  async (params) => {
    try {
      let url = config.FINISH_PRODUCT_VIEW_ATACHMENTS;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return viewattachment;
    } catch (error) {
      // return error
      return viewattachment;
    }
  }
);

export const finishProductDetails = createAsyncThunk(
  "finishproductspecitfication/details",
  async (params) => {
    try {
      let url = config.FINISH_PRODUCT_DETAILS;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return finishproductdetails;
    } catch (error) {
      // return error
      return finishproductdetails;
    }
  }
);

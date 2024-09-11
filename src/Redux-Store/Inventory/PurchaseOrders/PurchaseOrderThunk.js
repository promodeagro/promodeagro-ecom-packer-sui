import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

import purchaseorderlist from "Redux-Store/Inventory/dummy/purchaseorderlist.json";
import requisitionslist from "Redux-Store/Inventory/dummy/purchase_requition.json"
export const fetchPurchaseOrder = createAsyncThunk(
  "purchaseorder",
  async (params) => {
    try {
      let url = config.FETCH_PURCHASE_ORDER;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return purchaseorderlist;
    } catch (error) {
      // return error
      return purchaseorderlist;
    }
  }
);

export const fetchPurchaseOrderRequisitions = createAsyncThunk(
  "purchaseorderrequisitions",
  async (params) => {
    try {
      let url = config.FETCH_PURCHASE_REQUSTION_LIST;
      const response = await postLoginService.get(url, params);
      //   return response.data
      return requisitionslist;
    } catch (error) {
      // return error
      return requisitionslist;
    }
  }
);
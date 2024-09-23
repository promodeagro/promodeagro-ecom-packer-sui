import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "../../Services";
export const fetchCustomers = createAsyncThunk(
  "customers",
  async (params) => {
    try {
      let url = config.FETCH_CUSTOMER;
      const response = await postLoginService.get(url);
      console.log(response,"packed");
        return response.data
      // return customersRes;
    } catch (error) {
      return error
      // return customersRes;
    }
  }
);
//

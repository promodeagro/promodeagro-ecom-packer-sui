// Redux-Store/Products/ProductThunk.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";

// Fetch products with optional queries and pagination
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ search = '', category = '',active='', nextKey = '' }, { rejectWithValue }) => {
    try {
      const url = config.FETCH_PRODUCTS;
      const params = {
        search: search || undefined,
        category: category === 'All' ? undefined : category,
        active: active === 'All' ? undefined : active,
        nextKey: nextKey || undefined,
      };
      const response = await postLoginService.get(url, { params });
      console.log(response, "products api");
      console.log(params.category,params.nextKey,params.search,params.active,"filtering key search category active");
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);




// Fetch product details by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const url = `${config.FETCH_PRODUCTS_DETAIL}/${id}`;
      const response = await postLoginService.get(url);
      // console.log(response.data, "async");
      return response.data;
    } catch (error) {
      console.error("API error:", error); // Log API error
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);



export const putPricingById = createAsyncThunk(
  "products/putPricingById",
  async (pricingDataArray, { rejectWithValue }) => {
    try {
    
      const url = `${config.PUT_PRICING}/price`;
      const response = await postLoginService.put(url, pricingDataArray);
      console.log(response,"pricing array ");
      return response.data;
     
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Put Active/Inactive Status
export const PutToggle = createAsyncThunk(
  "products/putActiveInactive",
  async ({ id, active }, { rejectWithValue }) => {
    try {
      const url = `${config.PUT_ACTIVE_INACTIVE}`;
      // Log the payload to verify its structure
      console.log("Sending request to:", url);
      console.log("Payload:", { id, active });

      // Ensure `isActive` is a boolean value
      const response = await postLoginService.put(url, { id, active });

      console.log(response.data, "async put of toggle successful");
      return response.data;
    } catch (error) {
      console.error("API error:", error); // Log API error
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


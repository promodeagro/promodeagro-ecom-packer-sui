import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/Config";
import { postLoginService } from "Services";


// Fetch products
export const fetchProducts = createAsyncThunk("products/fetch", async (params, { rejectWithValue }) => {
  try {
    let url = config.FETCH_PRODUCTS;

    // Initialize an array to hold query parameters
    let queryParams = [];

    // Add search term to query parameters if provided
    if (params?.search) {
      queryParams.push(`search=${encodeURIComponent(params.search)}`);
    }

    // Add category to query parameters if provided
    if (params?.category) {
      queryParams.push(`category=${encodeURIComponent(params.category)}`);
    }

    // Join the query parameters and append to the URL if there are any
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    const response = await postLoginService.get(url);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

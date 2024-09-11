
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "Redux-Store/Products/ProductThunk";
import status from "Redux-Store/Constants";

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending.toString(), (state, action) => {
        return {
          ...state,
          products: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(fetchProducts.fulfilled.toString(), (state, { payload }) => {
        return {
          ...state,
          products: {
            status: status.SUCCESS,
            data: payload.data,
          },
        };
      })
      .addCase(fetchProducts.rejected.toString(), (state, action) => {
        return {
          ...state,
          products: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default ProductsSlice.reducer;

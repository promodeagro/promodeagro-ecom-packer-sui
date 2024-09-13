import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductById,
  PutToggle,
  putPricingById,
} from "Redux-Store/Products/ProductThunk";
import status from "Redux-Store/Constants";

const ProductsSlice = createSlice({
  name: "products",
  initialState: {
    products: {
      status: null,
      data: [],
      nextKey: null, // Store the nextKey for pagination
      hasMore: true, // Flag to indicate if more products can be loaded
    },
    productDetail: {
      status: null,
      data: null,
    },
  },
  reducers: {
    toggleStatus: (state, action) => {
      const product = state.products.data.find(
        (p) => p.itemCode === action.payload.itemCode
      );
      if (product) {
        product.status = product.status === "Active" ? "Inactive" : "Active";
      }
    },
    resetProducts: (state) => {
      state.products.data = [];
      state.products.nextKey = null;
      state.products.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.products.status = status.IN_PROGRESS;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products.status = status.SUCCESS;
        if (state.products.nextKey) {
          // Append new products to existing list for infinite scroll
          state.products.data = [...state.products.data, ...payload.items];
        } else {
          // Initial load or when filters are changed
          state.products.data = payload.items;
        }
        state.products.nextKey = payload.nextKey || null; // Update the nextKey or nullify if no nextKey
        state.products.hasMore = !!payload.nextKey; // Set hasMore flag based on nextKey
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.products.status = status.FAILURE;
      })
      // Fetch Product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.productDetail.status = status.IN_PROGRESS;
      })
      .addCase(fetchProductById.fulfilled, (state, { payload }) => {
        state.productDetail.status = status.SUCCESS;
        state.productDetail.data = payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.productDetail.status = status.FAILURE;
      })
      // Put Pricing by ID
      .addCase(putPricingById.pending, (state) => {
        state.productDetail.status = status.IN_PROGRESS;
      })
      .addCase(putPricingById.fulfilled, (state, { payload }) => {
        state.productDetail.status = status.SUCCESS;
        // Update the specific product in the `products.data` array
        state.products.data = state.products.data.map((product) =>
          product.id === payload.id ? payload : product
        );
        state.productDetail.data = payload; // Update product detail
      })
      .addCase(putPricingById.rejected, (state) => {
        state.productDetail.status = status.FAILURE;
      })
      // Toggle Product Active/Inactive Status
      .addCase(PutToggle.pending, (state) => {
        state.products.status = status.IN_PROGRESS;
      })
      .addCase(PutToggle.fulfilled, (state, { payload }) => {
        state.products.status = status.SUCCESS;
        // Update the specific product in the `products.data` array
        state.products.data = state.products.data.map((product) =>
          product.id === payload.id ? { ...product, active: payload.isActive } : product
        );
      })
      .addCase(PutToggle.rejected, (state) => {
        state.products.status = status.FAILURE;
      });
  },
});

export const { toggleStatus, resetProducts } = ProductsSlice.actions;
export default ProductsSlice.reducer;

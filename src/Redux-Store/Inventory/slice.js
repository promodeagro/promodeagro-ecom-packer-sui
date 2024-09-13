import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts} from './inventoryThunk';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: {
      data: [],
      status: 'idle',
      error: null
    }
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.products.status = 'LOADING';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products.data = action.payload;
        state.products.status = 'SUCCEEDED';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.products.status = 'ERROR';
        state.products.error = action.error.message;
      })

  },
});

export default productsSlice.reducer;

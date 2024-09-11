import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPurchaseOrder,
  fetchPurchaseOrderRequisitions,
} from "Redux-Store/Inventory/PurchaseOrders/PurchaseOrderThunk";
import status from "Redux-Store/Constants"; // Adjust the import path as necessary

const PurchaseOrderSlice = createSlice({
  name: "purchaseorder",
  initialState: {
    purchaseorderlist: {
      status: null,
    },
    purchaserequisitions: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseOrder.pending.toString(), (state, action) => {
        return {
          ...state,
          purchaseorderlist: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        fetchPurchaseOrder.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            purchaseorderlist: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(fetchPurchaseOrder.rejected.toString(), (state, action) => {
        return {
          ...state,
          purchaseorderlist: {
            status: status.FAILURE,
          },
        };
      })
      .addCase(
        fetchPurchaseOrderRequisitions.pending.toString(),
        (state, action) => {
          return {
            ...state,
            purchaserequisitions: {
              status: status.IN_PROGRESS,
            },
          };
        }
      )
      .addCase(
        fetchPurchaseOrderRequisitions.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            purchaserequisitions: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(
        fetchPurchaseOrderRequisitions.rejected.toString(),
        (state, action) => {
          return {
            ...state,
            purchaserequisitions: {
              status: status.FAILURE,
            },
          };
        }
      );
  },
});

export default PurchaseOrderSlice.reducer;

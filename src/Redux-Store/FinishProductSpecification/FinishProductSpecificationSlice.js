import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFinishProductSpecification,
  finishProductViewAttachment,
  finishProductDetails,
} from "Redux-Store/FinishProductSpecification/FinishProductSpecThunk";
import status from "Redux-Store/Constants";

const FinishProductSpecificationSlice = createSlice({
  name: "finishproductspecifications",
  initialState: {
    finishProducts: {
      status: null,
    },
    view_attachments: {
      status: null,
    },
    finishProductDetails: {
      status: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFinishProductSpecification.pending.toString(),
        (state, action) => {
          return {
            ...state,
            finishProducts: {
              status: status.IN_PROGRESS,
            },
          };
        }
      )
      .addCase(
        fetchFinishProductSpecification.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            finishProducts: {
              status: status.SUCCESS,
              data: payload.data,
            },
          };
        }
      )
      .addCase(
        fetchFinishProductSpecification.rejected.toString(),
        (state, action) => {
          return {
            ...state,
            finishProducts: {
              status: status.FAILURE,
            },
          };
        }
      )
      .addCase(
        finishProductViewAttachment.pending.toString(),
        (state, action) => {
          return {
            ...state,
            view_attachments: {
              status: status.IN_PROGRESS,
            },
          };
        }
      )
      .addCase(
        finishProductViewAttachment.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            view_attachments: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(
        finishProductViewAttachment.rejected.toString(),
        (state, action) => {
          return {
            ...state,
            view_attachments: {
              status: status.FAILURE,
            },
          };
        }
      )
      .addCase(finishProductDetails.pending.toString(), (state, action) => {
        return {
          ...state,
          finishProductDetails: {
            status: status.IN_PROGRESS,
          },
        };
      })
      .addCase(
        finishProductDetails.fulfilled.toString(),
        (state, { payload }) => {
          return {
            ...state,
            finishProductDetails: {
              status: status.SUCCESS,
              data: payload,
            },
          };
        }
      )
      .addCase(finishProductDetails.rejected.toString(), (state, action) => {
        return {
          ...state,
          finishProductDetails: {
            status: status.FAILURE,
          },
        };
      });
  },
});

export default FinishProductSpecificationSlice.reducer;

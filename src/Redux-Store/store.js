import { configureStore } from "@reduxjs/toolkit";


import OrdersSlice from "Redux-Store/Orders/OrdersSlice";
import packedOrderReducer from "Redux-Store/PackedOrders/PackedOrderSlice"

const store = configureStore({
  reducer: {

    orders: OrdersSlice,
    Packedorders: packedOrderReducer, 
  },
});

export default store;

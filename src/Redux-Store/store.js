import { configureStore } from "@reduxjs/toolkit";
import CustomersReducer from "Redux-Store/Customers/CustomersSlice";
import OrdersReducer from "Redux-Store/Orders/OrdersSlice"; // Corrected import name
import ProductsSlice from "./Products/ProductsSlice";
import itemSlice from "Redux-Store/Inventory/slice";
import forgotPwdReducer from "Redux-Store/authenticate/ForgotPwd/forgotPwdSlice"
import resetPwdSlice from "Redux-Store/authenticate/newpwd/newPwdSlice"
import otpSlice from "Redux-Store/authenticate/otpVerify/otpVerifySlice"
import authReducer from "Redux-Store/authenticate/signin/signinSlice"
import orderSlice from "Redux-Store/Inventory/orderSlice/Slice"
const store = configureStore({
  reducer: {
    orders: OrdersReducer,
    customers: CustomersReducer,
    products: ProductsSlice,
    items: itemSlice,
    ordersInInventory :orderSlice,
    auth:authReducer,
    forgotPwd : forgotPwdReducer,
    resetPwd:resetPwdSlice,
    otp:otpSlice,
  },
});

export default store;

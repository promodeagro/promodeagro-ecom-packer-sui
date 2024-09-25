import { configureStore } from "@reduxjs/toolkit";



import packedOrderReducer from "Redux-Store/PackedOrders/PackedOrderSlice";
import authReducer from "Redux-Store/authenticate/signin/signinSlice";
import OrdersSlice from "Redux-Store/Orders/OrdersSlice";

import forgotPwdReducer from "Redux-Store/authenticate/ForgotPwd/forgotPwdSlice"
import resetPwdSlice from "Redux-Store/authenticate/newpwd/newPwdSlice"
import otpSlice from "Redux-Store/authenticate/otpVerify/otpVerifySlice"
// import signupReducer from "Redux-Store/signup/signupSlice"
import signoutReducer from "Redux-Store/authenticate/signout/signoutSlice"
// import uploadSlice from "Redux-Store/uploadImage/uploadSlice" 
const store = configureStore({
  reducer: {

    orders: OrdersSlice,
    Packedorders: packedOrderReducer, 
    auth:authReducer,
    forgotPwd : forgotPwdReducer,
    resetPwd:resetPwdSlice,
    otp:otpSlice,
    // signup:signupReducer,
    // upload:uploadSlice,
    signOut:signoutReducer
  },
});

export default store;

import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PREFIX_APP_PATH, PREFIX_AUTH_PATH } from "./../Config/Config";

import SalesAndReport from "./Postlogin/salesAndReport";
import OrderDetails from "./Postlogin/OrderDetails";
import CreateNewPassword from "./PreLogin/CreateNewPassword";
import  Notifications  from "./Postlogin/Notifications/index";
import ProfileDetails from "./Postlogin/ProfileDetails";
import OtpVerification from "./PreLogin/OtpVerification";
const Home = lazy(() => import("./Postlogin/Home"));
const StartOrders = lazy(() => import("./Postlogin/StartOrder"));

const Orders = lazy(() => import("./Postlogin/Orders"));



const PathNotFOund = lazy(() => import("./PathNotFound"));
const Signin = lazy(() => import("./PreLogin/Signin"));
const Signup = lazy(() => import("./PreLogin/Signup"));
const ForgotPassword = lazy(() => import("./PreLogin/ForgotPassword"));

const Views = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            exact
            path={`${PREFIX_APP_PATH}/Home`}
            element={<Home />}
          />
         <Route
            exact
            path={`${PREFIX_APP_PATH}/notifications`}
            element={<Notifications />}
          />
          <Route
            exact
            path={`${PREFIX_APP_PATH}/salesandreport`}
            element={<SalesAndReport />}
          />
          <Route
            exact
            path={`${PREFIX_APP_PATH}/OrderDetails`}
            element={<OrderDetails/>}
          />
          <Route
            exact
            path={`${PREFIX_APP_PATH}/ProfileDetails`}
            element={<ProfileDetails/>}
          />

          <Route
            exact
            path={`${PREFIX_APP_PATH}/StartOrder`}
            element={<StartOrders/>}
          />
       
          <Route
            exact
            path={`${PREFIX_APP_PATH}/Orders`}
            element={<Orders />}
          />
        

        <Route
            exact
            path={`${PREFIX_AUTH_PATH}/signin`}
            element={<Signin />}
          />   
          {/* <Route
            exact
            path={`${PREFIX_AUTH_PATH}/signup`}
            element={<Signup />}
          /> */}
          <Route
            exact
            path={`${PREFIX_AUTH_PATH}/CreateNewPassword`}
            element={<CreateNewPassword />}
          />
           <Route
            exact
            path={`${PREFIX_AUTH_PATH}/signup`}
            element={<Signup />}
          />

          <Route
            exact
            path={`${PREFIX_AUTH_PATH}/ForgotPassword`}
            element={<ForgotPassword />}
          />
           <Route
            exact
            path={`${PREFIX_AUTH_PATH}/OtpVerification`}
            element={<OtpVerification />}
          />
              {/* <Route
            exact
            path={`${PREFIX_AUTH_PATH}/newpassword`}
            element={<NewPassword />}
          /> */}
          <Route
            exact
            path="/app/Home"
            element={<Navigate to="/app/Home" />}
          />
          <Route exact path="/" element={<Navigate to="/app/auth/signin" />} />
        
          


          <Route path="*" element={<PathNotFOund />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Views;

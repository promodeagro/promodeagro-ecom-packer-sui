import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PREFIX_APP_PATH, PREFIX_AUTH_PATH } from "./../Config/Config";
import Inventory from "./Postlogin/Inventory";
import SalesAndReport from "./Postlogin/salesAndReport";
import OrderDetails from "./Postlogin/OrderDetails";
import CreateNewPassword from "./PreLogin/CreateNewPassword";
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
            path={`${PREFIX_APP_PATH}/inventory`}
            element={<Inventory />}
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
            path={`${PREFIX_AUTH_PATH}/create-password`}
            element={<CreateNewPassword />}
          />
           <Route
            exact
            path={`${PREFIX_AUTH_PATH}/signup`}
            element={<Signup />}
          />

          <Route
            exact
            path={`${PREFIX_AUTH_PATH}/forgot-password`}
            element={<ForgotPassword />}
          />
              {/* <Route
            exact
            path={`${PREFIX_AUTH_PATH}/newpassword`}
            element={<NewPassword />}
          /> */}
          <Route
            exact
            path="/app/inventory"
            element={<Navigate to="/app/inventory" />}
          />
          <Route exact path="/" element={<Navigate to="/app/auth/signin" />} />
        
          


          <Route path="*" element={<PathNotFOund />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Views;

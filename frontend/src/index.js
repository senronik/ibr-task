import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./pages/SignIn";
import Verify from "./pages/Verify";
import SignUp from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ForgetPass from "./pages/ForgetPass";
import ForgetPass1 from "./pages/ForgetPass1";
import ChangePass from "./pages/changePass";
import AddProduct from "./pages/AddProduct";
import Update from "./pages/UpdateProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./auth/PrivateRoute";
import ProductImg from "./pages/ProductImg";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifyemail" element={<Verify />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forget-pass" element={<ForgetPass />} />
        <Route path="/forget-pass1" element={<ForgetPass1 />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/update-profile" element={<Update />} />
          <Route path="/change-password" element={<ChangePass />}/>
          <Route path="/add-product" element={<AddProduct/>}/>
          <Route path="/product-img" element={<ProductImg/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

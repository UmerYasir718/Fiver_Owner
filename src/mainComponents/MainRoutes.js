import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddService from "../myComponents/AddService";
import ForgetPassword from "../myComponents/ForgetPassword";
import Payment from "../myComponents/Payment";
import ResetPassword from "../myComponents/ResetPassword";
import Service from "../myComponents/Service";
import Dashboard from "./Dashboard";
import Login from "./Login";
import SignUp from "./SignUp";
import Store from "./Store";
export default function MainRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [owner, setOwner] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(["ownerToken"]);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/ownerVerify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.ownerToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          setOwner(data.ownerData.ownerData);
        } else {
          const errorData = await response.json();
          if (!location.pathname.startsWith("/OwnerReset-Password")) {
            navigate("/");
          }
          toast.error(errorData.message);
          // console.error("Token verification failed:", errorData.message);
          // Redirect to login or handle unauthorized access
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
        // Redirect to login or handle unauthorized access
      }
    };
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Store.Provider value={{ owner, setOwner }}>
        {/* <Router basename='/'> */}
        <Routes>
          <Route exact path='/signup' element={<SignUp />}></Route>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/user' element={<Dashboard />}></Route>
          <Route exact path='/add' element={<AddService />}></Route>
          <Route exact path='/show' element={<Service />}></Route>
          <Route exact path='/pay' element={<Payment />}></Route>
          <Route
            exact
            path='/forgetPassword'
            element={<ForgetPassword />}
          ></Route>
          <Route
            exact
            path='/OwnerReset-Password/:id/:ownerToken'
            element={<ResetPassword />}
          ></Route>
        </Routes>
        {/* </Router> */}
      </Store.Provider>
    </div>
  );
}

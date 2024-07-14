import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./Store";
export default function Login() {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const { setOwner } = useContext(Store);
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie] = useCookies(["ownerToken"]);
  const [loading, setLoading] = useState(false);
  const handleEmailChange = (e) => {
    setOwnerEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setOwnerPassword(e.target.value);
  };
  const handleLogin = async () => {
    console.log(ownerEmail, ownerPassword);

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/ownerLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerEmail, ownerPassword }),
      });

      const data = await response.json();

      if (data.success) {
        // Login successful, you can handle the success scenario here
        console.log("Login successful:", data);
        setCookie("ownerToken", data.ownerToken);
        setOwner(data.ownerData);
        navigate("/user");
        toast.success(data.message);
        // setOwner(data.owner);
        console.log(data.ownerData);
      } else {
        // Login failed, handle the error scenario
        console.error("Login failed:", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <section>
        <div className='form_data'>
          {loading && <p className='text-success fw-bold'>Loading...</p>}
          <div className='form_heading'>
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad you are back. Please login.</p>
          </div>

          <div className='form'>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                value={ownerEmail}
                onChange={handleEmailChange}
                name='email'
                id='email'
                placeholder='Enter Your Email Address'
              />
            </div>
            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two'>
                <input
                  type={!passShow ? "password" : "text"}
                  onChange={handlePasswordChange}
                  value={ownerPassword}
                  name='password'
                  id='password'
                  placeholder='Enter Your password'
                />
                <div
                  className='showpass'
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className='btn' onClick={handleLogin}>
              Login
            </button>
            <div className='d-flex flex-row  gap-2 my-3'>
              <Link className='text-primary' to='/signup'>
                Don't have an Account?
              </Link>{" "}
              <Link className='text-primary ms-auto' to='/forgetPassword'>
                Forget Password?{" "}
              </Link>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

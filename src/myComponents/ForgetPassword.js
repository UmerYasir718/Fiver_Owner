import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
export default function ForgetPassword() {
  const [ownerEmail, setOwnerEmail] = useState("");
  const handleEmail = async (e) => {
    setOwnerEmail(e.target.value);
  };
  const handleForgetPassword = async () => {
    console.log(ownerEmail);
    try {
      const response = await fetch(
        "http://localhost:8000/ownerForgetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ownerEmail }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Login successful, you can handle the success scenario here
        console.log("Link Send successful:", data);
        // setMessage(data.message);
        toast.success(data.message);
      } else {
        // Login failed, handle the error scenario
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred during Forget:", error);
    }
  };
  return (
    <div>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome Back, Forget Password</h1>
            <p>Don't Worry We fix it.</p>
          </div>

          <div className='form'>
            {/* <p className='fw-bold d-flex justify-content-center align-content-center text-success fs-5'>
              {message}
            </p> */}
            <div className='form_input'>
              <label htmlFor='email'>Email Address</label>
              <div className='two'>
                <input
                  type='text'
                  onChange={handleEmail}
                  value={ownerEmail}
                  name='email'
                  id='email'
                  placeholder='Enter Your Email'
                />
              </div>
            </div>

            <button className='btn' onClick={handleForgetPassword}>
              Reset Password
            </button>
            <p>
              Back To Login?{" "}
              <Link className='text-primary' to='/'>
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

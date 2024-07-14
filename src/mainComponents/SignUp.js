import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignUp() {
  const navigate = useNavigate();
  const [passShow, setPassShow] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [ownerImage, setOwnerImage] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [ownerConfirmPassword, setOwnerConfirmPassword] = useState("");
  const handleOwnerName = async (e) => {
    setOwnerName(e.target.value);
  };
  const handleImage = (event) => {
    const file = event.target.files[0];
    setOwnerImage(file);
  };
  const handleEmail = async (e) => {
    setOwnerEmail(e.target.value);
  };
  const handlePassword = async (e) => {
    setOwnerPassword(e.target.value);
  };
  const handleConfirmPassword = async (e) => {
    setOwnerConfirmPassword(e.target.value);
  };
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  const handleSignUp = async (e) => {
    console.log(
      ownerName,
      ownerEmail,
      ownerPassword,
      ownerConfirmPassword,
      ownerName.length
    );
    e.preventDefault();
    if (ownerName.length < 5) {
      toast.error("Username must be at least 5 characters long");
      return;
    }
    if (!validateEmail(ownerEmail)) {
      toast.error("Enter a valid email address");
      return;
    }
    if (ownerPassword !== ownerConfirmPassword) {
      toast.error("Both passwords must be the same");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("ownerImage", ownerImage);
      formData.append("ownerName", ownerName);
      formData.append("ownerEmail", ownerEmail);
      formData.append("ownerPassword", ownerPassword);
      const response = await fetch("http://localhost:8000/ownerSignup", {
        method: "POST",
        body: formData,
        // JSON.stringify({
        //   ownerName,
        //   ownerCNIC,
        //   ownerEmail,
        //   ownerPassword,
        //   formData,
        // }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/");
        toast.success(data.message);
      } else {
        console.error(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      toast.error("Error occurred");
    }
  };
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <section>
          <div className='form_data'>
            <div className='form_heading'>
              <h1>Welcome to AirBnb, SignUp</h1>
              <p>Hi, we are you glad you are back. Please SignUp.</p>
            </div>

            <div className='form'>
              <div className='form_input'>
                <label htmlFor='ownerName'>OwnerName</label>
                <input
                  type='text'
                  value={ownerName}
                  onChange={handleOwnerName}
                  name='ownerName'
                  id='OwnerName'
                  placeholder='Enter Your OwnerName'
                />
              </div>
              <div className='form_input'>
                <label htmlFor='exampleImage' className='form-label'>
                  Profile Picture
                </label>
              </div>
              <div className='input-group mb-3'>
                <input
                  type='file'
                  className='form-control'
                  id='inputGroupFile02'
                  onChange={handleImage}
                />
                <label className='input-group-text' htmlFor='inputGroupFile02'>
                  Upload
                </label>
              </div>
              <div className='form_input'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  value={ownerEmail}
                  onChange={handleEmail}
                  name='email'
                  id='email'
                  placeholder='Enter Your Email Address'
                  required
                />
              </div>
              <div className='form_input'>
                <label htmlFor='password'>Password</label>
                <div className='two'>
                  <input
                    type={!passShow ? "password" : "text"}
                    onChange={handlePassword}
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
              <div className='form_input'>
                <label htmlFor='Confirm password'>Confirm Password</label>
                <div className='two'>
                  <input
                    type={!passShow ? "password" : "text"}
                    onChange={handleConfirmPassword}
                    value={ownerConfirmPassword}
                    name='confirmPassword'
                    id='confirmPassword'
                    placeholder='Enter Your Confirm Password'
                  />
                  {/* <div
                    className='showpass'
                    onClick={() => setPassShow(!passShow)}
                  >
                    {!passShow ? "Show" : "Hide"}
                  </div> */}
                </div>
              </div>

              <button className='btn' onClick={handleSignUp}>
                SignUp
              </button>
              <p>
                Already Have a Account{" "}
                <Link className='text-primary' to='/'>
                  Login
                </Link>{" "}
              </p>
            </div>
            {/* <ToastContainer /> */}
          </div>
        </section>
      </div>
    </div>
  );
}

import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../mainComponents/Navbar";
import Store from "../mainComponents/Store";
export default function AddService() {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceContact, setServiceContact] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [image, setImage] = useState("");
  const { owner } = useContext(Store);
  const handleImage = (event) => {
    // const files = Array.from(event.target.files[0]);
    const file = event.target.files[0];
    setImage(file);
  };

  const handlePostData = async () => {
    // console.log(image);
    if (servicePrice >= 7000) {
      toast.error("Enter Rent Less than 7000");
      return;
    }
    if (serviceContact.length !== 13) {
      toast.error("Enter Valid Contact Number");
      return;
    }
    try {
      //  console.log(imagePage);
      const formData = new FormData();
      formData.append("ownerName", owner.ownerName);
      formData.append("ownerImage", owner.ownerImage);
      formData.append("image", image);
      formData.append("serviceName", serviceName);
      formData.append("servicePrice", servicePrice);
      formData.append("serviceContact", serviceContact);
      formData.append("serviceType", serviceType);
      formData.append("serviceDescription", serviceDescription);

      const response = await fetch(`http://localhost:8000/serviceData`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error(response.message);
      } else {
        const json = await response.json();
        console.log(json);
        toast.success("Service Add SuccessFully");
        setServiceName("");
        setServicePrice("");
        setServiceType("");
        setServiceContact("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // fetchRoutesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navbar />
      <div className='container-fluid bodySetting'>
        <div className='row'>
          <h1 className='text-primary fw-bold text-decoration-underline mt-2 mb-3'>
            Add Service
          </h1>
          <main className='col-md-12 col-lg-12 px-md-4'>
            <div className='container '>
              <div className='CountryForm'>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='handleCountryName'
                    aria-describedby='emailHelp'
                    // value={countryName}
                    onChange={(event) => setServiceName(event.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Price
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='handleCountryName'
                    aria-describedby='emailHelp'
                    // value={countryName}
                    onChange={(event) => setServicePrice(event.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Contact
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='handlelocation'
                    aria-describedby='emailHelp'
                    // value={countryName}
                    onChange={(event) => setServiceContact(event.target.value)}
                  />
                </div>
                <label for='example' className='form-label'>
                  Select Service Type
                </label>
                <select
                  className='form-select mb-3'
                  aria-label='Default select example'
                  onChange={(event) => setServiceType(event.target.value)}
                >
                  <option selected>Select Service Type</option>
                  <option value='1'>Web Development</option>
                  <option value='2'>Content Writing</option>
                  <option value='3'>Logo Design</option>
                  <option value='4'>Guest Post</option>
                </select>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Description
                  </label>
                  <textarea
                    class='form-control'
                    id='exampleFormControlTextarea1'
                    rows='3'
                    onChange={(event) =>
                      setServiceDescription(event.target.value)
                    }
                  ></textarea>
                </div>
                <label for='exampleImage' className='form-label'>
                  Image
                </label>
                <div className='input-group mb-3'>
                  <input
                    type='file'
                    className='form-control'
                    id='inputGroupFile02'
                    onChange={handleImage}
                    multiple
                    required
                  />
                  <label className='input-group-text' for='inputGroupFile02'>
                    Upload
                  </label>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary d-flex justify-content-center align-content-center m-auto mb-3 px-5 py-3'
                  onClick={handlePostData}
                >
                  Add Service
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

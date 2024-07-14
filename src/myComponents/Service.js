/* eslint-disable eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../mainComponents/Navbar";
import Store from "../mainComponents/Store";
export default function Service() {
  const [data, setData] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceContact, setServiceContact] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [serviceType, setServiceType] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const { owner } = useContext(Store);
  // eslint-disable-next-line no-unused-vars
  const [count] = useState(1);
  const handleDetail = (data) => {
    setSelectedService(data);
  };
  const handleUpdate = (data) => {
    setSelectedUpdate(data);
    setServiceName(data.serviceName);
    setServicePrice(data.servicePrice);
    setServiceContact(data.serviceContact);
    setServiceDescription(data.serviceDescription);
  };

  const fetchServiceData = async () => {
    try {
      const response = await fetch("http://localhost:8000/getService");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   alert(error);
    }
  };
  const handleUpdateSubmit = async () => {
    if (servicePrice >= 7000) {
      toast.error("Enter Rent Less than 7000");
      return;
    }
    if (serviceContact.length !== 13) {
      toast.error("Enter a valid contact number");
      return;
    }
    const updatedFormData = {
      serviceName,
      servicePrice,
      serviceContact,
      serviceDescription,
    };
    console.log("Updated FormData:", updatedFormData);

    try {
      const response = await fetch(
        `http://localhost:8000/serviceUpdate/${selectedUpdate._id}`,
        {
          method: "PUT", // Use PUT for updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (response.ok) {
        alert("Item updated successfully!");
        fetchServiceData(); // Refresh the data after the update
        setServiceName("");
        setServicePrice("");
        setServiceType("");
        setServiceContact("");
        setServiceDescription("");
      } else {
        console.error("Failed to update item:", response.statusText);
        alert(response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleDelete = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:8000/deleteService/${data}`,
        {
          method: "DELETE",
        }
      );

      const jsonData = await response.json();

      if (jsonData.error) {
        console.error("Error deleting item:", jsonData.error);
      } else {
        // Item deleted successfully, update state
        alert(jsonData.message);
        fetchServiceData();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  useEffect(() => {
    fetchServiceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />

      <div className='container-fluid'>
        {" "}
        <div className='row'>
          <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
            Manage Service
          </h1>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 mb-3'>
            <table className='table table-dark table-bordered border-light'>
              <thead>
                <tr>
                  {/* <th scope='col'>No.</th> */}
                  <th scope='col'>Service Name</th>
                  <th scope='col'>Service Type</th>
                  <th scope='col'>Detail</th>
                  <th scope='col'>Update</th>
                  <th scope='col'>Delete</th>
                </tr>
              </thead>
              {Array.isArray(data) ? (
                data
                  .filter((data) => data.ownerName === owner.ownerName)
                  .map((data, index) => (
                    <tbody className='table-group-divider'>
                      <tr key={data._id}>
                        {/* <th scope='row'>{count + index}</th> */}
                        <td> {data.serviceName}</td>
                        <td>
                          {" "}
                          {data.serviceType == "1"
                            ? "Web Development"
                            : data.serviceType == "2"
                            ? "Content Writing"
                            : data.serviceType == "3"
                            ? "Logo Design"
                            : data.serviceType == "4"
                            ? "Guest Post"
                            : "Nothing"}
                        </td>
                        <td>
                          <button
                            className='btn btn-primary text-light fw-bold  btn-sm'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal'
                            onClick={() => handleDetail(data)}
                          >
                            Detail
                          </button>
                        </td>
                        <td>
                          <button
                            className='btn btn-primary text-light fw-bold disable btn-sm'
                            data-bs-toggle='modal'
                            onClick={() => handleUpdate(data)}
                            data-bs-target='#updateModel'
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            className='btn btn-danger text-light fw-bold btn-sm'
                            onClick={() => handleDelete(data._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))
              ) : (
                <tbody>
                  <tr>
                    <td colspan='5'>No Data Found</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
      {/* <!-- Modal Detail --> */}
      <div
        className='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Modal title
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {" "}
              <div className='CountryForm'>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Name
                  </label>
                  <p className='modalInformation'>
                    {" "}
                    {selectedService ? selectedService.serviceName : ""}
                  </p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Price
                  </label>
                  <p className='modalInformation'>
                    {" "}
                    {selectedService ? selectedService.servicePrice : ""}
                  </p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Service Contact
                  </label>
                  <p className='modalInformation'>
                    {" "}
                    {selectedService ? selectedService.serviceContact : ""}
                  </p>
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Description
                  </label>
                  <br />
                  <textarea
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    // className='modalInformation'
                    rows='3'
                    value={
                      selectedService ? selectedService.serviceDescription : ""
                    }
                  ></textarea>
                </div>
                <label for='example' className='form-label'>
                  Select Service Type
                </label>
                <p className='modalInformation'>
                  {" "}
                  {selectedService ? selectedService.serviceType : ""}
                </p>
                <label for='exampleImage' className='form-label'>
                  Image
                </label>
                <div className='input-group mb-3'>
                  {" "}
                  <Link
                    className=' text-dark modalInformation'
                    to={selectedService ? selectedService.image : ""}
                    target='_blank'
                  >
                    Image
                  </Link>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal Detail --> */}
      {/* <!-- Modal Update --> */}
      <div
        className='modal fade'
        id='updateModel'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Update
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {" "}
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
                    value={serviceName}
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
                    value={servicePrice}
                    onChange={(event) => setServicePrice(event.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='handleCountryName' className='form-label'>
                    Description
                  </label>
                  <textarea
                    className='form-control'
                    id='exampleFormControlTextarea1'
                    rows='3'
                    value={serviceDescription}
                    onChange={(event) =>
                      setServiceDescription(event.target.value)
                    }
                  ></textarea>
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
                    value={serviceContact}
                    onChange={(event) => setServiceContact(event.target.value)}
                  />
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-primary d-flex justify-content-center align-content-center m-auto my-3'
                onClick={handleUpdateSubmit}
              >
                Update Service
              </button>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal Update--> */}
    </>
  );
}

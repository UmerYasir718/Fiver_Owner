import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../mainComponents/Navbar";
import Store from "../mainComponents/Store";
export default function Payment() {
  const [cardData, setCardData] = useState("");
  const [paymentData, setPaymentData] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [count] = useState(1);
  const { owner } = useContext(Store);
  const handleCardName = (event) => {
    setCardName(event.target.value);
  };
  const handleCardNumber = (event) => {
    setCardNumber(event.target.value);
  };
  const handleUpdate = (country) => {
    setSelectedCard(country);
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/getPayment");
      const json = await response.json();
      setCardData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error);
    }
  };
  const fetchPaymentRecord = async () => {
    try {
      const response = await fetch("http://localhost:8000/getPaymentRecord");
      const json = await response.json();
      setPaymentData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(error);
    }
  };

  const handlePostData = async () => {
    if (!cardName || !cardNumber) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    if (cardNumber.length !== 16) {
      toast.error("Enter Valid Card Number");
      return;
    }
    const ownerName = owner.ownerName;
    const formData = {
      ownerName,
      cardName,
      cardNumber,
    };
    console.log(formData);

    try {
      const response = await fetch("http://localhost:8000/addPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Item added successfully!");
        fetchData();
        setCardName("");
        setCardNumber("");
        // You can redirect or perform any other action after a successful post
      } else {
        console.error("Failed to add item:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  const handleUpdateSubmit = async () => {
    if (!cardName || !cardNumber || !selectedCard) {
      alert("Please fill in all fields before updating.");
      return;
    }
    if (!cardName || !cardNumber) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    if (cardNumber.length !== 16) {
      toast.error("Enter Valid Card Number");
      return;
    }
    const updatedFormData = {
      cardName,
      cardNumber,
    };
    console.log("Updated FormData:", updatedFormData);

    try {
      const response = await fetch(
        `http://localhost:8000/updateCard/${selectedCard._id}`,
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
        fetchData(); // Refresh the data after the update
        setCardName("");
        setCardNumber("");
        setSelectedCard(null); // Clear the selected country after updating
      } else {
        console.error("Failed to update item:", response.statusText);
        alert(response.statusText);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  useEffect(() => {
    if (selectedCard) {
      // Set initial state based on the selected country
      setCardName(selectedCard.cardName);
      setCardNumber(selectedCard.cardNumber);
    } else {
      // No country selected, reset the input fields
      setCardName("");
      setCardNumber("");
    }
  }, [selectedCard]);

  useEffect(() => {
    fetchData();
    fetchPaymentRecord();
  }, []);
  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='row'>
          <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
            Manage Payments Methods
          </h1>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 mb-3'>
            {cardData.length > 0 &&
            cardData.some((card) => card.ownerName === owner.ownerName) ? (
              <table className='table table-dark table-bordered border-light p-3'>
                <thead>
                  <tr>
                    <th scope='col'>Card Holder Name</th>
                    <th scope='col'>Card Number</th>
                    <th scope='col'>Update</th>
                  </tr>
                </thead>

                {Array.isArray(cardData) ? (
                  cardData.map((card, index) => (
                    <tbody className='table-group-divider '>
                      <tr key={card._id}>
                        <td> {card.cardName}</td>
                        <td>{card.cardNumber}</td>
                        <td>
                          <button
                            className='btn btn-primary text-light fw-bold disable btn-sm'
                            onClick={() => handleUpdate(card)}
                            data-bs-toggle='modal'
                            data-bs-target='#staticBackdrop'
                          >
                            Update
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
            ) : (
              <div className='alert alert-primary' role='alert'>
                <button
                  type='button'
                  className='btn btn-outline-primary d-flex justify-content-end align-content-end'
                  data-bs-toggle='modal'
                  data-bs-target='#staticBackdrop'
                >
                  + Add Card Details
                </button>
              </div>
            )}
            <h1 className='text-primary fw-bold text-decoration-underline mb-3'>
              Pending Payments
            </h1>
            <table className='table table-dark table-bordered border-light p-3'>
              <thead>
                <tr>
                  <th scope='col'>No.</th>
                  <th scope='col'>Service</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>Status</th>
                </tr>
              </thead>

              {Array.isArray(paymentData) ? (
                paymentData
                  .filter((payment) => payment.ownerName === owner.ownerName)
                  .map((payment, index) => (
                    <tbody className='table-group-divider '>
                      <tr key={payment._id}>
                        <th scope='row'>{count + index}</th>
                        <td> {payment.serviceName}</td>
                        <td>{payment.servicePrice}</td>
                        <td>
                          {payment.flag === true ? (
                            <button className='btn btn-success text-light fw-bold disable btn-sm'>
                              Approved
                            </button>
                          ) : (
                            <button className='btn btn-danger text-light fw-bold disable btn-sm'>
                              Pending
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  ))
              ) : (
                <tbody>
                  <tr>
                    <td colspan='4'>No Payment Found</td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
        {/* <!-- Modal --> */}
        <div
          className='modal fade'
          id='staticBackdrop'
          data-bs-backdrop='static'
          data-bs-keyboard='false'
          tabindex='-1'
          aria-labelledby='staticBackdropLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='staticBackdropLabel'>
                  {selectedCard ? "Update Card" : "Card Form"}
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
                    <label htmlFor='handleCardName' className='form-label'>
                      Card Holder Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='handleCardName'
                      aria-describedby='emailHelp'
                      value={cardName}
                      onChange={handleCardName}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='handleCardNumber' className='form-label'>
                      Card Number
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='handleCardNumber'
                      value={cardNumber}
                      onChange={handleCardNumber}
                    />
                  </div>
                  <button
                    type='submit'
                    className='btn btn-primary'
                    onClick={selectedCard ? handleUpdateSubmit : handlePostData}
                  >
                    {selectedCard ? "Update Card" : "Add Card"}
                  </button>
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
        {/* <!-- Modal End --> */}
      </div>
    </div>
  );
}

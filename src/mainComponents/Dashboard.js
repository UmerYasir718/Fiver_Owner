import React, { useContext, useEffect, useState } from "react";
import Store from "../mainComponents/Store";
import Navbar from "./Navbar";
export default function Dashboard() {
  const { owner } = useContext(Store);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    // setError(null);
    // console.log(ownerName);
    // const controller = new AbortController();
    // const timeoutId = setTimeout(() => controller.abort(), 10000);
    try {
      const ownerName = owner.ownerName;
      const response = await fetch("http://localhost:8000/dashBoardOwner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ownerName }),
        // signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setCount(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      // clearTimeout(timeoutId);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navbar />
      <div className='container-fluid bodySetting'>
        {loading && <p>Loading...</p>}
        <div className='row'>
          <main className='col-xl-12 ms-sm-auto col-lg-12 px-md-4'>
            <div className='container'>
              <div className='row mt-4'>
                <div className='col-12 col-sm-12 col-xl-6'>
                  <div className='card l-bg-cherry'>
                    <div className='card-statistic-3 p-4'>
                      <div className='card-icon card-icon-large'>
                        <i className='fas fa-shopping-cart'></i>
                      </div>
                      <div className='mb-4'>
                        <h5 className='card-title mb-0 fw-bold'>Earning</h5>
                      </div>
                      <div className='row align-items-center mb-2 d-flex'>
                        <div className='col-8'>
                          <h2 className='d-flex align-items-center mb-0'>
                            3,243K
                          </h2>
                        </div>
                        <div className='col-4 text-right'>
                          <span>
                            12.5% <i className='fa fa-arrow-up'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-xl-6 '>
                  <div className='card l-bg-blue-dark'>
                    <div className='card-statistic-3 p-4'>
                      <div className='card-icon card-icon-large'>
                        <i className='fas fa-users'></i>
                      </div>
                      <div className='mb-4'>
                        <h5 className='card-title mb-0 fw-bold'>
                          Total Services
                        </h5>
                      </div>
                      <div className='row align-items-center mb-2 d-flex'>
                        <div className='col-8'>
                          <h2 className='d-flex align-items-center mb-0'>
                            {count ? count.filteredServices : "0"}
                          </h2>
                        </div>
                        <div className='col-4 text-right'>
                          <span>
                            15.07k <i className='fa fa-arrow-up'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-xl-6'>
                  <div className='card l-bg-green-dark'>
                    <div className='card-statistic-3 p-4'>
                      <div className='card-icon card-icon-large'>
                        <i className='fas fa-ticket-alt'></i>
                      </div>
                      <div className='mb-4'>
                        <h5 className='card-title mb-0 fw-bold'>
                          Services Paid
                        </h5>
                      </div>
                      <div className='row align-items-center mb-2 d-flex'>
                        <div className='col-8'>
                          <h2 className='d-flex align-items-center mb-0'>
                            {count ? count.totalBoysHostels : "0"}
                          </h2>
                        </div>
                        <div className='col-4 text-right'>
                          <span>
                            10% <i className='fa fa-arrow-up'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-12 col-sm-12 col-xl-6'>
                  <div className='card l-bg-orange-dark'>
                    <div className='card-statistic-3 p-4'>
                      <div className='card-icon card-icon-large'>
                        <i className='fas fa-dollar-sign'></i>
                      </div>
                      <div className='mb-4'>
                        <h5 className='card-title mb-0 fw-bold'>
                          {" "}
                          Services UnPaid
                        </h5>
                      </div>
                      <div className='row align-items-center mb-2 d-flex'>
                        <div className='col-8'>
                          <h2 className='d-flex align-items-center mb-0'>
                            {" "}
                            {count ? count.totalGirlsHostels : "0"}
                          </h2>
                        </div>
                        <div className='col-4 text-right'>
                          <span>
                            2.5% <i className='fa fa-arrow-up'></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

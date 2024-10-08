import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUnusedPin } from "../../../store/actions/pin-management-actions";
import { getSchoolSetting } from "../../../store/actions/portal-setting-action";

const PinDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedUnusedPin } = state.pin;
  const { schoolSetting } = state.portal;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const pin = queryParams.get("pin");
    if (!pin) return;
    fetchSingleUnusedPin(pin)(dispatch);
    getSchoolSetting()(dispatch);
  }, [dispatch, locations.search]);
  return (
    <>
      <div className="col-md-8 mx-auto">
      <Row>
          <Col sm="12">
            <Card className="credit-card-widget">
              <Card.Header className="pb-4 border-0 col-lg-9 col-xl-8 col-xxl-7">
                <div className="p-4 border border-white rounded primary-gradient-card">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="font-weight-bold">FWS CARD </h5>
                      <p className="mb-0">PREMIUM ACCOUNT</p>
                    </div>
                    <div className="master-card-content">
                      <svg
                        className="master-card-1"
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                        />
                      </svg>
                      <svg
                        className="master-card-2"
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#ffffff"
                          d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="my-4">
                    <div className="card-number">
                      <span className="fs-5 me-2">{selectedUnusedPin?.pin}</span>
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center justify-content-between">
                    <p className="mb-0">Card holder</p>
                    <p className="mb-0">Expire Date</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <h6>{schoolSetting?.schoolName}</h6>
                    <h6 className="ms-5">06/11</h6>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <small>{selectedUnusedPin?.registrationNumber}</small>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="flex-wrap mb-4 d-flex align-itmes-center">
                  <div className="d-flex align-itmes-center me-0 me-md-4">
                    <div>
                      <div className="p-3 mb-2 rounded bg-soft-primary">
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path
                            fill="currentColor"
                            d="M22 3c.53 0 1.039.211 1.414.586s.586.884.586 1.414v14c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586h-20c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414v-14c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586h20zm1 8h-22v8c0 .552.448 1 1 1h20c.552 0 1-.448 1-1v-8zm-15 5v1h-5v-1h5zm13-2v1h-3v-1h3zm-10 0v1h-8v-1h8zm-10-6v2h22v-2h-22zm22-1v-2c0-.552-.448-1-1-1h-20c-.552 0-1 .448-1 1v2h22z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ms-3">
                      <h5>{selectedUnusedPin?.numberOfTimesUsed}</h5>
                      <small className="mb-0">Times Used</small>
                    </div>
                  </div>
                  <div className="d-flex align-itmes-center">
                    <div>
                      <div className="p-3 mb-2 rounded bg-soft-info">
                        <svg
                          width="24"
                          height="24"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path
                            fill="currentColor"
                            d="M22 3c.53 0 1.039.211 1.414.586s.586.884.586 1.414v14c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586h-20c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414v-14c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586h20zm1 8h-22v8c0 .552.448 1 1 1h20c.552 0 1-.448 1-1v-8zm-15 5v1h-5v-1h5zm13-2v1h-3v-1h3zm-10 0v1h-8v-1h8zm-10-6v2h22v-2h-22zm22-1v-2c0-.552-.448-1-1-1h-20c-.552 0-1 .448-1 1v2h22z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ms-3">
                      <h5>{selectedUnusedPin?.numberOfTimesRemaining}</h5>
                      <small className="mb-0">Times Remaining</small>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex-wrap d-flex justify-content-between">
                    <h2 className="mb-2">{selectedUnusedPin?.session}</h2>
                    <div>
                      <span className="badge bg-success rounded-pill">
                        {selectedUnusedPin?.term}
                      </span>
                    </div>
                  </div>
                  <p className="text-info">{selectedUnusedPin?.pinStatus}</p>
                </div>
                <div className="d-md-flex justify-content-end">
                  <button
                    onClick={() => {
                      history.goBack();
                    }}
                    className="btn btn-primary text-uppercase"
                  >
                    Cancel
                  </button>
                </div>
              </Card.Body>
            </Card>
            {/* <div className="card" data-aos="fade-up" data-aos-delay="500">
                                <div className="text-center card-body d-flex justify-content-around">
                                    <div>
                                        <h2 className="mb-2">750<small>K</small></h2>
                                        <p className="mb-0 text-secondary">Website Visitors</p>
                                    </div>
                                    <hr className="hr-vertial" />
                                    <div>
                                        <h2 className="mb-2">7,500</h2>
                                        <p className="mb-0 text-secondary">New Customers</p>
                                    </div>
                                </div>
                            </div> */}
          </Col>
        
        </Row>
      </div>
    </>
  );
};

export default PinDetails;

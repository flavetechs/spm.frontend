import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory, Link } from "react-router-dom";
import { candidateAuthLocation } from "../../router/candidate-path-location";
import { loginOutUser } from "../../store/actions/auth-actions";
import { getSingleAdmissionDetail } from "../../store/actions/candidate-admission-actions";
import { getUserDetails } from "../../utils/permissions";
import Card from "../Card";
import SmpLoader from "../loader/smp-loader";

const CandidateDetails = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const locations = useLocation();
    const dispatch = useDispatch();
  const [getUserDetail, setGetUserDetail] = useState({});
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { singleAdmissionDetail } = state.candidate;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const admissionId = queryParams.get("admissionId");
        if (!admissionId) return;
        getSingleAdmissionDetail(admissionId)(dispatch);
    }, [dispatch, locations.search]);

    React.useEffect(() => {
        setGetUserDetail(getUserDetails());
      }, []);
      
    return (
        <>
          <SmpLoader />
            <Row>
                <div className="col-xl-9 col-lg-8 mx-auto">
                    <div className="card ">
                    <Card.Header
                  className="d-md-flex justify-content-between border mb-5 border-light"
                  style={{ backgroundColor: "#F5F6FA" }}
                >
                  <div className="header-title">
                    <h4 className="card-title mb-3">Candidate List</h4>
                  </div>
                  <div className="d-md-flex  justify-content-between">
                    <h6
                      style={{
                        wordBreak: "break-all",
                        whiteSpace: "pre-wrap",
                      }}
                      className="card-title fw-bold my-2"
                    >
                      {getUserDetail?.userName}
                    </h6>
                    <div>
                      <Link to="#">
                        <button
                          type="button"
                          className="text-center btn-icon mx-3 my-2 my-md-0 mt-3 mt-xl-0  btn d-flex border border-light"
                          onClick={() => {
                            dispatch(loginOutUser());
                            history.push(candidateAuthLocation.signIn);
                          }}
                        >
                          <i className="btn-inner">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="16"
                              fill="currentColor"
                              className="bi bi-power"
                              viewBox="0 0 16 16"
                            >
                              <path d="M7.5 1v7h1V1h-1z" />
                              <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
                            </svg>
                          </i>
                          <span> Log Out</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card.Header>
                        
                        <div className=" d-flex justify-content-between mx-3 justify-content-between border-bottom border-light">
                            {" "}
                            <div className="header-title">
                                <h4 className="card-title">Candidate Information</h4>
                            </div>{" "}
                        </div>
                        <Card.Body>
                            {" "}
                            <div className="new-user-info">
                                <Form>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <p><span><b>First Name:</b></span> <span className="h6">{singleAdmissionDetail?.firstname}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p><span><b>Last Name:</b></span> <span className="h6">{singleAdmissionDetail?.lastname}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p> <span><b>Middle Name:</b></span> <span className="h6 text-capitalize">{singleAdmissionDetail?.middlename}</span></p>
                                        </div>
                                        <div className="col-md-6  form-group">
                                            <p><span><b>Class:</b></span> <span className="h6">{singleAdmissionDetail?.className}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p><span><b>Mobile Number:</b></span> <span className="h6">{singleAdmissionDetail?.phoneNumber}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p><span><b>Candidate Email Address:</b></span> <span className="h6 text-capitalize">{singleAdmissionDetail?.email}</span></p>
                                        </div>
                                        <div className="col-md-6  form-group">
                                            <p> <span><b>Date Of Birth:</b></span> <span className="h6">{singleAdmissionDetail?.dateOfBirth}</span></p>
                                        </div>
                                        <div className="col-md-6  form-group">
                                            <p><span><b>City:</b></span> <span className="h6 text-capitalize">{singleAdmissionDetail?.lgaOfOrigin}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p><span><b>State:</b></span> <span className="h6 text-capitalize">{singleAdmissionDetail?.stateOfOrigin}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group text-capitalize">
                                            <p><span><b>Country:</b></span> <span className="h6 text-capitalize">{singleAdmissionDetail?.countryOfOrigin}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="form-label" htmlFor="dd">
                                                <b>Credential:</b>
                                            </label>
                                            <div className="">
                                                <div className="">
                                                    <object data={singleAdmissionDetail?.credentials}
                                                        width="250"
                                                        height="250">
                                                    </object>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label className="form-label" htmlFor="dd">
                                                <b>Photo:</b>
                                            </label>
                                            <div className="">
                                                <div className="">
                                                    <img
                                                        src={singleAdmissionDetail?.photo}
                                                        width="250"
                                                        height="250"
                                                        alt="credential"
                                                        className="img-fluid"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <h5 className="mb-3">Parent/Guardian(s) Information</h5>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <p><span><b>Name:</b></span> <span className="h6 text-capitalize">{singleAdmissionDetail?.parentName}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p>
                                                <span><b>Relationship:</b></span>{" "}
                                                <span className="h6 text-capitalize">{singleAdmissionDetail?.parentRelationship}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p>
                                                <span><b>Mobile Number:</b></span> <span className="h6">{singleAdmissionDetail?.parentPhoneNumber}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p>
                                                <span><b>Email Address:</b></span> <span className="h6">{singleAdmissionDetail?.parentEmail}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Button
                                            type="button"
                                            variant="btn btn-danger mx-2"
                                            onClick={() => {
                                                history.goBack();
                                            }}
                                        >
                                            Back
                                        </Button>{" "}
                                    </div>
                                </Form>
                            </div>{" "}
                        </Card.Body>{" "}
                    </div>
                </div>
            </Row>
        </>
    );
};

export default CandidateDetails;

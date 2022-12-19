import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { getSingleAdmissionDetail } from "../../store/actions/candidate-admission-actions";
import Card from "../Card";

const CandidateDetails = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const locations = useLocation();
    const dispatch = useDispatch();
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

    return (
        <>
            <Row>
                <div className="col-xl-9 col-lg-8 mx-auto">
                    <div className="card ">
                        <div className="card-header d-flex justify-content-between d-flex justify-content-between border border-light">
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
                                            <p><span>First Name:</span> <span className="h6">{singleAdmissionDetail?.firstname}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p><span>Last Name:</span> <span className="h6">{singleAdmissionDetail?.lastname}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p> <span>Middle Name:</span> <span className="h6 text-capitalize">{singleAdmissionDetail?.middlename}</span></p>
                                        </div>
                                        <div className="col-md-6  form-group">
                                            <p><span>Class:</span> <span className="h6">{singleAdmissionDetail?.className}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p><span>Mobile Number:</span> <span className="h6">{singleAdmissionDetail?.phoneNumber}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p><span>Email Address:</span> <span className="h6 text-capitalize">{singleAdmissionDetail?.email}</span></p>
                                        </div>
                                        <div className="col-md-6  form-group">
                                            <p> <span>Date Of Birth:</span> <span className="h6">{singleAdmissionDetail?.dateOfBirth}</span></p>
                                        </div>
                                        <div className="col-md-6  form-group">
                                            <p><span>City:</span> <span className="h6 text-capitalize">{singleAdmissionDetail?.lgaOfOrigin}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p><span>State:</span> <span className="h6 text-capitalize">{singleAdmissionDetail?.stateOfOrigin}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group text-capitalize">
                                            <p><span>Country:</span> <span className="h6 text-capitalize">{singleAdmissionDetail?.countryOfOrigin}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group text-capitalize">
                                            <p><span>Zip Code:</span> <span className="h6">{singleAdmissionDetail?.firstname}</span></p>
                                        </div>
                                    </div>
                                    <hr />
                                    <h5 className="mb-3">Parent/Guardian(s) Information</h5>
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <p><span>Name:</span> <span className="h6 text-capitalize">{singleAdmissionDetail?.parentName}</span></p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p>
                                                <span>Relationship:</span>{" "}
                                                <span className="h6 text-capitalize">{singleAdmissionDetail?.parentRelationship}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p>
                                                <span>Mobile Number:</span> <span className="h6">{singleAdmissionDetail?.parentPhoneNumber}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <p>
                                                <span>Email Address:</span> <span className="h6">{singleAdmissionDetail?.parentEmail}</span>
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

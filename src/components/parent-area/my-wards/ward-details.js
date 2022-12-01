import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";

import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import { getSingleWardDetails } from "../../../store/actions/parent-actions";


const WardsDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedWardDetails } = state.parent;
  // ACCESSING STATE FROM REDUX STORE

  const queryParams = new URLSearchParams(locations.search);
  const studentAccountIdQuery = queryParams.get("studentId") || "";

  React.useEffect(() => {
    if(studentAccountIdQuery){
      getSingleWardDetails(studentAccountIdQuery)(dispatch);
    }
  }, [dispatch, studentAccountIdQuery])

  return (
    <>
      <Row>
        <Col>
          <Card>
            <div className="card-header d-flex justify-content-between d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Student</h4>
              </div>
            </div>
            <div className="card-body ">
              <Form className="">
                <div className="form-group">
                  {!selectedWardDetails?.photo ? (
                    <div>
                      <img
                        src={avatars1}
                        alt="User-Profile"
                        className="theme-color-default-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars2}
                        alt="User-Profile"
                        className="theme-color-purple-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars3}
                        alt="User-Profile"
                        className="theme-color-blue-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars5}
                        alt="User-Profile"
                        className="theme-color-green-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars6}
                        alt="User-Profile"
                        className="theme-color-yellow-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        src={avatars4}
                        alt="User-Profile"
                        className="theme-color-pink-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                    </div>
                  ) : (
                    <img className="img-fluid mt-4" src={selectedWardDetails?.photo} alt="profile" />
                  )}
                </div>
              </Form>
            </div>
          </Card>
        </Col>
        <div className="col-xl-9 col-lg-8">
          <div className="card ">
            <div className="card-header d-flex justify-content-between d-flex justify-content-between">
              {" "}
              <div className="header-title">
                <h4 className="card-title">Student Information</h4>
              </div>{" "}
            </div>
            <Card.Body>
              {" "}
              <div className="new-user-info">
                <Form>
                  <div className="row">
                    <div className="col-md-6  form-group">
                      <p><span>Class:</span><span className="h6"> {selectedWardDetails?.sessionClass}</span></p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p><span>Reg No. :</span><span className="h6"> {selectedWardDetails?.registrationNumber}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>First Name:</span> <span className="h6"> {selectedWardDetails?.firstName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Last Name:</span> <span className="h6"> {selectedWardDetails?.lastName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p> <span>Middle Name:</span><span className="h6 text-capitalize"> {selectedWardDetails?.middleName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Mobile Number:</span> <span className="h6"> {selectedWardDetails?.phone}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Home Phone Number:</span> <span className="h6"> {selectedWardDetails?.homePhone}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Emergency Phone Number:{" "}</span>
                        <span className="h6"> {selectedWardDetails?.emergencyPhone}</span>
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Email Address:</span> <span className="h6 text-capitalize"> {selectedWardDetails?.userName}</span></p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p> <span>Date Of Birth:</span> <span className="h6"> {selectedWardDetails?.dob}</span></p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <p><span>Home Address:</span> <span className="h6 text-capitalize"> {selectedWardDetails?.homeAddress}</span></p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p><span>City:</span> <span className="h6 text-capitalize"> {selectedWardDetails?.cityId}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>State:</span> <span className="h6 text-capitalize"> {selectedWardDetails?.stateId}</span></p>
                    </div>
                    <div className="col-md-6 form-group text-capitalize">
                      <p><span>Country:</span><span className="h6 text-capitalize"> {selectedWardDetails?.countryId}</span></p>
                    </div>
                    <div className="col-md-6 form-group text-capitalize">
                      <p><span>Zip Code:</span> <span className="h6"> {selectedWardDetails?.zipCode}</span></p>
                    </div>
                  </div>
                  <hr />
                  <h5 className="mb-3">Parent/Guardian(s) Information</h5>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <p><span>Name:</span> <span className="h6 text-capitalize"> {selectedWardDetails?.parentOrGuardianName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Relationship:</span>{" "}
                        <span className="h6 text-capitalize"> {selectedWardDetails?.parentOrGuardianRelationship}</span>
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Mobile Number:</span> <span className="h6"> {selectedWardDetails?.parentOrGuardianPhone}</span>
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Email Address:</span> <span className="h6"> {selectedWardDetails?.parentOrGuardianEmail}</span>
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

export default WardsDetails;

import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  fetchSingleStudent,
} from "../../../store/actions/student-actions";
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import { getAllSessionClasses } from "../../../store/actions/class-actions";

const StudentDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedStudent,  message } = state.student;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const studentAccountId = queryParams.get("studentAccountId");
    if (!studentAccountId) return;
    fetchSingleStudent(studentAccountId)(dispatch);
  }, [dispatch,locations.search]);

  React.useEffect(() => {
    getAllSessionClasses()(dispatch);
  }, [dispatch]);

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
                  {!selectedStudent?.photo ? (
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
                    <img  className="img-fluid mt-4" src={selectedStudent?.photo} alt="profile" />
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
                  <div className="col-md-12  form-group">
                      <p><span>Class:</span><span className="h6"> {selectedStudent?.sessionClass}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>First Name:</span> <span className="h6"> {selectedStudent?.firstName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Last Name:</span> <span className="h6"> {selectedStudent?.lastName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p> <span>Middle Name:</span><span className="h6 text-capitalize"> {selectedStudent?.middleName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Mobile Number:</span> <span className="h6"> {selectedStudent?.phone}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Home Phone Number:</span> <span className="h6"> {selectedStudent?.homePhone}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Emergency Phone Number:{" "}</span>
                        <span className="h6"> {selectedStudent?.emergencyPhone}</span>
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>Email Address:</span> <span className="h6 text-capitalize"> {selectedStudent?.userName}</span></p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p> <span>Date Of Birth:</span> <span className="h6"> {selectedStudent?.dob}</span></p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <p><span>Home Address:</span> <span className="h6 text-capitalize"> {selectedStudent?.homeAddress}</span></p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p><span>City:</span> <span className="h6 text-capitalize"> {selectedStudent?.cityId}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p><span>State:</span> <span className="h6 text-capitalize"> {selectedStudent?.stateId}</span></p>
                    </div>
                    <div className="col-md-6 form-group text-capitalize">
                      <p><span>Country:</span><span className="h6 text-capitalize"> {selectedStudent?.countryId}</span></p>
                    </div>
                    <div className="col-md-6 form-group text-capitalize">
                      <p><span>Zip Code:</span> <span className="h6"> {selectedStudent?.zipCode}</span></p>
                    </div>
                  </div>
                  <hr />
                  <h5 className="mb-3">Parent/Guardian(s) Information</h5>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <p><span>Name:</span> <span className="h6 text-capitalize"> {selectedStudent?.parentOrGuardianName}</span></p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Relationship:</span>{" "}
                        <span className="h6 text-capitalize"> {selectedStudent?.parentOrGuardianRelationship}</span>
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Mobile Number:</span> <span className="h6"> {selectedStudent?.parentOrGuardianPhone}</span>
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        <span>Email Address:</span> <span className="h6"> {selectedStudent?.parentOrGuardianEmail}</span>
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
                      Cancel
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

export default StudentDetails;

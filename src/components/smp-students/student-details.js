import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../router/spm-path-locations";
import { useLocation, useHistory } from "react-router-dom";
import {
  fetchSingleStudent,
} from "../../store/actions/student-actions";
import avatars1 from "../../assets/images/avatars/01.png";
import avatars2 from "../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../assets/images/avatars/avtar_5.png";
import { getAllSessionClasses } from "../../store/actions/class-actions";

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
  }, []);

  React.useEffect(() => {
    getAllSessionClasses()(dispatch);
  }, []);


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
                    <img src={selectedStudent?.photo} alt="profile picture" />
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
                  {message && <div className="text-danger">{message}</div>}
                  <div className="row">
                  <div className="col-md-12  form-group">
                      <p>Class: {selectedStudent?.sessionClass}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>First Name: {selectedStudent?.firstName}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>Last Name: {selectedStudent?.lastName}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>Middle Name: {selectedStudent?.middleName}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>Mobile Number: {selectedStudent?.phone}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>Home Phone Number: {selectedStudent?.homePhone}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        Emergency Phone Number:{" "}
                        {selectedStudent?.emergencyPhone}
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>Email Address: {selectedStudent?.userName}</p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p>Date Of Birth: {selectedStudent?.dob}</p>
                    </div>
                    <div className="col-sm-6 form-group">
                      <p>Home Address: {selectedStudent?.homeAddress}</p>
                    </div>
                    <div className="col-md-6  form-group">
                      <p>City: {selectedStudent?.cityId}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>State: {selectedStudent?.stateId}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>Country: {selectedStudent?.countryId}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>Zip Code: {selectedStudent?.zipCode}</p>
                    </div>
                  </div>
                  <hr />
                  <h5 className="mb-3">Parent/Guardian(s) Information</h5>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <p>Name: {selectedStudent?.parentOrGuardianName}</p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        Relationship:{" "}
                        {selectedStudent?.parentOrGuardianRelationship}
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        Mobile Number: {selectedStudent?.parentOrGuardianPhone}
                      </p>
                    </div>
                    <div className="col-md-6 form-group">
                      <p>
                        Email Address: {selectedStudent?.parentOrGuardianEmail}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      type="button"
                      variant="btn btn-danger mx-2"
                      onClick={() => {
                        history.push(studentsLocations.studentList);
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

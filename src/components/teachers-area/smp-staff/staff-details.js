import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_2.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import { staffLocations } from "../../../router/spm-path-locations";
import {
  fetchSingleStaff,
  updateStaffAccount,
} from "../../../store/actions/staff-actions";
import { fetchSingleItem } from "../../../store/actions/class-actions";
import { hasAccess, NavPermissions } from "../../../utils/permissions";

const StaffDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  const [image, setImage] = useState(null);
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .min(2, "Name Too Short!"),
    lastName: Yup.string()
      .required("Last Name is required")
      .min(2, "Name Too Short!"),
    email: Yup.string()
      .required("Please Enter Email")
      .email("Must be a valid email"),
    phone: Yup.string().required("Please enter phone Number"),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message, selectedItem } = state.staff;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const teacherAccountId = queryParams.get("teacherAccountId");
    if (!teacherAccountId) return;
    fetchSingleStaff(teacherAccountId)(dispatch);
  }, []);

  if (isSuccessful) {
    history.push(staffLocations.staffList);
  }

  const ImageDisplay = (event) => {
    if (event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            firstName: selectedItem?.firstName,
            lastName: selectedItem?.lastName,
            middleName: selectedItem?.middleName,
            email: selectedItem?.email,
            phone: selectedItem?.phone,
            photo: selectedItem?.photo,
            teacherUserAccountId: selectedItem?.teacherUserAccountId,
            dob: selectedItem?.dob,
          }}
          validationSchema={validation}
          onSubmit={(values) => {
            updateStaffAccount(values)(dispatch);
          }}
        >
          {({ touched, errors, setFieldValue }) => (
            <Row>
              <Col>
                <Card>
                  <div className="card-header d-flex justify-content-between d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">
                        <b>Staff Photo</b>
                      </h4>
                    </div>
                  </div>
                  <div className="card-body ">
                    <Form className="">
                      <div className="form-group">
                        <div className="profile-img-edit position-relative">
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
                            />{" "}
                          </div>
                          <div className="upload-icone bg-primary">
                            <label htmlFor="photo">
                              <svg
                                className="upload-button"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                style={{ cursor: "pointer" }}
                              >
                                <path
                                  fill="#ffffff"
                                  d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z"
                                ></path>
                              </svg>
                              <input
                                type="file"
                                id="photo"
                                style={{ display: "none" }}
                                name="photo"
                                accept="image/jpeg,image/jpg,image/png"
                                className="file-upload form-control"
                                data-original-title="upload photos"
                                readOnly
                                disabled={true}
                                onChange={(event) => {
                                  setFieldValue(
                                    "photo",
                                    event.currentTarget.files[0]
                                  );
                                  ImageDisplay(event);
                                }}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="img-extension mt-3">
                          <div className="d-inline-block align-items-center">
                            <span>Only</span> <a href="#">.jpg</a>{" "}
                            <a href="#">.png</a> <a href="#">.jpeg</a>
                            <span> allowed</span>
                          </div>
                        </div>

                        <img
                          className=" img-fluid mt-4"
                          id="displayImg"
                          src={selectedItem?.photo}
                          alt="profile"
                        />
                      </div>
                    </Form>
                  </div>
                </Card>
              </Col>
              <Col xl="9" lg="8">
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">
                        <b>Staff Information</b>
                      </h4>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="new-user-info">
                      <div>
                        {message && (
                          <div className="text-danger">{message}</div>
                        )}
                        {touched.firstName && errors.firstName && (
                          <div className="text-danger">{errors.firstName}</div>
                        )}
                        {touched.lastName && errors.lastName && (
                          <div className="text-danger">{errors.lastName}</div>
                        )}
                        {touched.middleName && errors.middleName && (
                          <div className="text-danger">{errors.middleName}</div>
                        )}
                        {touched.email && errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                        {touched.phone && errors.phone && (
                          <div className="text-danger">{errors.phone}</div>
                        )}
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <label htmlFor="firstName" className="form-label">
                              <b>First Name:</b>
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              name="firstName"
                              id="firstName"
                              aria-describedby="name"
                              value={selectedItem?.firstName}
                              readOnly
                              required
                              placeholder="First Name"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <label htmlFor="lastName" className="form-label">
                              {" "}
                              <b>Last Name:</b>
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              name="lastName"
                              id="lastName"
                              aria-describedby="name"
                              value={selectedItem?.lastName}
                              readOnly
                              required
                              placeholder="Last Name"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <label htmlFor="middleName" className="form-label">
                              {" "}
                              <b>Middle Name:</b>
                            </label>
                            <Field
                              type="text"
                              className="form-control"
                              name="middleName"
                              id="middleName"
                              aria-describedby="name"
                              value={selectedItem?.middleName}
                              readOnly
                              placeholder="Middle Name"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <label htmlFor="email" className="form-label">
                              {" "}
                              <b>Email:</b>
                            </label>
                            <Field
                              type="text"
                              className="form-control text-lowercase"
                              name="email"
                              id="email"
                              aria-describedby="name"
                              required
                              value={selectedItem?.email}
                              readOnly
                              placeholder="Email e.g schoolmgt@yahoo.com"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <label htmlFor="phone" className="form-label">
                              <b>Phone No.</b>{" "}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="phone"
                              id="phone"
                              aria-describedby="name"
                              value={selectedItem?.phone}
                              readOnly
                              required
                              placeholder="Phone No. e.g 08222222"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-3  form-group">
                            <label htmlFor="dob" className="form-label">
                              {" "}
                              <b>Date of Birth:</b>
                            </label>
                            <Field
                              type="date"
                              className="form-control"
                              name="dob"
                              id="dob"
                              aria-describedby="name"
                              value={selectedItem?.dob}
                              readOnly
                              required
                              placeholder="Enter Date of Birth"
                            />
                          </Form.Group>
                        </div>
                        <div className="d-flex justify-content-end">
                          <Button
                            type="button"
                            variant="btn btn-danger mx-2"
                            onClick={() => {
                              history.push(staffLocations.staffList);
                            }}
                          >
                            Cancel
                          </Button>{" "}
                          {hasAccess(NavPermissions.editStaff) && (
                          <Button
                            type="button"
                            variant="btn btn-primary"
                            onClick={() => {
                              fetchSingleItem(selectedItem?.teacherAccountId)(
                                dispatch
                              );
                              history.push(
                                `${staffLocations.staffEdit}?teacherAccountId=${selectedItem?.teacherAccountId}`
                              );
                            }}
                          >
                            Edit Details
                          </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Formik>
      </div>
    </>
  );
};

export default StaffDetails;

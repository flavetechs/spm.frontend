import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import "./staff.scss";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// img
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_2.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import { staffLocations } from "../../../router/spm-path-locations";
import { createStaffAccount } from "../../../store/actions/staff-actions";

const StaffAdd = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const [images, setImages] = useState(null);
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
    dob: Yup.string().required("Please enter date of birth"),
    phone: Yup.number()
      .min(10, "Must be more than 10 characters")
      .required("Phone Number is required"),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message } = state.staff;
  // ACCESSING STATE FROM REDUX STORE

  if (isSuccessful) {
    history.push(staffLocations.staffList);
  }

  const ImageDisplay = (event) => {
    if (event.target.files[0]) {
      setImages(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            middleName: "",
            email: "",
            phone: "",
            photo: "",
            dob: "",
          }}
          validationSchema={validation}
          onSubmit={(values) => {
            values.firstName = values.firstName.toUpperCase();
            values.lastName = values.lastName.toUpperCase();
            values.middleName = values.middleName.toUpperCase();
            values.photo = images;
            const params = new FormData();
            params.append("firstName", values.firstName);
            params.append("lastName", values.lastName);
            params.append("middleName", values.middleName);
            params.append("phone", values.phone);
            params.append("dob", values.dob);
            params.append("email", values.email);
            params.append("photo",values.photo);
            params.append("profileImage",values.profileImage);
            createStaffAccount(values, params)(dispatch);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
            isValid,
            setFieldValue,
          }) => (
            <Row>
              <Col>
                <Card>
                  <div className="card-header d-flex justify-content-between d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title">
                        <b>Add New Staff Photo</b>
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
                            <label htmlFor="profileImage">
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
                                id="profileImage"
                                style={{ display: "none" }}
                                name="profileImage"
                                accept="image/jpeg,image/jpg,image/png"
                                className="file-upload form-control"
                                data-original-title="upload photos"
                                onChange={(event) => {
                                  setFieldValue(
                                    "profileImage",
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
                        {images ? (
                          <img
                            className=" img-fluid mt-4"
                            id="displayImg"
                            src={images}
                            alt="profile"
                          />
                        ) : null}
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
                        <b>Add New Staff Information</b>
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
                        {touched.dob && errors.dob && (
                          <div className="text-danger">{errors.dob}</div>
                        )}
                        <div className="row">
                          <Form.Group className="col-md-6 form-group">
                            <label htmlFor="firstName" className="form-label">
                              <b>First Name:</b>
                            </label>
                            <Field
                              type="text"
                              className="form-control text-dark"
                              name="firstName"
                              id="firstName"
                              aria-describedby="name"
                              required
                              placeholder="First Name"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <label htmlFor="lastName" className="form-label">
                              <b>Last Name:</b>
                            </label>
                            <Field
                              type="text"
                              className="form-control text-dark"
                              name="lastName"
                              id="lastName"
                              aria-describedby="name"
                              required
                              placeholder="Last Name"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <label htmlFor="middleName" className="form-label">
                              <b>Middle Name:</b>
                            </label>
                            <Field
                              type="text"
                              className="form-control text-dark"
                              name="middleName"
                              id="middleName"
                              aria-describedby="name"
                              placeholder="Middle Name"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6 form-group">
                            <label htmlFor="email" className="form-label">
                              <b>Email:</b>
                            </label>
                            <Field
                              type="email"
                              className="form-control text-dark text-lowercase"
                              name="email"
                              id="email"
                              aria-describedby="name"
                              required
                              placeholder="Email e.g schoolmgt@yahoo.com"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-6  form-group">
                            <label htmlFor="phone" className="form-label">
                              <b>Phone No.</b>
                            </label>
                            <Field
                              type="tel"
                              className="form-control text-dark"
                              name="phone"
                              id="phone"
                              aria-describedby="name"
                              required
                              placeholder="Phone No. e.g 08222222"
                            />
                          </Form.Group>
                          <Form.Group className="col-md-3  form-group">
                            <label htmlFor="dob" className="form-label">
                              <b>Date of Birth:</b>
                            </label>
                            <Field
                              type="date"
                              className="form-control"
                              name="dob"
                              id="dob"
                              aria-describedby="name"
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
                          <Button
                            type="button"
                            variant="btn btn-primary"
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button>
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

export default StaffAdd;
import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { createStudent } from "../../store/actions/student-actions";
import { useHistory } from "react-router-dom";
import avatars1 from "../../assets/images/avatars/01.png";
import avatars2 from "../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../assets/images/avatars/avtar_5.png";
import { getAllActiveClasses } from "../../store/actions/class-actions";
const StudentAdd = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "First Name Too Short!")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(2, "Last Name Too Short!")
      .required("Last Name is required"),
    email: Yup.string().email("Invalid email format"),
    parentOrGuardianName: Yup.string()
      .min(2, "Name Too Short!")
      .required("Parent/Guardian name is required"),
    parentOrGuardianRelationship: Yup.string().required(
      "Parent/Guardian relationship is required"
    ),
    parentOrGuardianPhone: Yup.string()
      .min(2, "Number Too Short!")
      .required("Parent/Guardian phone number is required"),
    parentOrGuardianEmail: Yup.string().email("Invalid email format"),
  });
  //VALIDATIONS SCHEMA

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message } = state.student;
  const { activeClasses } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllActiveClasses()(dispatch);
  }, []);

  if (isSuccessful) {
    history.push(studentsLocations.studentList);
  }

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          middleName: "",
          phone: "",
          dob: "",
          email: "",
          homePhone: "",
          emergencyPhone: "",
          parentOrGuardianName: "",
          parentOrGuardianRelationship: "",
          parentOrGuardianPhone: "",
          parentOrGuardianEmail: "",
          homeAddress: "",
          cityId: "",
          stateId: "",
          countryId: "",
          zipCode: "",
          photo: "",
        }}
        validationSchema={validation}
        onSubmit={(values) => {
          // values.dob=values.dob.replace("-","/");
          console.log("values", values);
          createStudent(values)(dispatch);
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
                    <h4 className="card-title">Add New Student</h4>
                  </div>
                </div>
                <div className="card-body ">
                  <Form className="">
                    <div className="form-group">
                      <div className="profile-img-edit position-relative">
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
                              onChange={(event) => {
                                setFieldValue(
                                  "file",
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="img-extension mt-3">
                        <div className="d-inline-block align-items-center">
                          <span>Only</span>{" "}
                          <a href="/hope-ui/react/build/dashboard/app/user-add">
                            .jpg
                          </a>{" "}
                          <a href="/hope-ui/react/build/dashboard/app/user-add">
                            .png
                          </a>{" "}
                          <a href="/hope-ui/react/build/dashboard/app/user-add">
                            .jpeg
                          </a>
                          <span> allowed</span>
                        </div>
                      </div>
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
                    <h4 className="card-title">New Student Information</h4>
                  </div>{" "}
                </div>
                <Card.Body>
                  {" "}
                  <div className="new-user-info">
                    <Form>
                      {message && <div className="text-danger">{message}</div>}
                      <div className="row">
                        <Row>
                          <div className="col-md-6">
                            {touched.firstName && errors.firstName && (
                              <div className="text-danger">
                                {errors.firstName}
                              </div>
                            )}
                          </div>
                          <div className="col-md-6">
                            {touched.lastName && errors.lastName && (
                              <div className="text-danger">
                                {errors.lastName}
                              </div>
                            )}
                          </div>
                        </Row>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="firstName">
                            First Name:
                          </label>
                          <Field
                            placeholder="First Name"
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="lastName">
                            Last Name:
                          </label>
                          <Field
                            placeholder="Last Name"
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="middleName">
                            Middle Name:
                          </label>
                          <Field
                            placeholder="Middle Name"
                            type="text"
                            name="middleName"
                            id="middleName"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="phone">
                            Mobile Number:
                          </label>
                          <Field
                            placeholder="Mobile Number"
                            type="text"
                            name="phone"
                            id="phone"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="homePhone">
                            Home Phone Number:
                          </label>
                          <Field
                            placeholder="Home Phone Number"
                            type="text"
                            name="homePhone"
                            id="homePhone"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label
                            className="form-label"
                            htmlFor="emergencyPhone"
                          >
                            Emergency Phone Number:
                          </label>
                          <Field
                            placeholder="Emergency Phone Number"
                            type="text"
                            name="emergencyPhone"
                            id="emergencyPhone"
                            className="form-control"
                          />
                        </div>
                        <Row>
                          <div classname="col-md-12">
                            {touched.email && errors.email && (
                              <div className="text-danger">{errors.email}</div>
                            )}
                          </div>
                        </Row>
                        <div className="col-md-12 form-group">
                          <label className="form-label" htmlFor="email">
                            Email Address:
                          </label>
                          <Field
                            placeholder="Email Address"
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                          />
                        </div>
                        <div className="col-sm-12 form-group">
                          <label htmlFor="homeAddress" className="form-label">
                            Home Address:
                          </label>
                          <Field
                            placeholder="Home Address"
                            type="text"
                            id="homeAddress"
                            name="homeAddress"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6  form-group">
                          <label className="form-label" htmlFor="dob">
                            Date Of Birth:
                          </label>
                          <Field
                            placeholder="dd/mm/yyyy"
                            type="date"
                            id="dob"
                            name="dob"
                            min="1987-01-01"
                            max="2090-12-31"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6  form-group">
                          <label className="form-label" htmlFor="classId">
                            Class:
                          </label>
                          <Field
                            as="select"
                            name="classId"
                            className="form-select"
                            id="classId"
                          >
                            <option value="Select Class">Select Class</option>
                            {activeClasses.map((item, idx) => (
                              <option
                                key={idx}
                                name={values.classId}
                                value={item.lookupId}
                              >
                                {item.name}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <div className="col-md-6  form-group">
                          <label className="form-label" htmlFor="cityId">
                            City:
                          </label>
                          <Field
                            as="select"
                            name="cityId"
                            className="form-select"
                            id="cityId"
                          >
                            <option value="Select City">Select City</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Ibadan">Ibadan</option>
                            <option value="Port-harcourt">Port-harcourt</option>
                            <option value="Benin City">Benin City</option>
                            <option value="Kano">Kano</option>
                            <option value="Plateau">Plateau</option>
                          </Field>
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="stateId">
                            State:
                          </label>
                          <Field
                            as="select"
                            name="stateId"
                            className="form-select"
                            id="stateId"
                          >
                            <option value="Select State">Select State</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Oyo">Oyo</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Edo">Edo</option>
                            <option value="Kano">Kano</option>
                            <option value="Jos">Jos</option>
                          </Field>
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="countryId">
                            Country:
                          </label>
                          <Field
                            as="select"
                            name="countryId"
                            className="form-select"
                            id="countryId"
                          >
                            <option value="Select Country">
                              Select Country
                            </option>
                            <option value="Afganistan">Nigeria</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">
                              American Samoa
                            </option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                          </Field>
                        </div>
                        <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="zipCode">
                            Zip Code:
                          </label>
                          <Field
                            placeholder="Zip Code"
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <hr />
                      <h5 className="mb-3">Parent/Guardian(s) Information</h5>
                      <div className="row">
                        <Row>
                          <div className="col-md-12">
                            {touched.parentOrGuardianName &&
                              errors.parentOrGuardianName && (
                                <div className="text-danger">
                                  {errors.parentOrGuardianName}
                                </div>
                              )}
                          </div>
                        </Row>
                        <div className="col-md-12 form-group">
                          <label
                            className="form-label"
                            htmlFor="parentOrGuardianName"
                          >
                            Name:
                          </label>
                          <Field
                            placeholder="Full Name"
                            type="text"
                            name="parentOrGuardianName"
                            id="parentOrGuardianName"
                            className="form-control"
                          />
                        </div>
                        <Row>
                          <div className="col-md-6">
                            {touched.parentOrGuardianRelationship &&
                              errors.parentOrGuardianRelationship && (
                                <div className="text-danger">
                                  {errors.parentOrGuardianRelationship}
                                </div>
                              )}
                          </div>
                          <div className="col-md-6">
                            {touched.parentOrGuardianPhone &&
                              errors.parentOrGuardianPhone && (
                                <div className="text-danger">
                                  {errors.parentOrGuardianPhone}
                                </div>
                              )}
                          </div>
                        </Row>
                        <div className="col-md-6 form-group">
                          <label
                            className="form-label"
                            htmlFor="parentOrGuardianRelationship"
                          >
                            Relationship:
                          </label>
                          <Field
                            placeholder="Parent/Guardian Relationship"
                            type="text"
                            name="parentOrGuardianRelationship"
                            id="parentOrGuardianRelationship"
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 form-group">
                          <label
                            className="form-label"
                            htmlFor="parentOrGuardianPhone"
                          >
                            Mobile Number:
                          </label>
                          <Field
                            placeholder="Mobile Number"
                            type="text"
                            name="parentOrGuardianPhone"
                            id="parentOrGuardianPhone"
                            className="form-control"
                          />
                        </div>
                        <Row>
                          <div className="col-md-6">
                            {touched.parentOrGuardianEmail &&
                              errors.parentOrGuardianEmail && (
                                <div className="text-danger">
                                  {errors.parentOrGuardianEmail}
                                </div>
                              )}
                          </div>
                        </Row>
                        <div className="col-md-6 form-group">
                          <label
                            className="form-label"
                            htmlFor="parentOrGuardianEmail"
                          >
                            Email Address:
                          </label>
                          <Field
                            placeholder="Email Address"
                            type="email"
                            name="parentOrGuardianEmail"
                            id="parentOrGuardianEmail"
                            className="form-control"
                          />
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
                        <Button
                          type="button"
                          variant="btn btn-primary"
                          onClick={handleSubmit}
                        >
                          Add New User
                        </Button>
                      </div>
                    </Form>
                  </div>{" "}
                </Card.Body>{" "}
              </div>
            </div>
          </Row>
        )}
      </Formik>
    </>
  );
};

export default StudentAdd;

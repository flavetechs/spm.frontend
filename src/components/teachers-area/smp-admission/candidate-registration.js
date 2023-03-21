import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import Card from "../../Card";
// import { admissionLocations } from "../../../router/spm-path-locations";
// import "./student-add.scss"


const CandidateRegistration = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const dispatch = useDispatch();
    const [images, setImages] = useState("");
    //VARIABLE DECLARATIONS

    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
        // firstName: Yup.string()
        //   .min(2, "First Name Too Short!")
        //   .required("First Name is required"),
        // lastName: Yup.string()
        //   .min(2, "Last Name Too Short!")
        //   .required("Last Name is required"),
        // email: Yup.string().email("Invalid email format"),
        // parentOrGuardianName: Yup.string()
        //   .min(2, "Name Too Short!")
        //   .required("Parent/Guardian name is required"),
        // parentOrGuardianRelationship: Yup.string().required(
        //   "Parent/Guardian relationship is required"
        // ),
        // parentOrGuardianPhone: Yup.string()
        //   .min(2, "Number Too Short!")
        //   .required("Parent/Guardian phone number is required"),
        // parentOrGuardianEmail: Yup.string().email("Invalid email format"),
        // sessionClassId: Yup.string().required("Class name is required"),
    });
    //VALIDATIONS SCHEMA

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { isSuccessful, message, cities, countries, states } = state.student;
    const { itemList } = state.class;
    const { activeSession } = state.session;

    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        // getActiveSession()(dispatch);
        // getCountries()(dispatch);
    }, [dispatch]);

    React.useEffect(() => {
        // getAllSessionClasses(activeSession?.sessionId)(dispatch);
    }, [activeSession, dispatch]);

   

    const studentparentGuarndianRelationship = ['father', 'mother', 'sister', 'brother', 'uncle', 'aunt', 'grandparent', 'other']

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
                    sessionClassId: "",
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                    values.phone = values.phone.toString();
                    values.homePhone = values.homePhone.toString();
                    values.emergencyPhone = values.emergencyPhone.toString();
                    values.parentOrGuardianPhone = values.parentOrGuardianPhone.toString();
                    values.firstName = values.firstName.toUpperCase();
                    values.lastName = values.lastName.toUpperCase();
                    values.middleName = values.middleName.toUpperCase();
                    values.parentOrGuardianName = values.parentOrGuardianName.toUpperCase();
                    values.zipCode = values.zipCode.toString();
                    values.photo = images;
                    const params = new FormData();
                    params.append("firstName", values.firstName);
                    params.append("lastName", values.lastName);
                    params.append("middleName", values.middleName);
                    params.append("phone", values.phone);
                    params.append("dob", values.dob);
                    params.append("email", values.email);
                    params.append("homePhone", values.homePhone);
                    params.append("emergencyPhone", values.emergencyPhone);
                    params.append("parentOrGuardianName", values.parentOrGuardianName);
                    params.append("parentOrGuardianRelationship", values.parentOrGuardianRelationship);
                    params.append("parentOrGuardianPhone", values.parentOrGuardianPhone);
                    params.append("parentOrGuardianEmail", values.parentOrGuardianEmail);
                    params.append("homeAddress", values.homeAddress);
                    params.append("cityId", values.cityId);
                    params.append("stateId", values.stateId);
                    params.append("countryId", values.countryId);
                    params.append("zipCode", values.zipCode);
                    params.append("photo", values.photo);
                    params.append("profileImage", values.profileImage);
                    params.append("sessionClassId", values.sessionClassId);
                    //   createStudent(params)(dispatch);
                }}
                enableReinitialize={true}
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
                        {/* <Col>
              <Card>
                <div className="card-header d-flex justify-content-between d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title"><b>Registraton Form</b></h4>
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
                                setFieldValue("profileImage", event.target.files[0])
                                ImageDisplay(event);
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
                      {images ?
                        <img
                          className=" img-fluid mt-4"
                          id="displayImg"
                          src={images}
                          alt="profile"
                        /> : null}
                    </div>
                  </Form>
                </div>
              </Card>
            </Col> */}
                        <div className="col-xl-9 col-lg-8 mx-auto">
                            <div className="card ">
                                <div className="card-header d-flex justify-content-between d-flex justify-content-between">
                                    {" "}
                                    <div className="header-title">
                                        <h4 className="card-title"><b>Registration Form</b></h4>
                                    </div>{" "}
                                </div>
                                <Card.Body>
                                    {" "}
                                    <div className="new-user-info">
                                        <Form>
                                            {message && <div className="text-danger">{message}</div>}
                                            <div className="row">
                                                <Row>
                                                    <div className="col-md-12">
                                                        {touched.sessionClassId && errors.sessionClassId && (
                                                            <div className="text-danger">{errors.sessionClassId}</div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-12  form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="sessionClassId"
                                                    >
                                                        <b>Class:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="sessionClassId"
                                                        className="form-select"
                                                        id="sessionClassId"
                                                    >
                                                        <option value="Select Class">Select Class</option>
                                                        {itemList?.map((item, idx) => (
                                                            <option
                                                                key={idx}
                                                                name={values.sessionClassId}
                                                                value={item.sessionClassId}
                                                            >
                                                                {item.class}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
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
                                                        <b>First Name:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="First Name"
                                                        type="text"
                                                        id="firstName"
                                                        name="firstName"
                                                        className="form-control firstName"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="lastName">
                                                        <b>Last Name:</b>
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
                                                        <b>Middle Name:</b>
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
                                                        <b>Phone Number:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Phone Number"
                                                        type="number"
                                                        name="phone"
                                                        id="phone"
                                                        className="form-control"
                                                    />
                                                </div>
                                                {/* <div className="col-md-6 form-group">
                          <label className="form-label" htmlFor="homePhone">
                            <b>Home Phone Number:</b>
                          </label>
                          <Field
                            placeholder="Home Phone Number"
                            type="number"
                            name="homePhone"
                            id="homePhone"
                            className="form-control"
                          />
                        </div> */}
                                                {/* <div className="col-md-6 form-group">
                          <label
                            className="form-label"
                            htmlFor="emergencyPhone"
                          >
                            <b>Emergency Phone Number:</b>
                          </label>
                          <Field
                            placeholder="Emergency Phone Number"
                            type="number"
                            name="emergencyPhone"
                            id="emergencyPhone"
                            className="form-control"
                          />
                        </div> */}
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.email && errors.email && (
                                                            <div className="text-danger">{errors.email}</div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="email">
                                                        <b>Email Address:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Email Address"
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control text-lowercase"
                                                    />
                                                </div>
                                                <div className="col-md-6  form-group">
                                                    <label className="form-label" htmlFor="dob">
                                                        <b>Date Of Birth:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="dd/mm/yyyy"
                                                        type="date"
                                                        id="dob"
                                                        name="dob"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-sm-12 form-group">
                                                    <label htmlFor="homeAddress" className="form-label">
                                                        <b>Home Address:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Home Address"
                                                        type="text"
                                                        id="homeAddress"
                                                        name="homeAddress"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="countryId">
                                                        <b>Country:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="countryId"
                                                        className="form-select"
                                                        id="countryId"
                                                    // onChange={(e) => { setFieldValue("countryId", e.target.value); getStates(e.target.value)(dispatch); }}
                                                    >
                                                        <option value="Select Country">
                                                            Select Country
                                                        </option>
                                                        {countries?.map((item, idx) => (
                                                            <option
                                                                key={idx}
                                                                value={item.value}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="stateId">
                                                        <b>State:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="stateId"
                                                        className="form-select"
                                                        id="stateId"
                                                    // onChange={(e) => { setFieldValue("stateId", e.target.value); getCities(e.target.value)(dispatch) }}
                                                    >
                                                        <option value="Select State">Select State</option>
                                                        {states?.map((item, idx) => (
                                                            <option
                                                                key={idx}
                                                                value={item.value}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <div className="col-md-6  form-group">
                                                    <label className="form-label" htmlFor="cityId">
                                                        <b>L.G.A. of Origin:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="cityId"
                                                        className="form-select"
                                                        id="cityId"
                                                    >
                                                        <option value="Select City">Select L.G.A</option>
                                                        {cities?.map((item, idx) => (
                                                            <option
                                                                key={idx}
                                                                value={item.value}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>

                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="zipCode">
                                                        <b>Choose File (optional):</b>
                                                    </label>
                                                    {/* <Field
                                                        placeholder="Zip Code"
                                                        type="number"
                                                        id="zipCode"
                                                        name="zipCode"
                                                        className="form-control"
                                                    /> */}

                                                    <div className="">
                                                        <input
                                                            type="file"
                                                            id="file"
                                                            name="file"
                                                            className="form-control"
                                                            accept=".xlsx, .xls, .csv"
                                                        // onChange={event => setStudentsExcelFile(event.target.files[0])}
                                                        // ref={fileInputRef}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <h5 className="mb-3"><b>For Parent/Guardian(s):</b></h5>
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
                                                        <b>Name:</b>
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
                                                    <label className="form-label" htmlFor="parentOrGuardianRelationship">
                                                        <b>Relationship:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="parentOrGuardianRelationship"
                                                        className="form-select"
                                                        id="parentOrGuardianRelationship"
                                                    // onChange={(e) => { setFieldValue("parentOrGuardianRelationship", e.target.value)}}
                                                    >
                                                        <option value="">Select Relationship</option>
                                                        {studentparentGuarndianRelationship?.map((relationship, idx) => (
                                                            <option
                                                                key={idx}
                                                                value={relationship}
                                                            >
                                                                {relationship}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="parentOrGuardianPhone"
                                                    >
                                                        <b>Phone Number:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Phone Number"
                                                        type="number"
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
                                                        <b>Email Address:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Email Address"
                                                        type="email"
                                                        name="parentOrGuardianEmail"
                                                        id="parentOrGuardianEmail"
                                                        className="form-control text-lowercase"
                                                    />
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
                                                <Button
                                                    type="button"
                                                    variant="btn btn-primary"
                                                    //   onClick={handleSubmit}
                                                    // onClick={
                                                    //     history.push(admissionLocations.admissionRegistrationInformation)
                                                    // }

                                                    onClick={() => {
                                                        // history.push(admissionLocations.admissionRegistrationInformation);
                                                    }}


                                                >
                                                    Registers
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

export default CandidateRegistration;

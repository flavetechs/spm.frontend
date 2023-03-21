import React, { useEffect, useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Card from "../Card";
import { createCandidateAdmission, getAdmissionClasses } from "../../store/actions/candidate-admission-actions";
import { getCities, getCountries, getStates } from "../../store/actions/student-actions";
import { candidateLocations } from "../../router/candidate-path-location";
import { getUserDetails } from "../../utils/permissions";
import { getSchoolSetting } from "../../store/actions/portal-setting-action";
import { studentparentGuarndianRelationship } from "../../utils/tools";

const CandidateRegistration = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const dispatch = useDispatch();
    const [getUserDetail, setGetUserDetail] = useState({});
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    //VARIABLE DECLARATIONS

    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
        Firstname: Yup.string()
            .min(2, "First Name Too Short!")
            .required("First Name is required"),
        Lastname: Yup.string()
            .min(2, "Last Name Too Short!")
            .required("Last Name is required"),
        Email: Yup.string().email("Invalid email format").required("Email is required"),
        ParentName: Yup.string()
            .min(2, "Name Too Short!")
            .required("Parent/Guardian Name is required"),
        ParentRelationship: Yup.string().required(
            "Parent/Guardian relationship is required"
        ),
        ParentPhoneNumber: Yup.string()
            .min(2, "Number Too Short!")
            .required("Parent/Guardian phone number is required"),
        ClassId: Yup.string().required("Class name is required"),
        Photo: Yup.string().required("Photo is required"),
        DateOfBirth: Yup.string().required("D.O.B is required"),
    });
    //VALIDATIONS SCHEMA

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { admissionClasses, message, submitSuccessful } = state.candidate;
    const { countries, states, cities } = state.student;
    const { schoolSetting } = state.portal;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        getAdmissionClasses()(dispatch);
        getCountries()(dispatch);
    }, [dispatch]);

    console.log('admissionClasses', admissionClasses);

    React.useEffect(() => {
        if (selectedCountry) {
            getStates(selectedCountry)(dispatch);
        }
    }, [dispatch, selectedCountry]);

    React.useEffect(() => {
        if (selectedState) {
            getCities(selectedState)(dispatch);
        }
    }, [dispatch, selectedState]);

  
    React.useEffect(() => {
        submitSuccessful && history.push(candidateLocations.candidateList);
    }, [submitSuccessful, history]);

    React.useEffect(() => {
        setGetUserDetail(getUserDetails())
    }, []);


 useEffect(() => {
    getSchoolSetting()(dispatch);
}, [])

    return (
        <>
            <Formik
                initialValues={{
                    Firstname: "",
                    Lastname: "",
                    Middlename: "",
                    Email: "",
                    PhoneNumber: "",
                    DateOfBirth: "",
                    CountryOfOrigin: "",
                    StateOfOrigin: "",
                    LGAOfOrigin: "",
                    Credentials: "",
                    Photo: "",
                    ParentName: "",
                    ParentRelationship: "",
                    ParentPhoneNumber: "",
                    ClassId: "",
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                    values.Firstname = values.Firstname;
                    values.Middlename = values.Middlename;
                    values.Lastname = values.Lastname;
                    values.Email = values.Email;
                    values.PhoneNumber = values.PhoneNumber;
                    values.DateOfBirth = values.DateOfBirth;
                    values.CountryOfOrigin = values.CountryOfOrigin;
                    values.StateOfOrigin = values.StateOfOrigin;
                    values.LGAOfOrigin = values.LGAOfOrigin;
                    values.ParentName = values.ParentName;
                    values.ParentRelationship = values.ParentRelationship;
                    values.ParentPhoneNumber = values.ParentPhoneNumber;
                    values.ClassId = values.ClassId;
                    const params = new FormData();
                    params.append("Firstname", values.Firstname);
                    params.append("Middlename", values.Middlename);
                    params.append("Lastname", values.Lastname);
                    params.append("Email", values.Email);
                    params.append("PhoneNumber", values.PhoneNumber);
                    params.append("DateOfBirth", values.DateOfBirth);
                    params.append("CountryOfOrigin", values.CountryOfOrigin);
                    params.append("StateOfOrigin", values.StateOfOrigin);
                    params.append("LGAOfOrigin", values.LGAOfOrigin);
                    params.append("Credentials", values.Credentials);
                    params.append("Photo", values.Photo);
                    params.append("ParentName", values.ParentName);
                    params.append("ParentRelationship", values.ParentRelationship);
                    params.append("ParentPhoneNumber", values.ParentPhoneNumber);
                    params.append("ClassId", values.ClassId);
                    createCandidateAdmission(params, history)(dispatch);
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
                    <Row className="">
                        <div className="col-xl-9 col-lg-8 col-md-8 mx-auto">
                            <div className="card ">
                                <div className="card-header  border border-light p-3">
                                    {" "}
                                    <div className="header-title">
                                        <div className="d-flex justify-content-center" >
                                            <div className=""><img style={{marginLeft:"35%"}}src={schoolSetting?.filepath} className=" img-fluid" height="80px"width="80px"alt="logo" />
                                            <div className="fw-bold ">{schoolSetting?.schoolName}</div></div>
                                       </div>
                                        <h4 className="card-title mt-3"><b>Registration Form</b></h4>
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
                                                        {touched.ClassId && errors.ClassId && (
                                                            <div className="text-danger">{errors.ClassId}</div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-12  form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="ClassId"
                                                    >
                                                        <b>Class:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="ClassId"
                                                        className="form-select"
                                                        id="ClassId"
                                                    >
                                                        <option value="Select Class">Select Class</option>
                                                        {admissionClasses?.map((item, idx) => (
                                                            <option
                                                                key={idx}
                                                                name={values.ClassId}
                                                                value={item.classId}
                                                            >
                                                                {item.className}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.Firstname && errors.Firstname && (
                                                            <div className="text-danger">
                                                                {errors.Firstname}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6">
                                                        {touched.Lastname && errors.Lastname && (
                                                            <div className="text-danger">
                                                                {errors.Lastname}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="Firstname">
                                                        <b>First Name:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="First Name"
                                                        type="text"
                                                        id="Firstname"
                                                        name="Firstname"
                                                        className="form-control firstName"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="Lastname">
                                                        <b>Last Name:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Last Name"
                                                        type="text"
                                                        id="Lastname"
                                                        name="Lastname"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="Middlename">
                                                        <b>Middle Name:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Middle Name"
                                                        type="text"
                                                        name="Middlename"
                                                        id="Middlename"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="PhoneNumber">
                                                        <b>Phone Number:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Phone Number"
                                                        type="number"
                                                        name="PhoneNumber"
                                                        id="PhoneNumber"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.Email && errors.Email && (
                                                            <div className="text-danger">{errors.Email}</div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-12 form-group">
                                                    <label className="form-label" htmlFor="Email">
                                                        <b>Email Address:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Email Address"
                                                        type="email"
                                                        id="Email"
                                                        name="Email"
                                                        className="form-control text-lowercase"
                                                    />
                                                </div>
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.DateOfBirth && errors.DateOfBirth && (
                                                            <div className="text-danger">
                                                                {errors.DateOfBirth}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6">
                                                    </div>
                                                </Row>
                                                <div className="col-md-6  form-group">
                                                    <label className="form-label" htmlFor="DateOfBirth">
                                                        <b>Date Of Birth:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="dd/mm/yyyy"
                                                        type="date"
                                                        id="DateOfBirth"
                                                        name="DateOfBirth"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="CountryOfOrigin">
                                                        <b>Country:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="CountryOfOrigin"
                                                        className="form-select"
                                                        id="CountryOfOrigin"
                                                        onChange={(e) => {
                                                            setFieldValue("CountryOfOrigin", e.target.value)
                                                            setSelectedCountry(e.target.value)
                                                        }}
                                                    >
                                                        <option value="">Select Country</option>
                                                        {countries?.map((country, idx) => (
                                                            <option
                                                                key={idx}
                                                                value={country.value}
                                                            >
                                                                {country.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.StateOfOrigin && errors.StateOfOrigin && (
                                                            <div className="text-danger">
                                                                {errors.StateOfOrigin}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6">
                                                        {touched.LGAOfOrigin && errors.LGAOfOrigin && (
                                                            <div className="text-danger">
                                                                {errors.LGAOfOrigin}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="StateOfOrigin">
                                                        <b>State:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="StateOfOrigin"
                                                        className="form-select"
                                                        id="StateOfOrigin"
                                                        disabled={!selectedCountry ? true : false}
                                                        onChange={(e) => {
                                                            setFieldValue("StateOfOrigin", e.target.value)
                                                            setSelectedState(e.target.value)
                                                        }}
                                                    >
                                                        <option value="">Select State</option>
                                                        {states?.map((state, idx) => (
                                                            <option
                                                                key={idx}
                                                                value={state.value}
                                                            >
                                                                {state.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="LGAOfOrigin">
                                                        <b>L.G.A:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="LGAOfOrigin"
                                                        className="form-select"
                                                        id="LGAOfOrigin"
                                                        disabled={!selectedState ? true : false}
                                                        onChange={(e) => {
                                                            setFieldValue("LGAOfOrigin", e.target.value)
                                                        }}
                                                    >
                                                        <option value="">Select City</option>
                                                        {cities?.map((city, idx) => (
                                                            <option
                                                                key={idx}
                                                                value={city.value}
                                                            >
                                                                {city.name}
                                                            </option>
                                                        ))}
                                                    </Field>
                                                </div>

                                                <Row>
                                                    <div className="col-md-12">
                                                        {touched.Photo && errors.Photo && (
                                                            <div className="text-danger">
                                                                {errors.Photo}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="Photo">
                                                        <b>Choose Photo:</b>
                                                    </label>
                                                    <div className="">
                                                        <input
                                                            type="file"
                                                            id="Photo"
                                                            name="Photo"
                                                            className="form-control"
                                                            accept="image/*"
                                                            onChange={(event) => {
                                                                setFieldValue("Photo", event.target.files[0])
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="Credentials">
                                                        <b>Choose File (optional):</b>
                                                    </label>
                                                    <div className="">
                                                        <input
                                                            type="file"
                                                            id="Credentials"
                                                            name="Credentials"
                                                            className="form-control"
                                                            accept="image/*, application/pdf,"
                                                            onChange={(event) => {
                                                                setFieldValue("Credentials", event.target.files[0])
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <h5 className="mb-3"><b>For Parent/Guardian(s) use:</b></h5>
                                            <div className="row">
                                                <Row>
                                                    <div className="col-md-12">
                                                        {touched.ParentName &&
                                                            errors.ParentName && (
                                                                <div className="text-danger">
                                                                    {errors.ParentName}
                                                                </div>
                                                            )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-6 form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="ParentName"
                                                    >
                                                        <b>Name:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Full Name"
                                                        type="text"
                                                        name="ParentName"
                                                        id="ParentName"
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="ParentEmail"
                                                    >
                                                        <b>Parent Email:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Parent Email"
                                                        disabled
                                                        type="email"
                                                        // name="ParentEmail"
                                                        // id="ParentEmail"
                                                        className="form-control"
                                                        value={getUserDetail?.parentEmail || ""}
                                                    />
                                                </div>
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.ParentRelationship &&
                                                            errors.ParentRelationship && (
                                                                <div className="text-danger">
                                                                    {errors.ParentRelationship}
                                                                </div>
                                                            )}
                                                    </div>
                                                    <div className="col-md-6">
                                                        {touched.ParentPhoneNumber &&
                                                            errors.ParentPhoneNumber && (
                                                                <div className="text-danger">
                                                                    {errors.ParentPhoneNumber}
                                                                </div>
                                                            )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="ParentRelationship">
                                                        <b>Relationship:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="ParentRelationship"
                                                        className="form-select"
                                                        id="ParentRelationship"
                                                        onChange={(e) => { setFieldValue("ParentRelationship", e.target.value) }}
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
                                                        htmlFor="ParentPhoneNumber"
                                                    >
                                                        <b>Phone Number:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Phone Number"
                                                        type="number"
                                                        name="ParentPhoneNumber"
                                                        id="ParentPhoneNumber"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    type="button"
                                                    variant="btn btn-danger mx-2"
                                                    onClick={() => {
                                                        history.push(candidateLocations.candidateList);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>{" "}
                                                <Button
                                                    type="button"
                                                    variant="btn btn-primary"
                                                    onClick={handleSubmit}
                                                >
                                                    Register
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

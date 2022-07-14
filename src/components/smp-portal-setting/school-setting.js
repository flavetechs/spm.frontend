import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../router/spm-path-locations";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { createStudent } from "../../store/actions/student-actions";
import { useHistory } from "react-router-dom";
import { getActiveSession } from "../../store/actions/session-actions";
import { getAllSessionClasses } from "../../store/actions/class-actions";
// import "./student-add.scss"

const SchoolSetting = ({editButton, setEditButton, saveButton, setSaveButton}) => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    //VARIABLE DECLARATIONS

    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
        schoolName: Yup.string()
            .min(2, "School Name Too Short!")
            .required("School Name is required"),
        schoolAbbreviation: Yup.string()
            .required("School Abbreviation is required"),
        email: Yup.string().email("Invalid email format"),
        schoolAddress: Yup.string().required("School Address is required"),
        parentOrGuardianPhone: Yup.string()
            .min(2, "Number  Too Short!")
            .required("Phone number 1 is required"),
        // parentOrGuardianEmail: Yup.string().email("Invalid email format"),
        // sessionClassId: Yup.string().required("Class name is required"),
    });
    //VALIDATIONS SCHEMA

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { isSuccessful, message } = state.student;
    const { itemList } = state.class;
    const { activeSession } = state.session;

    // ACCESSING STATE FROM REDUX STORE

  

    React.useEffect(() => {
        getAllSessionClasses(activeSession?.sessionId)(dispatch);
    }, [activeSession]);

    if (isSuccessful) {
        history.push(studentsLocations.studentList);
    }

    const ImageDisplay = (event) => {
        if (event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    };

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
                    //photo: "",
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

                    <Row className="border-start border-4">
                        <Card.Body>
                            <div className="col-xl-9 col-lg-8">
                                <div className="">
                                    <div className=" d-flex justify-content-between d-flex justify-content-between mb-4">
                                        {" "}
                                        <div className="header-title">
                                            <h4 className=""><b>School Settings</b></h4>
                                        </div>{" "}
                                    </div>
                                    {" "}
                                    <div className="new-user-info">
                                        <Form>
                                            {message && <div className="text-danger">{message}</div>}
                                            <div className="row">
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.schoolName && errors.schoolName && (
                                                            <div className="text-danger">
                                                                {errors.schoolName}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="col-md-6">
                                                        {touched.schoolAbbreviation && errors.schoolAbbreviation && (
                                                            <div className="text-danger">
                                                                {errors.schoolAbbreviation}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="schoolName">
                                                        <b>School Name: </b>
                                                    </label>
                                                    <Field
                                                        placeholder="School Name"
                                                        type="text"
                                                        id="schoolName"
                                                        name="schoolName"
                                                        className="form-control text-dark schoolName"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="schoolAbbreviation">
                                                        <b>School Abbreviation: </b>
                                                    </label>
                                                    <Field
                                                        placeholder="School Abbreviation"
                                                        type="text"
                                                        id="schoolAbbreviation"
                                                        name="schoolAbbreviation"
                                                        className="form-control text-dark"
                                                    />
                                                </div>
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.schoolAddress && errors.schoolAddress && (
                                                            <div className="text-danger">{errors.schoolAddress}</div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-12 form-group">
                                                    <label className="form-label" htmlFor="schoolAddress">
                                                        <b>School Address:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="School Address"
                                                        type="text"
                                                        id="schoolAddress"
                                                        name="schoolAddress"
                                                        className="form-control text-dark"
                                                    />
                                                </div>
                                                <Row>
                                                    <div className="col-md-6">
                                                        {touched.email && errors.email && (
                                                            <div className="text-danger">{errors.email}</div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-9 form-group">
                                                    <label className="form-label" htmlFor="email">
                                                        <b>School Email Adress:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="School Email Address"
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control text-dark text-lowercase"
                                                    />
                                                </div>
                                                <div className="col-md-6  form-group">
                                                    <label className="form-label" htmlFor="cityId">
                                                        <b>Country Located:</b>
                                                    </label>
                                                    <Field
                                                        as="select"
                                                        name="countryId"
                                                        className="form-select"
                                                        id="countryId"
                                                    >
                                                        <option value="Select City">Select Country</option>
                                                        <option value="Lagos">Benin Republic</option>
                                                        <option value="Ibadan">Cameroun</option>
                                                        <option value="Port-harcourt">Chad</option>
                                                        <option value="Benin City">Ghana</option>
                                                        <option value="Kano">Morroco</option>
                                                        <option value="Plateau">Tunisia</option>
                                                    </Field>
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="stateId">
                                                        <b>State Located:</b>
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
                                                    <label className="form-label" htmlFor="phone">
                                                        <b>Phone Number 1:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Phone Number 1"
                                                        type="number"
                                                        name="phone"
                                                        id="phone"
                                                        className="form-control text-dark"
                                                    />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <label className="form-label" htmlFor="homePhone">
                                                        <b>Phone Number 2:</b>
                                                    </label>
                                                    <Field
                                                        placeholder="Phone Number 2"
                                                        type="number"
                                                        name="homePhone"
                                                        id="homePhone"
                                                        className="form-control text-dark"
                                                    />
                                                </div>
                                                <div className="form-check ms-4">
                                                    <Field className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                                                    <label className="form-check-label" for="flexRadioDefault1">
                                                        Primary
                                                    </label>
                                                </div>
                                                <div className="form-check ms-4">
                                                    <Field className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                                    <label className="form-check-label" for="flexRadioDefault2">
                                                        Secondary
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                {/* <Button
                                                    type="button"
                                                    variant="btn btn-danger mx-2"
                                                    onClick={() => {
                                                        history.push(studentsLocations.studentList);
                                                    }}
                                                >
                                                    Cancel
                                                </Button>{" "} */}
                                                {saveButton ? (
                                                     <Button
                                                     type="button"
                                                     variant="btn btn-danger mx-2"
                                                     onClick={() => {
                                                         setSaveButton(!saveButton)
                                                         setEditButton(!editButton)
                                                     }}
                                                 >
                                                     Edit Setting
                                                 </Button>
                                                ) : (
                                                   <Button
                                                        type="button"
                                                        variant="btn btn-primary mx-2"
                                                        onClick={() => {
                                                            setSaveButton(!saveButton)
                                                            setEditButton(!editButton)
                                                        }}
                                                    >
                                                        Save
                                                    </Button>
                                                )}
                                            </div>
                                        </Form>
                                    </div>{" "}

                                </div>
                            </div>
                        </Card.Body>{" "}
                    </Row>

                )}
            </Formik>
        </>
    );
};

export default SchoolSetting;

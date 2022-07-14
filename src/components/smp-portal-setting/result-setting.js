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

const ResultSetting = ({ editButton, setEditButton, saveButton, setSaveButton }) => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    //VARIABLE DECLARATIONS

    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
        // firstName: Yup.string()
        //     .min(2, "First Name Too Short!")
        //     .required("First Name is required"),
        // lastName: Yup.string()
        //     .min(2, "Last Name Too Short!")
        //     .required("Last Name is required"),
        // email: Yup.string().email("Invalid email format"),
        // parentOrGuardianName: Yup.string()
        //     .min(2, "Name Too Short!")
        //     .required("Parent/Guardian name is required"),
        // parentOrGuardianRelationship: Yup.string().required(
        //     "Parent/Guardian relationship is required"
        // ),
        // parentOrGuardianPhone: Yup.string()
        //     .min(2, "Number Too Short!")
        //     .required("Parent/Guardian phone number is required"),
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
        getActiveSession()(dispatch)
    }, []);

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

                    <Row className="border-start border-4 mt-0">
                        <Card.Body>
                            <div className="col-xl-9 col-lg-8">
                                <div className="">
                                    <div className=" d-flex justify-content-between d-flex justify-content-between mb-3">
                                        {" "}
                                        <div className="header-title">
                                            <h4 className=""><b>Result Setting</b></h4>
                                        </div>{" "}
                                    </div>
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
                                                    <Form.Check type="checkbox" label="Promote by pass mark" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <Form.Check type="checkbox" label="Promote all" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <Form.Check type="checkbox" label="Show position on result " />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <Form.Check type="checkbox" label="Cumulative result" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <Form.Check type="checkbox" label="Show newsletter" />
                                                </div>
                                                <div className="col-md-6 form-group">
                                                    <Form.Check type="checkbox" label="Batch printing" />
                                                </div>
                                                {/* <div className="form-check mb-3 form-Check">
                                                    <Field
                                                        type="checkbox"
                                                        id="customCheck1"
                                                        className="form-check-input"
                                                        // checked={isChecked}
                                                        // onChange={(e) => {
                                                        //     setIsChecked(!isChecked);
                                                        // }}
                                                    />
                                                    <label htmlFor="customCheck1" className="">
                                                        Notify me by Email{" "}
                                                    </label>
                                                </div> */}
                                            </div>
                                            <div className="row">
                                            </div>
                                            <div className="d-flex justify-content-end">
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

export default ResultSetting;

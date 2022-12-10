import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import Card from "../../Card";
import { admissionLocations } from "../../../router/spm-path-locations";
// import "./student-add.scss"


const AdmissionInformation = () => {
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

    if (isSuccessful) {
        // history.push(studentsLocations.studentList);
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
                        <div className="col-xl-9 col-lg-8 mx-auto">
                            <div className="card ">
                                <div className="card-header d-flex flex-column justify-content-center align-items-center">
                                    <div>
                                        <img
                                            src="https://i.pinimg.com/736x/f3/ee/ca/f3eecab89ed37a8afd2f4beb1b6779cb.jpg"
                                            alt="School logo"
                                            height="200px"
                                            width="200px"
                                            style={{}}
                                        />
                                    </div>
                                    <div className="">
                                        <h5 className="card-title text-center"><b>SMP COLLEGE LAGOS</b></h5>
                                        <p className="text-center mb-0">Motto: Good learning makes good leaders</p>
                                        <p className="text-center"><small>No. 34B Surele Lagos State Nig</small></p>
                                    </div>
                                </div>
                                <div className="card-header d-flex justify-content-between d-flex justify-content-between">
                                    {" "}
                                    <div className="header-title">
                                        <h5 className="card-title"><b> Registered Information</b></h5>
                                    </div>{" "}
                                </div>
                                <Card.Body>
                                    {" "}
                                    <div className="new-user-info">
                                        <Form>
                                            <div className="row">
                                                <Row>
                                                    <div className="col-md-12">
                                                        {touched.sessionClassId && errors.sessionClassId && (
                                                            <div className="text-danger">{errors.sessionClassId}</div>
                                                        )}
                                                    </div>
                                                </Row>
                                                <div className="col-md-12 ">
                                                    <p>Student Name: <span className="text-dark text-uppercase">Jeremiah Brazixus A.</span></p>
                                                    <hr />
                                                </div>
                                                <Row>
                                                    <div className="col-md-6 col-12">
                                                        <p>Class Admitted To: <span className="text-dark text-uppercase">JSS3</span></p>
                                                        <hr />
                                                    </div>
                                                    <div className="col-md-6 col-12">
                                                        <p>Exam Status: <span className="text-dark text-uppercase">Passed</span></p>
                                                        <hr />
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className="col-md-6 col-12">
                                                        <p>Admission Status: <span className="text-dark text-uppercase">Admitted</span></p>
                                                        <hr />
                                                    </div>
                                                </Row>
                                                <div className="col-md-12">
                                                    <label className="text-dark">Instruction:</label>
                                                    <div >
                                                        In publishing and graphic design, Lorem ipsum is a placeholder text
                                                        commonly used to demonstrate the visual form of a document or a
                                                        typeface without relying on meaningful content. Lorem ipsum may be used as a
                                                        placeholder before final copy is available
                                                    </div>
                                                    <hr />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <Button
                                                    type="button"
                                                    variant="btn btn-primary"

                                                // onClick={() => {
                                                //     history.push(admissionLocations.admissionRegistrationInformation);
                                                // }}
                                                >
                                                    Print
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

export default AdmissionInformation;

import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import { getAllClasses, resetClassSetupState } from "../../../store/actions/class-actions";
import { createAdmissionSetting, getAdmissionSetting } from "../../../store/actions/portal-setting-action";

const AdmissionSetting = () => {
    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const {  admissionSettingResult } = state.portal;
    const { itemList } = state.class;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [editButton, setEditButton] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [classesAvailableForAdmission, setClassesAvailableForAdmission] = useState([]);
    const [disable, setDisable] = useState(true);
    const [withRegistrationFee, setWithRegistrationFee] = useState(admissionSettingResult?.registrationFee || "");
    const [admissionStatusValue, setAdmissionStatusValue] = useState(admissionSettingResult?.admissionStatus || "");
    //VARIABLE DECLARATIONS

    React.useEffect(() => {
        setSaveButton(true);
        setEditButton(false);
    }, [dispatch]);

    
    React.useEffect(() => {
        setWithRegistrationFee(admissionSettingResult?.registrationFee || "");
        setClassesAvailableForAdmission(admissionSettingResult?.classes || "");
        setAdmissionStatusValue(admissionSettingResult?.admissionStatus || "")
        setClassesAvailableForAdmission(admissionSettingResult?.classes || "")
    }, [admissionSettingResult]);


    React.useEffect(() => {
        getAllClasses()(dispatch);
        getAdmissionSetting()(dispatch);
        return () => {
            resetClassSetupState()(dispatch);
        }
    }, [dispatch]);


    const handleSelectedClasses = (id) => {
        setClassesAvailableForAdmission([...classesAvailableForAdmission, id]);

        return classesAvailableForAdmission
    }

    console.log('classesAvailableForAdmission', classesAvailableForAdmission);
    console.log('withRegistrationFee', withRegistrationFee);
    console.log('admissionStatusValue', admissionStatusValue);
    console.log('admissionSettingResult', admissionSettingResult);


    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    admissionSettingId: admissionSettingResult?.admissionSettingId ?? "",
                    classes: [],
                    // admissionStatus: admissionSettingResult ?? "",
                    passedExamEmail: admissionSettingResult?.passedExamEmail ?? "",
                    failedExamEmail: admissionSettingResult?.failedExamEmail ?? "",
                    screeningEmail: admissionSettingResult?.screeningEmail ?? "",
                    registrationFee: admissionSettingResult?.registrationFee ?? "",
                    //photo: "",
                }}

                onSubmit={(values) => {
                    values.classes = classesAvailableForAdmission;
                    values.admissionStatus = admissionStatusValue;
                    values.passedExamEmail = values.passedExamEmail;
                    values.failedExamEmail = values.failedExamEmail;
                    values.screeningEmail = values.screeningEmail;
                    values.registrationFee = withRegistrationFee;
                    console.log("values", values);
                    setSaveButton(!saveButton);
                    setEditButton(!editButton);
                    setDisable(true);
                    // createAdmissionSetting(values)(dispatch);
                }}
            >
                {({
                    handleSubmit,
                    setFieldValue,
                }) => (

                    <Row className="mt-0">
                        <Card.Body>
                            <div className="col-xl-9 col-lg-8">
                                <div className="">
                                    <div className=" d-flex justify-content-between d-flex justify-content-between mb-3">
                                        {" "}
                                        <div className="header-title">
                                            <h4 className=""><b>Admission Setting</b></h4>
                                        </div>{" "}
                                    </div>
                                    {" "}
                                    <div className="new-user-info">
                                        <Form>
                                            <div className="row ms-1">
                                                <h6 className=""> Select classes for Admission</h6>
                                                {itemList.map((item, idx) => (
                                                    <div className="form-check mb-3 form-Check col-md-5 ms-3"
                                                        key={idx}
                                                    >
                                                        <Field
                                                            disabled={disable}
                                                            type="checkbox"
                                                            id="classes"
                                                            className="form-check-input"
                                                            name="classes"
                                                            // checked={}
                                                            onChange={(e) => handleSelectedClasses(item.lookupId)}
                                                        />
                                                        <label htmlFor="classes" className="check-label">
                                                            {item.name}
                                                        </label>
                                                    </div>
                                                ))}
                                                <h6 className="">Choose Open Or closed Admission</h6>
                                                <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                    <Field
                                                        disabled={disable}
                                                        type="radio"
                                                        id="admissionStatus"
                                                        className="form-check-input"
                                                        name="admissionStatus"
                                                        checked={admissionStatusValue ? true : false}
                                                        onChange={() => {
                                                            setAdmissionStatusValue(!admissionStatusValue);
                                                        }}
                                                    />
                                                    <label htmlFor="admissionStatus" className="check-label">
                                                        Open{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                    <Field
                                                        disabled={disable}
                                                        type="radio"
                                                        id="admissionStatus"
                                                        className="form-check-input"
                                                        name="admissionStatus"
                                                        checked={admissionStatusValue ? false : true}
                                                        onChange={() => {
                                                            setAdmissionStatusValue(!admissionStatusValue);
                                                        }}
                                                    />
                                                    <label htmlFor="admissionStatus" className="check-label">
                                                        Closed{" "}
                                                    </label>
                                                </div>
                                                <h6 className="">Payment Option</h6>
                                                <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                    <Field
                                                        disabled={disable}
                                                        type="radio"
                                                        id="registrationFee"
                                                        className="form-check-input"
                                                        name="registrationFee"
                                                        checked={withRegistrationFee ? true : false}
                                                        onChange={() => {
                                                            setWithRegistrationFee(!withRegistrationFee);
                                                        }}
                                                    />
                                                    <label htmlFor="registrationFee" className="check-label">
                                                        Paid{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                    <Field
                                                        disabled={disable}
                                                        type="radio"
                                                        id="registrationFee"
                                                        className="form-check-input"
                                                        name="registrationFee"
                                                        checked={withRegistrationFee? false : true }
                                                        onChange={() => {
                                                            setWithRegistrationFee(!withRegistrationFee);
                                                        }}
                                                    />
                                                    <label htmlFor="registrationFee" className="check-label">
                                                        Free{" "}
                                                    </label>
                                                </div>
                                                <h6 className=" ">Email Messages format</h6>
                                                <div className="col-md-12 form-group mb-3 ms-0">
                                                    <label
                                                        className="form-label ms-0 ps-0"
                                                        htmlFor="schoolAbbreviation"
                                                    >
                                                        Email Message for passed Student
                                                    </label>
                                                    <Field
                                                        disabled={disable}
                                                        placeholder="Enter Email"
                                                        type="text"
                                                        id="passedExamEmail"
                                                        name="passedExamEmail"
                                                        className="form-control ms-0"
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="schoolAbbreviation"
                                                    >
                                                        Email Message for failed Student
                                                    </label>
                                                    <Field
                                                        disabled={disable}
                                                        placeholder="Enter Email"
                                                        type="text"
                                                        id="failedExamEmail"
                                                        name="failedExamEmail"
                                                        className="form-control"
                                                    // checked={newsletter}
                                                    // onChange={(e) => {
                                                    //     setNewsletter(!newsletter)
                                                    // }}
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="schoolAbbreviation"
                                                    >
                                                        Email Message for Physical Screening
                                                    </label>
                                                    <Field
                                                        disabled={disable}
                                                        placeholder="Enter Email"
                                                        type="text"
                                                        id="screeningEmail"
                                                        name="screeningEmail"
                                                        className="form-control"
                                                    // checked={newsletter}
                                                    // onChange={(e) => {
                                                    //     setNewsletter(!newsletter)
                                                    // }}
                                                    />
                                                </div>

                                            </div>
                                            <div className="row">
                                            </div>
                                            <div className="d-flex mt-4 justify-content-end">
                                                {saveButton ? (
                                                    <Button
                                                        type="button"
                                                        variant="btn btn-primary mx-2"
                                                        onClick={() => {
                                                            setSaveButton(!saveButton)
                                                            setEditButton(!editButton)
                                                            setDisable(!disable);
                                                        }}
                                                    >
                                                        CLICK TO EDIT
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        variant="btn btn-danger mx-2"
                                                        onClick={handleSubmit}
                                                    >
                                                        Save Changes
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

export default AdmissionSetting;

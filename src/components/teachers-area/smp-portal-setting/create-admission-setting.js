import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import { getAllClasses, resetClassSetupState } from "../../../store/actions/class-actions";
import { createAdmissionSetting } from "../../../store/actions/portal-setting-action";
import { useHistory } from "react-router-dom";
import { portalSetting } from "../../../router/spm-path-locations";

const CreateAdmissionSetting = () => {
    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { itemList } = state.class;
    const { submittedSuccessful } = state.portal;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    const [classesIds, setClassesIds] = useState([]);
    const [withRegistrationFee, setWithRegistrationFee] = useState(false);
    const [admissionStatusValue, setAdmissionStatusValue] = useState(true);
    //VARIABLE DECLARATIONS

    React.useEffect(() => {
        getAllClasses()(dispatch);
        return () => {
            resetClassSetupState()(dispatch);
        }
    }, [dispatch]);

    const handleClassesArray = (event) => {
        const checkBoxValue = event.target.checked;
        const classId = event.target.id;
        let selectedClassessArray;
        const otherSelectedClasses = classesIds.filter((item) => item != classId);
        if (checkBoxValue === false) {
            selectedClassessArray = [...otherSelectedClasses];
        } else {
            selectedClassessArray = [...otherSelectedClasses, classId];
        }
        setClassesIds(selectedClassessArray);
    };

    if (submittedSuccessful) {
        history.push(portalSetting.setting);
      }

    console.log("submittedSuccessful", submittedSuccessful);

    return (
        <>
            <Card>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        admissionSettingName: "",
                        classes: [],
                        passedExamEmail: "",
                        failedExamEmail: "",
                        screeningEmail: "",
                        screeningEmail: "",
                    }}

                    onSubmit={(values) => {
                        values.classes = classesIds;
                        values.admissionStatus = admissionStatusValue;
                        values.passedExamEmail = values.passedExamEmail;
                        values.failedExamEmail = values.failedExamEmail;
                        values.screeningEmail = values.screeningEmail;
                        values.admissionSettingName = values.admissionSettingName;
                        values.registrationFee = withRegistrationFee;
                        createAdmissionSetting(values)(dispatch);
                    }}
                >
                    {({
                        handleSubmit,
                    }) => (

                        <Row className="mt-0">
                            <Card.Body>
                                <div className="col-xl-9 col-lg-8 mx-auto">
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
                                                    <div className="col-md-12 form-group mb-3">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="admissionSettingName"
                                                        >
                                                            Admission Name
                                                        </label>
                                                        <Field
                                                            placeholder="Enter Admission Name"
                                                            type="text"
                                                            id="admissionSettingName"
                                                            name="admissionSettingName"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <h6 className=""> Select classes for Admission</h6>
                                                    {itemList.map((item, idx) => (
                                                        <div className="form-check mb-3 form-Check col-md-5 ms-3"
                                                            key={idx}
                                                        >
                                                            <Field
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                name="classes"
                                                                checked={!!classesIds?.find((id) => id === item.lookupId
                                                                )}
                                                                id={item.lookupId}
                                                                onChange={(event) => {
                                                                    handleClassesArray(event);
                                                                }}
                                                            />
                                                            <label htmlFor="classes" className="check-label">
                                                                {item.name}
                                                            </label>
                                                        </div>
                                                    ))}
                                                    <h6 className="">Choose Open Or closed Admission</h6>
                                                    <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                        <Field
                                                            type="radio"
                                                            id="admissionStatus"
                                                            className="form-check-input"
                                                            name="admissionStatus"
                                                            checked={admissionStatusValue? true : false}
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
                                                            type="radio"
                                                            id="admissionStatus"
                                                            className="form-check-input"
                                                            name="admissionStatus"
                                                            checked={!admissionStatusValue ? true : false }
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
                                                            type="radio"
                                                            id="registrationFee"
                                                            className="form-check-input"
                                                            name="registrationFee"
                                                            checked={!withRegistrationFee ? true : false}
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
                                                            placeholder="Enter Email"
                                                            type="text"
                                                            id="failedExamEmail"
                                                            name="failedExamEmail"
                                                            className="form-control"
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
                                                            placeholder="Enter Email"
                                                            type="text"
                                                            id="screeningEmail"
                                                            name="screeningEmail"
                                                            className="form-control"
                                                        />
                                                    </div>

                                                </div>
                                                <div className="row">
                                                </div>
                                                <div className="d-flex mt-4 justify-content-end">
                                                    <Button
                                                        type="button"
                                                        variant="btn btn-danger mx-2"
                                                        onClick={() => {
                                                            history.goBack();
                                                        }}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="btn btn-primary mx-2"
                                                        onClick={handleSubmit}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>{" "}
                                    </div>
                                </div>
                            </Card.Body>{" "}
                        </Row>
                    )}
                </Formik>
            </Card>

        </>
    );
};

export default CreateAdmissionSetting;

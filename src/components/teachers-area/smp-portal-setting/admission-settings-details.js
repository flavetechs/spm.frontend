import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import { getAllActiveClasses, getAllClasses, resetClassSetupState } from "../../../store/actions/class-actions";
import { createAdmissionSetting, getAllAdmissionSetting, getSingleAdmissionSetting, updateAdmissionSetting } from "../../../store/actions/portal-setting-action";
import { useHistory, useLocation } from "react-router-dom";

const AdmissionSettingsDetails = () => {
    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const {  singleAdmissionSettingsDetail } = state.portal;
    const {  activeClasses } = state.class;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    const locations = useLocation();
    const [editButton, setEditButton] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [classesIds, setClassesIds] = useState([]);
    const [disable, setDisable] = useState(true);
    const [withRegistrationFee, setWithRegistrationFee] = useState(singleAdmissionSettingsDetail?.registrationFee || false);
    const [admissionStatusValue, setAdmissionStatusValue] = useState(singleAdmissionSettingsDetail?.admissionStatus || false);
    //VARIABLE DECLARATIONS

    const queryParams = new URLSearchParams(locations.search);
    const admissionSettingId = queryParams.get("admissionSettingId") || "";

    React.useEffect(() => {
        if (admissionSettingId) {
            getSingleAdmissionSetting(admissionSettingId)(dispatch);
        }
    }, [dispatch, admissionSettingId]);

    React.useEffect(() => {
        setSaveButton(true);
        setEditButton(false);
    }, [dispatch]);

    React.useEffect(() => {
        setWithRegistrationFee(singleAdmissionSettingsDetail?.registrationFee || false);
        setAdmissionStatusValue(singleAdmissionSettingsDetail?.admissionStatus || false);
    }, [singleAdmissionSettingsDetail]);


    React.useEffect(() => {
        getAllActiveClasses()(dispatch);
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

    let result = singleAdmissionSettingsDetail?.classes?.map(element => {
        return element.classId
    });
    React.useEffect(() => {
        if (singleAdmissionSettingsDetail?.classes) {
            setClassesIds([...result]);
        }
    }, [singleAdmissionSettingsDetail]);

    return (
        <>
            <Card>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        admissionSettingName: singleAdmissionSettingsDetail?.admissionSettingName ?? "",
                        admissionSettingsId: singleAdmissionSettingsDetail?.admissionSettingId ?? "",
                        classes: [],
                        passedExamEmail: singleAdmissionSettingsDetail?.passedExamEmail ?? "",
                        failedExamEmail: singleAdmissionSettingsDetail?.failedExamEmail ?? "",
                        screeningEmail: singleAdmissionSettingsDetail?.screeningEmail ?? "",
                      
                    }}

                    onSubmit={(values) => {
                        values.admissionSettingName = values.admissionSettingName;
                        values.admissionSettingsId = values.admissionSettingsId;
                        values.classes = classesIds;
                        values.admissionStatus = admissionStatusValue;
                        values.passedExamEmail = values.passedExamEmail;
                        values.failedExamEmail = values.failedExamEmail;
                        values.screeningEmail = values.screeningEmail;
                        values.registrationFee = withRegistrationFee;
                        setSaveButton(!saveButton);
                        setEditButton(!editButton);
                        setDisable(true);
                        updateAdmissionSetting(values)(dispatch);
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
                                            <div className="header-title d-md-flex align-items-center">
                                                <h4 className=""><b>Admission Setting</b></h4>
                                                {disable &&
                                            <i className="text-danger mx-2">Click the edit button to edit page</i>
                                            }
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
                                                            disabled={disable}
                                                            placeholder="Enter Admission Name"
                                                            type="text"
                                                            id="admissionSettingName"
                                                            name="admissionSettingName"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <h6 className="">Classes available for Admission</h6>
                                                    {activeClasses.map((item, idx) => (
                                                        <div className="form-check mb-3 form-Check col-md-5 ms-3"
                                                            key={idx}
                                                        >
                                                            <Field
                                                                disabled={disable}
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
            </Card>

        </>
    );
};

export default AdmissionSettingsDetails;

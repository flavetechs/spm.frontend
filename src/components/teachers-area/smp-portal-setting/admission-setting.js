import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import { getAllClasses, resetClassSetupState } from "../../../store/actions/class-actions";

const AdmissionSetting = () => {
    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { resultSetting } = state.portal;
    const { itemList } = state.class;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [images, setImages] = useState(null);
    const [editButton, setEditButton] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [disable, setDisable] = useState(true);
    const [promotAllOrPromoteByPassMark, setPromoteAllOrPromoteByPassMark] = useState(resultSetting.promoteAll ?? "")
    const [positionOnResults, setPositionOnResults] = useState(resultSetting?.showPositionOnResult ?? "");
    const [newsletter, setNewsletter] = useState(resultSetting?.showNewsletter ?? "");
    const [cumulativeResults, setCumulativeResults] = useState(resultSetting?.cumulativeResult ?? "");
    const [batchPrintings, setBatchPrintings] = useState(resultSetting?.batchPrinting ?? "");
    const [selectedClasses, setSelectedClasses] = useState("");
    //VARIABLE DECLARATIONS

    React.useEffect(() => {
        setSaveButton(true)
        setEditButton(false)
        // getResultSetting()(dispatch)
    }, [dispatch]);

    React.useEffect(() => {
        setImages(resultSetting?.filepath);
        setPromoteAllOrPromoteByPassMark(resultSetting?.promoteAll);
        setPositionOnResults(resultSetting?.showPositionOnResult ?? "");
        setNewsletter(resultSetting?.showNewsletter ?? "");
        setCumulativeResults(resultSetting?.cumulativeResult ?? "");
        setBatchPrintings(resultSetting?.batchPrinting ?? "");
    }, [resultSetting]);


    const ImageDisplay = (event) => {
        if (event.target.files[0]) {
            setImages(URL.createObjectURL(event.target.files[0]));
        }
    };

    React.useEffect(() => {
        getAllClasses()(dispatch);

        return () => {
            resetClassSetupState()(dispatch)
        }
    }, [dispatch]);

    console.log('itemList', itemList);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    resultSettingId: resultSetting?.resultSettingId ?? "",
                    promoteAll: resultSetting?.promoteAll ?? "",
                    showPositionOnResult: resultSetting?.showPositionOnResult ?? "",
                    cumulativeResult: resultSetting?.cumulativeResult ?? "",
                    showNewsletter: resultSetting?.showNewsletter ?? "",
                    batchPrinting: resultSetting?.batchPrinting ?? "",
                    filepath: resultSetting?.filepath ?? "",
                    //photo: "",
                }}

                onSubmit={(values) => {
                    values.promoteAll = promotAllOrPromoteByPassMark;
                    values.filepath = images;
                    const params = new FormData();
                    params.append("resultSettingId", values.resultSettingId);
                    params.append("promoteAll", values.promoteAll);
                    params.append("showPositionOnResult", positionOnResults);
                    params.append("cumulativeResult", cumulativeResults);
                    params.append("showNewsletter", newsletter);
                    params.append("batchPrinting", batchPrintings);
                    params.append("principalStamp", values.principalStamp);
                    params.append("filepath", values.filepath);
                    setSaveButton(!saveButton);
                    setEditButton(!editButton);
                    setDisable(true);
                    // updateResultSetting(values, params)(dispatch);
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
                                                {/* <fieldset>
                                                    <legend>Personalia:</legend> */}
                                                <h6 className=""> Select classes for Admission</h6>
                                                {itemList.map((item, idx) => (
                                                    <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                        <Field
                                                            disabled={disable}
                                                            type="checkbox"
                                                            id="showPositionOnResult"
                                                            className="form-check-input"
                                                            name="showPositionOnResult"
                                                            checked={selectedClasses || ""}
                                                            onChange={(e) => {
                                                                setSelectedClasses(!selectedClasses)
                                                            }}
                                                        />
                                                        <label htmlFor="showPositionOnResult" className="check-label">
                                                            {item.name}
                                                        </label>
                                                    </div>
                                                ))}
                                                {/* </fieldset> */}
                                                <h6 className="">Choose Open Or closed Admission</h6>
                                                <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                    <Field
                                                        disabled={disable}
                                                        type="radio"
                                                        id="promoteAll"
                                                        className="form-check-input"
                                                        name="PromoteAll"
                                                    // checked={promotAllOrPromoteByPassMark === true ? true : false}
                                                    // onChange={() => {
                                                    //     setPromoteAllOrPromoteByPassMark(!promotAllOrPromoteByPassMark);
                                                    // }}
                                                    />
                                                    <label htmlFor="promoteAll" className="check-label">
                                                        Open{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                    <Field
                                                        disabled={disable}
                                                        type="radio"
                                                        id="PromoteAll"
                                                        className="form-check-input"
                                                        name="PromoteAll"
                                                    // checked={promotAllOrPromoteByPassMark === false ? true : false}
                                                    // onChange={() => {
                                                    //     setPromoteAllOrPromoteByPassMark(!promotAllOrPromoteByPassMark);
                                                    // }}
                                                    />
                                                    <label htmlFor="promoteAll" className="check-label">
                                                        Closed{" "}
                                                    </label>
                                                </div>
                                                <h6 className="">Payment Option</h6>
                                                <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="showNewsletter"
                                                        className="form-check-input"
                                                        name="showNewsletter"
                                                    // checked={cumulativeResults}
                                                    // onChange={(e) => {
                                                    //     setCumulativeResults(!cumulativeResults);
                                                    // }}
                                                    />
                                                    <label htmlFor="showNewsletter" className="check-label">
                                                        Online Payment{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-5 ms-3">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="batchPrinting"
                                                        className="form-check-input"
                                                        name="batchPrinting"
                                                    // checked={batchPrintings}
                                                    // onChange={(e) => {
                                                    //     setBatchPrintings(!batchPrintings);
                                                    // }}
                                                    />
                                                    <label htmlFor="batchPrinting" className="check-label">
                                                        Cash Payment{" "}
                                                    </label>
                                                </div>
                                                <h6 className=" ">Email collection</h6>
                                                <div className="col-md-12 form-group mb-3 ms-0">
                                                    <label
                                                        className="form-label ms-0 ps-0"
                                                        htmlFor="schoolAbbreviation"
                                                    >
                                                        Email for passed Student
                                                    </label>
                                                    <Field
                                                        disabled={disable}
                                                        placeholder="Enter Email"
                                                        type="text"
                                                        id="schoolAbbreviation"
                                                        name="schoolAbbreviation"
                                                        className="form-control ms-0"
                                                    />
                                                </div>
                                                <div className="col-md-12 form-group mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="schoolAbbreviation"
                                                    >
                                                        Email for failed Student
                                                    </label>
                                                    <Field
                                                        disabled={disable}
                                                        placeholder="Enter Email"
                                                        type="text"
                                                        id="schoolAbbreviation"
                                                        name="schoolAbbreviation"
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
                                                        Email for Physical Screening
                                                    </label>
                                                    <Field
                                                        disabled={disable}
                                                        placeholder="Enter Email"
                                                        type="text"
                                                        id="schoolAbbreviation"
                                                        name="schoolAbbreviation"
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

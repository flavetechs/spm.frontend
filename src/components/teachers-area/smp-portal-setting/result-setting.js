import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";

import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_2.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";
import { getResultSetting, updateResultSetting } from "../../../store/actions/portal-setting-action";
import AvatarImage from "../../../assets/avatar-image";
import { ImageValidation } from "../../../utils/file-size-validation";

const ResultSetting = () => {
    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { resultSetting } = state.portal;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [images, setImages] = useState(null);
    const [editButton, setEditButton] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [disable, setDisable] = useState(true);
    const [promotAllOrPromoteByPassMark, setPromoteAllOrPromoteByPassMark] = useState(resultSetting.promoteAll ?? "")
    const [positionOnResults, setPositionOnResults] = useState(resultSetting?.showPositionOnResult ?? "")
    const [newsletter, setNewsletter] = useState(resultSetting?.showNewsletter ?? "")
    const [cumulativeResults, setCumulativeResults] = useState(resultSetting?.cumulativeResult ?? "")
    const [batchPrintings, setBatchPrintings] = useState(resultSetting?.batchPrinting ?? "")
    //VARIABLE DECLARATIONS

    React.useEffect(() => {
        setSaveButton(true)
        setEditButton(false)
        getResultSetting()(dispatch)
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
                    updateResultSetting(values, params)(dispatch);
                }}
            >
                {({
                    handleSubmit,
                    setFieldValue,
                }) => (

                    <Row className="mt-0"id="resultSetting">
                        <Card.Body>
                            <div className="col-xl-9 col-lg-8">
                                <div className="">
                                    <div className=" justify-content-between d-flex justify-content-between mb-3">
                                        {" "}
                                        <div className="header-title  d-md-flex align-items-center">
                                            <h4 className=""><b>Result Setting</b></h4>
                                            {disable &&
                                            <i className="text-danger mx-2">Click the edit button to edit page</i>
                                            }
                                        </div>{" "}
                                    </div>
                                    {" "}
                                    <div className="new-user-info">
                                        <Form>
                                            <div className="row ms-1">
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="radio"
                                                        id="promoteAll"
                                                        className="form-check-input"
                                                        name="PromoteAll"
                                                        checked={promotAllOrPromoteByPassMark === true ? true : false}
                                                        onChange={() => {
                                                            setPromoteAllOrPromoteByPassMark(!promotAllOrPromoteByPassMark);
                                                        }}
                                                    />
                                                    <label htmlFor="promoteAll" className="check-label">
                                                        Promote All{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="radio"
                                                        id="PromoteAll"
                                                        className="form-check-input"
                                                        name="PromoteAll"
                                                        checked={promotAllOrPromoteByPassMark === false ? true : false}
                                                        onChange={() => {
                                                            setPromoteAllOrPromoteByPassMark(!promotAllOrPromoteByPassMark);
                                                        }}
                                                    />
                                                    <label htmlFor="promoteAll" className="check-label">
                                                        Promote By Pass mark{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="showPositionOnResult"
                                                        className="form-check-input"
                                                        name="showPositionOnResult"
                                                        checked={positionOnResults}
                                                        onChange={(e) => {
                                                            setPositionOnResults(!positionOnResults)
                                                        }}
                                                    />
                                                    <label htmlFor="showPositionOnResult" className="check-label">
                                                        Show position on result{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="cumulativeResult"
                                                        className="form-check-input"
                                                        name="cumulativeResult"
                                                        checked={newsletter}
                                                        onChange={(e) => {
                                                            setNewsletter(!newsletter)
                                                        }}
                                                    />
                                                    <label htmlFor="cumulativeResult" className="check-label">
                                                        Cumulative result{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="showNewsletter"
                                                        className="form-check-input"
                                                        name="showNewsletter"
                                                        checked={cumulativeResults}
                                                        onChange={(e) => {
                                                            setCumulativeResults(!cumulativeResults);
                                                        }}
                                                    />
                                                    <label htmlFor="showNewsletter" className="check-label">
                                                        Show newsletter{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="batchPrinting"
                                                        className="form-check-input"
                                                        name="batchPrinting"
                                                        checked={batchPrintings}
                                                        onChange={(e) => {
                                                            setBatchPrintings(!batchPrintings);
                                                        }}
                                                    />
                                                    <label htmlFor="batchPrinting" className="check-label">
                                                        Batch printing{" "}
                                                    </label>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-md-6">
                                                        <div className="header-title mt-3">
                                                            <p className="card-title fw-bold">Principal Stamp</p>
                                                        </div>
                                                        <div className="profile-img-edit position-relative">
                                                        <AvatarImage />
                                                            <div className="upload-icone bg-primary">
                                                                <label htmlFor="principalStamp">
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
                                                                        disabled={disable}
                                                                        type="file"
                                                                        id="principalStamp"
                                                                        style={{ display: "none" }}
                                                                        name="principalStamp"
                                                                        accept="image/jpeg,image/jpg,image/png"
                                                                        className="file-upload form-control"
                                                                        data-original-title="upload photos"
                                                                        onChange={(event) => {
                                                                            setFieldValue(
                                                                                "principalStamp",
                                                                                event.currentTarget.files[0]
                                                                            );
                                                                            ImageDisplay(event);
                                                                            ImageValidation(event,setFieldValue,"principalStamp",setImages)
                                                                        }}
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="img-extension mt-3">
                                                            <div className="d-inline-block align-items-center">
                                                                <span>Only</span> <a href="#">.jpg</a>{" "}
                                                                <a href="#">.png</a> <a href="#">.jpeg</a>
                                                                <span> allowed</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        {images ? (
                                                            <img
                                                                className=" img-fluid mt-4"
                                                                id="displayImg"
                                                                src={images}
                                                                alt="Principal Stamp"
                                                                height='180px'
                                                                width='180px'
                                                            />
                                                        ) : null}
                                                    </div>
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

export default ResultSetting;

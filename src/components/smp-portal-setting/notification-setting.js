import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { getNotificationSettingList, updateNotificationSetting } from "../../store/actions/portal-setting-action";
// import "./student-add.scss"

const NotificationSetting = () => {
    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [editButton, setEditButton] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [disable, setDisable] = useState(true);
    //VARIABLE DECLARATIONS


    React.useEffect(() => {
        setSaveButton(true)
        setEditButton(false)
        setDisable(true)
        getNotificationSettingList()(dispatch)
    }, []);

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { notificationSettingList } = state.portal;
    // ACCESSING STATE FROM REDUX STORE

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    notificationSettingId: notificationSettingList?.notificationSettingId,
                    notifyByEmail: notificationSettingList?.notifyByEmail,
                }}

                onSubmit={(values) => {
                    values.notificationSettingId = values.notificationSettingId;
                    values.notifyByEmail = values.notifyByEmail;
                    setSaveButton(!saveButton);
                    setEditButton(!editButton);
                    setDisable(true);
                    updateNotificationSetting(values)(dispatch);
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
                    <Row className="border-start border-4" style={{ backgroundColor: "hsl(200deg 33% 98%)" }}>
                        <Card.Body>
                            <div className="col-xl-9 col-lg-8">
                                <div className="">
                                    <div className=" d-flex justify-content-between d-flex justify-content-between mb-4">
                                        {" "}
                                        <div className="header-title">
                                            <h4 className=""><b>Notification Settings</b></h4>
                                        </div>{" "}
                                    </div>
                                    {" "}
                                    <div className="new-user-info">
                                        <Form>
                                            <div className="row">
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="notifyByEmail"
                                                        className="form-check-input"
                                                        name="notifyByEmail"
                                                        defaultChecked={notificationSettingList?.notifyByEmail || false}
                                                        onChange={(e) => {
                                                            setFieldValue("notifyByEmail", e.target.checked);
                                                        }}
                                                    />
                                                    <label htmlFor="notifyByEmail" className="check-label">
                                                        Notify me by email{" "}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                            </div>
                                            <div className="d-flex mt-4 justify-content-end">
                                                {saveButton ? (
                                                    <Button
                                                        type="button"
                                                        variant="btn btn-danger mx-2"
                                                        onClick={() => {
                                                            setSaveButton(!saveButton)
                                                            setEditButton(!editButton)
                                                            setDisable(!disable);
                                                        }}
                                                    >
                                                        Edit Setting
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        variant="btn btn-primary mx-2"
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

export default NotificationSetting;

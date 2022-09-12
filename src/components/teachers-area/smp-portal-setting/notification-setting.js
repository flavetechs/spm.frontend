import React, { useState } from "react";
import { Row, Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";
import { getNotificationSettingList, updateNotificationSetting } from "../../../store/actions/portal-setting-action";

const NotificationSetting = () => {

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { notificationSettingList } = state.portal;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [editButton, setEditButton] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [disable, setDisable] = useState(true);
    const [notifyMeByEmail, setNotifyMeByEmail] = useState(notificationSettingList?.notifyByEmail ?? "");
    const [notifyMeBySms, setNotifyMeBySms] = useState(notificationSettingList?.notifyBySms ?? "");
    //VARIABLE DECLARATIONS

    React.useEffect(() => {
        setNotifyMeByEmail(notificationSettingList?.notifyByEmail ?? "");
        setNotifyMeBySms(notificationSettingList?.notifyBySms ?? "");
    }, [notificationSettingList]);

    React.useEffect(() => {
        setSaveButton(true)
        setEditButton(false)
        setDisable(true)
        getNotificationSettingList()(dispatch)
    }, [dispatch]);


    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    notificationSettingId: notificationSettingList?.notificationSettingId ?? "",
                    notifyByEmail: notificationSettingList?.notifyByEmail ?? "",
                    notifyBySms: notificationSettingList?.notifyBySms ?? "",
                }}

                onSubmit={(values) => {
                    values.notificationSettingId = values.notificationSettingId;
                    values.notifyByEmail = notifyMeByEmail;
                    values.notifyBySms = notifyMeBySms;
                    setSaveButton(!saveButton);
                    setEditButton(!editButton);
                    setDisable(true);
                    updateNotificationSetting(values)(dispatch);
                }}
            >
                {({
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <Row className="">
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
                                            <div className="row ms-1">
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="notifyByEmail"
                                                        className="form-check-input"
                                                        name="notifyByEmail"
                                                        checked={notifyMeByEmail}
                                                        onChange={(e) => {
                                                            setNotifyMeByEmail(!notifyMeByEmail);
                                                        }}
                                                    />
                                                    <label htmlFor="notifyByEmail" className="check-label">
                                                        Notify me by email{" "}
                                                    </label>
                                                </div>
                                                <div className="form-check mb-3 form-Check col-md-6">
                                                    <Field
                                                        disabled={disable}
                                                        type="checkbox"
                                                        id="notifyBySms"
                                                        className="form-check-input"
                                                        name="notifyBySms"
                                                        checked={notifyMeBySms}
                                                        onChange={(e) => {
                                                            setNotifyMeBySms(!notifyMeBySms);
                                                        }}
                                                    />
                                                    <label htmlFor="notifyBySms" className="check-label">
                                                        Notify me by sms{" "}
                                                    </label>
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
                                                        Click to Edit
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

export default NotificationSetting;

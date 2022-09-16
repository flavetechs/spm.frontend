import React, { useState } from "react";
import { Row, Form, Button, Tab, Col, Nav } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field } from "formik";

const NotificationSettingActivities = ({ notificationSettingsItem }) => {


    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { notificationSettingList } = state.portal;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [editButton, setEditButton] = useState(false);
    const [saveButton, setSaveButton] = useState(false);
    const [disable, setDisable] = useState(true);
    // const [notifyMeByEmail, setNotifyMeByEmail] = useState(notificationSettingList?.notifyByEmail ?? "");
    // const [notifyMeBySms, setNotifyMeBySms] = useState(notificationSettingList?.notifyBySms ?? "");
    //VARIABLE DECLARATIONS

    React.useEffect(() => {
        // setNotifyMeByEmail(notificationSettingList?.notifyByEmail ?? "");
        // setNotifyMeBySms(notificationSettingList?.notifyBySms ?? "");
    }, [notificationSettingList]);

    React.useEffect(() => {
        setSaveButton(true)
        setEditButton(false)
        setDisable(true)
        // getNotificationSettingList()(dispatch)
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
                    values.notifyByEmail = "";
                    values.notifyBySms = "";
                    setSaveButton(!saveButton);
                    setEditButton(!editButton);
                    setDisable(true);
                    // updateNotificationSetting(values)(dispatch);
                }}
            >
                {({
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <Card>
                        <Card.Body className=''>
                            <div>
                                <div>
                                    <h5 className="lead">{notificationSettingsItem?.title}</h5>
                                    <p>{notificationSettingsItem?.desc}</p>
                                </div>
                                <div className="new-user-info">
                                    <Form>
                                        <div className="row ms-1">
                                            <div class="form-check col-md-6">
                                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                <label class="form-check-label" htmlFor="flexRadioDefault1">
                                                    Notify me by email
                                                </label>
                                            </div>
                                            <div class="form-check col-md-6">
                                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                    Notify me by sms
                                                </label>
                                            </div>
                                        </div>
                                        {
                                            notificationSettingsItem?.title === "Publish Result" && (
                                                <>
                                                    <hr />
                                                    <div className="row ms-1">
                                                        <div class="form-check col-md-12">
                                                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                            <label class="form-check-label" htmlFor="flexRadioDefault1">
                                                                Send notification to parent on publish result
                                                            </label>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                        <div className="row">
                                        </div>
                                        <div className="d-flex mt-4 justify-content-end">
                                            {saveButton ? (
                                                <Button
                                                    type="button"
                                                    variant="btn btn-primary mx-2"
                                                // onClick={() => {
                                                //     setSaveButton(!saveButton)
                                                //     setEditButton(!editButton)
                                                //     setDisable(!disable);
                                                // }}
                                                >
                                                    Click to Edit
                                                </Button>
                                            ) : (
                                                <Button
                                                    type="button"
                                                    variant="btn btn-danger mx-2"
                                                // onClick={handleSubmit}
                                                >
                                                    Save Changes
                                                </Button>
                                            )}
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                )}
            </Formik>
        </>
    );
};

export default NotificationSettingActivities;

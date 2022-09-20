import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch } from "react-redux";
import './setting.scss';
import { updateNotificationSetting } from "../../../store/actions/portal-setting-action";

const NotificationSettingActivities = ({ activeStyleBoxShadow, notificationSettingResult, selectedNotificationSetting }) => {


    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(notificationSettingResult);

    const [sendToParentsOnResultPublish, setSendToParentsOnResultPublish] = useState(notificationSettingResult.publishResult.shouldSendToParentsOnResultPublish);

    return (
        <>
            <Card>
                <Card.Body className={activeStyleBoxShadow ? 'turn-on-styling' : 'turn-off-styling'}>
                    <div>
                        <div>
                            <h5 className="lead">{selectedNotificationSetting?.title}</h5>
                            <p>{selectedNotificationSetting?.desc}</p>
                        </div>
                        <div className="new-user-info">
                            <Form>
                                <div className="row ms-1">
                                    <div className="form-check col-md-6">
                                        <input className="form-check-input" type="radio"
                                            name={selectedNotificationSetting.name} id="sendNotificationByEmail"
                                            value="email"
                                            checked={formData[selectedNotificationSetting.name]?.media === "email" ? true : false}
                                            onClick={(e) => {
                                                formData[selectedNotificationSetting.name].media = e.target.value;
                                                setFormData(formData);
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="sendNotificationByEmail">
                                            Send Notification by email
                                        </label>
                                    </div>
                                    <div className="form-check col-md-6">
                                        <input className="form-check-input" type="radio"
                                            name={selectedNotificationSetting?.name}
                                            id="sendNotificationBySms"
                                            value="sms"
                                            checked={formData[selectedNotificationSetting.name]?.media === "email" ? true : false}
                                            onClick={(e) => {
                                                formData[selectedNotificationSetting.name].media = e.target.value;
                                                setFormData(formData);
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="sendNotificationBySms">
                                            Send Notification by sms
                                        </label>
                                    </div>
                                </div>
                                {
                                    selectedNotificationSetting?.title === "Publish Result" && (
                                        <>
                                            <hr />
                                            <div className="row ms-1">
                                                <div className="form-check col-md-12">
                                                    <input className="form-check-input" type="checkbox"
                                                        value={sendToParentsOnResultPublish}
                                                        name="shouldSendToParentsOnResultPublish"
                                                        id="shouldSendToParentsOnResultPublish"
                                                        onClick={(e) => {
                                                            setSendToParentsOnResultPublish(!sendToParentsOnResultPublish)
                                                            formData[selectedNotificationSetting.name].shouldSendToParentsOnResultPublish = sendToParentsOnResultPublish;
                                                            setFormData(formData);

                                                        }}
                                                    />
                                                    <label className="form-check-label" htmlFor="sendNotificationToParents">
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
                                    <Button
                                        type="button"
                                        variant="btn btn-primary mx-2"
                                        onClick={x => {
                                            updateNotificationSetting(formData)(dispatch)
                                        }}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default NotificationSettingActivities;

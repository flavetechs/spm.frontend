import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch } from "react-redux";
import './setting.scss';
import { updateNotificationSetting } from "../../../store/actions/portal-setting-action";

const NotificationSettingActivities = ({ notificationSettingsItem, activeStyleBoxShadow, notificationSettingResult, selectedNotificationSetting }) => {


    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [sendByEmailOrSms, setSendByEmailOrSms] = useState(null);
    const [sendToParentsOnResultPublish, setSendToParentsOnResultPublish] = useState(null);

    const [updateRecoverPassword, setUpdateRecoverPassword] = useState(notificationSettingResult?.recoverPassword);
    const [updateAnnouncement, setUpdateAnnouncement] = useState(notificationSettingResult?.announcement);
    const [updateAssessment, setUpdateAssessment] = useState(notificationSettingResult?.assessment);
    const [updatePermission, setUpdatePermission] = useState(notificationSettingResult?.permission);
    const [updateSession, setUpdateSession] = useState(notificationSettingResult?.session);
    const [updateClassManagement, setUpdateClassManagement] = useState(notificationSettingResult?.classManagement);
    const [updateStaff, setUpdateStaff] = useState(notificationSettingResult?.staff);
    const [updateEnrollment, setUpdateEnrollment] = useState(notificationSettingResult?.enrollment);
    const [updatePublishResult, setUpdatePublishResult] = useState(notificationSettingResult?.publishResult);

    React.useEffect(() => {
        if (selectedNotificationSetting?.name === "recoverPassword") {
            if (sendByEmailOrSms) {
                setUpdateRecoverPassword(updateRecoverPassword.recoverPassword = { media: 'email', send: true });
            } else {
                setUpdateRecoverPassword(updateRecoverPassword.recoverPassword = { media: 'sms', send: false });
            }
        } else if (selectedNotificationSetting?.name === "announcement") {
            if (sendByEmailOrSms) {
                setUpdateAnnouncement(updateAnnouncement.announcement = { media: 'email', send: true });
            } else {
                setUpdateAnnouncement(updateAnnouncement.announcement = { media: 'sms', send: false });
            }
        } else if (selectedNotificationSetting?.name === "assessment") {
            if (sendByEmailOrSms) {
                setUpdateAssessment(updateAssessment.assessment = { media: 'email', send: true });
            } else {
                setUpdateAssessment(updateAssessment.assessment = { media: 'sms', send: false });
            }
        } else if (selectedNotificationSetting?.name === "permission") {
            if (sendByEmailOrSms) {
                setUpdatePermission(updatePermission.permission = { media: 'email', send: true });
            } else {
                setUpdatePermission(updatePermission.permission = { media: 'sms', send: false });
            }
        } else if (selectedNotificationSetting?.name === "session") {
            if (sendByEmailOrSms) {
                setUpdateSession(updateSession.session = { media: 'email', send: true });
            } else {
                setUpdateSession(updateSession.session = { media: 'sms', send: false });
            }
        } else if (selectedNotificationSetting?.name === "classManagement") {
            if (sendByEmailOrSms) {
                setUpdateClassManagement(updateClassManagement.classManagement = { media: 'email', send: true });
            } else {
                setUpdateClassManagement(updateClassManagement.classManagement = { media: 'sms', send: false });
            }
        } else if (selectedNotificationSetting?.name === "staff") {
            if (sendByEmailOrSms) {
                setUpdateStaff(updateStaff.staff = { media: 'email', send: true });
            } else {
                setUpdateStaff(updateStaff.staff = { media: 'sms', send: false });
            }
        } else if (selectedNotificationSetting?.name === "enrollment") {
            if (sendByEmailOrSms) {
                setUpdateEnrollment(updateEnrollment.enrollment = { media: 'email', send: true });
            } else {
                setUpdateEnrollment(updateEnrollment.enrollment = { media: 'sms', send: false });
            }
        } else if (selectedNotificationSetting?.name === "publishResult") {
            if (sendByEmailOrSms) {
                setUpdatePublishResult(updatePublishResult.publishResult = { media: 'email', send: true });
            } else {
                setUpdatePublishResult(updatePublishResult.publishResult = { media: 'sms', send: false });
            }
        } else {
            return null
        }
    }, [sendByEmailOrSms]);

    React.useEffect(() => {
        if (selectedNotificationSetting?.name === "recoverPassword") {
            setSendByEmailOrSms(updateRecoverPassword.send)
        } else if (selectedNotificationSetting?.name === "announcement") {

            setSendByEmailOrSms(updateAnnouncement.send);
        } else if (selectedNotificationSetting?.name === "assessment") {

            setSendByEmailOrSms(updateAssessment.send);
        } else if (selectedNotificationSetting?.name === "permission") {

            setSendByEmailOrSms(updatePermission.send);
        } else if (selectedNotificationSetting?.name === "session") {

            setSendByEmailOrSms(updateSession.send);
        } else if (selectedNotificationSetting?.name === "classManagement") {

            setSendByEmailOrSms(updateClassManagement.send);
        } else if (selectedNotificationSetting?.name === "staff") {
            setSendByEmailOrSms(updateStaff.send);
        } else if (selectedNotificationSetting?.name === "enrollment") {
            setSendByEmailOrSms(updateEnrollment.send);

        } else if (selectedNotificationSetting?.name === "publishResult") {
            setSendByEmailOrSms(updatePublishResult.send);
            setSendToParentsOnResultPublish(updatePublishResult.shouldSendToParentsOnResultPublish);

        } else {
            return null
        }
    }, [])
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
                                            name={selectedNotificationSetting?.name} id="sendNotificationByEmail"
                                            value="email"
                                            checked={sendByEmailOrSms === true ? true : false}
                                            onChange={(e) => {
                                                setSendByEmailOrSms(!sendByEmailOrSms)
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="sendNotificationByEmail">
                                            Send Notification by email
                                        </label>
                                    </div>
                                    <div className="form-check col-md-6">
                                        <input className="form-check-input" type="radio"
                                            name={notificationSettingsItem?.name}
                                            id="sendNotificationBySms"
                                            checked={sendByEmailOrSms === false ? true : false}
                                            onChange={(e) => {
                                                setSendByEmailOrSms(!sendByEmailOrSms)
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor="sendNotificationBySms">
                                            Send Notification by sms
                                        </label>
                                    </div>
                                </div>
                                {
                                    notificationSettingsItem?.title === "Publish Result" && (
                                        <>
                                            <hr />
                                            <div className="row ms-1">
                                                <div className="form-check col-md-12">
                                                    <input className="form-check-input" type="radio"
                                                        name={notificationSettingsItem?.name} id="sendNotificationToParents"
                                                        checked={sendToParentsOnResultPublish === true ? true : false}
                                                        value="yes"
                                                        onChange={(e) => setSendToParentsOnResultPublish(!sendToParentsOnResultPublish)}
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
                                        onClick={() => {
                                            updateNotificationSetting(updateRecoverPassword, updateAnnouncement, updateAssessment, updatePermission, updateSession, updateClassManagement, updateStaff, updateEnrollment, updatePublishResult)(dispatch);
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

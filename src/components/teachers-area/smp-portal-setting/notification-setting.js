import React, { useState } from "react";
import { Row, Tab, Col, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationSettingList } from "../../../store/actions/portal-setting-action";
import NotificationSettingActivities from "./notification-settings-activities";

const NotificationSetting = () => {

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { notificationSettingResult } = state.portal;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATIONS
    const [notificationList] = useState([

        {
            title: "Recover password", id: 2, desc: "Choose your password reset preferences",
            name: "recoverPassword",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M10.6889 11.9999C10.6889 13.0229 9.85986 13.8519 8.83686 13.8519C7.81386 13.8519 6.98486 13.0229 6.98486 11.9999C6.98486 10.9769 7.81386 10.1479 8.83686 10.1479H8.83986C9.86086 10.1489 10.6889 10.9779 10.6889 11.9999Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.6919 12H17.0099V13.852" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path d="M14.1816 13.852V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            title: "Announcement", id: 3, desc: "Edit where announcement is been sent",
            name: "announcement",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14.3889 20.8572C13.0247 22.3719 10.8967 22.3899 9.51953 20.8572" stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            title: "Assessment", id: 4, desc: "Control who receives your assessment",
            name: "assessment",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.79476 7.05589C4.79476 5.80689 5.80676 4.79489 7.05576 4.79389H8.08476C8.68176 4.79389 9.25376 4.55689 9.67776 4.13689L10.3968 3.41689C11.2778 2.53089 12.7098 2.52689 13.5958 3.40789L13.5968 3.40889L13.6058 3.41689L14.3258 4.13689C14.7498 4.55789 15.3218 4.79389 15.9188 4.79389H16.9468C18.1958 4.79389 19.2088 5.80589 19.2088 7.05589V8.08289C19.2088 8.67989 19.4448 9.25289 19.8658 9.67689L20.5858 10.3969C21.4718 11.2779 21.4768 12.7099 20.5958 13.5959L20.5948 13.5969L20.5858 13.6059L19.8658 14.3259C19.4448 14.7489 19.2088 15.3209 19.2088 15.9179V16.9469C19.2088 18.1959 18.1968 19.2079 16.9478 19.2079H16.9468H15.9168C15.3198 19.2079 14.7468 19.4449 14.3238 19.8659L13.6038 20.5849C12.7238 21.4709 11.2928 21.4759 10.4068 20.5969C10.4058 20.5959 10.4048 20.5949 10.4038 20.5939L10.3948 20.5849L9.67576 19.8659C9.25276 19.4449 8.67976 19.2089 8.08276 19.2079H7.05576C5.80676 19.2079 4.79476 18.1959 4.79476 16.9469V15.9159C4.79476 15.3189 4.55776 14.7469 4.13676 14.3239L3.41776 13.6039C2.53176 12.7239 2.52676 11.2929 3.40676 10.4069C3.40676 10.4059 3.40776 10.4049 3.40876 10.4039L3.41776 10.3949L4.13676 9.67489C4.55776 9.25089 4.79476 8.67889 4.79476 8.08089V7.05589"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.43164 14.5716L14.5716 9.43164" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path d="M14.4955 14.5H14.5045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.4955 9.5H9.5045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            title: "Permissions", id: 5, desc: "Control who sess your activity",
            name: "permission",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.4232 9.4478V7.3008C16.4232 4.7878 14.3852 2.7498 11.8722 2.7498C9.35925 2.7388 7.31325 4.7668 7.30225 7.2808V7.3008V9.4478"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M15.683 21.2497H8.042C5.948 21.2497 4.25 19.5527 4.25 17.4577V13.1687C4.25 11.0737 5.948 9.37671 8.042 9.37671H15.683C17.777 9.37671 19.475 11.0737 19.475 13.1687V17.4577C19.475 19.5527 17.777 21.2497 15.683 21.2497Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.8628 14.2026V16.4236" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>
        },
        {
            title: "Session", id: 6, desc: "Select where notices are been sent to",
            name: "session",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.8496 4.25024V6.67024" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path d="M13.8496 17.76V19.784" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path d="M13.8496 14.3247V9.50366" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M18.7021 20C20.5242 20 22 18.5426 22 16.7431V14.1506C20.7943 14.1506 19.8233 13.1917 19.8233 12.001C19.8233 10.8104 20.7943 9.85039 22 9.85039L21.999 7.25686C21.999 5.45745 20.5221 4 18.7011 4H5.29892C3.47789 4 2.00104 5.45745 2.00104 7.25686L2 9.93485C3.20567 9.93485 4.17668 10.8104 4.17668 12.001C4.17668 13.1917 3.20567 14.1506 2 14.1506V16.7431C2 18.5426 3.4758 20 5.29787 20H18.7021Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            title: "Class management", id: 7, desc: "Choose where class mgt notices are been sent",
            name: "classManagement",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9951 16.6766V14.1396" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M18.19 5.33008C19.88 5.33008 21.24 6.70008 21.24 8.39008V11.8301C18.78 13.2701 15.53 14.1401 11.99 14.1401C8.45 14.1401 5.21 13.2701 2.75 11.8301V8.38008C2.75 6.69008 4.12 5.33008 5.81 5.33008H18.19Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                    d="M15.4951 5.32576V4.95976C15.4951 3.73976 14.5051 2.74976 13.2851 2.74976H10.7051C9.48512 2.74976 8.49512 3.73976 8.49512 4.95976V5.32576"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                    d="M2.77441 15.4829L2.96341 17.9919C3.09141 19.6829 4.50041 20.9899 6.19541 20.9899H17.7944C19.4894 20.9899 20.8984 19.6829 21.0264 17.9919L21.2154 15.4829"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            title: "Staff", id: 8, desc: "Contorl your notification mode for staff",
            name: "staff",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M9.59151 15.2068C13.2805 15.2068 16.4335 15.7658 16.4335 17.9988C16.4335 20.2318 13.3015 20.8068 9.59151 20.8068C5.90151 20.8068 2.74951 20.2528 2.74951 18.0188C2.74951 15.7848 5.88051 15.2068 9.59151 15.2068Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M9.59157 12.0198C7.16957 12.0198 5.20557 10.0568 5.20557 7.63476C5.20557 5.21276 7.16957 3.24976 9.59157 3.24976C12.0126 3.24976 13.9766 5.21276 13.9766 7.63476C13.9856 10.0478 12.0356 12.0108 9.62257 12.0198H9.59157Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                    d="M16.4829 10.8815C18.0839 10.6565 19.3169 9.28253 19.3199 7.61953C19.3199 5.98053 18.1249 4.62053 16.5579 4.36353"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path
                    d="M18.5952 14.7322C20.1462 14.9632 21.2292 15.5072 21.2292 16.6272C21.2292 17.3982 20.7192 17.8982 19.8952 18.2112"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            title: "Enrollment", id: 9, desc: "Edit preferences on enrollment",
            name: "enrollment",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M21.25 16.334V7.665C21.25 4.645 19.111 2.75 16.084 2.75H7.916C4.889 2.75 2.75 4.635 2.75 7.665L2.75 16.334C2.75 19.364 4.889 21.25 7.916 21.25H16.084C19.111 21.25 21.25 19.364 21.25 16.334Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.0861 12H7.91406" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.3223 8.25205L16.0863 12L12.3223 15.748" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>
        },
        {
            title: "Publish Result", id: 10, desc: "Control where result is displayed",
            name: "publishResult",
            icon: <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7161 16.2234H8.49609" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path d="M15.7161 12.0369H8.49609" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path d="M11.2521 7.86011H8.49707" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                <path fillRule="evenodd" clipRule="evenodd"
                    d="M15.909 2.74976C15.909 2.74976 8.23198 2.75376 8.21998 2.75376C5.45998 2.77076 3.75098 4.58676 3.75098 7.35676V16.5528C3.75098 19.3368 5.47298 21.1598 8.25698 21.1598C8.25698 21.1598 15.933 21.1568 15.946 21.1568C18.706 21.1398 20.416 19.3228 20.416 16.5528V7.35676C20.416 4.57276 18.693 2.74976 15.909 2.74976Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
    ]);
    const [activeStyleBoxShadow, setActiveStyleBoxShadow] = useState(false);
    const dispatch = useDispatch();
    const [selectedNotificationSetting, setSelectedNotificationSetting] = useState({ title: '', desc: '', name: '' });
    //VARIABLE DECLARATIONS

    React.useEffect(() => {
        getNotificationSettingList()(dispatch);
    }, []);

    function handleStylingEffect() {
        setActiveStyleBoxShadow(true);
        setTimeout(() => {
            setActiveStyleBoxShadow(false);
        }, 500);
    }

    return (
        <>
            <Row className="">
                <div className=''>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className='mt gx-1'>
                            <Col sm={3} className='col-md-4'>
                                <Nav variant="" className="flex-column portal-tab" >
                                    <Nav.Item className='shadow'>
                                        {notificationList?.map((item, index) => (
                                            <Nav.Link eventKey={index + 1} href="#" className="shadow" key={index}
                                                onClick={() => {
                                                    setSelectedNotificationSetting({ title: item.title, desc: item.desc, name: item.name });
                                                    handleStylingEffect();
                                                }}
                                            >
                                                <Row className="">
                                                    <Col className='me-1 col-1 col-sm-1 col-md-1 '>
                                                        {item.icon}
                                                    </Col>
                                                    <Col className='text-wrap col-sm-10 col-md-10 '>
                                                        <span>{item.title}</span>
                                                        <p><small>{item.desc}</small></p>
                                                    </Col>
                                                    
                                                </Row>
                                            </Nav.Link>
                                        ))}
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9} className='col-md-8'>
                                {selectedNotificationSetting.title === "" || selectedNotificationSetting.desc === "" ?
                                    <div className="d-flex justify-content-center">
                                        <p className="direction-text" style={{ fontSize: 25 }}>
                                            <span>
                                                <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.3 12.2512L20.25 12.2512" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.2998 7.25024L3.3628 12.2512L11.2998 17.2522L11.2998 7.25024Z"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span> <span>Select Settings option to continue...</span>
                                        </p>
                                    </div>
                                    :
                                    <NotificationSettingActivities
                                        selectedNotificationSetting={selectedNotificationSetting}
                                        activeStyleBoxShadow={activeStyleBoxShadow}
                                        notificationSettingResult={notificationSettingResult}
                                    />}
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </Row>
        </>
    );
};

export default NotificationSetting;

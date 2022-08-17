
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllSessionClasses } from '../../../store/actions/class-actions';
import { getGeneralActiveSession } from '../../../store/actions/general-actions';
import ClassTimeTableJSS1 from './class-timetable1';
import ClassTimeTable2 from './class-timetable2';
import ClassTimeTable3 from './class-timetable3';
// import "./setting.scss";

function ClassTimeTable() {

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    const [showDeleteButton, setDeleteButton] = useState(true);
    const [showCheckBoxes, setShowCheckBoxes] = useState(false);
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { itemList, selectedIds } = state.class;
    const { deleteDialogResponse } = state.alert;
    const { activeSession } = state.appState;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        getGeneralActiveSession()(dispatch);
    }, []);

    React.useEffect(() => {
        getAllSessionClasses(activeSession?.sessionId)(dispatch);
    }, [activeSession]);

    return (
        <>
            <Card>
                <Card.Body className=''>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className='mt-5 gx-3'>
                            <Col sm={3} className='col-md-2 mt-5 mb-4'>
                                <Card>
                
                                </Card>
                                <Nav variant="" className="flex-column portal-tab mt-4" >
                                    <Nav.Item className='border-3 '>
                                        {itemList.map((item, index) => (
                                            <Nav.Link eventKey={index + 1} href="#" className='py-3'>
                                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.7161 16.2234H8.49609" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path d="M15.7161 12.0369H8.49609" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path d="M11.2521 7.86011H8.49707" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M15.909 2.74976C15.909 2.74976 8.23198 2.75376 8.21998 2.75376C5.45998 2.77076 3.75098 4.58676 3.75098 7.35676V16.5528C3.75098 19.3368 5.47298 21.1598 8.25698 21.1598C8.25698 21.1598 15.933 21.1568 15.946 21.1568C18.706 21.1398 20.416 19.3228 20.416 16.5528V7.35676C20.416 4.57276 18.693 2.74976 15.909 2.74976Z"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>{" "}
                                                {item.class}
                                            </Nav.Link>
                                        ))}
                                    </Nav.Item>
                                    {/* <Nav.Item className='border-bottom border-3 text-wrap'>
                                        <Nav.Link eventKey="second" href="#">
                                            <Row className=" text-dark">
                                                <Col className='col-1 me-2 col-sm-1 col-md-1'>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.37121 10.2017V17.0618" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M12.0382 6.91919V17.0619" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M16.6285 13.8269V17.0619" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Col>
                                                <Col className='col-sm-9 col-md-9'>
                                                    <span className='fw-bold'>Result Setting  </span>
                                                    <p>Review school result setting</p>
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item> */}
                                    {/* <Nav.Item className='border-bottom border-3'>
                                        <Nav.Link eventKey="third" href="#">
                                            <Row className=" text-dark">
                                                <Col className='col-1 me-2'>
                                                    <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M14.3889 20.8572C13.0247 22.3719 10.8967 22.3899 9.51953 20.8572" stroke="currentColor" strokeWidth="1.5"
                                                            strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Col>
                                                <Col>
                                                    <span className='fw-bold'>Notification</span>
                                                    <p>Manage your notification mode</p>
                                                </Col>
                                            </Row>
                                        </Nav.Link>
                                    </Nav.Item> */}
                                </Nav>
                            </Col>
                            <Col sm={9} className=''>
                                <Tab.Content>
                                    <Tab.Pane eventKey={0 + 1}>
                                        <div>
                                            <ClassTimeTableJSS1 />
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={0 + 2}>
                                        <div>
                                            <ClassTimeTable2 />
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={0 + 3}>
                                        <div>
                                            <ClassTimeTable3 />
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </>
    );
}

export default ClassTimeTable;
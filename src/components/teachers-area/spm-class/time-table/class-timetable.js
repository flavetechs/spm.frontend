
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllActiveClasses } from '../../../../store/actions/class-actions';
import { getAllTimetable } from '../../../../store/actions/timetable-actions';
import ClassTimeTableActivities from './class-timetableactivities';
// import "./setting.scss";

function ClassTimeTable() {

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { activeClasses } = state.class;
    const { deleteDialogResponse } = state.alert;
    const { timetableList } = state.timetable;
    // ACCESSING STATE FROM REDUX STORE


    React.useEffect(() => {
        getAllActiveClasses()(dispatch);
        // getAllTimetable()(dispatch)
    }, ['123']);

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
                                        {activeClasses?.map((item, index) => (
                                            <Nav.Link eventKey={index + 1} href="#" className='py-3' key={index} onClick={() => {
                                                console.log('call an api and pick from state')
                                                getAllTimetable(item?.lookupId)(dispatch)
                                            }}>
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
                                                {item.name}
                                            </Nav.Link>
                                        ))}
                                    </Nav.Item>

                                </Nav>
                            </Col>
                            <Col sm={9} className=''>
                                <ClassTimeTableActivities 
                                timetableList={timetableList}
                                />
                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </>
    );
}

export default ClassTimeTable;
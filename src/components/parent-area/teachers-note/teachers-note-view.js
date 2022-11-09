import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Nav, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAllClassNotes, getAllStudentSubjects, getClassSubjects } from "../../../store/actions/class-actions";
import { getUserDetails } from "../../../utils/permissions";
import TeachersNoteViewList from "./teachers-note-view-list";

const TeachersNoteView = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const [showMenuDropdown, setShowMenuDropdown] = useState(false);
    const [indexRow, setIndexRow] = useState("");
    const [selectedTeachersSubject, setSelectedTeachersSubject] = useState(true);
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const dispatch = useDispatch();
    const locations = useLocation();
    const state = useSelector((state) => state);
    const { classSubjects } = state.class;
    // ACCESSING STATE FROM REDUX STORE

    const queryParams = new URLSearchParams(locations.search);
    const ClassIdQuery = queryParams.get("classId");
    const wardQuery = queryParams.get("ward");

    React.useEffect(() => {
        getClassSubjects(ClassIdQuery)(dispatch);
    }, [dispatch]);

    return (
        <>
            <Card>
                <Card.Header className="border-bottom border-light">
                    <p>{`TEACHER'S NOTE FOR ${wardQuery}`}</p>
                </Card.Header>
                <Card.Body className=''>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className=''>
                            <Col className='col-md-2 col-sm-2'>
                                <Nav variant="" className="flex-column">
                                    <Nav.Item className='border-3'>
                                        {classSubjects?.map((subject, index) => (
                                            <Nav.Link eventKey={index + 1} className='py-3 text-uppercase shadow' key={index} onClick={() => {
                                                // setSelectedClassId(item?.lookupId);
                                                // getAllTimetable(item?.lookupId)(dispatch);
                                            }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                                </svg>{" "}
                                                {subject.subjectName}
                                            </Nav.Link>
                                        ))}
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col className='col-md-9 col-sm-9'>
                                {selectedTeachersSubject === null ?
                                    <div className="jumbotron jumbotron-fluid d-flex justify-content-center">
                                        <div className="container d-flex justify-content-center header-message">
                                            <h6 className="display-6 d-flex justify-content-center">
                                                Please choose subject to view notes
                                            </h6>
                                        </div>
                                    </div>
                                    :
                                <TeachersNoteViewList />
                                }
                            </Col>
                        </Row>
                    </Tab.Container>
                    <div className="d-flex justify-content-end">
                        <Button type="button" variant="btn btn-danger mx-2" onClick={() => history.goBack()}>Back</Button>{' '}
                    </div>
                </Card.Body>

            </Card>
        </>
    );
};

export default TeachersNoteView;

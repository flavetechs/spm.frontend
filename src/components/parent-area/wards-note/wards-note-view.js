import React, { useState } from "react";
import { Card, Col, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";
import { getClassSubjects } from "../../../store/actions/class-actions";
import WardsNotePreview from "./ward-note-preview";

const WardsNoteView = () => {
    //VARIABLE DECLARATIONS
    const [selectedSubjectId, setSelectedSubjectId] = useState("");
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const dispatch = useDispatch();
    const locations = useLocation();
    const state = useSelector((state) => state);
    const { classSubjects } = state.class;
    // ACCESSING STATE FROM REDUX STORE


    const queryParams = new URLSearchParams(locations.search);
    const classIdQuery = queryParams.get("classId");

    React.useEffect(() => {
        if (classIdQuery) {
            getClassSubjects(classIdQuery)(dispatch);
        }
    }, [classIdQuery, dispatch]);

    return (
        <>
            <Card>
                <Card.Body className=''>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className=''>
                            <Col className='col-md-2 col-sm-3 col-12'>
                                <h5 className="bg-light p-2">
                                  SUBJECT(S)
                                </h5>
                                <Nav variant="" className="flex-column portal-tab">
                                    <Nav.Item className='subject-list-item shadow text-uppercase'>
                                        {classSubjects?.map((subject, index) => (
                                            <Nav.Link eventKey={index + 1} className='py-3 shadow ' key={index} onClick={() => {
                                                setSelectedSubjectId(subject?.subjectid);
                                            }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {subject.subjectName}
                                            </Nav.Link>
                                        ))}
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col className='col-md-10 col-sm-9 col-12'>
                                {selectedSubjectId === "" ?
                                    <div className="jumbotron jumbotron-fluid d-flex justify-content-center mt-5">
                                        <div className="container d-flex justify-content-center header-message">
                                            <h6 className="display-6 d-flex justify-content-center mt-4">
                                                Please select subject to view Note
                                            </h6>
                                        </div>
                                    </div>
                                    :
                                    <WardsNotePreview
                                        selectedSubjectId={selectedSubjectId}
                                    />
                                }

                            </Col>
                        </Row>
                    </Tab.Container>
                </Card.Body>
            </Card>
        </>
    );
};

export default WardsNoteView;
import React, { useState } from "react";
import { Row, Col, Form, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useLocation } from 'react-router-dom'
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";

import { useHistory } from "react-router-dom";
import { fetchSingleSession, getAllSession } from "../../store/actions/session-actions";

const SessionDetails = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const [displaySubjectsTable, setDisplaySubjectsTable] = useState(true);
    const [displayStudentsTable, setDisplayStudentsTable] = useState(false);
    //VARIABLE DECLARATIONS


    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { selectedItem } = state.session;
    // ACCESSING STATE FROM REDUX STORE


    console.log('selectedItem', selectedItem);

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const sessionId = queryParams.get("sessionId");
        if (!sessionId) return;
        fetchSingleSession(sessionId)(dispatch)
    }, []);


    //HANDLER FUNCTIONS
    return (
        <>
            <div className="col-8 mx-auto">
                <Row>
                    <Col sm="12">
                        <Card className="">
                            <Card.Body>
                                <Card.Header className="d-flex justify-content-between">
                                    <div className="header-title">
                                        <h5><b>{selectedItem?.startDate}/{selectedItem?.endDate}</b></h5>
                                    </div>
                                </Card.Header>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Session Detail</th>
                                            <th>Number Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>No. of Students</span>
                                            </td>
                                            <td>
                                            <span className="badge bg-primary">25</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>No. of subject</span>
                                            </td>
                                            <td>
                                                <span className="badge bg-primary">25</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>No. of classes</span>
                                            </td>
                                            <td>
                                                <span className="badge bg-primary">25</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span>Principal Name</span>
                                            </td>
                                            <td>
                                                <span>Temple Ejiofor</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                            </Card.Body>
                            <Card.Body>
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={!displayStudentsTable ? "nav-link active" : "nav-link"}
                                            type="button"
                                            role="tab"
                                            onClick={() => { setDisplaySubjectsTable(true); setDisplayStudentsTable(false); }}
                                        >
                                            All Classes
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={displayStudentsTable ? "nav-link active" : "nav-link"}
                                            type="button"
                                            role="tab"
                                            onClick={() => { setDisplayStudentsTable(false); setDisplayStudentsTable(true); }}
                                        >
                                            Session Terms
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div
                                        className={!displayStudentsTable ? "tab-pane fade show active" : "tab-pane fade"}
                                        role="tabpanel"
                                    >
                                        <Table bordered size="sm">
                                            <tbody>
                                                <tr>
                                                    <th>Class Name</th>
                                                    <th>Form Teacher</th>
                                                    <th>Actions</th>
                                                </tr>
                                                {selectedItem?.sessionClasses.map((item, idx) =>
                                                    <tr key={idx}>
                                                        <td>{item.sessionClass}</td>
                                                        <td>{item.formTeacher}</td>
                                                        <td>
                                                            <div className="flex align-items-center list-user-action">
                                                                <OverlayTrigger
                                                                    placement="top"
                                                                    overlay={<Tooltip id="button-tooltip-2">Class Details</Tooltip>}
                                                                >
                                                                    <Link
                                                                        className="btn btn-sm btn-icon btn-success"
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title=""
                                                                        data-original-title="Details"
                                                                        to={`${sessionLocations.sessionDetails}?studentAccountId=${item.sessionId}`}
                                                                    >
                                                                        <span className="btn-inner">
                                                                            <svg
                                                                                width="32"
                                                                                viewBox="0 0 24 24"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    clipRule="evenodd"
                                                                                    d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                                <path
                                                                                    d="M11.9946 16V12"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="1.5"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                                <path
                                                                                    d="M11.9896 8.2041H11.9996"
                                                                                    stroke="currentColor"
                                                                                    strokeWidth="2"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                ></path>
                                                                            </svg>
                                                                        </span>
                                                                    </Link>
                                                                </OverlayTrigger>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div
                                        className={displayStudentsTable ? "tab-pane fade show active" : "tab-pane fade"}
                                        role="tabpanel"
                                    >
                                        <Table bordered size="sm">
                                            <tbody>
                                                <tr>
                                                    <th>Terms</th>
                                                    <th>Status</th>
                                                </tr>
                                                {selectedItem?.terms.map((term, idx) => (
                                                    <tr key={idx}>
                                                        <td>{term.termName}</td>
                                                        <td>{term.isActive ? <span className="badge bg-success">Isactive</span> : <span className="badge bg-primary">inactive</span>}</td>
                                                    </tr>
                                                ))}

                                            </tbody>
                                        </Table>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <Button
                                        type="button"
                                        variant="btn btn-danger mx-2"
                                        onClick={() => {
                                            history.push(sessionLocations.sessionList);
                                        }}
                                    >
                                        Cancel
                                    </Button>{" "}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default SessionDetails;
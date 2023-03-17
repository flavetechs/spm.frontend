import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./timetable.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllExamTimetable,
  getExamTimetableActiveClass,
} from "../../../../store/actions/timetable-actions";
import ExamTimeTableActivities from "./exam-timetableactivities";
import { useHistory } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";

function ExamTimeTable() {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [selectedClassId, setSelectedClassId] = useState("");
  const [sessionClassId, setSessionClassId] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const history = useHistory();
  const state = useSelector((state) => state);
  const { selectedExamTimetable, activeExamClasses } = state.timetable;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getExamTimetableActiveClass()(dispatch);
  }, ["123", dispatch]);

  return (
    <>
      <Card>
        <Card.Header>
          <Button
            className="bg-primary btn"
            onClick={() => history.push(classLocations.cumulativeTimeTable)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              className="mt-n2"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2 5C2 4.44772 2.44772 4 3 4H8.66667H21C21.5523 4 22 4.44772 22 5V8H15.3333H8.66667H2V5Z"
                fill="currentColor"
                stroke="currentColor"
              ></path>
              <path
                d="M6 8H2V11M6 8V20M6 8H14M6 20H3C2.44772 20 2 19.5523 2 19V11M6 20H14M14 8H22V11M14 8V20M14 20H21C21.5523 20 22 19.5523 22 19V11M2 11H22M2 14H22M2 17H22M10 8V20M18 8V20"
                stroke="currentColor"
              ></path>
            </svg>{" "}
            Cumulative Exam Activities
          </Button>
        </Card.Header>
        <Card.Body className="">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="">
              <Col className="col-md-2 col-sm-3 mb-4 class-time-table-left-col">
                <Nav variant="" className="flex-column portal-tab mt-4">
                  <Nav.Item className="border-3 class-time-table-nav-item">
                    {activeExamClasses?.map((item, index) => (
                      <Nav.Link
                        eventKey={index + 1}
                        className="py-3"
                        key={index}
                        onClick={() => {
                          setSelectedClassId(item?.lookupId);
                          setSessionClassId(item?.sessionClassId);
                          getAllExamTimetable(item?.lookupId)(dispatch);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <svg
                          className="class-icon"
                          width="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.7161 16.2234H8.49609"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.7161 12.0369H8.49609"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.2521 7.86011H8.49707"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.909 2.74976C15.909 2.74976 8.23198 2.75376 8.21998 2.75376C5.45998 2.77076 3.75098 4.58676 3.75098 7.35676V16.5528C3.75098 19.3368 5.47298 21.1598 8.25698 21.1598C8.25698 21.1598 15.933 21.1568 15.946 21.1568C18.706 21.1398 20.416 19.3228 20.416 16.5528V7.35676C20.416 4.57276 18.693 2.74976 15.909 2.74976Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>{" "}
                        {item.name}
                      </Nav.Link>
                    ))}
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className="col-md-9 col-sm-9">
                {selectedExamTimetable === null ? (
                  <div className="jumbotron jumbotron-fluid d-flex justify-content-center mt-5">
                    <div className="container d-flex justify-content-center header-message">
                      <h6 className="display-6 d-flex justify-content-center mt-4">
                        Please select class to view Timetable
                      </h6>
                    </div>
                  </div>
                ) : (
                  <ExamTimeTableActivities
                    selectedExamTimetable={selectedExamTimetable}
                    selectedClassId={selectedClassId}
                    sessionClassId={sessionClassId}
                  />
                )}
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default ExamTimeTable;

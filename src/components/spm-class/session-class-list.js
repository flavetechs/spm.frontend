import React from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Card";
import {
  getAllSessionClasses,
} from "../../store/actions/class-actions";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { getGeneralActiveSession } from "../../store/actions/general-actions";

const SessionClassList2 = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { itemList } = state.class;
  const { activeSession } = state.appState;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getGeneralActiveSession()(dispatch);
  }, []);

  React.useEffect(() => {
    getAllSessionClasses(activeSession?.sessionId)(dispatch);
  }, [activeSession]);

console.log(itemList);
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Session Class List</h4>
                </div>
              </Card.Header>
        
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>S/No</th>
                        {/* <th>Session</th> */}
                        <th>Class</th>
                        <th>Form Teacher</th>
                        <th>Exam Score</th>
                        <th>Assesment</th>
                        <th>Pass mark</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemList.map((item, idx) => (
                        <tr key={idx}>
                          <td className="">{idx + 1}</td>
                          {/* <td>{item.session}</td> */}
                          <td><strong>{item.class}</strong> </td>
                          <td className="text-capitalize">{item.formTeacher}</td>
                          <td>{item.examScore}</td>
                          <td>{item.assessmentScore}</td>
                          <td>{item.passMark}</td>

                          <td>
                            <div className="flex align-items-center list-user-action">
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2"> details</Tooltip>}
                              >
                            <Link
                                className="btn btn-sm btn-icon btn-success"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Details"
                                to={`${sessionLocations.sessionClassDetail}?sessionClassId=${item.sessionClassId}`}
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SessionClassList2;
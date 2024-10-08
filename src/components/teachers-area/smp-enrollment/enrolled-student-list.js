import React, { useEffect, useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Card from "../../Card";

import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../../router/spm-path-locations";
import {
  respondDialog,
  showErrorToast,
  showHideDialog,
} from "../../../store/actions/toaster-actions";
import {
  getAllEnrolledStudents,
  resetEnrolledStudentsState,
  unEnrollStudent,
} from "../../../store/actions/enrollment-actions";
import {
  getActiveSession,
  getAllSession,
} from "../../../store/actions/session-actions";
import { getAllSessionClasses } from "../../../store/actions/class-actions";
import { hasAccess, NavPermissions } from "../../../utils/permissions";
import { PaginationFilter1 } from "../../partials/components/pagination-filter";
import { CheckMultiple, CheckSingleItem, ReturnFilteredList } from "../../../utils/tools";


const EnrolledStudents = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const locations = useLocation();
  const history = useHistory();
  const [showUnenrollButton, setUnenrollButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [objectArray, setObjectArray] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("classId");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { enrolledStudents,filterProps } = state.enrollment;
  const { activeSession, sessionList } = state.session;
  const { itemList: classList } = state.class;
  const { dialogResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getActiveSession()(dispatch);
    getAllSession(1)(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    sessionClassIdQuery&&
    getAllEnrolledStudents(sessionClassIdQuery,1)(dispatch);
  }, [sessionClassIdQuery,dispatch]);

 useEffect(() => {
    if (!sessionId) {
      getAllSessionClasses(activeSession?.sessionId)(dispatch);
    } else {
      getAllSessionClasses(sessionId)(dispatch);
    }
  }, [sessionId, activeSession,dispatch]);

  useEffect(() => {
    setObjectArray(ReturnFilteredList(enrolledStudents, searchQuery,
      ["studentName", "studentRegNumber", "class"]
    ));
  }, [searchQuery, enrolledStudents])

  const setStateArraysAndIds = (checked) => {
    const result = CheckMultiple(checked, objectArray, "studentContactId");
    setObjectArray(result[0]);
    setSelectedIds([...new Set(result[1])]);
  }
  //UNENROLL HANDLER
  React.useEffect(() => {
    if (dialogResponse === "continue") {
      if (selectedIds.length === 0) {
        showErrorToast("No Item selected to be deleted")(dispatch);
      } else {
        unEnrollStudent(selectedIds, sessionClassIdQuery)(dispatch);
        setUnenrollButton(!showUnenrollButton);
        setShowCheckBoxes(false);
        setStateArraysAndIds(false);
        showHideDialog(false, null)(dispatch);
        respondDialog("")(dispatch);
      }
    } else{
      setUnenrollButton(true);
      setShowCheckBoxes(false);
      setStateArraysAndIds(false);
    }
    return () => {
      respondDialog("")(dispatch);
      showHideDialog(false, null)(dispatch);
    };
  }, [dialogResponse,dispatch,sessionClassIdQuery]);
  //UNENROLL HANDLER

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title mb-3">Enrolled Student List</h4>
                </div>
              </Card.Header>
              <div className="d-xl-flex justify-content-between">
                <div>
                  <div className="input-group">
                    <span className="input-group-text border-0" id="">
                      <svg
                        width="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11.7669"
                          cy="11.7666"
                          r="8.98856"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></circle>
                        <path
                          d="M18.0186 18.4851L21.5426 22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <div>
                      <input
                        type="search"
                        className="form-control text-lowercase"
                        placeholder="Search..."
                        onChange={(event) => setSearchQuery(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-xl-flex justify-content-end px-2">
                {hasAccess(NavPermissions.changeSessionInUnenrolled) && (
                  <div className=" mx-sm-3 mx-xl-1 col-sm-11 col-xl-6 mt-2 mt-xl-0">
                    <select
                      name="sessionId"
                      className="form-select"
                      id="sessionId"
                      onChange={(e) => {
                        setSessionId(e.target.value);
                        resetEnrolledStudentsState()(dispatch);
                      }}
                    >
                      {sessionList?.map((session, idx) => (
                        <option
                          key={idx}
                          value={session.sessionId.toLowerCase() || ""}
                          selected={activeSession?.sessionId === session.sessionId.toLowerCase()}
                        >
                          {session.startDate} / {session.endDate}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                  <div className=" mx-sm-3 mx-xl-1 col-sm-11 col-xl-6 mt-2 mt-xl-0">
                    <select
                      name="sessionClassId"
                      className="form-select"
                      id="sessionClassId"
                      value={sessionClassIdQuery || ""}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          history.push(studentsLocations.enrolledStudents);
                        } else {
                          history.push(
                            `${studentsLocations.enrolledStudents}?classId=${e.target.value}`
                          );
                        }
                      }}
                    >
                      <option value="">Select Class</option>
                      {classList?.map((item, idx) => (
                        <option key={idx} value={item.sessionClassId}>
                          {item.class}
                        </option>
                      ))}
                    </select>
                  </div>
                  {hasAccess(NavPermissions.unenrollStudents) && (
                    <div>
                      {showUnenrollButton ? (
                        <button
                          type="button"
                          className="text-center btn-primary btn-icon mx-3  mt-3 mt-xl-0  btn btn-primary d-flex"
                          onClick={() => {
                            setUnenrollButton(!showUnenrollButton);
                            setShowCheckBoxes(!showCheckBoxes);
                          }}
                        >
                          <i className="btn-inner">
                            <svg
                              width="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="currentColor"
                            >
                              <path
                                d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M20.708 6.23975H3.75"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </i>
                          <span> unenroll</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-center btn-primary btn-icon  me-2 mt-3 mt-xl-0 btn btn-primary d-flex"
                          onClick={() => {
                            const message =
                              selectedIds.length === 1
                                ? `Are you sure to unenroll student ?`
                                : `Are you sure to unenroll students ?`;
                            showHideDialog(true, message)(dispatch);
                          }}
                        >
                          <i className="btn-inner">
                            <svg
                              width="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="currentColor"
                            >
                              <path
                                d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M20.708 6.23975H3.75"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </i>
                          <span> Unenroll selected Student</span>
                        </button>
                      )}{" "}
                    </div>
                  )}
                </div>
              </div>
              <Card.Body className="px-0">
                {!sessionClassIdQuery ? (
                  <div className="jumbotron jumbotron-fluid">
                    <div className="container d-flex justify-content-center mt-5 bg-light">
                      <h3 className="display-4">
                        Please select a class to view enrolled students
                      </h3>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table
                      id="role-list-table"
                      className="table table-striped"
                      role="grid"
                      data-toggle="data-table"
                    >
                      <thead>
                        <tr className="ligth">
                          <th>
                            {showCheckBoxes ? (
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={(e) => {
                                  setStateArraysAndIds(e.target.checked);
                                }}
                              />
                            ) : (
                              "S/No"
                            )}
                          </th>
                          <th>Students Name</th>
                          <th>Registration No.</th>
                          <th>Class</th>
                          <th min-width="100px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {objectArray.map((student, idx) => (
                          <tr key={idx}>
                            <td className="">
                              <b>
                                {showCheckBoxes ? (
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={student.isChecked || false}
                                    onChange={(e) => {
                                      const result = CheckSingleItem(
                                        e.target.checked,
                                        selectedIds,
                                        student.studentContactId,
                                        enrolledStudents,"studentContactId"
                                      );
                                      setObjectArray(result[0]);
                                      setSelectedIds([...new Set(result[1])]);
                                    }}
                                  />
                                ) : (
                                  idx + 1
                                )}
                              </b>
                            </td>
                            <td className="text-uppercase">
                              <b>{student.studentName}</b>
                            </td>
                            <td className="text-uppercase">
                              <b>{student.studentRegNumber}</b>
                            </td>
                            <td className="text-uppercase">
                              <b>{student.class}</b>
                            </td>

                            <td>
                              <div className="flex align-items-center list-user-action">
                              {hasAccess(NavPermissions.editStudent) && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      {" "}
                                      Edit Student
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    className="btn btn-sm btn-icon btn-warning"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Edit"
                                    to={`${studentsLocations.studentEdit}?studentAccountId=${student.studentContactId}`}
                                  >
                                    <span className="btn-inner">
                                      <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M15.1655 4.60254L19.7315 9.16854"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </span>
                                  </Link>
                                </OverlayTrigger>
                              )}{" "}
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      Student Details
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    className="btn btn-sm btn-icon btn-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Details"
                                    to={`${studentsLocations.studentDetails}?studentAccountId=${student.studentContactId}`}
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
                                </OverlayTrigger>{" "}

                                {hasAccess(NavPermissions.unenrollStudents) && (
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        Unenroll Student
                                      </Tooltip>
                                    }
                                  >

                                    <div
                                      className="btn btn-sm btn-icon btn-danger"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Delete"
                                      onClick={() => {
                                      setSelectedIds([...new Set([...selectedIds,student.studentContactId])]);
                                        const message =
                                          selectedIds.length === 1
                                            ? `Are you sure to unenroll student ?`
                                            : `Are you sure to unenroll students ?`;
                                        showHideDialog(true, message)(dispatch);
                                      }}
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
                                            d="M14.0545 15.26C14.3416 14.97 14.3416 14.5 14.0545 14.21L12.8465 12.99L14.0545 11.77C14.3416 11.48 14.3416 11.01 14.0545 10.72C13.7673 10.42 13.2921 10.42 13.005 10.72L11.797 11.94L10.5891 10.72C10.302 10.42 9.83663 10.42 9.5495 10.72C9.26238 11.01 9.26238 11.48 9.5495 11.77L10.7574 12.99L9.5495 14.21C9.26238 14.5 9.26238 14.97 9.5495 15.26C9.68812 15.41 9.87624 15.48 10.0644 15.48C10.2525 15.48 10.4505 15.41 10.5891 15.26L11.797 14.04L13.005 15.26C13.1535 15.41 13.3416 15.48 13.5297 15.48C13.7178 15.48 13.9059 15.41 14.0545 15.26ZM19.3354 9.02557C19.5686 9.02289 19.8209 9.02 20.0446 9.02C20.302 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5099 22 16.0446 22H8.17327C5.58911 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.5 2 7.96535 2H13.2525C13.5 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.203 9.01 17.0149 9.02C17.4333 9.02 17.8077 9.02318 18.1346 9.02595C18.3878 9.02809 18.6125 9.03 18.8069 9.03C18.9488 9.03 19.135 9.02786 19.3354 9.02557ZM19.6056 7.5662C18.7918 7.5692 17.8334 7.5662 17.1433 7.5592C16.0482 7.5592 15.1462 6.6482 15.1462 5.5422V2.9062C15.1462 2.4752 15.6641 2.2612 15.9591 2.5722C16.7215 3.37207 17.8885 4.59784 18.8749 5.63398C19.2746 6.05384 19.6447 6.44257 19.9462 6.7592C20.2344 7.0622 20.0235 7.5652 19.6056 7.5662Z"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </div>
                                  </OverlayTrigger>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
              <Card.Footer>
                <PaginationFilter1 filterProps={filterProps} action={getAllEnrolledStudents} dispatch={dispatch} param1={sessionClassIdQuery}/>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default EnrolledStudents;

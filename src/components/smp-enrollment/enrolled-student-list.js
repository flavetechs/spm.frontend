import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Card";

import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../router/spm-path-locations";
import {
  respondDialog,
  showErrorToast,
  showHideDialog,
} from "../../store/actions/toaster-actions";
import {
  getAllenrolledStudents,
  pushId,
  removeId,
  returnListEnrolled,
  unEnrollStudent,
} from "../../store/actions/enrollment-actions";
import {
  getActiveSession,
  getAllSession,
} from "../../store/actions/session-actions";
import { getAllSessionClasses } from "../../store/actions/class-actions";
import { Field, Formik } from "formik";

const EnrolledStudents = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showUnenrollButton, setUnenrollButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [query, setQuery] = useState("");
  const [sessionClassId, setSessionClassId] = useState("");
  const [sessionId, setSessionId] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { enrolledStudents, selectedIds } = state.enrollment;
  const { activeSession, sessionList } = state.session;
  const { itemList: classList } = state.class;
  const { dialogResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getActiveSession()(dispatch);
    getAllSession()(dispatch);
  }, []);

  React.useEffect(() => {
    if (!sessionId) {
      getAllSessionClasses(activeSession?.sessionId)(dispatch);
    } else {
      getAllSessionClasses(sessionId)(dispatch);
    }
  }, [sessionId, activeSession]);

  React.useEffect(() => {
    if (!sessionClassId && classList.length != 0) {
      setSessionClassId(classList[0]?.sessionClassId);
      getAllenrolledStudents()(dispatch);
    } else {
      getAllenrolledStudents()(dispatch);
    }
  }, [sessionClassId,classList]);

  //UNENROLL HANDLER
  React.useEffect(() => {
    if (dialogResponse === "continue") {
      if (selectedIds.length === 0) {
        showErrorToast("No Item selected to be deleted")(dispatch);
      } else {
        unEnrollStudent(selectedIds)(dispatch);
        setUnenrollButton(!showUnenrollButton);
        setShowCheckBoxes(false);

        showHideDialog(false, null)(dispatch);
        respondDialog("")(dispatch);
      }
    } else {
      setUnenrollButton(true);
      setShowCheckBoxes(false);
      selectedIds.forEach((id) => {
        dispatch(removeId(id));
      });
    }
    return () => {
      respondDialog("")(dispatch);
    };
  }, [dialogResponse]);
  //UNENROLL HANDLER

  const checkSingleItem = (isChecked, studentContactId, enrolledStudents) => {
    enrolledStudents.forEach((item) => {
      if (item.studentContactId === studentContactId) {
        item.isChecked = isChecked;
      }
    });
    if (isChecked) {
      dispatch(pushId(studentContactId));
    } else {
      dispatch(removeId(studentContactId));
    }
  };
  const checkAllItems = (isChecked, enrolledStudents) => {
    enrolledStudents.forEach((item) => {
      item.isChecked = isChecked;
      if (item.isChecked) {
        dispatch(pushId(item.studentContactId));
      } else {
        dispatch(removeId(item.studentContactId));
      }
    });
    returnListEnrolled(enrolledStudents)(dispatch);
  };
  const sortedList = enrolledStudents.sort(function (a, b) {
    if (a.studentName.toLowerCase() < b.studentName.toLowerCase()) return -1;
    if (a.studentName.toLowerCase() > b.studentName.toLowerCase()) return 1;
    return 0;
  });
  const filteredEnrolledStudents = sortedList.filter((students) => {
    if (query === "") {
      //if query is empty
      return students;
    } else if (
      students.studentName.toLowerCase().includes(query.toLowerCase())
    ) {
      //returns filtered array
      return students;
    } else if (
      students.studentRegNumber.toLowerCase().includes(query.toLowerCase())
    ) {
      //returns filtered array
      return students;
    }
  });
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
              <div className="d-lg-flex justify-content-between">
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
                        onChange={(event) => setQuery(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <Formik
                  initialValues={{
                    sessionId: activeSession?.sessionId,
                    terms: activeSession?.terms.find(
                      (term) => term.isActive == true
                    )?.sessionTermId,
                    sessionClassId: sessionClassId,
                  }}
                  enableReinitialize={true}
                  onSubmit={(values) => {}}
                >
                  {({ handleSubmit, values, setFieldValue }) => (
                    <div className="d-lg-flex justify-content-end">
                      <div className=" mx-sm-3 mx-lg-1 col-sm-11 col-lg-4 mt-2 mt-lg-0">
                        <Field
                          as="select"
                          name="sessionId"
                          className="form-select"
                          id="sessionId"
                          onChange={(e) => {
                            setFieldValue("sessionId", e.target.value);
                            setSessionId(e.target.value);
                          }}
                        >
                          <option value="">Select Session</option>
                          {sessionList?.map((session, idx) => (
                            <option
                              key={idx}
                              name={values.sessionId}
                              value={session.sessionId.toLowerCase()}
                            >
                              {session.startDate} / {session.endDate}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className=" mx-sm-3 mx-lg-1 col-sm-11 col-lg-2 mt-2 mt-lg-0">
                        <Field
                          as="select"
                          name="terms"
                          className="form-select"
                          id="terms"
                        >
                          <option value="">Select Terms</option>
                          {sessionList
                            ?.find(
                              (session, idx) =>
                                session.sessionId.toLowerCase() ==
                                values.sessionId
                            )
                            ?.terms.map((term, id) => (
                              <option
                                key={id}
                                name={values.terms}
                                value={term.sessionTermId.toLowerCase()}
                                selected={term.sessionTermId == values.terms}
                              >
                                {term.termName}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className=" mx-sm-3 mx-lg-1 col-sm-11 col-lg-3 mt-2 mt-lg-0">
                        <Field
                          as="select"
                          name="sessionClassId"
                          className="form-select"
                          id="sessionClassId"
                          onChange={(e) => {
                            setFieldValue("sessionClassId", e.target.value);
                            setSessionClassId(e.target.value);
                            // history.push(
                            //   `${classLocations.classAttendanceBoard}?sessionClassId=${e.target.value}`
                            // );
                          }}
                        >
                          {classList.map((item, idx) => (
                            <option key={idx} value={item.sessionClassId}>
                              {item.class}
                            </option>
                          ))}
                        </Field>
                      </div>
                      {showUnenrollButton ? (
                        <button
                          type="button"
                          className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-2 mt-3 btn btn-primary"
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
                          className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
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
                </Formik>
              </div>
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
                        <th>
                          {showCheckBoxes ? (
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                checkAllItems(
                                  e.target.checked,
                                  enrolledStudents
                                );
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
                      {filteredEnrolledStudents.map((student, idx) => (
                        <tr key={idx}>
                          <td className="">
                            <b>
                              {showCheckBoxes ? (
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={student.isChecked || false}
                                  onChange={(e) => {
                                    checkSingleItem(
                                      e.target.checked,
                                      student.studentContactId,
                                      enrolledStudents
                                    );
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
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Unenroll Student
                                  </Tooltip>
                                }
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-danger"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Delete"
                                  to="#"
                                  data-id={student.userAccountId}
                                  onClick={() => {
                                    dispatch(pushId(student.studentContactId));
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

export default EnrolledStudents;

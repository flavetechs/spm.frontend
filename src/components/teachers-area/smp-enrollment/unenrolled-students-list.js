import React, { useEffect, useState } from "react";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../Card";
import {
  getAllUnenrolledStudents,
  // pushId,
  removeId,
  // returnList,
} from "../../../store/actions/enrollment-actions";
import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../../router/spm-path-locations";
import {
  respondModal,
  showErrorToast,
  showHideModal,
} from "../../../store/actions/toaster-actions";
import { ClassesModal } from "./classesModal";
import { hasAccess, NavPermissions } from "../../../utils/permissions";
import PaginationFilter from "../../partials/components/pagination-filter";
import { CheckMultiple, CheckSingleItem, ReturnFilteredList } from "../../../utils/tools";

const UnenrolledStudentsList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showEnrollButton, setEnrollButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [objectArray, setObjectArray] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { unenrolledStudents, filterProps } = state.enrollment;
  const { modalResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE


  React.useEffect(() => {
    getAllUnenrolledStudents(1)(dispatch);
  }, []);

  useEffect(() => {
    setObjectArray(ReturnFilteredList(unenrolledStudents, searchQuery,
      ["studentName", "studentRegNumber", "class"]
    ));
  }, [searchQuery, unenrolledStudents])

  const setStateArraysAndIds = (checked) => {
    const result = CheckMultiple(checked, objectArray, "studentContactId");
    setObjectArray(result[0]);
    setSelectedIds(result[1]);
  }

  //ENROLL HANDLER
  React.useEffect(() => {
    if (modalResponse === "cancel") {
      setStateArraysAndIds(false);
      setEnrollButton(true);
      setShowCheckBoxes(false);
    }
    return () => {
      respondModal("")(dispatch)
    }
  }, [modalResponse, dispatch, selectedIds]);
  //ENROLL HANDLER




  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title mb-3">Unenrolled Students List</h4>
                </div>
              </Card.Header>
              <ClassesModal />
              <div className="d-md-flex justify-content-between">
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
                {hasAccess(NavPermissions.enrollStudents) && (
                  <div className="d-flex justify-content-end px-2">
                    {showEnrollButton ? (
                      <button
                        type="button"
                        className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary "
                        onClick={() => {
                          setEnrollButton(!showEnrollButton);
                          setShowCheckBoxes(!showCheckBoxes);
                        }}
                      >
                        <i className="btn-inner">
                          <svg
                            width="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M19.2036 8.66919V12.6792"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M21.2497 10.6741H17.1597"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </i>
                        <span> Enroll Students</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#viewModal"
                        className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                        onClick={() => {
                          if (selectedIds.length === 0) {
                            showErrorToast("No Student selected to be enrolled")(
                              dispatch
                            );
                          } else {
                            showHideModal(true)(dispatch);
                          }
                        }}
                      >
                        <i className="btn-inner">
                          <svg
                            width="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M19.2036 8.66919V12.6792"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M21.2497 10.6741H17.1597"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </i>
                        <span> Enroll Selected</span>
                      </button>
                    )}
                  </div>
                )}
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
                                setStateArraysAndIds(e.target.checked);
                                setEnrollButton(showEnrollButton);
                              }}
                            />
                          ) : (
                            "S/No"
                          )}
                        </th>
                        <th>Full Name</th>
                        <th>Registration No</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objectArray.map((student, idx) => {
                        return (
                          <tr key={idx}>
                            <td className="">
                              <b>
                                {showCheckBoxes ? (
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={student.isChecked || false}
                                    onChange={(e) => {
                                      const result = CheckSingleItem(e.target.checked, student.studentContactId,
                                        unenrolledStudents, "studentContactId"
                                      );
                                      setObjectArray(result[0]);
                                      setSelectedIds(result[1]);

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

                            <td>
                              <div className="flex align-items-center list-user-action">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      {" "}
                                      Student Details
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    className="btn btn-sm btn-icon btn-success"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
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
                                      {" "}
                                      Enroll Student
                                    </Tooltip>
                                  }
                                >
                                  {hasAccess(NavPermissions.enrollStudents) && (
                                    <Link
                                      className="btn btn-sm btn-icon btn-warning"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Enroll"
                                      to="#"
                                      data-id={student.studentContactId}
                                      onClick={() => {
                                        showHideModal(true)(dispatch);
                                        // dispatch(pushId(student.studentContactId));
                                      }}
                                    >
                                      <span className="btn-inner">
                                        <svg
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title="Enroll"
                                          width="32"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M19.2036 8.66919V12.6792"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M21.2497 10.6741H17.1597"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </span>
                                    </Link>
                                  )}
                                </OverlayTrigger>
                              </div>
                            </td>
                          </tr>
                        )
                      }


                      )}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
              <Card.Footer>
                <PaginationFilter filterProps={filterProps} action={getAllUnenrolledStudents} dispatch={dispatch} />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UnenrolledStudentsList;

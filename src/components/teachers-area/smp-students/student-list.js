import React, { useEffect, useState } from "react";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../Card";
import {
  getAllStudents,
  deleteStudent,
  uploadStudentsListFile,
} from "../../../store/actions/student-actions";
import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../../router/spm-path-locations";
import {
  respondDialog,
  respondToDeleteDialog,
  showErrorToast,
  showHideDialog,
  showSingleDeleteDialog,
} from "../../../store/actions/toaster-actions";
import {
  enrollStudent,
  unEnrollStudent,
} from "../../../store/actions/enrollment-actions";
import { hasAccess, NavPermissions } from "../../../utils/permissions";
import PaginationFilter from "../../partials/components/pagination-filter";
import { CheckMultiple, CheckSingleItem, ReturnFilteredList } from "../../../utils/tools";
import { SearchInput } from "../../partials/components/search-input";

const StudentList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showDeleteButton, setDeleteButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [objectArray, setObjectArray] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [studentsExcelFile, setStudentsExcelFile] = useState("");
  const fileInputRef = React.useRef();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentList, filterProps } = state.student;
  const { deleteDialogResponse, modalResponse, dialogResponse} = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllStudents(1)(dispatch);
  }, [dispatch]);


  useEffect(() => {
    setObjectArray(ReturnFilteredList(studentList, searchQuery,
      ["firstName", "lastName", "registrationNumber", "sessionClass"]
    ));
  }, [searchQuery, studentList]) 

  const setStateArraysAndIds = (checked) => {
    const result = CheckMultiple(checked, objectArray, "userAccountId");
    setObjectArray(result[0]);
    setSelectedIds([...new Set(result[1])]);
  }
  //DELETE HANDLER
  React.useEffect(() => {
    if (deleteDialogResponse === "continue") {
      if (selectedIds.length === 0) {
        showErrorToast("No Item selected to be deleted")(dispatch);
      } else {
        deleteStudent(selectedIds)(dispatch);
        setDeleteButton(!showDeleteButton);
        setShowCheckBoxes(false);
        setStateArraysAndIds(false);
        showHideDialog(false, null)(dispatch);
        respondToDeleteDialog("")(dispatch);
      }
    } else {
      setDeleteButton(true);
      setShowCheckBoxes(false);
      setStateArraysAndIds(false);
    }
    return () => {
      respondToDeleteDialog("")(dispatch);
    };
  }, [deleteDialogResponse, dispatch]);
  //DELETE HANDLER


  const filteredStudentList = ReturnFilteredList(studentList, searchQuery,
    ["firstName", "lastName", "registrationNumber", "sessionClass"]
  );

  React.useEffect(() => {
    if (modalResponse === "continue") {
      enrollStudent(selectedIds)(dispatch);
    }
  }, [modalResponse, dispatch]);

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      unEnrollStudent(selectedIds)(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
    }
    return () => {
      respondDialog("")(dispatch);
    };
  }, [dialogResponse, dispatch]);

  const handleSubmit = () => {
    if (!studentsExcelFile) {
      showErrorToast("Please choose a file")(dispatch);
    } else {
      const params = new FormData();
      params.append("studentsExcelFile", studentsExcelFile);
      uploadStudentsListFile(params)(dispatch);
      fileInputRef.current.value = "";
      setStudentsExcelFile("");
    }
  };
  console.log("selectedIds",selectedIds);
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title mb-3">
                    <b>Students List</b>
                  </h4>
                </div>
              </Card.Header>
              {/* <ClassesModal /> */}
              <Row className="">
                <Col md="12">
                  <div className="input-group">
                    <span
                      className="input-group-text border-0"
                      id="search-input"
                    >
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
                      <SearchInput setSearchQuery={setSearchQuery} />
                    </div>
                  </div>
                </Col>
                <Col xl="8" className="mt-3">

                  <div className="d-md-flex mx-3">
                    <div className="">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        className="form-control"
                        accept=".xlsx, .xls, .csv"
                        onChange={event => setStudentsExcelFile(event.target.files[0])}
                        ref={fileInputRef}
                      />
                    </div>
                    <div className="mx-md-3 mx-1 d-xl-flex mt-3  mt-md-0">
                      <button
                        type="button"
                        className="text-center btn-primary btn-icon me-2  btn btn-primary"
                        onClick={handleSubmit}
                      >
                        <i className="btn-inner">
                          <svg
                            width="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.38948 8.98403H6.45648C4.42148 8.98403 2.77148 10.634 2.77148 12.669V17.544C2.77148 19.578 4.42148 21.228 6.45648 21.228H17.5865C19.6215 21.228 21.2715 19.578 21.2715 17.544V12.659C21.2715 10.63 19.6265 8.98403 17.5975 8.98403L16.6545 8.98403"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M12.0215 2.19044V14.2314"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.10645 5.1189L12.0214 2.1909L14.9374 5.1189"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </i>
                        <span> Upload</span>
                      </button>{" "}
                      <button
                        type="button"
                        className="text-center btn-primary btn-icon me-2  btn btn-primary"
                      // onClick={handleSubmit}
                      >
                        <i className="btn-inner">
                          <svg
                            width="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.1221 15.436L12.1221 3.39502"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.0381 12.5083L12.1221 15.4363L9.20609 12.5083"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16.7551 8.12793H17.6881C19.7231 8.12793 21.3721 9.77693 21.3721 11.8129V16.6969C21.3721 18.7269 19.7271 20.3719 17.6971 20.3719L6.55707 20.3719C4.52207 20.3719 2.87207 18.7219 2.87207 16.6869V11.8019C2.87207 9.77293 4.51807 8.12793 6.54707 8.12793L7.48907 8.12793"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </i>
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                </Col>
                <Col xl="4" className="mt-2 mt-xl-3 d-xl-flex justify-content-end">
                  {hasAccess(NavPermissions.deleteStudent) && (
                    <div className="d-flex  px-3">
                      {showDeleteButton ? (
                        <button
                          type="button"
                          className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                          onClick={() => {
                            setDeleteButton(!showDeleteButton);
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
                          <span> Delete</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                          onClick={() => {
                            showSingleDeleteDialog(true)(dispatch);
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
                          <span> Delete Selected</span>
                        </button>
                      )}
                      {hasAccess(NavPermissions.createStudent) && (
                        <Link
                          to={studentsLocations.studentAdd}
                          className="d-flex justify-content-end"
                        >
                          <button
                            type="button"
                            className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                          >
                            <i className="btn-inner">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                ></path>
                              </svg>
                            </i>
                            <span>New Student</span>
                          </button>
                        </Link>
                      )}
                    </div>
                  )}
                </Col>
              </Row>
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
                              }}
                            />
                          ) : (
                            "S/No"
                          )}
                        </th>
                        <th>Full Name</th>
                        <th>Session Class</th>
                        <th>Registration No</th>
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
                                  checked={
                                   student.isChecked
                                     || false
                                  }
                                  onChange={(e) => {
                                    const result =  CheckSingleItem(
                                      e.target.checked,
                                      selectedIds,
                                      student.userAccountId,
                                      studentList,
                                      "userAccountId"
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
                            <b>
                              {student.firstName} {student.middleName}{" "}
                              {student.lastName}
                            </b>
                          </td>
                          <td className="text-uppercase">
                            <b>{student.sessionClass}</b>
                          </td>
                          <td className="text-uppercase">
                            <b>{student.registrationNumber}</b>
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
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  to={`${studentsLocations.studentDetails}?studentAccountId=${student.studentAccountId}`}
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
                                    to={`${studentsLocations.studentEdit}?studentAccountId=${student.studentAccountId}`}
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
                              {/* {hasAccess(NavPermissions.enrollStudents) && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      {" "}
                                      Enroll Student
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    className="btn btn-sm btn-icon btn-warning"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Enroll"
                                    to="#"
                                    data-id={student.studentAccountId}
                                    onClick={() => {
                                      showHideModal(true)(dispatch);
                                      dispatch(
                                        pushId(student.studentAccountId)
                                      );
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
                                </OverlayTrigger>
                              )}{" "}
                              {hasAccess(NavPermissions.unenrollStudents) && (
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
                                    data-id={student.studentAccountId}
                                    onClick={() => {
                                      dispatch(
                                        pushId(student.studentAccountId)
                                      );
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
                              )}{" "} */}
                              {hasAccess(NavPermissions.deleteStudent) && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      {" "}
                                      Delete Student
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
                                      setSelectedIds([...new Set([...selectedIds,student.userAccountId])]);
                                      showSingleDeleteDialog(true)(dispatch);
                                    }}
                                  >
                                    <span className="btn-inner">
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
                                    </span>
                                  </Link>
                                </OverlayTrigger>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
              <Card.Footer>
                <PaginationFilter
                  filterProps={filterProps}
                  action={getAllStudents}
                  dispatch={dispatch}
                />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StudentList;

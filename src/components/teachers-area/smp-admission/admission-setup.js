import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Card";
import PaginationFilter from "../../partials/components/pagination-filter";
import { fetchAllAdminAdmissionList, getAdminAdmissionClasses, getAllSession2Classes, importAdmissionResult, pushId, removeId, returnList } from "../../../store/actions/admin-admission-actions";
import { adminAdmissionLocations } from "../../../router/spm-path-locations";
import { AdminAdmissionModal } from "./admin-admission-modal";
import { showHideModal } from "../../../store/actions/toaster-actions";
import { Field, Formik } from "formik";
import { AdmissionEnrolModal } from "./admission-enroll-modal";
import { loginCBT } from "../../../store/actions/auth-actions";


const AdmissionList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectModal, setSelectModal] = useState("");
  const [selectedClassId, setSelectedClassIdQuery] = useState("");
  const [selectedExamStatus, setSelectedExamStatus] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { cbtToken, clientUrl } = state.auth;
  const { filterProps, adminAdmissionList, selectedIds, adminAdmissionClasses, session2Classes } = state.adminAdmission;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    if (!selectedClassId && !selectedExamStatus) {
      fetchAllAdminAdmissionList(1, selectedClassId, selectedExamStatus)(dispatch);
    } else if (selectedClassId) {
      fetchAllAdminAdmissionList(1, selectedClassId, selectedExamStatus)(dispatch);
    } else if (selectedExamStatus) {
      fetchAllAdminAdmissionList(1, selectedClassId, selectedExamStatus)(dispatch);
    } else if (selectedClassId && selectedExamStatus) {
      fetchAllAdminAdmissionList(1, selectedClassId, selectedExamStatus)(dispatch);
    }
  }, [dispatch, selectedClassId, selectedExamStatus]);


  React.useEffect(() => {
    getAdminAdmissionClasses()(dispatch);
    getAllSession2Classes()(dispatch);
    loginCBT()(dispatch);
  }, []);


  const filteredAdmissionList = adminAdmissionList?.filter((admission) => {
    if (searchQuery === "") {
      //if query is empty
      return admission;
    } else if (admission.firstname.toLowerCase().includes(searchQuery.toLowerCase())) {
      //returns filtered array
      return admission;
    } else if (admission.lastname.toLowerCase().includes(searchQuery.toLowerCase())) {
      //returns filtered array
      return admission;
    } else if (admission.className.toLowerCase().includes(searchQuery.toLowerCase())) {
      //returns filtered array
      return admission;
    }
  });

  const checkSingleItem = (isChecked, admissionId, adminAdmissionList) => {
    adminAdmissionList.forEach((item) => {
      if (item.admissionId === admissionId) {
        item.isChecked = isChecked;
      }
    });
    if (isChecked) {
      dispatch(pushId(admissionId));
    } else {
      dispatch(removeId(admissionId));
    }
  };
  const checkAllItems = (isChecked, adminAdmissionList) => {
    adminAdmissionList.forEach((item) => {
      item.isChecked = isChecked;
      if (item.isChecked) {
        dispatch(pushId(item.admissionId));
      } else {
        dispatch(removeId(item.admissionId));
      }
    });
    returnList(adminAdmissionList)(dispatch);
  };

  const examStatusItem = [
    { statusName: "Pending", statusNumber: 0 },
    { statusName: "Passed", statusNumber: 1 },
    { statusName: "Failed", statusNumber: 2 },
  ]

  const handleClick = (event) => {
    event.preventDefault();
  }


  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Formik
              initialValues={{

              }}
              enableReinitialize={true}
              onSubmit={() => {

              }}
            >
              {() => (
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title mb-3">
                        <b>Registered Admission List</b>
                      </h4>
                    </div>
                  </Card.Header>
                  <div className="d-md-flex justify-content-between">
                    <div>
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
                          <input
                            type="search"
                            className="form-control text-lowercase"
                            placeholder="Search..."
                            onChange={(event) => setSearchQuery(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className=" mx-2 d-md-flex justify-content-between">
                        <Field
                          as="select"
                          name="candidateClass"
                          className="form-select mt-3 mt-lg-0 "
                          id="terms"
                          onChange={(e) => {
                            setSelectedClassIdQuery(e.target.value);
                          }}

                        >
                          <option value="">Select Class</option>
                          {
                            adminAdmissionClasses?.map((c, id) => (
                              <option
                                key={id}
                                value={c.classId}
                              >
                                {c.className}
                              </option>
                            ))
                          }
                        </Field>
                        {" "}
                        <Field
                          as="select"
                          name="sessionClass"
                          className="form-select mt-3 mt-lg-0 dropdown"
                          id="terms"
                          onChange={(e) => {
                            setSelectedExamStatus(e.target.value);
                          }}
                        >
                          <option value="">Select Status</option>
                          {examStatusItem?.map((item, id) => (
                            <option
                              key={id}
                              value={item.statusNumber}
                            >
                              {item.statusName}
                            </option>
                          ))
                          }
                        </Field>
                      </div>
                    </div>
                    <div className="mx-2">
                      <div className="d-flex justify-content-end">

                        {!selectedClassId ?
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                               Result from CBT will be imported here
                              </Tooltip>
                            }
                          >
                            <Link
                              to="#"
                              className="d-flex justify-content-end"
                            >
                              <button
                                disabled={selectedClassId ? false : true}
                                type="button"
                                className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                              >
                                <i className="btn-inner">
                                  <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.1221 15.436L12.1221 3.39502" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round" />
                                    <path d="M15.0381 12.5083L12.1221 15.4363L9.20609 12.5083" stroke="currentColor" strokeWidth="1.5"
                                      strokeLinecap="round" strokeLinejoin="round" />
                                    <path
                                      d="M16.7551 8.12793H17.6881C19.7231 8.12793 21.3721 9.77693 21.3721 11.8129V16.6969C21.3721 18.7269 19.7271 20.3719 17.6971 20.3719L6.55707 20.3719C4.52207 20.3719 2.87207 18.7219 2.87207 16.6869V11.8019C2.87207 9.77293 4.51807 8.12793 6.54707 8.12793L7.48907 8.12793"
                                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>{" "}
                                </i>
                                <span>Import</span>
                              </button>
                            </Link>
                          </OverlayTrigger>
                          :
                          <Link
                            to="#"
                            className="d-md-flex justify-content-end"
                          >
                            <button
                              type="button"
                              className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                              onClick={() => {
                                importAdmissionResult(selectedClassId,selectedExamStatus)(dispatch);
                              }
                              }
                            >
                              <i className="btn-inner">
                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.1221 15.436L12.1221 3.39502" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                  <path d="M15.0381 12.5083L12.1221 15.4363L9.20609 12.5083" stroke="currentColor" strokeWidth="1.5"
                                    strokeLinecap="round" strokeLinejoin="round" />
                                  <path
                                    d="M16.7551 8.12793H17.6881C19.7231 8.12793 21.3721 9.77693 21.3721 11.8129V16.6969C21.3721 18.7269 19.7271 20.3719 17.6971 20.3719L6.55707 20.3719C4.52207 20.3719 2.87207 18.7219 2.87207 16.6869V11.8019C2.87207 9.77293 4.51807 8.12793 6.54707 8.12793L7.48907 8.12793"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>{" "}
                              </i>
                              <span>Import</span>
                            </button>
                          </Link>
                        }
                        {selectedIds.length < 1 || selectedExamStatus === "" || selectedClassId === "" ?
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                                Please select class, Exam Status, and check Student(s) to be enrolled
                              </Tooltip>
                            }
                          >
                            <Link
                              to="#"
                              className="d-flex justify-content-end"
                            >
                              <button
                                type="button"
                                disabled={true}
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
                                <span>Enroll Student</span>
                              </button>
                            </Link>
                          </OverlayTrigger>
                          :
                          <Link
                            to="#"
                            className="d-flex justify-content-end"
                          >
                            <button
                              type="button"
                              className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                              onClick={() => {
                                showHideModal(true)(dispatch);
                                setSelectModal("enroll-modal");
                              }
                              }
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
                              <span>Enroll Student</span>
                            </button>
                          </Link>
                        }
                        {!selectedClassId ?
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id="button-tooltip-2">
                              All candidates will be exported to CBT
                              </Tooltip>
                            }
                          >
                            <Link
                              to="#"
                              className="d-flex justify-content-end"
                            >
                              <button
                                disabled={selectedClassId ? false : true}
                                type="button"
                                className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                              >
                                <i className="btn-inner">
                                  <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M7.38948 8.98403H6.45648C4.42148 8.98403 2.77148 10.634 2.77148 12.669V17.544C2.77148 19.578 4.42148 21.228 6.45648 21.228H17.5865C19.6215 21.228 21.2715 19.578 21.2715 17.544V12.659C21.2715 10.63 19.6265 8.98403 17.5975 8.98403L16.6545 8.98403"
                                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.0215 2.19044V14.2314" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round" />
                                    <path d="M9.10645 5.1189L12.0214 2.1909L14.9374 5.1189" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                      strokeLinejoin="round" />
                                  </svg>{" "}
                                </i>
                                <span>Export</span>
                              </button>
                            </Link>
                          </OverlayTrigger>

                          :
                          <Link
                            to="#"
                            className="d-flex justify-content-end"
                          >
                            <button
                              type="button"
                              className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                              onClick={() => {
                                showHideModal(true)(dispatch);
                                setSelectModal("export-modal");
                              }
                              }
                            >
                              <i className="btn-inner">
                                <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M7.38948 8.98403H6.45648C4.42148 8.98403 2.77148 10.634 2.77148 12.669V17.544C2.77148 19.578 4.42148 21.228 6.45648 21.228H17.5865C19.6215 21.228 21.2715 19.578 21.2715 17.544V12.659C21.2715 10.63 19.6265 8.98403 17.5975 8.98403L16.6545 8.98403"
                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M12.0215 2.19044V14.2314" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                  <path d="M9.10645 5.1189L12.0214 2.1909L14.9374 5.1189" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round" />
                                </svg>{" "}
                              </i>
                              <span>Export</span>
                            </button>
                          </Link>
                        }
                      </div>
                    </div>
                  </div>
                  {selectModal == "export-modal" ?
                    <AdminAdmissionModal selectedClassId={selectedClassId} /> :
                    <AdmissionEnrolModal selectedIds={selectedIds} session2Classes={session2Classes} />
                  }
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
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="gg"
                                onChange={(e) => {
                                  checkAllItems(e.target.checked, adminAdmissionList);
                                }}

                              />
                            </th>
                            <th>
                              S/No.
                            </th>
                            <th>
                              <b>Full Name</b>
                            </th>
                            <th>
                              <b>Exam Status</b>
                            </th>
                            <th>
                              <b>Admission Status</b>
                            </th>
                            <th>
                              <b>Class Name</b>
                            </th>
                            <th min-width="100px">
                              <b>Action</b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAdmissionList?.map((item, idx) => (
                            <tr key={idx}>
                              <td className="text-dark">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  name="gg"
                                  checked={selectedIds.find(i => i === item.admissionId) || false}
                                  onChange={(e) => {
                                    checkSingleItem(
                                      e.target.checked,
                                      item.admissionId,
                                      adminAdmissionList
                                    );
                                  }}

                                />
                              </td>
                              <td className="text-dark">
                                {
                                  idx + 1
                                }
                              </td>
                              <td className="text-uppercase">
                                <b>{item.firstname} {item.middlename} {item.lastname}</b>
                              </td>
                              <td className="text-uppercase">
                                <b>{item.examStatus === 0 ? <span className="badge bg-warning">Pending</span> :
                                  item.examStatus === 1 ? <span className="badge bg-primary">Passed</span> :
                                    <span className="badge bg-danger">Failed</span>
                                }
                                </b>
                              </td>
                              <td className="text-uppercase">
                                <b>{item.candidateAdmissionStatus === 0 ? <span className="badge bg-warning">Pending</span> :
                                  item.candidateAdmissionStatus === 1 ? <span className="badge bg-success">Approved</span> :
                                    <span className="badge bg-danger">Rejected</span>
                                }
                                </b>
                              </td>
                              <td>
                                <b>{item.className}</b>
                              </td>
                              <td>
                                <div className="flex align-items-center list-user-action">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        Candidate Details
                                      </Tooltip>
                                    }
                                  >
                                    <Link
                                      className="btn btn-sm btn-icon btn-success"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Details"
                                      to={`${adminAdmissionLocations.adminAdmissionDetail}?admissionId=${item.admissionId}`}
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

                                  {item.examinationId === "" ?
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id="button-tooltip-2">
                                          No Exam for candidate please import from CBT
                                        </Tooltip>
                                      }
                                    >
                                      <a
                                        className="btn btn-sm btn-icon btn-warning"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Details"
                                        href={`${clientUrl}examiner-dashboard/view-result-sms?examinationId=${item.examinationId}`}
                                        target="_blank" rel="noopener noreferrer"
                                        onClick={handleClick}
                                      >
                                        <span className="btn-inner">
                                          <svg xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="16" fill="currentColor"
                                            className="bi bi-info-circle"
                                            viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                          </svg>
                                        </span>
                                      </a>
                                    </OverlayTrigger>

                                    :

                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id="button-tooltip-2">
                                          View CBT Exam Details
                                        </Tooltip>
                                      }
                                    >
                                      <a
                                        className="btn btn-sm btn-icon btn-primary"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Details"
                                        href={`${clientUrl}login-option/login-from-smp?examinationId=${item.examinationId}&taxId=${cbtToken}&target=resultDetails&candidateEmail=${item.email}&candidateId=${""}`}
                                        target="_blank" rel="noopener noreferrer"
                                      >
                                        <span className="btn-inner">
                                          <svg xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="16" fill="currentColor"
                                            className="bi bi-info-circle"
                                            viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                          </svg>
                                        </span>
                                      </a>
                                    </OverlayTrigger>

                                  }

                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <PaginationFilter filterProps={filterProps} action={fetchAllAdminAdmissionList} dispatch={dispatch} />
                  </Card.Footer>
                </Card>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdmissionList;

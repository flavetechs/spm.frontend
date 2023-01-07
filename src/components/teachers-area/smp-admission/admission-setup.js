import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../Card";
import PaginationFilter from "../../partials/components/pagination-filter";
import { fetchAllAdminAdmissionList, pushId, removeId, returnList } from "../../../store/actions/admin-admission-actions";
import { adminAdmissionLocations } from "../../../router/spm-path-locations";
import { AdminAdmissionModal } from "./admin-admission-modal";
import { showHideModal } from "../../../store/actions/toaster-actions";
import { Field, Formik } from "formik";
import { AdmissionEnrolModal } from "./admission-enroll-modal";


const AdmissionList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectModal, setSelectModal] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { filterProps, adminAdmissionList, selectedIds } = state.adminAdmission;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    fetchAllAdminAdmissionList(1)(dispatch);
  }, [dispatch]);

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


  let classesnow = [
    { name: "JSS1" },
    { name: "JSS2" },
    { name: "JSS3" },
  ]

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Formik
              initialValues={{
                // sessionClassSubjectId: sessionClassSubjectIdQuery ? sessionClassSubjectIdQuery : "",
              }}
              enableReinitialize={true}
              onSubmit={(values) => {
                // getAllClassStudents(sessionClassIdQuery)(dispatch);
                // history.push(
                //   `${classLocations.addClassGroup}?sessionClassId=${sessionClassIdQuery}&sessionClassSubjectId=${values.sessionClassSubjectId}`
                // );
              }}
            >
              {({
                handleSubmit,
                setFieldValue,
                values,
                touched,
                errors,
              }) => (
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
                      <div className="d-flex justify-content-between">
                        <Field
                          as="select"
                          name="candidateClass"
                          className="form-select me-2"
                          id="terms"
                        // onChange={(e) => {
                        //   setFieldValue("terms", e.target.value);
                        //   history.push(`${classLocations.classAttendanceBoard}?termId=${e.target.value}&sessionClassId=${""}`);
                        // }}

                        >
                          <option value="">Select Class</option>
                          {
                            classesnow?.map((term, id) => (
                              <option
                                key={id}
                              // name={values.terms}
                              // value={term.sessionTermId}
                              // defaultChecked={termIdQuery === values.terms}
                              >
                                {term.name}
                              </option>
                            ))
                          }
                        </Field>
                        {" "}
                        <Field
                          as="select"
                          name="sessionClass"
                          className="form-select me-3 mx-2 mt-3 mt-lg-0 dropdown"
                          id="terms"
                        // onChange={(e) => {
                        //   setFieldValue("terms", e.target.value);
                        //   history.push(`${classLocations.classAttendanceBoard}?termId=${e.target.value}&sessionClassId=${""}`);
                        // }}
                        >
                          <option value="">Select Status</option>
                          {['Passed', 'Failed',]?.map((term, id) => (
                            <option
                              key={id}
                            // name={values.terms}
                            // value={term.sessionTermId}
                            // defaultChecked={termIdQuery === values.terms}
                            >
                              {term}
                            </option>
                          ))
                          }
                        </Field>
                      </div>
                    </div>
                    <div>
                      <div className="d-flex justify-content-end">


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
                            <span>Export</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {selectModal == "export-modal" ?
                    <AdminAdmissionModal /> :
                    <AdmissionEnrolModal />
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
                                        Admission Details
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
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        Exam Details
                                      </Tooltip>
                                    }
                                  >
                                    <Link
                                      className="btn btn-sm btn-icon btn-primary"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Details"
                                      to="#"
                                    // to={`${adminAdmissionLocations.adminAdmissionDetail}?admissionId=${item.admissionId}`}
                                    >
                                      <span className="btn-inner">
                                        {/* <svg
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
                                        </svg> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                        </svg>
                                      </span>
                                    </Link>
                                  </OverlayTrigger>{" "}
                                  {/* <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        Approve student
                                      </Tooltip>
                                    }
                                  >
                                    <Link
                                      className="btn btn-sm btn-icon btn-primary"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Delete"
                                      to="#"
                                    >
                                      <span className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send-check" viewBox="0 0 16 16">
                                          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                          <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                        </svg>
                                      </span>
                                    </Link>
                                  </OverlayTrigger> */}
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

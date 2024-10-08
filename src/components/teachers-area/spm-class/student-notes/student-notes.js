import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getStudentNotesByTeacher,
} from "../../../../store/actions/class-actions";
import * as Yup from "yup";
import { classLocations } from "../../../../router/spm-path-locations";
import { getStaffClassSubjects } from "../../../../store/actions/results-actions";
import { PaginationFilter3 } from "../../../partials/components/pagination-filter";

const StudentNotes = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [indexRow, setIndexRow] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const { studentNotesByTeacher,filterProps } = state.class;
  const { staffClassSubjects } = state.results;
  const queryParams = new URLSearchParams(locations.search);
  const subjectIdQuery = queryParams.get("subjectId") || "";
  const sessionClassIdQuery = queryParams.get("sessionClassId") || "";
  const statusQuery = queryParams.get("status") || -2;
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION
  const validation = Yup.object().shape({
    // status: Yup.string().required("Status is required"),
    subjectId: Yup.string().required("Subject is required"),
  });
  //VALIDATION

  React.useEffect(() => {
    sessionClassIdQuery && getStaffClassSubjects(sessionClassIdQuery)(dispatch);
  }, [sessionClassIdQuery, dispatch]);

  React.useEffect(() => {
    getStudentNotesByTeacher(sessionClassIdQuery, subjectIdQuery, statusQuery,1)(dispatch);
  }, [statusQuery, subjectIdQuery, dispatch, sessionClassIdQuery]);

  

  const filteredStudentNotes = studentNotesByTeacher?.filter((item) => {
    if (searchQuery === "") {
      //if query is empty
      return item;
    } else if (
      item.noteTitle.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      //returns filtered array
      return item;
    } else if (
      item.dateCreated.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      //returns filtered array
      return item;
    }
  });

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card className="bg-transparent">
              <Card.Header className="d-flex justify-content-between bg-transparent">
                <div className="header-title">
                  <h4 className="card-title mt-3 mb-n3">Student Notes</h4>
                </div>
                <div className=" d-flex align-items-center mt-3 mb-n3">
                  <div className="input-group search-input">
                    <span
                      className="input-group-text border-0 bg-transparent mb-3"
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
                        className="form-control text-lowercase "
                        placeholder="Search..."
                        onChange={(event) => setSearchQuery(event.target.value)}
                        onClick={() => {
                          setShowMenuDropdown(false);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Card.Header>

              <Formik
                initialValues={{
                  subjectId: subjectIdQuery ? subjectIdQuery : "",
                  status: statusQuery ? statusQuery : "",
                }}
                enableReinitialize={true}
                validationSchema={validation}
              >
                {({ handleSubmit, values, setFieldValue, touched, errors }) => (
                  <Card.Body>
                    <Card
                      onClick={() => {
                        setShowMenuDropdown(false);
                      }}
                    >
                      <Card.Body className="p-3">
                        <div className="d-md-flex justify-content-between mb-3">
                          <div className="mx-2 mt-3">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2"> back</Tooltip>
                              }
                            >
                              <svg
                                onClick={() => {
                                  history.push(
                                    classLocations.sessionClassList2
                                  );
                                }}
                                style={{ cursor: "pointer" }}
                                className=" text-primary"
                                width="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </OverlayTrigger>
                          </div>
                          <div className="d-md-flex ">
                            <div className=" mx-3 mt-3 mt-md-0 dropdown">
                              <div>
                                {errors.subjectId && (
                                  <div className="text-danger">
                                    {errors.subjectId}
                                  </div>
                                )}
                              </div>
                              <Field
                                as="select"
                                name="subjectId"
                                className="form-select"
                                id="subjectId"
                                onChange={(e) => {
                                  setSubjectId(e.target.value);
                                  e.target.value == ""
                                    ? history.push(classLocations.studentNotes)
                                    : history.push(
                                        `${classLocations.studentNotes}?sessionClassId=${sessionClassIdQuery}&subjectId=${e.target.value}`
                                      );
                                }}
                              >
                                <option value="">Select Subject</option>
                                {staffClassSubjects?.map((item, idx) => (
                                  <option key={idx} value={item.subjectId}>
                                    {item.subjectName}
                                  </option>
                                ))}
                              </Field>
                            </div>

                            <div className=" mx-3 mt-3 mt-md-0 dropdown">
                              <div>
                                {errors.status && (
                                  <div className="text-danger">
                                    {errors.status}
                                  </div>
                                )}
                              </div>
                              <Field
                                as="select"
                                name="status"
                                className="form-select"
                                id="status"
                                onChange={(e) => {
                                  setFieldValue("status", e.target.value);
                                  if (e.target.value !== "all") {
                                    history.push(
                                      `${classLocations.studentNotes}?sessionClassId=${sessionClassIdQuery}&subjectId=${subjectIdQuery}&status=${e.target.value}`
                                    );
                                  } else {
                                    // getStudentNotesByTeacher("")(dispatch);
                                    history.push( `${classLocations.studentNotes}?sessionClassId=${sessionClassIdQuery}&subjectId=${e.target.value}`);
                                  }
                                }}
                              >
                                <option value="">Select Status</option>
                                {/* {subjectId  ? ( */}
                                <>
                                  <option value="all">Select All</option>
                                  <option value="2">Pending</option>
                                  <option value="1">reviewed</option>
                                  <option value="3">unreviewed</option>
                                </>
                                {/* ):""} */}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    <Row className="">
                      {filteredStudentNotes?.map((item, idx) => (
                        <Col md="6" lg="4" xxl="3" className="" key={idx}>
                          <Card>
                            <Card.Body>
                              <div className="d-flex justify-content-between">
                                <div className="mb-0">Title</div>
                                <div className="dropdown show bg-light">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    style={{ cursor: "pointer" }}
                                    onClick={(e) => {
                                      setShowMenuDropdown(!showMenuDropdown);
                                      setIndexRow(idx);
                                    }}
                                  >
                                    <g>
                                      <g>
                                        <circle
                                          cx="7"
                                          cy="12"
                                          r="1"
                                          fill="black"
                                        ></circle>
                                        <circle
                                          cx="12"
                                          cy="12"
                                          r="1"
                                          fill="black"
                                        ></circle>
                                        <circle
                                          cx="17"
                                          cy="12"
                                          r="1"
                                          fill="black"
                                        ></circle>
                                      </g>
                                    </g>
                                  </svg>
                                  {showMenuDropdown && indexRow == idx && (
                                    <div
                                      x-placement="bottom-start"
                                      aria-labelledby=""
                                      className="dropdown-menu show"
                                      style={{
                                        position: "absolute",
                                        inset: "-25px auto auto -100px",
                                        transform: "translate(0px, 42px)",
                                      }}
                                      data-popper-placement="bottom-end"
                                      data-popper-escaped="false"
                                      data-popper-reference-hidden="false"
                                    >
                                      <div
                                        onClick={() => {
                                          history.push(
                                            `${classLocations.studentNotesDetails}?studentNoteId=${item.studentNoteId}`
                                          );
                                          setShowMenuDropdown(false);
                                        }}
                                        className="dropdown-item"
                                        role="button"
                                        draggable="true"
                                      >
                                        <svg
                                          width="20"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="me-2"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14.7366 2.76175H8.08455C6.00455 2.75375 4.29955 4.41075 4.25055 6.49075V17.3397C4.21555 19.3897 5.84855 21.0807 7.89955 21.1167C7.96055 21.1167 8.02255 21.1167 8.08455 21.1147H16.0726C18.1416 21.0937 19.8056 19.4087 19.8026 17.3397V8.03975L14.7366 2.76175Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>{" "}
                                          <path
                                            d="M14.4741 2.75V5.659C14.4741 7.079 15.6231 8.23 17.0431 8.234H19.7971"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>{" "}
                                          <path
                                            d="M14.2936 12.9141H9.39355"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>{" "}
                                          <path
                                            d="M11.8442 15.3639V10.4639"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        view/details
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <h6 className="mb-3 text-uppercase">
                                {item.noteTitle}
                              </h6>

                              <div className="d-flex justify-content-between">
                                <small className="" draggable="false">
                                  status:
                                  <div className="text-danger">
                                    {item.approvalStatusName}
                                  </div>
                                </small>
                                <small className="mx-2" draggable="false">
                                  date:
                                  <div className="text-success">
                                    {item.dateCreated}
                                  </div>
                                </small>
                              </div>
                            </Card.Body>
                            <div className="d-flex justify-content-between mx-2 p-0 mb-2 mt-n3 text-lowercase">
                            <small>{item.studentName}</small><small>{item.subjectName}</small>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                )}
              </Formik>
              <Card.Footer>
                <PaginationFilter3 filterProps={filterProps} action={ getStudentNotesByTeacher} dispatch={dispatch} param1={sessionClassIdQuery} param2={subjectIdQuery} param3={statusQuery}/>
                </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StudentNotes;

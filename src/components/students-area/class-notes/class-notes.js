import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getAllClassNotes,
  getAllStudentSubjects,
} from "../../../store/actions/class-actions";
import { getUserDetails } from "../../../utils/permissions";
import { classNoteLocations } from "../../../router/students-path-locations";
import { PaginationFilter1 } from "../../partials/components/pagination-filter";

const ClassNotes = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [indexRow, setIndexRow] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const { classNotes, studentSubjectList,filterProps } = state.class;
  var userDetail = getUserDetails();
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllStudentSubjects(userDetail.id)(dispatch);
  }, [dispatch, userDetail.id]);

  const queryParams = new URLSearchParams(locations.search);
  const subjectIdQuery = queryParams.get("subjectId");
  React.useEffect(() => {
    if (subjectIdQuery) {
      getAllClassNotes(subjectIdQuery,1)(dispatch);
    } else if (!subjectIdQuery) {
      getAllClassNotes("",1)(dispatch);
    }
  }, [subjectIdQuery, dispatch]);

  const filteredLessonNotes = classNotes?.filter((item) => {
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
                  <h4 className="card-title mt-3 mb-n3">Class Notes</h4>
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
                }}
                enableReinitialize={true}
                onSubmit={(values) => {
                  history.push(
                    `${classNoteLocations.createClassNotes}?subjectId=${values.subjectId}`
                  );
                }}
              >
                {({ handleSubmit, values, setFieldValue, touched, errors }) => (
                  <Card.Body>
                    <Card
                      onClick={() => {
                        setShowMenuDropdown(false);
                      }}
                    >
                      <Card.Body className="p-3">
                        <div className="d-xl-flex align-items-center justify-content-end flex-wrap">
                          <div className="d-xl-flex align-items-center flex-wrap">
                            <div className=" me-3 mt-3 mt-xl-0 dropdown">
                              <Field
                                as="select"
                                name="subjectId"
                                className="form-select"
                                id="subjectId"
                                onChange={(e) => {
                                  setFieldValue("subjectId", e.target.value);
                                  e.target.value === ""
                                    ? history.push(
                                        classNoteLocations.classNotes
                                      )
                                    : history.push(
                                        `${classNoteLocations.classNotes}?subjectId=${e.target.value}`
                                      );
                                }}
                              >
                                <option value="">Select Subject</option>
                                {studentSubjectList?.map((item, idx) => (
                                  <option key={idx} value={item.value}>
                                    {item.name}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    <Row className="">
                      {filteredLessonNotes?.map((item, idx) => (
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
                                  {showMenuDropdown && indexRow === idx && (
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
                                            `${classNoteLocations.classNotesDetails}?teacherClassNoteId=${item.teacherClassNoteId}`
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
                            <small className="d-flex justify-content-end mx-2 p-0 mb-2 mt-n3">
                              {item.subjectName}
                            </small>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                )}
              </Formik>
              <Card.Footer>
                <PaginationFilter1 filterProps={filterProps} action={getAllClassNotes} dispatch={dispatch} param1={subjectIdQuery}/>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassNotes;

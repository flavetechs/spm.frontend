import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { classLocations } from "../../../router/spm-path-locations";
import {
  deleteLessonNotes,
  getAllLessonNotes,
} from "../../../store/actions/class-actions";
import {
  getAllStaffClasses,
  getStaffClassSubjects,
} from "../../../store/actions/results-actions";
import {
  respondDialog,
  respondModal,
  showHideDialog,
  showHideModal,
} from "../../../store/actions/toaster-actions";
import { hasAccess, NavPermissions } from "../../../utils/permissions";
import { NoteShareModal } from "./note-share-modal";
import * as Yup from "yup";

const LessonNotes = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [indexRow, setIndexRow] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sessionClassId, setSessionClassId] = useState("");
  const [classNoteId, setClassNoteId] = useState("");
  const [teacherClassNoteId, setTeacherClassNoteId] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const { lessonNotes } = state.class;
  const { staffClasses, staffClassSubjects } = state.results;
  const { dialogResponse, modalResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATION
  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
    subjectId: Yup.string().required("Subject is required"),
  });
  //VALIDATION

  React.useEffect(() => {
    getAllStaffClasses()(dispatch);
  }, []);

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      deleteLessonNotes(teacherClassNoteId, subjectId)(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
      setShowMenuDropdown(false);
    }
    return () => {
      respondDialog("")(dispatch);
      setShowMenuDropdown(false);
    };
  }, [dialogResponse]);

  React.useEffect(() => {
    if (modalResponse == "cancel") {
      showHideModal(false)(dispatch);
    }
    return () => {
      respondModal("")(dispatch);
    };
  }, [modalResponse]);

  const queryParams = new URLSearchParams(locations.search);
  const subjectIdQuery = queryParams.get("subjectId");
  React.useEffect(() => {
    if (subjectIdQuery) {
      getAllLessonNotes(subjectId)(dispatch);
      setSubjectId(subjectIdQuery);
    }
  }, [subjectIdQuery]);

  React.useEffect(() => {
    if (!subjectIdQuery) {
      getAllLessonNotes(subjectId)(dispatch);
    }
  }, [subjectIdQuery]);

  const filteredLessonNotes = lessonNotes?.filter((item) => {
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

  console.log("lessonNote", lessonNotes);
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card className="bg-transparent">
              <Card.Header className="d-flex justify-content-between bg-transparent">
                <div className="header-title">
                  <h4 className="card-title mt-3">Lesson Notes</h4>
                </div>
              </Card.Header>
              <NoteShareModal classNoteId={classNoteId} />
              <Formik
                initialValues={{
                  sessionClassId: sessionClassId,
                  subjectId: "",
                }}
                enableReinitialize={true}
                validationSchema={validation}
                onSubmit={(values) => {
                  history.push(
                    `${classLocations.createLessonNotes}?classId=${values.sessionClassId}&subjectId=${values.subjectId}`
                  );
                }}
              >
                {({ handleSubmit, values, setFieldValue, touched, errors }) => (
                  <Card.Body className="px-0 bg-transparent">
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <div className="mb-md-0 mb-2 d-flex align-items-center">
                            <div className="input-group search-input">
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
                                  onChange={(event) =>
                                    setSearchQuery(event.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center flex-wrap">
                            <div className=" me-3 dropdown">
                              <div>
                                {touched.sessionClassId &&
                                  errors.sessionClassId && (
                                    <div className="text-danger">
                                      {errors.sessionClassId}
                                    </div>
                                  )}
                              </div>
                              <Field
                                as="select"
                                name="sessionClassId"
                                className="form-select"
                                id="sessionClassId"
                                onChange={(e) => {
                                  setFieldValue(
                                    "sessionClassId",
                                    e.target.value
                                  );
                                  setSessionClassId(e.target.value);
                                  getStaffClassSubjects(e.target.value)(
                                    dispatch
                                  );
                                }}
                              >
                                <option value="">Select Class</option>
                                {staffClasses?.map((item, idx) => (
                                  <option key={idx} value={item.sessionClassId}>
                                    {item.sessionClass}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            <div className=" me-3 dropdown">
                              <div>
                                {touched.subjectId && errors.subjectId && (
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
                                  setFieldValue("subjectId", e.target.value);
                                  setSubjectId(e.target.value);
                                  e.target.value == ""
                                    ? history.push(classLocations.lessonNotes)
                                    : history.push(
                                        `${classLocations.lessonNotes}?subjectId=${e.target.value}`
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
                            <div className="text-body me-3 align-items-center d-flex">
                              <button
                                type="button"
                                onClick={() => {
                                  handleSubmit();
                                }}
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
                                <span>Create Notes</span>
                              </button>
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
                                <div className="mb-0">Topic</div>
                                <div className="dropdown show">
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
                                            `${classLocations.lessonNotesDetails}?teacherClassNoteId=${item.teacherClassNoteId}`
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
                                      <div
                                        onClick={() => {
                                          history.push(
                                            `${classLocations.editLessonNotes}?teacherClassNoteId=${item.teacherClassNoteId}`
                                          );
                                          setShowMenuDropdown(false);
                                        }}
                                        className="dropdown-item"
                                        role="button"
                                        draggable="false"
                                      >
                                        <svg
                                          width="20"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="me-2"
                                        >
                                          <path
                                            d="M13.7476 20.4428H21.0002"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M11.021 6.00098L16.4732 10.1881"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        edit
                                      </div>

                                      <div
                                        onClick={() => {
                                          showHideModal(true)(dispatch);
                                          setShowMenuDropdown(false);
                                          setClassNoteId(item.classNoteId);
                                        }}
                                        className="dropdown-item"
                                        role="button"
                                        draggable="true"
                                      >
                                        <svg
                                          className="icon-32 me-2"
                                          width="20"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M15.8325 8.17463L10.109 13.9592L3.59944 9.88767C2.66675 9.30414 2.86077 7.88744 3.91572 7.57893L19.3712 3.05277C20.3373 2.76963 21.2326 3.67283 20.9456 4.642L16.3731 20.0868C16.0598 21.1432 14.6512 21.332 14.0732 20.3953L10.106 13.9602"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        share
                                      </div>

                                      <div
                                        onClick={() => {
                                          setTeacherClassNoteId(
                                            item.teacherClassNoteId
                                          );
                                          showHideDialog(
                                            true,
                                            "Are you sure you want to delete this note"
                                          )(dispatch);
                                        }}
                                        className="dropdown-item"
                                        role="button"
                                        draggable="false"
                                      >
                                        <svg
                                          width="20"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="me-2"
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
                                        delete
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <h6 className="mb-3 text-uppercase">
                                {item.noteTitle}
                              </h6>

                              <div className="d-flex">
                                <div className="" draggable="false">
                                  Approval:
                                  <div className="text-danger">
                                    {item.approvalStatusName}
                                  </div>
                                </div>
                                <div className="mx-2" draggable="false">
                                  Created:
                                  <div className="text-success">
                                    {item.dateCreated}
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                            <span className="remove"></span>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                )}
              </Formik>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LessonNotes;
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { classLocations, lessonNoteLocations } from "../../../../router/spm-path-locations";
import {
  deleteLessonNotes,
  downloadLessonNote,
  getAllLessonNotes,
} from "../../../../store/actions/class-actions";
import {
  getAllStaffClasses,
  getStaffClassSubjectByClassLookup,
} from "../../../../store/actions/results-actions";
import {
  respondDialog,
  respondModal,
  showErrorToast,
  showHideDialog,
  showHideModal,
} from "../../../../store/actions/toaster-actions";
import {
  getUserDetails,
  hasAccess,
  NavPermissions,
} from "../../../../utils/permissions";
import { NoteShareModal } from "./note-share-modal";
import { NoteSendModal } from "./note-send-modal";
import {
  getActiveSession,
  getAllSession,
} from "../../../../store/actions/session-actions";
import { PaginationFilter4 } from "../../../partials/components/pagination-filter";
import { saveAsFile } from "../../../../utils/downloaded-files";

const LessonNotes = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [indexRow, setIndexRow] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [classNoteId, setClassNoteId] = useState("");
  const [teacherClassNoteId, setTeacherClassNoteId] = useState("");
  const [shouldSendModal, setNoteSendModal] = useState(false);
  const [shouldShareModal, setNoteShareModal] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const { lessonNotes, filterProps,downloadedNote } = state.class;
  const { staffClasses, staffClassSubjects } = state.results;
  const { dialogResponse, modalResponse } = state.alert;
  const { activeSession, sessionList } = state.session;
  var userDetail = getUserDetails();
  // ACCESSING STATE FROM REDUX STORE
  const queryParams = new URLSearchParams(locations.search);
  const termIdQueryParam = queryParams.get("termId") || "";
  const subjectIdQueryParam = queryParams.get("subjectId") || "";
  const classIdQueryParam = queryParams.get("classId") || "";
  const sessionClassIdQueryParam = queryParams.get("sessionClassId") || "";
  const approvalStatusQueryParam = queryParams.get("approvalStatus") || "-1";

  React.useEffect(() => {
    getAllStaffClasses()(dispatch);
    getActiveSession()(dispatch);
    getAllSession(1)(dispatch);
  }, [dispatch]);

  
  React.useEffect(() => {
    if (queryParams == {}) {
   
    }
    const fetchNotes = () => {
      classIdQueryParam &&
        sessionClassIdQueryParam &&
        getStaffClassSubjectByClassLookup(
          classIdQueryParam,
          sessionClassIdQueryParam
        )(dispatch);

      getAllLessonNotes(
        classIdQueryParam,
        subjectIdQueryParam,
        approvalStatusQueryParam,
        termIdQueryParam,
        1
      )(dispatch);
    };
    fetchNotes();
  }, [
    approvalStatusQueryParam,
    subjectIdQueryParam,
    termIdQueryParam,
    classIdQueryParam,
    dispatch,
  ]);

  useEffect(() => {
    if (!termIdQueryParam && activeSession) {
      history.push(
        `${lessonNoteLocations.lessonNotes}?termId=${activeSession?.sessionTermId}`
      );
    }
  }, [activeSession, dispatch]);

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      deleteLessonNotes(
        teacherClassNoteId,
        subjectIdQueryParam,
        classIdQueryParam,
        approvalStatusQueryParam,
        termIdQueryParam
      )(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
      setShowMenuDropdown(false);
    }
    return () => {
      respondDialog("")(dispatch);
      showHideDialog(false, null)(dispatch);
      setShowMenuDropdown(false);
    };
  }, [dialogResponse, dispatch]);

  React.useEffect(() => {
    if (modalResponse === "cancel") {
      showHideModal(false)(dispatch);
    }
    return () => {
      respondModal("")(dispatch);
    };
  }, [modalResponse, dispatch]);

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

  useEffect(() => {
    downloadedNote && saveAsFile("lesson-note.pdf", downloadedNote)
 }, [downloadedNote]);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card className="bg-transparent">
              <Card.Header className="d-flex justify-content-between bg-transparent">
                <div className="header-title">
                  <h4 className="card-title mt-3 mb-n3">Lesson Notes</h4>
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
              {shouldShareModal && classNoteId && (
                <NoteShareModal
                  classNoteId={classNoteId}
                  setClassNoteId={setClassNoteId}
                  shouldShareModal={shouldShareModal}
                  setNoteShareModal={setNoteShareModal}
                />
              )}
              {shouldSendModal && teacherClassNoteId && (
                <NoteSendModal
                  setTeacherClassNoteId={setTeacherClassNoteId}
                  teacherClassNoteId={teacherClassNoteId}
                  setNoteSendModal={setNoteSendModal}
                  shouldSendModal={shouldSendModal}
                />
              )}
              <Formik
                initialValues={{
                  terms: termIdQueryParam,
                  classId: classIdQueryParam,
                  sessionClassId: sessionClassIdQueryParam,
                  subjectId: subjectIdQueryParam,
                  approvalStatus: approvalStatusQueryParam,
                }}
                enableReinitialize={true}
                //validationSchema={validation}
                onSubmit={(values) => {
                  history.push(
                    `${lessonNoteLocations.createLessonNotes}?classId=${values.classId}&sessionClassId=${values.sessionClassId}&subjectId=${values.subjectId}`
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
                              <div>
                                {touched.terms && errors.terms && (
                                  <div className="text-danger">
                                    {errors.terms}
                                  </div>
                                )}
                              </div>
                              <Field
                                as="select"
                                name="terms"
                                className="form-select"
                                id="terms"
                                onChange={(e) => {
                                  setFieldValue("terms", e.target.value);
                                  history.push(
                                    `${lessonNoteLocations.lessonNotes}?termId=${
                                      e.target.value
                                    }&classId=${""}&sessionClassId=${""}&subjectId=${""}&approvalStatus=${approvalStatusQueryParam}`
                                  );
                                }}
                              >
                                <option value="">Select Term</option>
                                {sessionList
                                  ?.find(
                                    (session, idx) =>
                                      session.sessionId.toLowerCase() ===
                                      activeSession?.sessionId
                                  )
                                  ?.terms.map((term, id) => (
                                    <option
                                      key={id}
                                      name={values.terms}
                                      value={term.sessionTermId.toLowerCase()}
                                      selected={
                                        term.sessionTermId === values.terms
                                      }
                                    >
                                      {term.termName}
                                    </option>
                                  ))}
                              </Field>
                            </div>
                            <div className=" me-3 mt-3 mt-xl-0 dropdown">
                              <div>
                                {touched.classId && errors.classId && (
                                  <div className="text-danger">
                                    {errors.classId}
                                  </div>
                                )}
                              </div>
                              <Field
                                as="select"
                                name="classId"
                                className="form-select"
                                disabled={termIdQueryParam ? false : true}
                                id="classId"
                                onChange={(e) => {
                                  setFieldValue("classId", e.target.value);
                                  const sessionClassId = staffClasses?.find(
                                    (x) => x.classId === e.target.value
                                  )?.sessionClassId;
                                  if (e.target.value) {
                                    setFieldValue(
                                      "sessionClassId",
                                      sessionClassId
                                    );
                                  }
                                  history.push(
                                    `${
                                      lessonNoteLocations.lessonNotes
                                    }?termId=${termIdQueryParam}&classId=${
                                      e.target.value
                                    }&sessionClassId=${sessionClassId}&subjectId=${""}&approvalStatus=${approvalStatusQueryParam}`
                                  );
                                  // }
                                }}
                              >
                                <option value="">Select Class</option>
                                {staffClasses?.map((item, idx) => (
                                  <option key={idx} value={item.classId}>
                                    {item.sessionClass}
                                  </option>
                                ))}
                              </Field>
                            </div>
                            <div className=" me-3 mt-3 mt-xl-0 dropdown">
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
                                disabled={classIdQueryParam ? false : true}
                                className="form-select"
                                id="subjectId"
                                onChange={(e) => {
                                  setFieldValue("subjectId", e.target.value);
                                  setSubjectId(e.target.value);
                                  history.push(
                                    `${lessonNoteLocations.lessonNotes}?termId=${termIdQueryParam}&classId=${classIdQueryParam}&sessionClassId=${sessionClassIdQueryParam}&subjectId=${e.target.value}&approvalStatus=${approvalStatusQueryParam}`
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
                            <div className=" me-3 mt-3 mt-xl-0 dropdown">
                              <Field
                                as="select"
                                name="approvalStatus"
                                //disabled={subjectIdQueryParam ? false : true}
                                className="form-select"
                                id="approvalStatus"
                                onChange={(e) => {
                                  setFieldValue(
                                    "approvalStatus",
                                    e.target.value
                                  );
                                  history.push(
                                    `${lessonNoteLocations.lessonNotes}?termId=${termIdQueryParam}&classId=${classIdQueryParam}&sessionClassId=${sessionClassIdQueryParam}&subjectId=${subjectIdQueryParam}&approvalStatus=${e.target.value}`
                                  );
                                }}
                              >
                                <option value="">Select Status</option>
                                {/* {subjectId  ? ( */}
                                <>
                                  <option value="0">Not Approved</option>
                                  <option value="1">Approved</option>
                                  <option value="2">Saved</option>
                                  <option value="3">In progress</option>
                                  {hasAccess(
                                    NavPermissions.reviewLessonNote
                                  ) && <option value="-2">Unreviewed</option>}
                                </>
                                {/* ):""} */}
                              </Field>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                if (!classIdQueryParam) {
                                  showErrorToast("Class is required")(dispatch);
                                  return;
                                }
                                if (!subjectIdQueryParam) {
                                  showErrorToast("Subject is required")(
                                    dispatch
                                  );
                                  return;
                                } else {
                                  handleSubmit();
                                }
                              }}
                              className="text-center btn-primary btn-icon me-3  mt-3 mt-xl-0 btn btn-primary"
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
                      </Card.Body>
                    </Card>
                    <Row className="">
                      {filteredLessonNotes?.map((item, idx) => (
                        <Col md="6" lg="4" xxl="6" className="" key={idx}>
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
                                            `${lessonNoteLocations.lessonNotesDetails}?teacherClassNoteId=${item.teacherClassNoteId}`
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

                                      {item.author ===
                                        userDetail?.userAccountId && (
                                        <div
                                          onClick={() => {
                                            history.push(
                                              `${lessonNoteLocations.editLessonNotes}?teacherClassNoteId=${item.teacherClassNoteId}`
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
                                      )}

                                      {item.author ==
                                        userDetail?.userAccountId && (
                                        <div
                                          onClick={() => {
                                            showHideModal(true)(dispatch);
                                            setShowMenuDropdown(false);
                                            setNoteSendModal(false);
                                            setNoteShareModal(true);
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
                                      )}

                                      <div
                                        onClick={() => {
                                          showHideModal(true)(dispatch);
                                          setShowMenuDropdown(false);
                                          setNoteSendModal(true);
                                          setNoteShareModal(false);
                                          setTeacherClassNoteId(
                                            item.teacherClassNoteId
                                          );
                                        }}
                                        className="dropdown-item"
                                        role="button"
                                        draggable="true"
                                      >
                                        <svg
                                          width="20"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          className="me-2"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M15.016 7.38948V6.45648C15.016 4.42148 13.366 2.77148 11.331 2.77148H6.45597C4.42197 2.77148 2.77197 4.42148 2.77197 6.45648V17.5865C2.77197 19.6215 4.42197 21.2715 6.45597 21.2715H11.341C13.37 21.2715 15.016 19.6265 15.016 17.5975V16.6545"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M21.8096 12.0215H9.76855"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M18.8813 9.1062L21.8093 12.0212L18.8813 14.9372"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        send
                                      </div>

                                      <div
                                        onClick={() => {
                                          setShowMenuDropdown(false);
                                          downloadLessonNote(item.classNoteId)(dispatch);
                                          getAllLessonNotes(
                                            classIdQueryParam,
                                            subjectIdQueryParam,
                                            approvalStatusQueryParam,
                                            termIdQueryParam,
                                            1
                                          )(dispatch);
                                        }}
                                        className="dropdown-item"
                                        role="button"
                                        draggable="false"
                                      >
                                        <svg
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          viewBox="0 0 24 24"
                                          className="me-2"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M14.7369 2.76175H8.08489C6.00489 2.75375 4.30089 4.41075 4.25089 6.49075V17.2277C4.20589 19.3297 5.87389 21.0697 7.97489 21.1147C8.01189 21.1147 8.04889 21.1157 8.08489 21.1147H16.0729C18.1629 21.0407 19.8149 19.3187 19.8029 17.2277V8.03775L14.7369 2.76175Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M14.4751 2.75V5.659C14.4751 7.079 15.6241 8.23 17.0441 8.234H19.7981"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M11.6421 15.9497V9.90869"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                          <path
                                            d="M9.29639 13.5942L11.6414 15.9492L13.9864 13.5942"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                        download
                                      </div>

                                      <div
                                        onClick={() => {
                                          setShowMenuDropdown(false);
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
                <PaginationFilter4
                  filterProps={filterProps}
                  action={getAllLessonNotes}
                  dispatch={dispatch}
                  param1={classIdQueryParam}
                  param2={subjectIdQueryParam}
                  param3={approvalStatusQueryParam}
                  param4={termIdQueryParam}
                />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LessonNotes;

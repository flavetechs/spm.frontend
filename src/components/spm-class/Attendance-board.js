import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { classLocations } from "../../router/spm-path-locations";
import {
  continueClassRegister,
  createRegister,
  deleteClassRegister,
  getAllClassRegister,
  getAllSessionClasses,
  getAllStudentsAbsent,
  getAllStudentsPresent,
  updateRegisterLabel,
} from "../../store/actions/class-actions";
import { getActiveSession } from "../../store/actions/session-actions";
import {
  respondDialog,
  showHideDialog,
} from "../../store/actions/toaster-actions";

const AttendanceBoard = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [indexRow, setIndexRow] = useState("");
  const [query, setQuery] = useState("");
  const [classRegisterId, setClassRegisterId] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const {
    itemList: classList,
    classRegister,
    createSuccessful,
    newClassRegister,
    registerLabelUpdateSuccessful,
  } = state.class;
  const { activeSession } = state.session;
  const { dialogResponse } = state.alert;
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const [sessionClassId, setSessionClassId] = useState(sessionClassIdQuery);
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getActiveSession()(dispatch);
  }, []);

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      deleteClassRegister(classRegisterId, sessionClassId)(dispatch);
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
    getAllSessionClasses(activeSession?.sessionId)(dispatch);
  }, [activeSession]);

  React.useEffect(() => {
    if (!sessionClassId && classList.length != 0) {
      setSessionClassId(classList[0]?.sessionClassId);
      getAllClassRegister(sessionClassId)(dispatch);
    } else {
      getAllClassRegister(sessionClassId)(dispatch);
    }
    if (registerLabelUpdateSuccessful) {
      setEditMode(false);
    }
    history.push(
      `${classLocations.classAttendanceBoard}?sessionClassId=${sessionClassId}`
    );
  }, [classList, sessionClassId, registerLabelUpdateSuccessful]);

  const filteredClassRegister = classRegister.filter((register) => {
    if (query === "") {
      //if query is empty
      return register;
    } else if (
      register.classRegisterLabel.toLowerCase().includes(query.toLowerCase())
    ) {
      //returns filtered array
      return register;
    } else if (register.dateTime.toLowerCase().includes(query.toLowerCase())) {
      //returns filtered array
      return register;
    }
  });
  if (createSuccessful) {
    history.push(
      `${classLocations.classAttendance}?classRegisterId=${newClassRegister?.classRegisterId}`
    );
  }
  
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card className="bg-transparent">
              <Card.Header className="d-flex justify-content-between bg-transparent">
                <div className="header-title">
                  <h4 className="card-title mt-3">Attendance Board</h4>
                </div>
              </Card.Header>
              <Formik
                initialValues={{
                  sessionClassId: sessionClassId,
                }}
                enableReinitialize={true}
                onSubmit={(values) => {
                  createRegister(values)(dispatch);
                }}
              >
                {({ handleSubmit, values, setFieldValue, touched, errors }) => (
                  <Card.Body className="px-0 bg-transparent">
                    <Card>
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between flex-wrap">
                          <p className="mb-md-0 mb-2 d-flex align-items-center">
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
                                    setQuery(event.target.value)
                                  }
                                />
                              </div>
                            </div>
                          </p>
                          <div className="d-flex align-items-center flex-wrap">
                            <div className=" me-3 dropdown">
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
                                  history.push(
                                    `${classLocations.classAttendanceBoard}?sessionClassId=${e.target.value}`
                                  );
                                }}
                              >
                                <option value="">Select Class</option>
                                {classList.map((item, idx) => (
                                  <option key={idx} value={item.sessionClassId}>
                                    {item.class}
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
                                <span>Add Attendance</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    <Row className="">
                      {filteredClassRegister.map((register, idx) => (
                        <Col md="6" lg="4" xl="3" className="">
                          <Card>
                            <Card.Body>
                              <div className="d-flex justify-content-between">
                                <div className="mb-0">Title</div>
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
                                          continueClassRegister(
                                            register.classRegisterId
                                          )(dispatch);
                                          history.push(
                                            `${classLocations.classAttendance}?classRegisterId=${register.classRegisterId}`
                                          );
                                          setShowMenuDropdown(false);
                                        }}
                                        className={
                                          Number(
                                            register.dateTime.split("-")[0]
                                          ) != new Date().getDate()
                                            ? "dropdown-item disabled"
                                            : "dropdown-item"
                                        }
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
                                        Continue
                                      </div>
                                      <div
                                        onClick={() => {
                                          setIndexRow(idx);
                                          setEditMode(!isEditMode);
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
                                        Rename
                                      </div>
                                      <div
                                        onClick={() => {
                                          setClassRegisterId(
                                            register.classRegisterId
                                          );
                                          showHideDialog(
                                            true,
                                            "Are you sure you want to delete class register"
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
                                        Delete
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {!isEditMode ? (
                                <h6 className="mb-3">
                                  {register.classRegisterLabel}
                                </h6>
                              ) : indexRow == idx ? (
                                <input
                                  type="text"
                                  name="classRegisterLabel"
                                  defaultValue={register.classRegisterLabel}
                                  onBlur={(e) => {
                                    updateRegisterLabel(
                                      register.classRegisterId,
                                      e.target.value
                                    )(dispatch);
                                  }}
                                  onKeyUp={(e) => {
                                    e &&
                                      e.keyCode == 13 &&
                                      updateRegisterLabel(
                                        register.classRegisterId,
                                        e.target.value
                                      )(dispatch);
                                  }}
                                />
                              ) : (
                                <h6 className="mb-3">
                                  {register.classRegisterLabel}
                                </h6>
                              )}
                              <div className="d-flex align-items-center mb-3">
                                <div>
                                  <div>Present</div>
                                  <div
                                    className="btn btn-icon btn-soft-light me-2 d-flex justify-content-center"
                                    onClick={() => {
                                      history.push(
                                        `${classLocations.attendancePresence}?classRegisterIdForPresent=${register.classRegisterId}`
                                      );
                                      getAllStudentsPresent(
                                        register.classRegisterId
                                      )(dispatch);
                                    }}
                                  >
                                    <div className="btn-inner">
                                      {register.totalStudentPresent}
                                    </div>
                                  </div>
                                </div>
                                <div className="px-3">
                                  <div>Absent</div>
                                  <div
                                    className="btn btn-icon btn-soft-light me-2 d-flex justify-content-center"
                                    onClick={() => {
                                      history.push(
                                        `${classLocations.attendancePresence}?classRegisterIdForAbsent=${register.classRegisterId}`
                                      );
                                      getAllStudentsAbsent(
                                        register.classRegisterId
                                      )(dispatch);
                                    }}
                                  >
                                    <div className="btn-inner">
                                      {register.totalStudentAbsent}
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-center">
                                    All Students
                                  </div>
                                  <div
                                    className="btn btn-icon btn-soft-light me-2 d-flex justify-content-center"
                                    style={{ cursor: "default" }}
                                  >
                                    <div className="btn-inner">
                                      {register.totalStudentInClass}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="" draggable="false">
                                  <div className="text-success">
                                    {register.dateTime.split(" ")[0]}
                                  </div>
                                </div>
                                <div className="px-2" draggable="false">
                                  <div className=" text-warning">
                                    {register.dateTime.split(" ")[1]}
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                            <span className="remove"></span>
                          </Card>
                        </Col>
                      ))}{" "}
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

export default AttendanceBoard;

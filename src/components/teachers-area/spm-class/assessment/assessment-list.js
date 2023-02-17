import { Field, Formik } from "formik";
import { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  classLocations,
  inprogress,
} from "../../../../router/spm-path-locations";
import {
  addClassAssessment,
  deleteClassAssessment,
  deleteHomeAssessment,
  getAllClassAssessment,
  getAllClassGroup,
  getAllHomeAssessment,
  getClassSubjects,
} from "../../../../store/actions/class-actions";
import { getAllStaffClasses } from "../../../../store/actions/results-actions";
import {
  respondDialog,
  showErrorToast,
  showHideDialog,
} from "../../../../store/actions/toaster-actions";
import { HomeAssessmentList } from "./home-assement-list";
import { ClassAssessmentList } from "./class-assessment-list";
import { PaginationFilter2, PaginationFilter3 } from "../../../partials/components/pagination-filter";

const AssessmentList = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [indexRow, setIndexRow] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [homeAssessmentId, setHomeAssessmentId] = useState("");
  const [classAssessmentId, setClassAssessmentId] = useState("");
  const [selectedSessionClassSubjectId, setSelectedSessionClassSubjectId] =
    useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const {
    assessmentList,
    classSubjects,
    groupList,
    createSuccessful,
    newClassAssessment,
    filterProps,
  } = state.class;
  const { staffClasses } = state.results;
  const { dialogResponse } = state.alert;

  // ACCESSING STATE FROM REDUX STORE
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQueryParam = queryParams.get("sessionClassId") || "";
  const sessionClassSubjectIdQueryParam =
    queryParams.get("sessionClassSubjectId") || "";
  const groupIdQueryParam = queryParams.get("groupId") || "";
  const typeQueryParam = queryParams.get("type") || "";
  useEffect(() => {
    getAllStaffClasses()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const fetchAssessment = () => {
      if (sessionClassIdQueryParam) {
        getClassSubjects(sessionClassIdQueryParam)(dispatch);
      }

      if (
        sessionClassSubjectIdQueryParam &&
        typeQueryParam === "home-assessment"
      ) {
        getAllClassGroup(
          sessionClassIdQueryParam,
          sessionClassSubjectIdQueryParam
        )(dispatch);
      }

      if (typeQueryParam === "home-assessment")
        getAllHomeAssessment(
          sessionClassIdQueryParam,
          sessionClassSubjectIdQueryParam,
          groupIdQueryParam,
          1
        )(dispatch);
      if (typeQueryParam === "class-assessment")
        getAllClassAssessment(
          sessionClassIdQueryParam,
          sessionClassSubjectIdQueryParam,
          1
        )(dispatch);
    };

    fetchAssessment();
  }, [
    sessionClassIdQueryParam,
    sessionClassSubjectIdQueryParam,
    groupIdQueryParam,
    typeQueryParam,
  ]);
  useEffect(() => {
    if (dialogResponse === "continue") {
      typeQueryParam === "home-assessment"
        ? deleteHomeAssessment(
            homeAssessmentId,
            sessionClassIdQueryParam,
            selectedSessionClassSubjectId,
            groupIdQueryParam
          )(dispatch)
        : deleteClassAssessment(
            classAssessmentId,
            selectedSessionClassSubjectId,
            sessionClassIdQueryParam
          )(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
      setShowMenuDropdown(false);
    }
    return () => {
      respondDialog("")(dispatch);
      setShowMenuDropdown(false);
    };
  }, [
    dialogResponse,
    classAssessmentId,
    homeAssessmentId,
    typeQueryParam,
    selectedSessionClassSubjectId,
  ]);

  useEffect(() => {
    createSuccessful && newClassAssessment?.classAssessmentId &&
      history.push(
        `${classLocations.editClassAssessment}?classAssessmentId=${newClassAssessment?.classAssessmentId}&sessionClassSubjectId=${sessionClassSubjectIdQueryParam}&sessionClassId=${sessionClassIdQueryParam}&type=${typeQueryParam}`
      );
  }, [
    createSuccessful,
    newClassAssessment?.classAssessmentId,
    sessionClassSubjectIdQueryParam,
    sessionClassIdQueryParam,
    typeQueryParam,
  ]);

  const filteredAssessmentList = assessmentList?.filter((item) => {
    if (searchQuery === "") {
      //if query is empty
      return item;
    } else if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      //returns filtered array
      return item;
    }
  });

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Formik
              initialValues={{
                sessionClassId: sessionClassIdQueryParam,
                sessionClassSubjectId: sessionClassSubjectIdQueryParam,
                groupId: groupIdQueryParam,
                type: typeQueryParam,
              }}
              enableReinitialize={true}
              onSubmit={(values) => {
                if (!typeQueryParam) {
                  showErrorToast("Assessment Type is required")(dispatch);
                  return;
                }
                if (!sessionClassIdQueryParam) {
                  showErrorToast("Class is required")(dispatch);
                  return;
                }
                if (!sessionClassSubjectIdQueryParam) {
                  showErrorToast("Subject is required")(dispatch);
                  return;
                }
                if (!groupIdQueryParam && typeQueryParam === "home-assessment") {
                  showErrorToast("Please select a group of students")(dispatch);
                  return;
                }
                else {
                  if (typeQueryParam === "home-assessment") {
                    history.push(
                      `${classLocations.createHomeAssessment}?sessionClassSubjectId=${sessionClassSubjectIdQueryParam}&sessionClassId=${sessionClassIdQueryParam}&sessionClassGroupId=${groupIdQueryParam}&type=${typeQueryParam}`
                    );
                  } else if (typeQueryParam === "class-assessment") {
                    addClassAssessment(sessionClassSubjectIdQueryParam)(
                      dispatch
                    );
                  }
                }
              }}
            >
              {({ handleSubmit, values, setFieldValue, errors, touched }) => (
                <Card className="bg-transparent">
                  <Card.Header
                    className="d-flex justify-content-between bg-transparent"
                    onClick={() => {
                      setShowMenuDropdown(false);
                    }}
                  >
                    <div className="header-title">
                      <h4 className="card-title mt-4">Assessment Board</h4>
                    </div>
                    <div className="d-flex align-items-center mt-3 mb-n3">
                      <div className=" d-flex">
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
                              onChange={(event) =>
                                setSearchQuery(event.target.value)
                              }
                              onClick={() => {
                                setShowMenuDropdown(false);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-body mx-2 mt-n1">
                        <button
                          type="button"
                          onClick={() => {
                            handleSubmit();
                          }}
                          className="btn btn-primary btn-icon  mt-lg-0 mt-2 "
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
                          <span>Create Assessment</span>
                        </button>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body className="px-0 bg-transparent">
                    <Card
                      onClick={() => {
                        setShowMenuDropdown(false);
                      }}
                    >
                      <Card.Body>
                        <div className="d-lg-flex align-items-center ">
                          <div className=" d-lg-flex align-items-center">
                            <div>
                              <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
                                <Field
                                  as="select"
                                  name="type"
                                  className="form-select"
                                  id="type"
                                  onChange={(e) => {
                                    setFieldValue("type", e.target.value);
                                    e.target.value === "cbt"
                                      ? history.push(`${classLocations.cbtAssessmentList}?sessionClassId=${sessionClassIdQueryParam}&sessionClassSubjectId=${""}&groupId=${""}&type=${e.target.value}`)
                                      : history.push(`${classLocations.assessment}?sessionClassId=${""}&sessionClassSubjectId=${""}&groupId=${""}&type=${e.target.value}`);
                                  }}
                                >
                                  <option value="">Select Type</option>
                                  <option value="home-assessment">
                                    Home Assessment
                                  </option>
                                  <option value="class-assessment">
                                    Class Assessment
                                  </option>
                                  <option value="cbt">CBT</option>
                                </Field>
                              </div>
                            </div>
                            <div>
                              <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
                                <Field
                                  disabled={typeQueryParam ? false : true}
                                  as="select"
                                  name="sessionClassId"
                                  className="form-select"
                                  id="sessionClassId"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "sessionClassId",
                                      e.target.value
                                    );

                                    e.target.value === "cbt"
                                      ? history.push(inprogress.unactivated)
                                      : history.push(
                                          `${
                                            classLocations.assessment
                                          }?sessionClassId=${
                                            e.target.value
                                          }&sessionClassSubjectId=${""}&groupId=${""}&type=${typeQueryParam}`
                                        );
                                  }}
                                >
                                  <option value="">Select Class</option>
                                  {staffClasses?.map((item, idx) => (
                                    <option
                                      key={idx}
                                      value={item.sessionClassId}
                                    >
                                      {item.sessionClass}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </div>
                            <div>
                              <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
                                <Field
                                  as="select"
                                  disabled={
                                    typeQueryParam && sessionClassIdQueryParam
                                      ? false
                                      : true
                                  }
                                  name="sessionClassSubjectId"
                                  className="form-select"
                                  id="sessionClassSubjectId"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "sessionClassSubjectId",
                                      e.target.value
                                    );
                                    setSelectedSessionClassSubjectId(
                                      e.target.value
                                    );
                                    e.target.value === "cbt"
                                      ? history.push(inprogress.unactivated)
                                      : history.push(
                                          `${
                                            classLocations.assessment
                                          }?sessionClassId=${sessionClassIdQueryParam}&sessionClassSubjectId=${
                                            e.target.value
                                          }&groupId=${""}&type=${typeQueryParam}`
                                        );
                                  }}
                                >
                                  <option value="">Select Subject</option>
                                  {classSubjects?.map((item, idx) => (
                                    <option
                                      key={idx}
                                      value={item.sessionClassSubjectId}
                                    >
                                      {item.subjectName}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </div>
                            <div>
                              <div
                                className=" me-3 mx-2 mt-3 mt-lg-0 dropdown"
                                style={{
                                  display:
                                    typeQueryParam === "class-assessment"
                                      ? "none"
                                      : "block",
                                }}
                              >
                                <Field
                                  as="select"
                                  name="groupId"
                                  disabled={
                                    typeQueryParam &&
                                    sessionClassIdQueryParam &&
                                    sessionClassSubjectIdQueryParam
                                      ? false
                                      : true
                                  }
                                  className="form-select"
                                  id="groupId"
                                  onChange={(e) => {
                                    setFieldValue("groupId", e.target.value);

                                    e.target.value === "cbt"
                                      ? history.push(inprogress.unactivated)
                                      : history.push(
                                          `${classLocations.assessment}?sessionClassId=${sessionClassIdQueryParam}&sessionClassSubjectId=${sessionClassSubjectIdQueryParam}&groupId=${e.target.value}&type=${typeQueryParam}`
                                        );
                                  }}
                                >
                                  <option value="">Select Group</option>
                                  <option value="all-students">
                                    All Students
                                  </option>
                                  {groupList?.map((item, idx) => (
                                    <option key={idx} value={item.groupId}>
                                      {item.groupName}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    <Row className="">
                      {filteredAssessmentList?.length === 0 &&
                      !sessionClassIdQueryParam ? (
                        <div className="jumbotron jumbotron-fluid">
                          <div className="container d-flex justify-content-center mt-5 bg-white">
                            <h2 className="display-4">
                              Please select inputs above to view Assessment List
                            </h2>
                          </div>
                        </div>
                      ) : (
                        filteredAssessmentList?.map((item, idx) =>
                          typeQueryParam === "home-assessment" ? (
                            <HomeAssessmentList
                              item={item}
                              idx={idx}
                              key={idx}
                              setShowMenuDropdown={setShowMenuDropdown}
                              setIndexRow={setIndexRow}
                              showMenuDropdown={showMenuDropdown}
                              indexRow={indexRow}
                              setHomeAssessmentId={setHomeAssessmentId}
                              sessionClassIdQueryParam={
                                sessionClassIdQueryParam
                              }
                              typeQueryParam={typeQueryParam}
                              sessionClassSubjectIdQueryParam={
                                sessionClassSubjectIdQueryParam
                              }
                              groupIdQueryParam={groupIdQueryParam}
                              selectedSessionClassSubjectId={selectedSessionClassSubjectId}
                            
                            />
                          ) : typeQueryParam === "class-assessment" ? (
                            <ClassAssessmentList
                              item={item}
                              idx={idx}
                              key={idx}
                              setShowMenuDropdown={setShowMenuDropdown}
                              setIndexRow={setIndexRow}
                              showMenuDropdown={showMenuDropdown}
                              indexRow={indexRow}
                              setClassAssessmentId={setClassAssessmentId}
                              sessionClassIdQueryParam={
                                sessionClassIdQueryParam
                              }
                              typeQueryParam={typeQueryParam}
                              sessionClassSubjectIdQueryParam={
                                sessionClassSubjectIdQueryParam
                              }
                            />
                          ) : null
                        )
                      )}
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                 { typeQueryParam === "home-assessment" ?
                <PaginationFilter3 filterProps={filterProps} action={getAllHomeAssessment} dispatch={dispatch} param1={sessionClassIdQueryParam} param2={sessionClassSubjectIdQueryParam} param3={groupIdQueryParam}/>
                :typeQueryParam === "class-assessment" &&
                <PaginationFilter2 filterProps={filterProps} action={getAllClassAssessment} dispatch={dispatch} param1={sessionClassIdQueryParam} param2={sessionClassSubjectIdQueryParam}/>
              
              }
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

export default AssessmentList;

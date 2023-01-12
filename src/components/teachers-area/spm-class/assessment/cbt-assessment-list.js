import { Field, Formik } from "formik";
import { useState, useEffect } from "react";
import { Badge, Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
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
  getCBTClassAssessment,
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
import { PaginationFilter1, PaginationFilter2, PaginationFilter3 } from "../../../partials/components/pagination-filter";
import { loginCBT } from "../../../../store/actions/auth-actions";

const CBTAssessmentList = () => {
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
  const sessionClassSubjectIdQueryParam = queryParams.get("sessionClassSubjectId") || "";
  const groupIdQueryParam = queryParams.get("groupId") || "";
  const typeQueryParam = queryParams.get("type") || "";
  const clientUrl = sessionStorage.getItem('clientUrl');
   const userEmail = sessionStorage.getItem('userEmail');


  useEffect(() => {
    getAllStaffClasses()(dispatch);
    loginCBT()(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const fetchAssessment = () => {
      if (sessionClassIdQueryParam) {
        getClassSubjects(sessionClassIdQueryParam)(dispatch);
      }
      sessionClassIdQueryParam && getCBTClassAssessment(sessionClassIdQueryParam, 1)(dispatch);

    };

    fetchAssessment();
  }, [sessionClassIdQueryParam, sessionClassSubjectIdQueryParam, typeQueryParam]);



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

                ///SOME CODE
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
                      <h4 className="card-title mt-4">CBT Assessment Board</h4>
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
                          <span>Create CBT Assessment</span>
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
                                      ? history.push(`${classLocations.cbtAssessmentList}?sessionClassId=${e.target.value}&sessionClassSubjectId=${""}&groupId=${""}&type=${typeQueryParam}`)
                                      : history.push(`${classLocations.cbtAssessmentList}?sessionClassId=${e.target.value}&sessionClassSubjectId=${""}&groupId=${""}&type=${typeQueryParam}`);
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
                                      ? history.push(`${classLocations.cbtAssessmentList}?sessionClassId=${sessionClassIdQueryParam}&sessionClassSubjectId=${""}&groupId=${""}&type=${e.target.value}`)
                                      : history.push(
                                        `${classLocations.cbtAssessmentList
                                        }?sessionClassId=${sessionClassIdQueryParam}&sessionClassSubjectId=${e.target.value
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

                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    <Row className="">
                      <div className="table-responsive">
                        <table
                          id="role-list-table"
                          className="table table-striped"
                          role="grid"
                          data-toggle="data-table"
                        >
                          {
                            sessionClassIdQueryParam && (
                              <thead>
                                <tr className="ligth">
                                  <th>
                                    <b>Examination Name</b>
                                  </th>
                                  <th>
                                    <b>Examination ID</b>
                                  </th>
                                  <th>
                                    <b>DATE CREATED</b>
                                  </th>
                                  <th>
                                    <b>Status</b>
                                  </th>
                                  <th>
                                    <b>Percentage Passed</b>
                                  </th>
                                  <th>
                                    <b>Target</b>
                                  </th>
                                  <th min-width="100px">
                                    <b>Action</b>
                                  </th>
                                </tr>
                              </thead>
                            )
                          }

                          <tbody>

                            {
                              filteredAssessmentList?.length === 0 && !sessionClassIdQueryParam ? (
                                <div className="jumbotron jumbotron-fluid">
                                  <div className="container d-flex justify-content-center mt-5 bg-white">
                                    <h2 className="display-4">
                                      Please select inputs above to view Assessment List
                                    </h2>
                                  </div>
                                </div>
                              ) : (
                                filteredAssessmentList?.map((item, idx) => {
                                  return (

                                    <tr key={idx}>

                                      <td className="text-uppercase">
                                        <b>{item.examName_Subject}</b>
                                      </td>
                                      <td className="text-uppercase">
                                        <b>{item.candidateExaminationId}</b>
                                      </td>
                                      <td className="text-uppercase">
                                        <b>{item.createdOn}</b>
                                      </td>
                                      <td className="fw-bold text-start text-uppercase">
                                        <Badge
                                          bg={
                                            item.status == 2
                                              ? "success"
                                              : item.status == 0
                                                ? "warning"
                                                : item.status == 1
                                                  ? "primary"
                                                  : "danger"
                                          }
                                        >
                                          {item.status == 0
                                            ? "waiting"
                                            : item.status == 1
                                              ? "in progress"
                                              : item.status == 2
                                                ? "concluded"
                                                : item.status == 3
                                                  ? "cancelled"
                                                  : ""}
                                        </Badge>
                                      </td>
                                      <td>
                                        <b>{item.useAsExamScore === true && 'Examination'}</b>
                                        <b>{item.useAsAssessmentScore === true && 'Assessment'}</b>
                                      </td>
                                      <td>
                                        <b>{item.percentage}</b>
                                      </td>
                                      <td>
                                        <div className="flex align-items-center list-user-action">
                                          <OverlayTrigger
                                            placement="top"
                                            overlay={
                                              <Tooltip id="button-tooltip-2">
                                                Assessment Details
                                              </Tooltip>
                                            }
                                          >
                                            <a
                                              className="btn btn-sm btn-icon btn-success"
                                              data-toggle="tooltip"
                                              data-placement="top"
                                              title=""
                                              data-original-title="Details"
                                              href={`${clientUrl}login-option/examiner-login?examinationId=${item.examinationId}&userEmail=${userEmail}`}
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
                                            </a>
                                          </OverlayTrigger>{" "}

                                        </div>
                                      </td>
                                    </tr>


                                  )
                                }
                                )
                              )}



                          </tbody>
                        </table>
                      </div>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                  <PaginationFilter1 filterProps={filterProps} action={getCBTClassAssessment} dispatch={dispatch} param1={sessionClassIdQueryParam}  />
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

export default CBTAssessmentList;



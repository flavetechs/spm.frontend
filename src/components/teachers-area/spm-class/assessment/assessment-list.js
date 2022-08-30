import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { classLocations, inprogress } from "../../../../router/spm-path-locations";
import {
  addClassAssessment,
  deleteHomeAssessment,
  getAllClassAssessment,
  getAllClassGroup,
  getAllHomeAssessment,
  getClassSubjects,
} from "../../../../store/actions/class-actions";
import { getAllStaffClasses } from "../../../../store/actions/results-actions";
import {
  respondDialog,
  showHideDialog,
} from "../../../../store/actions/toaster-actions";
import { hasAccess, NavPermissions } from "../../../../utils/permissions";
import * as Yup from "yup";

//VALIDATION
const validation = Yup.object().shape({
  sessionClassId: Yup.string().required("Class is required"),
  sessionClassSubjectId: Yup.string().required("Subject is required"),
  groupId: Yup.string().required("Group is required"),
  type: Yup.string().required("Assessment type is required"),
});
//VALIDATION
const AssessmentList = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [indexRow, setIndexRow] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [homeAssessmentId, setHomeAssessmentId] = useState("");
  const [assessment, setAssessment] = useState("");
  const [sessionClassSubjectId, setSessionClassSubjectId] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const { assessmentList,  classSubjects, groupList } =
    state.class;

  const { staffClasses } = state.results;
  const { dialogResponse } = state.alert;

  // ACCESSING STATE FROM REDUX STORE
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const sessionClassSubjectIdQuery = queryParams.get("sessionClassSubjectId");
  const groupIdQuery = queryParams.get("groupId");
  const typeQuery = queryParams.get("type");
  React.useEffect(() => {
    getAllStaffClasses()(dispatch);
  }, []);

  React.useEffect(() => {
    sessionClassIdQuery && getClassSubjects(sessionClassIdQuery)(dispatch);
  }, [sessionClassIdQuery]);

  React.useEffect(() => {
    if(typeQuery  == "home assessment"){
    sessionClassSubjectId
      ? getAllHomeAssessment(sessionClassSubjectId)(dispatch)
      : getAllHomeAssessment(sessionClassSubjectIdQuery)(dispatch);
    } else if(typeQuery  == "class assessment"){
         getAllClassAssessment()(dispatch);
      }else {
        getAllHomeAssessment("")(dispatch);
      }
  }, [sessionClassSubjectIdQuery,typeQuery]);

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      deleteHomeAssessment(homeAssessmentId, sessionClassSubjectId)(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
      setShowMenuDropdown(false);
    }
    return () => {
      respondDialog("")(dispatch);
      setShowMenuDropdown(false);
    };
  }, [dialogResponse]);

  const filteredAssessmentList = assessmentList?.filter((item) => {
    if (searchQuery === "") {
      //if query is empty
      return item;
    } else if (item.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      //returns filtered array
      return item;
    }
    // else if (
    //   item.dateTime.toLowerCase().includes(searchQuery.toLowerCase())
    // ) {
    //   //returns filtered array
    //   return item;
    // }
  });
  
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Formik
              initialValues={{
                sessionClassId:sessionClassIdQuery? sessionClassIdQuery :"",
                sessionClassSubjectId: sessionClassSubjectIdQuery ? sessionClassSubjectIdQuery :"",
                groupId: groupIdQuery ? groupIdQuery : "",
                type: typeQuery? typeQuery : "",
              }}
              validationSchema={validation}
              enableReinitialize={true}
              onSubmit={(values) => {
                if(typeQuery  == "home assessment"){
                  history.push(`${classLocations.createHomeAssessment}?sessionClassSubjectId=${sessionClassSubjectId}&sessionClassId=${sessionClassIdQuery}&sessionGroupId=${values.groupId}&type=${typeQuery}`);
                }else if(typeQuery  == "class assessment"){
                   addClassAssessment({sessionClassSubjectId})(dispatch)
                }
                }}
            >
              {({ handleSubmit, values, setFieldValue, errors,touched }) => (
                <Card
                  className="bg-transparent"
                >
                  <Card.Header className="d-flex justify-content-between bg-transparent"  
                  onClick={() => {
                    setShowMenuDropdown(false);
                  }}>
                    <div className="header-title">
                      <h4 className="card-title mt-3">Assessment Board</h4>
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
                          className="btn btn-primary btn-icon  mt-lg-0 mt-3 "
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
                              <div>
                                {touched.sessionClassId &&errors.sessionClassId && (
                                  <div className="text-danger">
                                    {errors.sessionClassId}
                                  </div>
                                )}
                              </div>
                              <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
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
                                    getAllClassGroup(e.target.value)(dispatch);
                                    if (e.target.value == "") {
                                      history.push(classLocations.assessment);
                                    } else {
                                      history.push(
                                        `${classLocations.assessment}?sessionClassId=${e.target.value}`
                                      );
                                    }
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
                              <div>
                                {touched.sessionClassSubjectId && errors.sessionClassSubjectId && (
                                  <div className="text-danger">
                                    {errors.sessionClassSubjectId}
                                  </div>
                                )}
                              </div>
                              <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
                                <Field
                                  as="select"
                                  name="sessionClassSubjectId"
                                  className="form-select"
                                  id="sessionClassSubjectId"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "sessionClassSubjectId",
                                      e.target.value
                                    );
                                    setSessionClassSubjectId(e.target.value);
                                    e.target.value &&
                                      history.push(
                                        `${classLocations.assessment}?sessionClassId=${sessionClassIdQuery}&sessionClassSubjectId=${e.target.value}`
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
                              <div>
                                {touched.groupId && errors.groupId && (
                                  <div className="text-danger ">
                                    {errors.groupId}
                                  </div>
                                )}
                              </div>
                              <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
                                <Field
                                  as="select"
                                  name="groupId"
                                  className="form-select"
                                  id="groupId"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "groupId",
                                      e.target.value
                                    );
                                   
                                    e.target.value &&
                                      history.push(
                                        `${classLocations.assessment}?sessionClassId=${sessionClassIdQuery}&sessionClassSubjectId=${sessionClassSubjectIdQuery}&groupId=${e.target.value}`
                                      );
                                  }}
                                >
                                  <option value="">Select Group</option>
                                  <option value="all-students">All Students</option>
                                  {groupList?.map((item, idx) => (
                                    <option key={idx} value={item.groupId}>
                                      {item.groupName}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </div>
                            <div>
                              <div>
                                {touched.type && errors.type && (
                                  <div className="text-danger">
                                    {errors.type}
                                  </div>
                                )}
                              </div>
                              <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
                                <Field
                                  as="select"
                                  name="type"
                                  className="form-select"
                                  id="type"
                                  onChange={(e) => {
                                    setFieldValue("type",e.target.value)
                                    setAssessment(e.target.value);
                                    e.target.value === "cbt"? history.push(inprogress.unactivated) : history.push(
                                        `${classLocations.assessment}?sessionClassId=${sessionClassIdQuery}&sessionClassSubjectId=${sessionClassSubjectIdQuery}&groupId=${groupIdQuery}&type=${e.target.value}`
                                      );
                                  }}
                                >
                                  <option value="">Select Type</option>
                                  <option value="home assessment">
                                    Home Assessment
                                  </option>
                                  <option value="class assessment">
                                    Class Assessment
                                  </option>
                                  <option value="cbt">CBT</option>
                                </Field>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    <Row className="">
                      {filteredAssessmentList?.length === 0 &&
                      !sessionClassIdQuery ? (
                        <div className="jumbotron jumbotron-fluid">
                          <div className="container d-flex justify-content-center mt-5 bg-white">
                            <h2 className="display-4">
                              Please select inputs above to view Assessment List
                            </h2>
                          </div>
                        </div>
                      ) : (
                        filteredAssessmentList?.map((item, idx) => (
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
                                              `${classLocations.homeAssessmentDetails}?homeAssessmentId=${item.homeAssessmentId}&sessionClassId=${sessionClassIdQuery}&type=${typeQuery}`
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
                                            typeQuery  == "home assessment" &&
                                            history.push(
                                              `${classLocations.editHomeAssessment}?homeAssessmentId=${item.homeAssessmentId}&sessionClassSubjectId=${sessionClassSubjectIdQuery}&sessionClassId=${sessionClassIdQuery}&type=${typeQuery}`
                                            );
                                            typeQuery  == "class assessment" &&
                                            history.push(
                                              `${classLocations.editClassAssessment}?classAssessmentId=${item.classAssessmentId}&sessionClassSubjectId=${sessionClassSubjectIdQuery}&sessionClassId=${sessionClassIdQuery}&type=${typeQuery}`
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
                                            setHomeAssessmentId(
                                              item.homeAssessmentId
                                            );
                                            showHideDialog(
                                              true,
                                              "Are you sure you want to delete this assessment"
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
                                  {item.title}
                                </h6>

                                <div className="d-flex justify-content-between">
                                  <small className="" draggable="false">
                                    Created:
                                    <div className="text-success">
                                      {/* {item.dateTime
                                       .split(" ")[0]
                                      } */}
                                      18-07-2022
                                    </div>
                                  </small>
                                  <small className="px-3" draggable="false">
                                    Deadline:
                                    <div className=" text-warning">
                                      {/* {item.dateTime
                                       .split(" ")[1]
                                      } */}
                                      20-07-2022
                                    </div>
                                  </small>
                                </div>
                              </Card.Body>
                              <small className="d-flex justify-content-around mx-2 p-0 mb-2 mt-n3">
                                <div>{item.status}</div>
                                <div>{item.sessionClassGroupName}</div>
                                <div className="text-lowercase">{item.sessionClassSubjectName}</div>
                              </small>
                            </Card>
                          </Col>
                        ))
                      )}
                    </Row>
                  </Card.Body>
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

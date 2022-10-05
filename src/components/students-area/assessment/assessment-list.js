import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getStatusFilterForStudentAssessment,
} from "../../../store/actions/class-actions";
import { assessmentLocations } from "../../../router/students-path-locations";
import { PaginationFilter1 } from "../../partials/components/pagination-filter";

const StudentAssessmentList = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [indexRow, setIndexRow] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const { assessmentList,filterProps } = state.class;

  // ACCESSING STATE FROM REDUX STORE
  const queryParams = new URLSearchParams(locations.search);
  const statusQuery = queryParams.get("status");
  React.useEffect(() => {
    if (!statusQuery) {
      getStatusFilterForStudentAssessment(-1,1)(dispatch);
    } else {
      getStatusFilterForStudentAssessment(statusQuery,1)(dispatch);
    }
  }, [statusQuery, dispatch]);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card className="bg-transparent">
              <Card.Header
                className="d-flex justify-content-between bg-transparent"
                onClick={() => {
                  setShowMenuDropdown(false);
                }}
              >
                <div className="header-title">
                  <h4 className="card-title mt-3">Assessment Board</h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0 bg-transparent">
                <Card
                  onClick={() => {
                    setShowMenuDropdown(false);
                  }}
                >
                  <Card.Body>
                    <div className="d-md-flex align-items-center justify-content-end">
                      <div className="d-flex">
                        <div className="h5 mt-3">filter: </div>
                        <div className=" mx-3 mt-3 mt-lg-0 dropdown">
                          <select
                            as="select"
                            name="status"
                            className="form-select"
                            id="status"
                            value={statusQuery}
                            onChange={(e) => {
                              history.push(
                                `${assessmentLocations.assessment}?status=${e.target.value}`
                              );
                            }}
                          >
                            <option value={-1}>Select All</option>
                            <option value={1}>Open</option>
                            {/* <option value={0}>Unsubmitted</option> */}
                            <option value={3}>Submitted</option>
                            <option value={2}>Closed</option>
                          </select>
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </Card.Body>
                </Card>
                <Row className="">
                  {assessmentList?.map((item, idx) => (
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
                                        `${assessmentLocations.assessmentDetails}?homeAssessmentFeedBackId=${item.homeAssessmentFeedBackId}&homeAssessmentId=${item.homeAssessmentId}`
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

                                  {/* <div
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
                                        </div> */}
                                </div>
                              )}
                            </div>
                          </div>

                          <h6 className="mb-3 text-uppercase">{item.title}</h6>

                          <div className="d-flex justify-content-between">
                            
                            <small className="" draggable="false">
                              <div className="w-100 d-inline-block">Deadline:</div>
                              <div className="text-warning">
                                {item.dateDeadLine}{' '}{item.timeDeadLine}
                              </div>
                            </small>

                            <small className="" draggable="false">
                              <div className="w-100 d-inline-block">Status:</div>
                              <div className="badge bg-primary p-1">
                                {item.status}
                              </div>
                            </small>
                          </div>
                        </Card.Body>
                        <small className="d-flex justify-content-around p-0 mb-2 mt-n3"> 
                          <div>{item.sessionClassGroupName}</div>
                          <div className="text-lowercase">{item.sessionClassSubjectName}</div>
                        </small>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
              <Card.Footer>
                <PaginationFilter1 filterProps={filterProps} action={getStatusFilterForStudentAssessment} dispatch={dispatch} param1={statusQuery}/>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StudentAssessmentList;

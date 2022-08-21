import React, { useEffect, useRef, useState } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";
import { getSingleHomeAssessment } from "../../../../store/actions/class-actions";
import { closeFullscreen, openFullscreen } from "../../../../utils/export-csv";

const AssessmentDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const state = useSelector((state) => state);
  const { singleHomeAssessmentList } = state.class;
  //VARIABLE DECLARATIONS
  const queryParams = new URLSearchParams(location.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const homeAssessmentIdQuery = queryParams.get("homeAssessmentId");
  const sessionClassSubjectIdQuery = queryParams.get("sessionClassSubjectId");

  useEffect(() => {
    getSingleHomeAssessment(
      homeAssessmentIdQuery,
      sessionClassIdQuery
    )(dispatch);
  }, []);

  return (
    <>
      <div>
        <Row className="d-md-flex justify-content-center">
          <Col lg="7">
            <Card
              id="details"
              ref={elementRef}
              style={{ overflow: fullScreen && "scroll" }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between mt-3 flex-wrap">
                  <div>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mx-2"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      Back
                    </button>
                    {!fullScreen ? (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            view full screen
                          </Tooltip>
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="mx-2"
                          onClick={() => {
                            openFullscreen("details");
                            setFullScreen(true);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M21.414 18.586l2.586-2.586v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172 2.586-2.586h-8v8l2.586-2.586 5.172 5.172zm10.828-8l-2.586-2.586h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172-2.586-2.586v8h8l-2.586-2.586 5.172-5.172z" />
                        </svg>
                      </OverlayTrigger>
                    ) : (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            exit full screen
                          </Tooltip>
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          onClick={() => {
                            closeFullscreen("details");
                            setFullScreen(false);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <path d="M16.586 19.414l-2.586 2.586v-8h8l-2.586 2.586 4.586 4.586-2.828 2.828-4.586-4.586zm-13.758-19.414l-2.828 2.828 4.586 4.586-2.586 2.586h8v-8l-2.586 2.586-4.586-4.586zm16.586 7.414l2.586 2.586h-8v-8l2.586 2.586 4.586-4.586 2.828 2.828-4.586 4.586zm-19.414 13.758l2.828 2.828 4.586-4.586 2.586 2.586v-8h-8l2.586 2.586-4.586 4.586z" />
                        </svg>
                      </OverlayTrigger>
                    )}
                  </div>
                  <div>
                    Deadline:
                    <span className="text-end text-primary">
                      {/* {singleHomeAssessmentList?.find(i=>i)?.title} */}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-start my-4">
                  <div>
                    <button
                      type="button"
                      className="btn btn-soft-secondary btn-icon rounded-circle avatar-50 d-flex align-items-center justify-content-center"
                    >
                      <span>
                        <svg
                          className="icon-32"
                          width="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.7379 2.76175H8.08493C6.00493 2.75375 4.29993 4.41175 4.25093 6.49075V17.2037C4.20493 19.3167 5.87993 21.0677 7.99293 21.1147C8.02393 21.1147 8.05393 21.1157 8.08493 21.1147H16.0739C18.1679 21.0297 19.8179 19.2997 19.8029 17.2037V8.03775L14.7379 2.76175Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14.4751 2.75V5.659C14.4751 7.079 15.6231 8.23 17.0431 8.234H19.7981"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14.2882 15.3584H8.88818"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12.2432 11.606H8.88721"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div className="ms-2 mt-2 ">
                    <span className="h5 text-secondary fw-bold">
                      {singleHomeAssessmentList?.title}
                    </span>
                    <br />
                  </div>
                </div>
                <div
                  style={{ minHeight: "25vh" }}
                  dangerouslySetInnerHTML={{
                    __html: singleHomeAssessmentList?.content,
                  }}
                ></div>
                <hr />
                <div className="h5 text-secondary fw-bold mb-2"> Comment</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleHomeAssessmentList?.comment,
                  }}
                ></div>
              </Card.Body>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-danger btn-sm m-3"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Back
                </button>
              </div>
            </Card>
          </Col>
          <Col lg="5">
            <Card>
              <Card.Body>
                <h4 className="mb-3">Student List</h4>
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table  table-borderless table-sm"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <tbody>
                      <tr className="ligth">
                        <td className="" width="300px">
                          Student Name
                        </td>
                        <td className="text-center">
                        Status
                        </td>
                        <td className="text-center">
                        Score
                        </td>
                        <td className="text-center">
                        
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      {singleHomeAssessmentList?.studentList.map(
                        (item, idx) =>
                            <tr key={idx}>
                              <td className="text-uppercase">{item.studentName}</td>

                              <td className="text-center">
                              <div className={item.status == "submitted" ? "badge bg-success":"badge bg-danger"}>{item.status}</div>
                              </td>
                              <td className="text-center">{item.score}</td>
                              <td className="text-center">
                                {item?.status != "not started" &&
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    view
                                  </Tooltip>
                                }
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  to={`${classLocations.viewStudentsHomeAssessment}?homeAssessmentFeedBackId=${item.homeAsessmentFeedbackId}&homeAssessmentId=${singleHomeAssessmentList?.homeAssessmentId}&sessionClassId=${singleHomeAssessmentList?.sessionClassId}`}
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
                              </OverlayTrigger>
                              }
                              </td>
                            </tr>
                      )}
                    </tbody>
                  </table>
              
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AssessmentDetails;

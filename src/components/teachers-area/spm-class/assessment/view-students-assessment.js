import React, { useEffect, useRef, useState } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";
import {
  getAllSingleHomeAssessment,
  submitHomeAssessmentScore,
} from "../../../../store/actions/class-actions";
import { closeFullscreen, openFullscreen } from "../../../../utils/export-csv";

const ViewStudentsAssessment = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const studentListRef = useRef(null);
  const scrollToStudentList = () => studentListRef.current.scrollIntoView();
  const [fullScreen, setFullScreen] = useState(false);
  const [score, setScore] = useState("");
  const state = useSelector((state) => state);
  const { singleHomeAssessmentList, studentSingleHomeAssessmentList } =
    state.class;
  //VARIABLE DECLARATIONS
  const queryParams = new URLSearchParams(location.search);
  const homeAssessmentFeedBackIdQuery = queryParams.get(
    "homeAssessmentFeedBackId"
  );
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const homeAssessmentIdQuery = queryParams.get("homeAssessmentId");
  useEffect(() => {
    getAllSingleHomeAssessment(
      homeAssessmentIdQuery,
      homeAssessmentFeedBackIdQuery,
      sessionClassIdQuery
    )(dispatch);
    setScore("");
  }, [homeAssessmentFeedBackIdQuery,homeAssessmentIdQuery,sessionClassIdQuery,dispatch]);

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
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                    >
                      <svg
                        onClick={() => {
                          history.push(
                            `${
                              classLocations.homeAssessmentDetails
                            }?homeAssessmentId=${
                              singleHomeAssessmentList.homeAssessmentId
                            }&sessionClassId=${sessionClassIdQuery}&type=${"home assessment"}`
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
                    <span>back</span>

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
                    {singleHomeAssessmentList?.sessionClassName}-
                    {singleHomeAssessmentList?.sessionClassSubjectName}
                  </div>
                  <div>
                    Deadline:
                    <span className="text-end text-primary">
                      {singleHomeAssessmentList?.dateDeadLine}{" "}
                      {singleHomeAssessmentList?.timeDeadLine}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-uppercase fw-bold d-flex justify-content-center">
                  {
                    singleHomeAssessmentList?.studentList?.find(
                      (s) =>
                        s.homeAsessmentFeedbackId ===
                        homeAssessmentFeedBackIdQuery
                    )?.studentName
                  }
                </div>

                <div className="d-flex justify-content-start my-2">
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
                    <span className="h4 text-secondary fw-bold">
                      {singleHomeAssessmentList?.title}
                    </span>
                    <br />
                  </div>
                </div>
                <div
                  style={{ minHeight: "25vh" }}
                  className="h6"
                  dangerouslySetInnerHTML={{
                    __html: studentSingleHomeAssessmentList?.content,
                  }}
                ></div>
                <Card className="shadow-none bg-transparent border border-secondary my-3 p-4">
                  <div
                    style={{ minHeight: "25vh" }}
                    className="h6 font-italic"
                    dangerouslySetInnerHTML={{
                      __html: singleHomeAssessmentList?.content,
                    }}
                  ></div>
                </Card>
                <hr />
                <div className="h5 text-secondary fw-bold mb-2"> Comment</div>
                <textarea
                  name="comment"
                  id="comment"
                  rows="3"
                  className="w-100"
                ></textarea>
                <div className="d-flex justify-content-end">
                  <Col md="3" className="form-group h6 mt-3">
                    <label className="form-label">
                      <h6>Feedback Score</h6>
                    </label>
                    <input
                      type="number"
                      name="assessmentScore"
                      className="form-control h6 py-0 px-1"
                      placeholder="Enter mark..."
                      value={score}
                      onChange={(e) => {
                        setScore(e.target.value);
                      }}
                    />
                  </Col>
                </div>
              </Card.Body>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-danger btn-sm my-3"
                  onClick={() => {
                    history.push(
                      `${
                        classLocations.homeAssessmentDetails
                      }?homeAssessmentId=${
                        singleHomeAssessmentList.homeAssessmentId
                      }&sessionClassId=${sessionClassIdQuery}&type=${"home assessment"}`
                    );
                  }}
                >
                  Back
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-sm my-3 mx-2"
                  onClick={() => {
                    submitHomeAssessmentScore(
                      homeAssessmentFeedBackIdQuery,
                      score,
                      homeAssessmentIdQuery,
                      sessionClassIdQuery
                    )(dispatch);
                    scrollToStudentList();
                  }}
                >
                  Mark
                </button>
              </div>
            </Card>
          </Col>
          <Col lg="5">
            <Card>
              <Card.Body ref={studentListRef}>
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
                        <td className="text-center">Status</td>
                        <td className="text-center">Score</td>
                        <td className="text-center"></td>
                      </tr>
                    </tbody>
                    <tbody>
                      {singleHomeAssessmentList?.studentList?.map(
                        (item, idx) => (
                          <tr key={idx}>
                            <td className="text-uppercase">
                              {item.studentName}
                            </td>

                            <td className="text-center">
                              <div
                                className={
                                  item.status === "submitted"
                                    ? "badge bg-success"
                                    : "badge bg-danger"
                                }
                              >
                                {item.status}
                              </div>
                            </td>
                            <td className="text-center">{item.score}</td>
                            <td className="text-center">
                              {item?.status !== "not started" && (
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
                              )}
                            </td>
                          </tr>
                        )
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

export default ViewStudentsAssessment;

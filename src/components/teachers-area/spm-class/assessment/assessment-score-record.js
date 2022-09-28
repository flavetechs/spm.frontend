import React, { useEffect } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";
import { getSingleHomeAssessment } from "../../../../store/actions/class-actions";

const ScoreRecord = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { singleHomeAssessment } = state.class;
  //VARIABLE DECLARATIONS
  const queryParams = new URLSearchParams(location.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const homeAssessmentIdQuery = queryParams.get("homeAssessmentId");
  useEffect(() => {
    getSingleHomeAssessment(
      homeAssessmentIdQuery,
      sessionClassIdQuery
    )(dispatch);
  }, []);
  console.log("singleHomeAssessment",singleHomeAssessment);
  return (
    <>
      <div>
        <Row className="d-md-flex justify-content-center">
          <Col lg="12">
            <Card>
              <div className="mx-3 mt-4">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                >
                  <svg
                    onClick={() => {
                      history.goBack();
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
              </div>
              <Card.Header> 
                <h4 className="mb-3">Score Record</h4>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped"
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
                      {singleHomeAssessment?.studentList.map((item, idx) => (
                        <tr key={idx}>
                          <td className="text-uppercase">{item.studentName}</td>

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
                            {item?.status === "submitted" && (
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">view</Tooltip>
                                }
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  onClick={() =>
                                    getSingleHomeAssessment(
                                      homeAssessmentIdQuery,
                                      sessionClassIdQuery
                                    )(dispatch)
                                  }
                                  to={`${classLocations.scoreRecordDetails}?&homeAssessmentId=${singleHomeAssessment?.homeAssessmentId}&sessionClassId=${singleHomeAssessment?.sessionClassId}`}
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
                      ))}
                    </tbody>
                  </table>
                  <Col md="11" className="form-group ">
                          <input
                            type="checkbox"
                            name="shouldSendToStudents"
                            className="form-check-input "
                            id="shouldSendToStudents"
                            onClick={(e) => {
                           
                            }}
                          />
                          <label className="form-label mx-1">
                            <h6>include to class assessment score record</h6>
                          </label>
                        </Col>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ScoreRecord;

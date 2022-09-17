import React from "react";
import { Row, Col, Tooltip, OverlayTrigger, Button, Badge } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations, studentsLocations } from "../../../router/spm-path-locations";
import { fetchFailedStudentList } from "../../../store/actions/promotion-actions";


const PromotionFailedList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  const locations = useLocation();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { failedStudentList } = state.promotion;
  // ACCESSING STATE FROM REDUX STORE


  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const failedStudentIds = queryParams.get("failedStudentIds");
    if (!failedStudentIds) return;
    fetchFailedStudentList(failedStudentIds)(dispatch)
  }, [dispatch, locations.search]);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Failed Student List</h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped table-bordered"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th className="text-center">
                          {"S/No"}
                        </th>
                        <th>Full Name</th>
                        <th className="text-center">Reg No.</th>
                        <th className="text-center">Status</th>
                        <th className="text-center" min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {failedStudentList?.map((student, idx) => (
                        <tr key={idx}>
                          <td className="text-center">
                            {idx + 1}</td>
                          <td>
                            {student.studentName}
                          </td>
                          <td className="text-center">{student.registrationNumber}</td>
                          <td className="text-center"><Badge bg="danger">{student.status}</Badge></td>
                          <td className="text-center">
                            <div className="flex align-items-center list-user-action">
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2"> details</Tooltip>}
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Details"
                                  to={`${studentsLocations.studentDetails}?studentAccountId=${student.studentContactId}`}
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
                              </OverlayTrigger>{" "}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end mx-30">
                  <Button
                    type="button"
                    className="btn-sm mt-4 me-4"
                    variant="btn btn-danger"
                    onClick={() => {
                      history.push(sessionLocations.promotionSetup)
                    }}
                  >
                    Cancel
                  </Button>{ " " }
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PromotionFailedList;
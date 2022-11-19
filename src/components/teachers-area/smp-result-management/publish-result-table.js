import React, { useEffect } from "react";
import {
  Row,
  Button,
  Table,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  resultManagement,
  studentsLocations,
} from "../../../router/spm-path-locations";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentResult } from "../../../store/actions/results-actions";
import { hasAccess, NavPermissions } from "../../../utils/permissions";
import {
  getAllResultList,
  getTermClasses,
  updatePublishedResult,
} from "../../../store/actions/publish-actions";
import { getActiveSession, getAllSession } from "../../../store/actions/session-actions";
import { PaginationFilter2 } from "../../partials/components/pagination-filter";
import Card from "../../Card";

const PublishResultTable = () => {
  //ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { publishResults, termClasses, filterProps} = state.publish;
  const { sessionList } = state.session;
  const dispatch = useDispatch();
  const locations = useLocation();
  const history = useHistory();
  //ACCESSING STATE FROM REDUX STORE

  //DECLARING VARIABLES
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassId = queryParams.get("sessionClassId");
  const sessionTermId = queryParams.get("sessionTermId");
  const sessionClassIdQueryParams = queryParams.get("sessionClassId");
  const sessionIdQueryParam = queryParams.get("sessionId") || "";
  //DECLARING VARIABLES

  useEffect(() => {
    getAllResultList(sessionClassId, sessionTermId, 1)(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    getActiveSession()(dispatch);
    getAllSession(1)(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    sessionIdQueryParam && getTermClasses(sessionIdQueryParam)(dispatch);
  }, [sessionIdQueryParam, dispatch]);

  const selectedTermClasses = termClasses?.find(item => {
    return item?.sessionClassId === sessionClassIdQueryParams;
  });
  const selectedSession = sessionList?.find(item => {
    return item?.sessionId === sessionIdQueryParam?.toUpperCase();
  });
  const selectedTermName = selectedSession?.terms?.find(item => {
    return item?.sessionTermId === sessionTermId;
  });

  return (
    <>
      <Row className="pt-3">
        <div>
          <Row className="pt-5">
            <div className="d-flex justify-content-between mt-4">
              <div className="mx-2 mt-2">
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
              {publishResults?.isPublished ? (
                <Button
                  type="button"
                  variant="btn btn-sm btn-danger mx-2 mt-2"
                  onClick={() => {
                    updatePublishedResult(
                      sessionClassId,
                      sessionTermId,
                      false
                    )(dispatch);
                  }}
                >
                  UnPublish Result
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="btn btn-sm btn-success mx-2 mt-2"
                  onClick={() => {
                    updatePublishedResult(
                      sessionClassId,
                      sessionTermId,
                      true
                    )(dispatch);
                  }}
                >
                  Publish Result
                </Button>
              )}
            </div>
            <Table
              responsive
              bordered
              size="sm"
              className="w-50"
              style={{ background: "#d8efd1" }}
            >
              <tbody>
                <tr>
                  <th className="h6">Session Name</th>
                  <th className="fw-bold h6">{selectedSession?.startDate}/{selectedSession?.endDate}</th>
                </tr>
                <tr>
                  <th className="h6 ">Term Name</th>
                  <th className="fw-bold text-capitalize h6">
                    {selectedTermName?.termName}
                  </th>
                </tr>
                <tr>
                  <th className="h6 ">Class Name</th>
                  <th className="fw-bold text-capitalize h6">
                    {selectedTermClasses?.sessionClass}
                  </th>
                </tr>
              </tbody>
            </Table>
          </Row>
        </div>

        <Table size="md" hover bordered responsive className="mt-2">
          <thead>
            <tr className="text-center" style={{ background: "#d8efd1" }}>
              <th className="text-uppercase h6">S/No</th>
              <th className="text-uppercase h6 text-start">
                Students Full Name
              </th>
              <th className="text-uppercase h6 text-start">
                Student Registration No
              </th>
              <th className="text-uppercase h6">Position</th>
              <th className="text-uppercase h6">Average Score</th>
              <th className="text-uppercase h6 px-2">
                Total No. of <br />
                Subject offered
              </th>
              <th className="text-uppercase h6 px-2">Status</th>
              <th className="text-uppercase h6 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {publishResults?.publishResult?.map((list, index) => (
              <tr
                style={{ maxHeight: "30px" }}
                key={index}
                className="text-center"
              >
                <td className="fw-bold">{index + 1}</td>
                <td className="fw-bold text-start text-uppercase">
                  {" "}
                  {list?.studentName}{" "}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  {list?.registrationNumber}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  {list?.position}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  {list?.averageScore}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  {list?.totalSubjects}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  <Badge bg={list.status === "PASSED" ? "success" : "danger"}>
                    {list?.status}
                  </Badge>
                </td>
                <td>
                  <div className="flex align-items-center list-user-action">
                    {hasAccess(NavPermissions.viewResultsToPublish) && (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="button-tooltip-2">
                            {" "}
                            Preview Result
                          </Tooltip>
                        }
                      >
                        <Link
                          className="btn btn-sm btn-icon btn-primary"
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          data-original-title="Details"
                          onClick={() => {
                            getAllStudentResult(
                              sessionClassId,
                              sessionTermId,
                              list.studentContactId
                            )(dispatch);
                          }}
                          to={`${resultManagement.resultTemplate}?studentContactId=${list.studentContactId}&sessionClassId=${sessionClassId}&termId=${sessionTermId}`}
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
                                d="M8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12ZM17.7366 6.04606C19.4439 7.36485 20.8976 9.29455 21.9415 11.7091C22.0195 11.8933 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8933 2.05854 11.7091C4.14634 6.88 7.86341 4 11.9902 4H12C14.0683 4 16.0293 4.71758 17.7366 6.04606ZM12.0012 14.4124C13.3378 14.4124 14.4304 13.3264 14.4304 11.9979C14.4304 10.6597 13.3378 9.57362 12.0012 9.57362C11.8841 9.57362 11.767 9.58332 11.6597 9.60272C11.6207 10.6694 10.7426 11.5227 9.65971 11.5227H9.61093C9.58166 11.6779 9.56215 11.833 9.56215 11.9979C9.56215 13.3264 10.6548 14.4124 12.0012 14.4124Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12ZM17.7366 6.04606C19.4439 7.36485 20.8976 9.29455 21.9415 11.7091C22.0195 11.8933 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8933 2.05854 11.7091C4.14634 6.88 7.86341 4 11.9902 4H12C14.0683 4 16.0293 4.71758 17.7366 6.04606ZM12.0012 14.4124C13.3378 14.4124 14.4304 13.3264 14.4304 11.9979C14.4304 10.6597 13.3378 9.57362 12.0012 9.57362C11.8841 9.57362 11.767 9.58332 11.6597 9.60272C11.6207 10.6694 10.7426 11.5227 9.65971 11.5227H9.61093C9.58166 11.6779 9.56215 11.833 9.56215 11.9979C9.56215 13.3264 10.6548 14.4124 12.0012 14.4124Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12ZM17.7366 6.04606C19.4439 7.36485 20.8976 9.29455 21.9415 11.7091C22.0195 11.8933 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8933 2.05854 11.7091C4.14634 6.88 7.86341 4 11.9902 4H12C14.0683 4 16.0293 4.71758 17.7366 6.04606ZM12.0012 14.4124C13.3378 14.4124 14.4304 13.3264 14.4304 11.9979C14.4304 10.6597 13.3378 9.57362 12.0012 9.57362C11.8841 9.57362 11.767 9.58332 11.6597 9.60272C11.6207 10.6694 10.7426 11.5227 9.65971 11.5227H9.61093C9.58166 11.6779 9.56215 11.833 9.56215 11.9979C9.56215 13.3264 10.6548 14.4124 12.0012 14.4124Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                        </Link>
                      </OverlayTrigger>
                    )}{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="button-tooltip-2"> Edit Result</Tooltip>
                      }
                    >
                      <Link
                        className="btn btn-sm btn-icon btn-warning"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Edit"
                        to={`${resultManagement.publishResultEdit}?studentContactId=${list.studentContactId}&sessionClassId=${sessionClassId}&termId=${sessionTermId}`}
                      >
                        <span className="btn-inner">
                          <svg
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M15.1655 4.60254L19.7315 9.16854"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                      </Link>
                    </OverlayTrigger>{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="button-tooltip-2"> Result Details</Tooltip>
                      }
                    >
                      <Link
                        className="btn btn-sm btn-icon btn-success"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Details"
                        to={`${studentsLocations.studentDetails}?studentAccountId=${list.studentContactId}&sessionClassId=${sessionClassId}&termId=${sessionTermId}`}
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
        </Table>
        <Card.Footer>
          <PaginationFilter2 filterProps={filterProps} action={getAllResultList} dispatch={dispatch} param1={sessionClassId} param2={sessionTermId} />
        </Card.Footer>
      </Row>
    </>
  );
};

export default PublishResultTable;

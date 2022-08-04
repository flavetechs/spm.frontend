import React, { useState } from "react";
import {
  Row,
  Button,
  Table,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  resultManagement,
  studentsLocations,
} from "../../router/spm-path-locations";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentResult } from "../../store/actions/results-actions";
import { hasAccess, NavPermissions } from "../../utils/permissions";
import {
  getAllResultList,
  updatePublishedResult,
} from "../../store/actions/publish-actions";

const PublishResultTable = ({
  idsObj,
  isEditMode,
  setEditMode,
  setIndexRow,
  selectedSession,
}) => {
  //ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { publishResults } = state.publish;
  const dispatch = useDispatch();
  //ACCESSING STATE FROM REDUX STORE

  //DECLARING VARIABLES
  
  
  //DECLARING VARIABLES

  return (
    <>
      <Row className="pt-3">
        <div className="d-flex justify-content-end">
          {
            publishResults?.isPublished ? (
              <Button
                type="button"
                className="btn-sm"
                variant="btn btn-danger"
                onClick={() => {
                  updatePublishedResult(idsObj?.sessionClassId,  selectedSession?.sessionTermId, false)(dispatch);
                  
                }}
              >
                UnPublish Result
              </Button>
            ) : (
              <Button
                type="button"
                className="btn-sm"
                variant="btn btn-success"
                onClick={() => {
                  updatePublishedResult(idsObj?.sessionClassId,  selectedSession?.sessionTermId, true)(dispatch);
                }}
              >
                Publish Result
              </Button>
            )
          }


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
            {publishResults?.publishResult.map((list, index) => (
              <tr
                style={{ maxHeight: "30px" }}
                key={index}
                className="text-center"
                onDoubleClick={() => {
                  setEditMode(!isEditMode);
                  setIndexRow(index);
                }}
              >
                <td className="fw-bold">{index + 1}</td>
                <td className="fw-bold text-start text-uppercase">
                  {" "}
                  {list.studentName}{" "}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  {list.registrationNumber}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  {list.position}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  {list.averageScore}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  {list.totalSubjects}
                </td>
                <td className="fw-bold text-start text-uppercase">
                  <Badge bg={list.status == "PASSED" ? "success" : "danger"}>
                    {list.status}
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
                        {hasAccess(NavPermissions.viewResultsToPublish) && (
                          <Link
                            className="btn btn-sm btn-icon btn-primary"
                            data-toggle="tooltip"
                            data-placement="top"
                            title=""
                            data-original-title="Details"
                            onClick={() => {
                              getAllStudentResult(
                                idsObj.sessionClassId,
                                idsObj.termId,
                                list.studentContactId
                              )(dispatch);
                            }}
                            to={`${resultManagement.resultTemplate}?studentContactId=${list.studentContactId}`}
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
                        )}
                      </OverlayTrigger>
                    )}{" "}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip-2"> edit</Tooltip>}
                    >
                      <Link
                        className="btn btn-sm btn-icon btn-warning"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Edit"
                        to={`${resultManagement.publishResultEdit}?studentContactId=${list.studentContactId}&sessionClassId=${idsObj.sessionClassId}&termId=${idsObj.termId}`}
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
                        <Tooltip id="button-tooltip-2"> Details</Tooltip>
                      }
                    >
                      <Link
                        className="btn btn-sm btn-icon btn-success"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Details"
                        to={`${studentsLocations.studentDetails}?studentAccountId=${list.studentContactId}&sessionClassId=${idsObj.sessionClassId}&termId=${idsObj.termId}`}
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
      </Row>
    </>
  );
};

export default PublishResultTable;

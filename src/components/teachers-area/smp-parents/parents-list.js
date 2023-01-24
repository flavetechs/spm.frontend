import React, { useEffect, useState } from "react";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { parentsLocations } from "../../../router/spm-path-locations";
import  PaginationFilter, { PaginationFilter1 } from "../../partials/components/pagination-filter";
import { ReturnFilteredList } from "../../../utils/tools";
import { SearchInput } from "../../partials/components/search-input";
import { getAllParents } from "../../../store/actions/parent-actions";

const ParentsList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [objectArray, setObjectArray] = useState([]);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { parents, filterProps } = state.parent;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllParents(20,1)(dispatch);
  }, [dispatch]);


  useEffect(() => {
    setObjectArray(ReturnFilteredList(parents, searchQuery,
      ["name"]
    ));
  }, [searchQuery, parents]) 
 

  const filteredStudentList = ReturnFilteredList(parents, searchQuery,
    ["name"]
  );

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title mb-3">
                    <b>Parents List</b>
                  </h4>
                </div>
              </Card.Header>
              {/* <ClassesModal /> */}
              <Row className="">
                <Col md="12">
                  <div className="input-group">
                    <span
                      className="input-group-text border-0"
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
                      <SearchInput setSearchQuery={setSearchQuery} />
                    </div>
                  </div>
                </Col>
                <Col xl="8" className="mt-3">

                  

                </Col>
                
              </Row>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>S/No </th>
                        <th>Name</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objectArray.map((parent, idx) => (
                        <tr key={idx}>
                          <td className="">
                            <b>{idx + 1}</b>
                          </td>
                          <td className="text-uppercase">
                            <b>
                              {parent.name}
                            </b>
                          </td>
                         

                          <td>
                            <div className="flex align-items-center list-user-action">
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    {" "}
                                    Parents Details
                                  </Tooltip>
                                }
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  to={`${parentsLocations.parentsDetails}?parentId=${parent.parentId}`}
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
              </Card.Body>
              <Card.Footer>
                <PaginationFilter1
                  filterProps={filterProps}
                  action={getAllParents}
                  dispatch={dispatch}
                  param1={20}
                />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ParentsList;

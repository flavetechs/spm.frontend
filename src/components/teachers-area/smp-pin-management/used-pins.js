import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Card from "../../Card";

import { useDispatch, useSelector } from "react-redux";
import { pinManagement } from "../../../router/spm-path-locations";
import { getAllUsedPinList } from "../../../store/actions/pin-management-actions";
import { Field, Formik } from "formik";
import { getAllSession } from "../../../store/actions/session-actions";
import { getAllTerms } from "../../../store/actions/publish-actions";

const UsedPins = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  let locations = useLocation();
  const history = useHistory();
  const [filterQuery, setFilterQuery] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { usedPinList } = state.pin;
  const { sessionList } = state.session;
  const { sessionTerms } = state.publish;
  // ACCESSING STATE FROM REDUX STORE

  const queryParams = new URLSearchParams(locations.search);
  const sessionIdQueryParam = queryParams.get("sessionId") || "";
  const termIdQueryParam = queryParams.get("termId") || "";

  React.useEffect(() => {
    getAllSession()(dispatch);
  }, []);


  React.useEffect(() => {
    const fetchUsedPins = () => {
      if (sessionIdQueryParam) {
        getAllTerms(sessionIdQueryParam)(dispatch);
      }
      if (sessionIdQueryParam && termIdQueryParam) {
        getAllUsedPinList(sessionIdQueryParam, termIdQueryParam)(dispatch);
      }
    };
    fetchUsedPins();
  }, [sessionIdQueryParam, termIdQueryParam]);




  let filteredPinList = usedPinList.filter((item) => {
    if (filterQuery === "") {
      //if query is empty
      return item;
    } else if (
      item.session.toLowerCase().includes(filterQuery.toLowerCase())
    ) {
      //returns filtered array
      return item;
    } else if (
      item.term.toLowerCase().includes(filterQuery.toLowerCase())
    ) {
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
                sessionId: sessionIdQueryParam,
                termId: termIdQueryParam,
              }}
              enableReinitialize={true}
              onSubmit={() => {
              }}
            >
              {({ setFieldValue }) => (
                <Card>
                  <Card.Header className="d-flex justify-content-between">
                    <div className="header-title">
                      <h4 className="card-title mb-3">Used Pins</h4>
                    </div>
                    <div className="">
                      <div className="input-group d-flex justify-content-end me-2">
                        <span className="input-group-text border-0" id="">
                          <svg
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.56517 3C3.70108 3 3 3.71286 3 4.5904V5.52644C3 6.17647 3.24719 6.80158 3.68936 7.27177L8.5351 12.4243L8.53723 12.4211C9.47271 13.3788 9.99905 14.6734 9.99905 16.0233V20.5952C9.99905 20.9007 10.3187 21.0957 10.584 20.9516L13.3436 19.4479C13.7602 19.2204 14.0201 18.7784 14.0201 18.2984V16.0114C14.0201 14.6691 14.539 13.3799 15.466 12.4243L20.3117 7.27177C20.7528 6.80158 21 6.17647 21 5.52644V4.5904C21 3.71286 20.3 3 19.4359 3H4.56517Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                   
                          <input
                            type="search"
                            className="form-control text-lowercase"
                            placeholder="Filter..."
                            onChange={(event) => setFilterQuery(event.target.value)}
                          />
                     
                      </div>
                    </div>
                  </Card.Header>
                  <hr />
                  <Card
                  >
                    <Card.Body>
                      <div className="d-lg-flex align-items-center ">
                        <div className=" d-lg-flex align-items-center">
                          <div>
                            <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
                              <Field
                                as="select"
                                name="sessionId"
                                className="form-select"
                                id="sessionId"
                                onChange={(e) => {
                                  setFieldValue("sessionId", e.target.value);
                                  history.push(`${pinManagement.usedPins}?sessionId=${e.target.value}`
                                  );
                                }}
                              >
                                <option value="">Select Session</option>
                                {sessionList?.map((item, idx) => (
                                  <option
                                    key={idx}
                                    value={item?.sessionId}
                                  >
                                    {`${item?.startDate}/${item?.endDate}`}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          </div>
                          <div>
                            <div className=" me-3 mx-2 mt-3 mt-lg-0 dropdown">
                              <Field
                                disabled={sessionIdQueryParam ? false : true}
                                as="select"
                                name="termId"
                                className="form-select"
                                id="termId"
                                onChange={(e) => {
                                  setFieldValue("termId", e.target.value);
                                  history.push(
                                    `${pinManagement.usedPins}?sessionId=${sessionIdQueryParam}&termId=${e.target.value}`
                                  );
                                }}
                              >
                                <option value="">Select Term</option>
                                {sessionTerms?.map((term, idx) => (
                                  <option
                                    key={idx}
                                    value={term.sessionTermId}
                                  >
                                    {term.termName}
                                  </option>
                                ))}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                  <Card.Body className="px-0">
                    {sessionIdQueryParam === "" ?
                      <div className="text-center display-6">
                        <p>Please select Session and Term to view used Pins</p>
                      </div>
                      :
                      <div className="table-responsive">
                        <table
                          id="role-list-table"
                          className="table table-striped"
                          role="grid"
                          data-toggle="data-table"
                        >
                          <thead>
                            <tr className="text-center">
                              <th>S/No</th>
                              <th>Student Name</th>
                              <th>Reg No.</th>
                              <th>Pin(s)</th>
                              <th>Pin Count</th>
                              <th>Pin Status</th>
                              <th min-width="100px">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPinList.map((item, idx) => (
                              <tr key={idx} className="text-center">
                                <td className="">{idx + 1}</td>
                                <td className="text-uppercase">
                                  <b>{item.studentName}</b>
                                </td>
                                <td className="text-uppercase">
                                  <b>{item.registrationNumber}</b>
                                </td>
                                <td>
                                  <b>{item.pin}</b>
                                </td>
                                <td>
                                  <b>{item.numberOfTimesUsed}</b>
                                </td>
                                <td>
                                  <Badge bg={"danger"}>
                                    {item.pinStatus}
                                  </Badge>
                                </td>
                                <td>
                                  <div className="flex align-items-center list-user-action">
                                    <OverlayTrigger
                                      placement="top"
                                      overlay={
                                        <Tooltip id="button-tooltip-2">
                                          pin Details
                                        </Tooltip>
                                      }
                                    >
                                      <Link
                                        className="btn btn-sm btn-icon btn-success"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title=""
                                        data-original-title="Details"
                                        to={`${pinManagement.usedPinDetails}?pin=${item.pin}`}
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
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    }
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

export default UsedPins;

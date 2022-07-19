import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Card";

import { useDispatch, useSelector } from "react-redux";
import { pinManagement } from "../../router/spm-path-locations";

const Pins = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [excelFile, setExcelFile] = useState(null);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  // ACCESSING STATE FROM REDUX STORE

  const pinList = [
    { pinCode: 123653672556, pinCount: 3 },
    { pinCode: 163673773686, pinCount: 2 },
    { pinCode: 123653648456, pinCount: 3 },
    { pinCode: 123653664556, pinCount: 0 },
    { pinCode: 123653676766, pinCount: 1 },
  ];
  const onFileUpload = () => {
    const params = new FormData();
    params.append("fileTable", excelFile);
  };
  console.log(excelFile);
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title mb-3">All Pins</h4>
                </div>
              </Card.Header>
              <div className="d-flex justify-content-end px-2">
                <input type="file" onChange={(e)=>{setExcelFile(e.target.files[0]);}} />
                <button
                  type="button"
                  className="text-center btn-primary btn-icon me-2  btn btn-primary"
                  onClick={(e) => {
                    onFileUpload();
                  }}
                >
                  <i className="btn-inner">
                    <svg
                      width="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.38948 8.98403H6.45648C4.42148 8.98403 2.77148 10.634 2.77148 12.669V17.544C2.77148 19.578 4.42148 21.228 6.45648 21.228H17.5865C19.6215 21.228 21.2715 19.578 21.2715 17.544V12.659C21.2715 10.63 19.6265 8.98403 17.5975 8.98403L16.6545 8.98403"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12.0215 2.19044V14.2314"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M9.10645 5.1189L12.0214 2.1909L14.9374 5.1189"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </i>
                  <span> upload</span>
                </button>
              </div>
              <Card.Body className="px-0">
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
                        <th>Pin(s)</th>
                        <th>Pin Count</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pinList.map((item, idx) => (
                        <tr key={idx} className="text-center">
                          <td className="">{idx + 1}</td>
                          <td>
                            <b>{item.pinCode}</b>
                          </td>
                          <td>
                            <b>{item.pinCount}</b>
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
                                  to={`${pinManagement.pinDetails}?pinId=${item.pinCode}`}
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Pins;

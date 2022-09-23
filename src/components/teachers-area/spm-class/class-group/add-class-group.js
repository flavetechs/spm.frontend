import React, { useState } from "react";
import { Card, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { studentsLocations } from "../../../../router/spm-path-locations";
import {
  createClassGroup,
  getAllClassStudents,
} from "../../../../store/actions/class-actions";

const AddClassGroup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  const state = useSelector((state) => state);
  const { classStudents, createSuccessful } = state.class;
  const [studentContactIdArray, setStudentContactIdArray] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [validation, setValidation] = useState("");

  const queryParams = new URLSearchParams(locations.search);
  const sessionClassId = queryParams.get("sessionClassId");
  const sessionClassSubjectId = queryParams.get("sessionClassSubjectId");
  React.useEffect(() => {
    createSuccessful && history.goBack();
  }, [createSuccessful,locations.search]);

  React.useEffect(() => {
    getAllClassStudents(sessionClassId)(dispatch);
  }, [dispatch]);

  const handleStudentContactIds = (event) => {
    const checkBoxValue = event.target.checked;
    const studentContactId = event.target.id;
    let selectedStudentContactIds;
    const otherSelectedStudentContactIds = studentContactIdArray?.filter(
      (item) => item !== studentContactId
    );
    if (checkBoxValue === false) {
      selectedStudentContactIds = [...otherSelectedStudentContactIds];
    } else {
      selectedStudentContactIds = [
        ...otherSelectedStudentContactIds,
        studentContactId,
      ];
    }
    setStudentContactIdArray(selectedStudentContactIds);
  };

  return (
    <>
      <div>
        <Row className="d-flex justify-content-center">
          <Col sm="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title w-100">
                  <Form.Group className="form-group">
                    <div>
                      {!groupName && validation && (
                        <div className="text-danger">
                          group name is required
                        </div>
                      )}
                    </div>
                    <Form.Label className="">Group Name</Form.Label>
                    <input
                      type="text"
                      className="w-100 form-control"
                      name="groupName"
                      placeholder="Enter group name..."
                      onBlur={() => setValidation(true)}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </Form.Group>
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
                        <th className="" width="300px">
                          Students
                        </th>
                        <th className="text-center">Select</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {classStudents?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="text-uppercase">
                            {item.firstName} {item.lastName}
                          </td>

                          <td className="text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={item.studentAccountId}
                              onChange={(e) => {
                                handleStudentContactIds(e);
                              }}
                            />
                          </td>
                          <td>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  {" "}
                                  Student Details
                                </Tooltip>
                              }
                            >
                              <Link
                                className="btn btn-sm btn-icon btn-success"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Details"
                                to={`${studentsLocations.studentDetails}?studentAccountId=${item.studentAccountId}`}
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        groupName &&
                          createClassGroup(
                            groupName,
                            sessionClassId,
                            sessionClassSubjectId,
                            studentContactIdArray
                          )(dispatch);
                      }}
                      type="button"
                      className="btn btn-primary mx-2"
                      style={{ cursor: "pointer" }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddClassGroup;

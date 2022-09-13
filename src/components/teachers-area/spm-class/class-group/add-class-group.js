import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
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

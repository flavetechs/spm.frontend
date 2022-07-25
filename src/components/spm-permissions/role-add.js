import React, { useRef, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { permissionLocations } from "../../router/spm-path-locations";
import { Link } from "react-router-dom";
import {
  createNewRole,
  getAllParentRole,
  resetRoleActivities,
  updateRoleActivityOnSelect,
  updateRoleActivityState,
  updateRoleNameState,
} from "../../store/actions/role-actions";
import { getAllActivities } from "../../store/actions/activity-actions";

const RoleAdd = () => {
  const dispatch = useDispatch();
  const [parentValue, setParentValue] = useState("session-management");
  const previousCheckedValue = useRef("");

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedRole, parentRole } = state.roles;
  const { activities } = state.activities;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllActivities()(dispatch);
    getAllParentRole()(dispatch);
    // return()=>{
    //   resetRoleActivities()(dispatch);
    // }
  }, []);

  React.useEffect(() => {
    previousCheckedValue.current = parentValue;
  }, [parentValue]);

  const handleSelect = (event) => {
    const activityId = event.target.id;
    const checkBoxValue = event.target.checked;
    updateRoleActivityOnSelect(
      activityId,
      checkBoxValue,
      selectedRole,
      previousCheckedValue.current,
      parentValue
    )(dispatch);
  };

  const handleRoleNameOnChange = (event) => {
    const roleName = event.target.value;
    if (roleName.length === 0) return;
    updateRoleNameState(roleName, selectedRole)(dispatch);
  };
  const filteredActivities = activities.filter(
    (item, idx) => parentValue == item.parentName
  );
  console.log("parentRole", previousCheckedValue.current, parentValue);
  console.log("selectedRole", selectedRole);
  return (
    <>
      <div>
        <Row className="d-flex justify-content-center">
          <Col sm="6">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title w-100">
                  <Form.Group className="form-group w-75">
                    <Form.Label htmlFor="role-name" className="">
                      Role Name
                    </Form.Label>
                    <Form.Control
                      onChange={handleRoleNameOnChange}
                      type="text"
                      className="w-100 form-control"
                      id="role-name"
                      placeholder="Role name"
                    />
                  </Form.Group>
                  <Form.Group className="form-group">
                    <select
                      name="name"
                      className="form-select"
                      id="name"
                      onChange={(e) => {
                        setParentValue(e.target.value);
                      }}
                    >
                      <option value="">Select Role</option>
                      {parentRole?.map((role, idx) => (
                        <option
                          key={idx}
                          value={role.name}
                          selected={role.name == "session-management"}
                        >
                          {role.name}
                        </option>
                      ))}
                    </select>
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
                        <th className="text-center" width="300px">
                          Activities
                        </th>
                        <th className="text-center">Select</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map(
                        (item, idx) =>
                          parentValue == item.parentName && (
                            <tr key={idx}>
                              <td className="text-uppercase">
                                {parentValue == item.parentName && item.name}
                              </td>

                              <td className="text-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={
                                    parentValue == item.parentName &&
                                    item.activityId
                                  }
                                  onChange={handleSelect}
                                />
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <Link to={permissionLocations.roleList} className="">
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ cursor: "pointer" }}
                      >
                        Back
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        createNewRole(selectedRole)(dispatch);
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

export default RoleAdd;

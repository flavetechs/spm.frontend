import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { permissionLocations } from "../../router/spm-path-locations";
import { Link, useHistory } from "react-router-dom";
import {
  createNewRole,
  getAllParentActivity,
  resetRoleActivities,
  updateRoleActivityOnSelect,
  updateRoleActivityOnSelectAll,
  updateRoleNameState,
} from "../../store/actions/role-actions";
import { getAllActivities } from "../../store/actions/activity-actions";

const RoleAdd = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [parentValue, setParentValue] = useState("");

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedRole, parentActivity, submitSuccessful } = state.roles;
  const { activities } = state.activities;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllActivities()(dispatch);
    getAllParentActivity()(dispatch);
    return () => {
      resetRoleActivities()(dispatch);
    };
  }, []);

  React.useEffect(() => {
    submitSuccessful && history.push(permissionLocations.roleList);
  }, [submitSuccessful]);

  const handleSelectAll = (event) => {
    const checkBoxValue = event.target.checked;
    const activityId = activities
      ?.filter((a) => parentValue == a.parentId)
      ?.map((a) => a.activityId);
    updateRoleActivityOnSelectAll(
      activityId,
      checkBoxValue,
      selectedRole
    )(dispatch);
  };

  const handleSelect = (event) => {
    const activityId = event.target.id;
    const checkBoxValue = event.target.checked;
    updateRoleActivityOnSelect(
      activityId,
      checkBoxValue,
      selectedRole
    )(dispatch);
  };

  const handleRoleNameOnChange = (event) => {
    const roleName = event.target.value;
    if (roleName.length === 0) return;
    updateRoleNameState(roleName, selectedRole)(dispatch);
  };
  console.log(selectedRole);

  return (
    <>
      <div>
        <Row className="d-flex justify-content-center">
          <Col sm="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title w-100">
                  <Form.Group className="form-group">
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
                  <Row className="">
                    <Form.Group className="form-group col-md-8">
                      <Form.Label htmlFor="role-name" className="">
                        Parent Activity
                      </Form.Label>
                      <select
                        name="display-name"
                        className="form-select"
                        id="display-name"
                        onChange={(e) => {
                          setParentValue(e.target.value);
                        }}
                      >
                        <option value="">Select Parent Activity</option>
                        {parentActivity?.map((activity, idx) => (
                          <option key={idx} value={activity.parentActivityId}>
                            {activity.displayName}
                          </option>
                        ))}
                      </select>
                    </Form.Group>
                    <Col md="3" className="mt-5">
                      <div>Activities: {selectedRole?.activities.length}</div>
                    </Col>
                  </Row>
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
                          Activities
                        </th>
                        <th className="text-center">
                          Select{" "}
                          <input
                            type="checkbox"
                            onChange={(e) => handleSelectAll(e)}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map(
                        (item, idx) =>
                          parentValue == item.parentId && (
                            <tr key={idx}>
                              <td className="text-uppercase">{item.name}</td>

                              <td className="text-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={selectedRole?.activities.find(
                                    (id) => id === item.activityId
                                  )}
                                  id={item.activityId}
                                  onChange={(e) => {
                                    handleSelect(e);
                                  }}
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

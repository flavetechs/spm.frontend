import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { permissionLocations } from "../../router/spm-path-locations";
import { Link, useHistory } from "react-router-dom";
import {
  fetchSingleRole,
  getAllParentActivity,
  resetRoleActivities,
  updateModifiedRole,
  updateRoleActivityOnSelect,
  updateRoleNameState,
} from "../../store/actions/role-actions";
import { useLocation } from "react-router-dom";
import { getAllActivities } from "../../store/actions/activity-actions";

const RoleEdit = () => {
  const locations = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [parentValue, setParentValue] = useState("");
  const [checkAll, setCheckAll] = useState(false);

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedRole, parentActivity, submitSuccessful } = state.roles;
  const { activities } = state.activities;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const roleId = queryParams.get("roleId");
    if (!roleId) return;
    fetchSingleRole(roleId)(dispatch);
    getAllParentActivity()(dispatch);
    getAllActivities()(dispatch);
    return () => {
      resetRoleActivities()(dispatch);
    };
  }, []);
  
  React.useEffect(() => {
    submitSuccessful &&
    history.push(permissionLocations.roleList);
  }, [submitSuccessful]);

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
                      className=""
                      defaultValue={selectedRole?.name}
                      id="role-name"
                      placeholder="Role name"
                    />
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label htmlFor="role-name" className="">
                      Roles
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
                        <th className="text-center">Select{" "}
                        <input type="checkbox"  onChange={()=>setCheckAll(true)} /> </th>
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
                                    (id) => id === item.activityId.toLowerCase()
                                  )}
                                  id={item.activityId.toLowerCase()}
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
                    <Link to={permissionLocations.roleList} className="mx-2">
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
                        updateModifiedRole(selectedRole)(dispatch);
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

export default RoleEdit;

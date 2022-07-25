import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { permissionLocations } from "../../router/spm-path-locations";
import { Link } from "react-router-dom";
import {
  createNewRole,
  getAllParentRole,
  updateRoleActivityState,
  updateRoleNameState,
} from "../../store/actions/role-actions";
import { getAllActivities } from "../../store/actions/activity-actions";

const RoleAdd = () => {
  const dispatch = useDispatch();
const [parentValue, setParentValue] = useState("")

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedRole, parentRole } = state.roles;
  const { activities } = state.activities;
  // ACCESSING STATE FROM REDUX STORE


  React.useEffect(() => {
    getAllActivities()(dispatch);
    getAllParentRole()(dispatch);
  }, []);

  const handleCanCreateCheckBox = (event) => {
    const activityId = event.target.id.replace("canCreate_", "");
    const checkBoxValue = event.target.checked;
    updateRoleActivityState(
      activityId,
      checkBoxValue,
      selectedRole,
      "canCreate"
    )(dispatch);
  };

  const handleCanUpdateCheckBox = (event) => {
    const activityId = event.target.id.replace("canUpdate_", "");
    const checkBoxValue = event.target.checked;
    updateRoleActivityState(
      activityId,
      checkBoxValue,
      selectedRole,
      "canUpdate"
    )(dispatch);
  };

  const handleCanDeleteCheckBox = (event) => {
    const activityId = event.target.id.replace("canDelete_", "");
    const checkBoxValue = event.target.checked;
    updateRoleActivityState(
      activityId,
      checkBoxValue,
      selectedRole,
      "canDelete"
    )(dispatch);
  };

  const handleCanImportCheckBox = (event) => {
    const activityId = event.target.id.replace("canImport_", "");
    const checkBoxValue = event.target.checked;
    updateRoleActivityState(
      activityId,
      checkBoxValue,
      selectedRole,
      "canImport"
    )(dispatch);
  };

  const handleCanExportCheckBox = (event) => {
    const activityId = event.target.id.replace("canExport_", "");
    const checkBoxValue = event.target.checked;
    updateRoleActivityState(
      activityId,
      checkBoxValue,
      selectedRole,
      "canExport"
    )(dispatch);
  };

  const handleRoleNameOnChange = (event) => {
    const roleName = event.target.value;
    if (roleName.length === 0) return;
    updateRoleNameState(roleName, selectedRole)(dispatch);
  };
const filteredActivities = activities.filter((item,idx)=>parentValue == item.parentName)
console.log("parentRole", filteredActivities);
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="role-name" className="">
                      Role Name
                    </Form.Label>
                    <Form.Control
                      onChange={handleRoleNameOnChange}
                      type="text"
                      className=""
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
                               setParentValue(e.target.value)
                              }}
                            >
                              <option value="">Select Role</option>
                              {parentRole?.map((classes, idx) => (
                                <option
                                  key={idx}
                                  value={classes.name}
                                >
                                  {classes.name}
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
                        <th className="text-center">Create</th>
                        <th className="text-center">Update</th>
                        <th className="text-center">Delete</th>
                        <th className="text-center">Import</th>
                        <th className="text-center">Export</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredActivities.map((item, idx) => (
                        <tr key={idx}>
                          <td className="text-uppercase">{item.name}</td>

                          <td className="text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item?.canCreate}
                              id={"canCreate_" + item.activityId}
                              onChange={handleCanCreateCheckBox}
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item?.canUpdate}
                              id={"canUpdate_" + item.activityId}
                              onChange={handleCanUpdateCheckBox}
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item?.canDelete}
                              id={"canDelete_" + item.activityId}
                              onChange={handleCanDeleteCheckBox}
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item?.canImport}
                              id={"canImport_" + item.activityId}
                              onChange={handleCanImportCheckBox}
                            />
                          </td>
                          <td className="text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item?.canExport}
                              id={"canExport_" + item.activityId}
                              onChange={handleCanExportCheckBox}
                            />
                          </td>
                        </tr>
                      ))}
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

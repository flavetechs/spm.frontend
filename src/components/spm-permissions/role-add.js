import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { permissionLocations } from "../../router/spm-path-locations";
import { Link } from "react-router-dom";
import { getAllActivities } from "../../store/actions/activity-actions";
import { addNewRole, createNewName, addNewState } from "../../store/actions/role-actions";

const RoleAdd = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { activities } = state.activities;
  const [newName, setNewName] = React.useState("");
  const { newRole } = state.roles;

  React.useEffect(() => {
    getAllActivities()(dispatch);
  }, []);
  //const values={activityId, name, canCreate, canUpdate, canDelete, canImport, canExport}


  const handleCanCreateCheckBox = (event) => {
    const checkBoxValue = event.target.checked;
    addNewState(
      checkBoxValue,
      newRole,
      "canCreate"
    )(dispatch);
  };
  const handleCanUpdateCheckBox = (event) => {
    const checkBoxValue = event.target.checked;
    addNewState(
      checkBoxValue,
      newRole,
      "canCreate"
    )(dispatch);
  };
  const handleCanDeleteCheckBox = (event) => {
    const checkBoxValue = event.target.checked;
    addNewState(
      checkBoxValue,
      newRole,
      "canCreate"
    )(dispatch);
  };
  const handleCanImportCheckBox = (event) => {
    const checkBoxValue = event.target.checked;
    addNewState(
      checkBoxValue,
      newRole,
      "canCreate"
    )(dispatch);
  };
  const handleCanExportCheckBox = (event) => {
    const checkBoxValue = event.target.checked;
    addNewState(
      checkBoxValue,
      newRole,
      "canCreate"
    )(dispatch);
  };

  const onSubmit = () => {
    addNewRole(newRole)(dispatch);
    createNewName(newName, newRole)(dispatch);
  };
  const handleValue = (e) => {
    setNewName(e.target.value)
  };
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <Form.Group className="form-group">
                    <Form.Control
                      type="text"
                      className=""
                      id="role-name"
                      placeholder="Enter Role Name"
                    />
                  </Form.Group>
                </div>
              </Card.Header>
              <div style={{ width: "95%", margin: "auto" }}>
                <Card.Body className="px-0">
                  <div className="table-responsive">
                    <table
                      id="role-list-table"
                      className="table table-bordered"
                      role="grid"
                      data-toggle="data-table"
                    >
                      <thead>
                        <tr className="ligth">
                          <th width="300px"> </th>
                          <th className="text-center">Create</th>
                          <th className="text-center">Update</th>
                          <th className="text-center">Delete</th>
                          <th className="text-center">Import</th>
                          <th className="text-center">Export</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activities.map((item, idx) => (
                          <tr key={idx}>
                            <td className="text-uppercase">{item.name}</td>
                            <td className="text-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="canCreate"
                                onChange={handleCanCreateCheckBox}
                              />
                            </td>
                            <td className="text-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="canUpdate"
                                onChange={handleCanUpdateCheckBox}
                              />
                            </td>
                            <td className="text-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="canDelete"
                                onChange={handleCanDeleteCheckBox}
                              />
                            </td>
                            <td className="text-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="canImport"
                                onChange={handleCanImportCheckBox}
                              />
                            </td>
                            <td className="text-center">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="canExport"
                                onChange={handleCanExportCheckBox}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-end">
                      <Link to={permissionLocations.roleList} className="mx-2">
                        <button
                          type="button"
                          className="btn btn-primary mr-5"
                          style={{ cursor: "pointer" }}
                        >
                          Back
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Card.Body>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RoleAdd;

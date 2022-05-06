import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../store/actions/activity-actions";
import { permissionLocations } from "../../router/spm-path-locations";
import { Link } from 'react-router-dom'
import {
    fetchSingleRole,
    updateModifiedRole,
    updateRoleActivityState,
    updateRoleNameState,
} from "../../store/actions/role-actions";
import { useLocation } from "react-router-dom";

const RoleEdit = () => {
    const locations = useLocation();
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const { activities } = state.activities;
    const { selectedRole, loading } = state.roles;
    const [allActivities, conCatActivities] = useState([]);

    console.log('loading', loading)

    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const roleId = queryParams.get("roleId");
        if (!roleId) return;
        fetchSingleRole(roleId)(dispatch);
        getAllActivities()(dispatch);

        conCatActivities([...activities, selectedRole.activities]);
        console.log('allActivities', allActivities);

        return () => {
            //refresh
        }

    }, [1]);




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

    return (
        <>
            <div>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    {/* <div class="form-group">
                                        <label class="form-label font-weight-bold" for="roleName">Role Name:</label>
                                        <input placeholder="Role Name" type="text"  value={selectedRole.name} className="form-control font-weight-bold" />
                                    </div> */}
                                    <Form.Group className="form-group">
                                        <Form.Label htmlFor="role-name" className="">
                                            Role Name
                                        </Form.Label>
                                        <Form.Control
                                            onChange={handleRoleNameOnChange}
                                            type="text"
                                            className=""
                                            defaultValue={selectedRole.name}
                                            id="role-name"
                                            placeholder="Role name"
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
                                                {allActivities.map((item, idx) => (
                                                    <tr key={idx}>
                                                        <td className="text-uppercase">{item.name}</td>
                                                        <td className="text-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={item.canCreate}
                                                                id={"canCreate_" + item.activityId}
                                                                onChange={handleCanCreateCheckBox}
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={item.canUpdate}
                                                                id={"canUpdate_" + item.activityId}
                                                                onChange={handleCanUpdateCheckBox}
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={item.canDelete}
                                                                id={"canDelete_" + item.activityId}
                                                                onChange={handleCanDeleteCheckBox}
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={item.canImport}
                                                                id={"canImport_" + item.activityId}
                                                                onChange={handleCanImportCheckBox}
                                                            />
                                                        </td>
                                                        <td className="text-center">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                checked={item.canExport}
                                                                id={"canExport_" + item.activityId}
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
                                                onClick={() => {
                                                    updateModifiedRole(selectedRole)(dispatch);
                                                }}
                                                type="button"
                                                className="btn btn-primary"
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

export default RoleEdit;

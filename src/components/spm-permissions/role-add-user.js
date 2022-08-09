import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { permissionLocations } from "../../router/spm-path-locations";
import {
  addUserToRoles,
  getAllNonAddedUsers,
  resetRoleState,
} from "../../store/actions/role-actions";

const AddUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const locations = useLocation();
  const [userArray, setUserArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { nonAddedUsers, submitSuccessful } = state.roles;
  // ACCESSING STATE FROM REDUX STORE
  React.useEffect(() => {
    submitSuccessful && history.push(permissionLocations.roleList);
  }, [submitSuccessful]);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const roleId = queryParams.get("roleId");
    if (!roleId) return;
    getAllNonAddedUsers(roleId)(dispatch);
    return () => {
      resetRoleState()(dispatch);
    };
  }, []);
  const handleUserArray = (event) => {
    const checkBoxValue = event.target.checked;
    const userId = event.target.id;
    let selectedUserArray;
    const otherSelectedUsers = userArray.filter((user) => user != userId);
    if (checkBoxValue === false) {
      selectedUserArray = [...otherSelectedUsers];
    } else {
      selectedUserArray = [...otherSelectedUsers, userId];
    }
    setUserArray(selectedUserArray);
  };
  const filteredNonAddedUsers = nonAddedUsers?.users.filter((user) => {
    if (searchQuery === "") {
      //if query is empty
      return user;
    } else if (
      user.userName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) {
      //returns filtered array
      return user;
    }
  });

  return (
    <>
      <div>
        <Row className="d-flex justify-content-center">
          <Col sm="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <h4 className="fw-bold">
                  Add user(s) to {nonAddedUsers?.roleName}
                </h4>
              </Card.Header>

              <Card.Body className="px-0">
                <div className="d-flex justify-content-between">
                  <div className="input-group search-input mb-3">
                    <span
                      className="input-group-text border-0"
                      id="search-input"
                    >
                      <svg
                        width="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11.7669"
                          cy="11.7666"
                          r="8.98856"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></circle>
                        <path
                          d="M18.0186 18.4851L21.5426 22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <div>
                      <input
                        type="search"
                        className="form-control text-lowercase"
                        placeholder="Search..."
                        onChange={(event) => setSearchQuery(event.target.value)}
                      />
                    </div>
                  </div>
                  <Link to={permissionLocations.roleList} className="">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm mx-3"
                      style={{ cursor: "pointer" }}
                    >
                      Back
                    </button>
                  </Link>
                </div>
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
                          Users
                        </th>
                        <th className="text-center">Select </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredNonAddedUsers?.map((user, idx) => (
                        <tr key={idx}>
                          <td className="text-uppercase">{user.userName}</td>
                          <td className="text-center">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={userArray.find(
                                (id) => id === user.userId
                              )}
                              id={user.userId}
                              onChange={(e) => {
                                handleUserArray(e);
                              }}
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
                        addUserToRoles(
                          nonAddedUsers?.roleId,
                          userArray
                        )(dispatch);
                      }}
                      type="button"
                      className="btn btn-primary mx-2"
                      style={{ cursor: "pointer" }}
                    >
                      Submit
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

export default AddUser;

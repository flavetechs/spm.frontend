import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { permissionLocations } from "../../../router/spm-path-locations";
import { Link, useLocation } from "react-router-dom";
import {
  getAllAddedUsers,
  removeUserFromRoles,
} from "../../../store/actions/role-actions";
import {
  respondDialog,
  showHideDialog,
} from "../../../store/actions/toaster-actions";

const RemoveUser = () => {
  const dispatch = useDispatch();
  const locations = useLocation();
  const [userId, setUserId] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { addedUsers } = state.roles;
  const { dialogResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const roleId = queryParams.get("roleId");
    if (!roleId) return;
    getAllAddedUsers(roleId)(dispatch);
  }, [dispatch, locations.search]);

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      removeUserFromRoles(addedUsers?.roleId, userId)(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
    } else {
      setUserId("");
    }
    return () => {
      setUserId("");
      respondDialog("")(dispatch);
      showHideDialog(false, null)(dispatch);
    };
  }, [dialogResponse, dispatch, addedUsers?.roleId]);
  const filteredAddedUsers = addedUsers?.users.filter((user) => {
    if (searchQuery === "") {
      //if query is empty
      return user;
    } else if (
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      //returns filtered array
      return user;
    }
  });
  return (
    <>
      <div>
        <Row className="d-flex justify-content-center">
          <Col sm="12" lg="8">
            <Card>
              <Link to={permissionLocations.roleList} className="mt-3 mx-3">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                >
                  <svg
                    style={{ cursor: "pointer" }}
                    className=" text-primary"
                    width="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </OverlayTrigger>
              </Link>
              <Card.Header className="d-flex justify-content-between">
                <h4 className="fw-bold">
                  Remove user(s) from {addedUsers?.name}
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
                      {filteredAddedUsers?.map((user, idx) => (
                        <tr key={idx}>
                          <td className="text-uppercase">{user.userName}</td>

                          <td className="text-center">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  remove user
                                </Tooltip>
                              }
                            >
                              <div
                                className="badge bg-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  const message = `Are you sure to remove ${user.userName} ?`;
                                  showHideDialog(true, message)(dispatch);
                                  setUserId(user.userId);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 640 512"
                                  width="20"
                                  fill="white"
                                >
                                  <path d="M589.6 240l45.6-45.6c6.3-6.3 6.3-16.5 0-22.8l-22.8-22.8c-6.3-6.3-16.5-6.3-22.8 0L544 194.4l-45.6-45.6c-6.3-6.3-16.5-6.3-22.8 0l-22.8 22.8c-6.3 6.3-6.3 16.5 0 22.8l45.6 45.6-45.6 45.6c-6.3 6.3-6.3 16.5 0 22.8l22.8 22.8c6.3 6.3 16.5 6.3 22.8 0l45.6-45.6 45.6 45.6c6.3 6.3 16.5 6.3 22.8 0l22.8-22.8c6.3-6.3 6.3-16.5 0-22.8L589.6 240zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                                </svg>
                              </div>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <Link to={permissionLocations.roleList} className="">
                      <button
                        type="button"
                        className="btn btn-danger mx-3"
                        style={{ cursor: "pointer" }}
                      >
                        Back
                      </button>
                    </Link>
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

export default RemoveUser;

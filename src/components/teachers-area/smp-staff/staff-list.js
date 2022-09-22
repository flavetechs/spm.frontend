import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../../Card";
import {
  deleteStaffAccount,
  getAllStaffAccount,
  pushId,
  removeId,
  returnList,
} from "../../../store/actions/staff-actions";
import { useDispatch, useSelector } from "react-redux";
import { staffLocations } from "../../../router/spm-path-locations";
import {
  respondToDeleteDialog,
  showErrorToast,
  showSingleDeleteDialog,
} from "../../../store/actions/toaster-actions";
import { hasAccess, NavPermissions } from "../../../utils/permissions";

const StaffList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showDeleteButton, setDeleteButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { staffList, selectedIds } = state.staff;
  const { deleteDialogResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  const filteredStaffList = staffList.filter((staffs) => {
    if (searchQuery === "") {
      //if query is empty
      return staffs;
    } else if (
      staffs.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      //returns filtered array
      return staffs;
    } else if (staffs.lastName.toLowerCase().includes(searchQuery.toLowerCase())) {
      //returns filtered array
      return staffs;
    } else if (staffs.email.toLowerCase().includes(searchQuery.toLowerCase())) {
      //returns filtered array
      return staffs;
    }

  });

  React.useEffect(() => {
    getAllStaffAccount()(dispatch);
  }, [dispatch]);

  //DELETE HANDLER
  React.useEffect(() => {
    if (deleteDialogResponse === "continue") {
      if (selectedIds.length === 0) {
        showErrorToast("No Item selected to be deleted")(dispatch);
      } else {
        deleteStaffAccount(selectedIds)(dispatch);
        setDeleteButton(!showDeleteButton);
        setShowCheckBoxes(false);
        respondToDeleteDialog("")(dispatch);
      }
    } else {
      setDeleteButton(true);
      setShowCheckBoxes(false);
      selectedIds.forEach((id) => {
        dispatch(removeId(id));
      });
    }
    return () => {
      respondToDeleteDialog("")(dispatch);
    };
  }, [deleteDialogResponse, dispatch]);
  //DELETE HANDLER

  const checkSingleItem = (isChecked, teacherUserAccountId, stafflists) => {
    stafflists.forEach((item) => {
      if (item.teacherUserAccountId === teacherUserAccountId) {
        item.isChecked = isChecked;
      }
    });
    if (isChecked) {
      dispatch(pushId(teacherUserAccountId));
    } else {
      dispatch(removeId(teacherUserAccountId));
    }
  };
  const checkAllItems = (isChecked, stafflists) => {
    stafflists.forEach((item) => {
      item.isChecked = isChecked;
      if (item.isChecked) {
        dispatch(pushId(item.teacherUserAccountId));
      } else {
        dispatch(removeId(item.teacherUserAccountId));
      }
    });
    returnList(stafflists)(dispatch);
  };
  
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title mb-3">
                    <b>Staff List</b>
                  </h4>
                </div>
              </Card.Header>
              <div className="d-md-flex justify-content-between">
                <div>
                  <div className="input-group">
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
                <div>
              {hasAccess(NavPermissions.deleteStaff) && (
                <div className="d-flex justify-content-end">
                  {showDeleteButton ? (
                    <button
                      type="button"
                      className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                      onClick={() => {
                        setDeleteButton(!showDeleteButton);
                        setShowCheckBoxes(!showCheckBoxes);
                      }}
                    >
                      <i className="btn-inner">
                        <svg
                          width="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                        >
                          <path
                            d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M20.708 6.23975H3.75"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </i>
                      <span> Delete</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                      onClick={() => {
                        showSingleDeleteDialog(true)(dispatch);
                      }}
                    >
                      <i className="btn-inner">
                        <svg
                          width="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="currentColor"
                        >
                          <path
                            d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M20.708 6.23975H3.75"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </i>
                      <span> Delete Selected</span>
                    </button>
                  )}
                  {hasAccess(NavPermissions.createStaff) && (
                    <Link
                      to={staffLocations.staffAdd}
                      className="d-flex justify-content-end"
                    >
                      <button
                        type="button"
                        className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                      >
                        <i className="btn-inner">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                        </i>
                        <span>New Staff List</span>
                      </button>
                    </Link>
                  )}
                </div>
              )}
              </div>
              </div>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>
                          {showCheckBoxes ? (
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => {
                                checkAllItems(e.target.checked, staffList);
                              }}
                            />
                          ) : (
                            "S/No"
                          )}
                        </th>
                        <th>
                          <b>First Name</b>
                        </th>
                        <th>
                          <b>Last Name</b>
                        </th>
                        <th>
                          <b>MIddle Name</b>
                        </th>
                        <th>
                          <b>Email</b>
                        </th>
                        <th>
                          <b>Phone Number</b>
                        </th>
                        <th min-width="100px">
                          <b>Action</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStaffList.map((item, idx) => (
                        <tr key={idx}>
                          <td className="text-dark">
                            {showCheckBoxes ? (
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedIds.find(i=> i === item.teacherUserAccountId) ||false}
                                onChange={(e) => {
                                  checkSingleItem(
                                    e.target.checked,
                                    item.teacherUserAccountId,
                                    staffList
                                  );
                                }}
                              />
                            ) : (
                              idx + 1
                            )}
                          </td>
                          <td className="text-uppercase">
                            <b>{item.firstName}</b>
                          </td>
                          <td className="text-uppercase">
                            <b>{item.lastName}</b>
                          </td>
                          <td className="text-uppercase">
                            <b>{item.middleName}</b>
                          </td>
                          <td>
                            <b>{item.email}</b>
                          </td>
                          <td>
                            <b>{item.phone}</b>
                          </td>
                          <td>
                            <div className="flex align-items-center list-user-action">
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Staff Details
                                  </Tooltip>
                                }
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  to={`${staffLocations.staffDetails}?teacherAccountId=${item.teacherAccountId}`}
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
                              </OverlayTrigger>{" "}
                              {hasAccess(NavPermissions.deleteStaff) && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      Delete Staff
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    className="btn btn-sm btn-icon btn-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                    to="#"
                                    data-id={item.teacherUserAccountId}
                                    onClick={() => {
                                      dispatch(
                                        pushId(item.teacherUserAccountId)
                                      );
                                      showSingleDeleteDialog(true)(dispatch);
                                    }}
                                  >
                                    <span className="btn-inner">
                                      <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="currentColor"
                                      >
                                        <path
                                          d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M20.708 6.23975H3.75"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </span>
                                  </Link>
                                </OverlayTrigger>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StaffList;

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
import PaginationFilter from "../../partials/components/pagination-filter";
import axiosInstance from "../../../axios/axiosInstance";
import SweatAlert from "../../../utils/alert";

const StaffList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showDeleteButton, setDeleteButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { staffList, filterProps, selectedIds } = state.staff;
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
    getAllStaffAccount(1)(dispatch);
  }, [dispatch]);

  const DeActivateStaff = async (staffId, activate) => {
    try {
      const confirm = await SweatAlert.confirmAction(activate == false ? `You want to activate staff` : `You want to deactivate staff`)
      if (confirm) {
        await axiosInstance.post("/smp/server/tercher/api/v1/de-activate/teacher", { id: staffId });

        getAllStaffAccount(1)(dispatch);
        if (activate == false)
          SweatAlert.showSuccess('Successfully activated staff');
        else
          SweatAlert.showSuccess('Successfully de-activated staff');
      }

    } catch (error) {
      SweatAlert.showError(error.response.data.message.friendlyMessage, 'Request error');
    }
  };


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
      showSingleDeleteDialog(false)(dispatch);
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
                    <b>New Staff</b>
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
                            <span>Staff List</span>
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
                          <b>Middle Name</b>
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
                          <td className="h6">
                            {showCheckBoxes ? (
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedIds.find(i => i === item.teacherUserAccountId) || false}
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
                                <>
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
                                      data-id={item.teacherAccountId}
                                      onClick={() => {
                                        dispatch(
                                          pushId(item.teacherAccountId)
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
                                  {" "}
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        {
                                          item.status === "active" ? 'Deactivate Staff' : "Activate Staff"
                                        }
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
                                      data-id={item.teacherAccountId}
                                      onClick={() => {
                                        DeActivateStaff(item.teacherAccountId, item.status === "active")
                                      }}
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
                                            d="M14.0545 15.26C14.3416 14.97 14.3416 14.5 14.0545 14.21L12.8465 12.99L14.0545 11.77C14.3416 11.48 14.3416 11.01 14.0545 10.72C13.7673 10.42 13.2921 10.42 13.005 10.72L11.797 11.94L10.5891 10.72C10.302 10.42 9.83663 10.42 9.5495 10.72C9.26238 11.01 9.26238 11.48 9.5495 11.77L10.7574 12.99L9.5495 14.21C9.26238 14.5 9.26238 14.97 9.5495 15.26C9.68812 15.41 9.87624 15.48 10.0644 15.48C10.2525 15.48 10.4505 15.41 10.5891 15.26L11.797 14.04L13.005 15.26C13.1535 15.41 13.3416 15.48 13.5297 15.48C13.7178 15.48 13.9059 15.41 14.0545 15.26ZM19.3354 9.02557C19.5686 9.02289 19.8209 9.02 20.0446 9.02C20.302 9.02 20.5 9.22 20.5 9.47V17.51C20.5 19.99 18.5099 22 16.0446 22H8.17327C5.58911 22 3.5 19.89 3.5 17.29V6.51C3.5 4.03 5.5 2 7.96535 2H13.2525C13.5 2 13.7079 2.21 13.7079 2.46V5.68C13.7079 7.51 15.203 9.01 17.0149 9.02C17.4333 9.02 17.8077 9.02318 18.1346 9.02595C18.3878 9.02809 18.6125 9.03 18.8069 9.03C18.9488 9.03 19.135 9.02786 19.3354 9.02557ZM19.6056 7.5662C18.7918 7.5692 17.8334 7.5662 17.1433 7.5592C16.0482 7.5592 15.1462 6.6482 15.1462 5.5422V2.9062C15.1462 2.4752 15.6641 2.2612 15.9591 2.5722C16.7215 3.37207 17.8885 4.59784 18.8749 5.63398C19.2746 6.05384 19.6447 6.44257 19.9462 6.7592C20.2344 7.0622 20.0235 7.5652 19.6056 7.5662Z"
                                            fill="currentColor"
                                          ></path>
                                        </svg>
                                      </span>
                                    </Link>
                                  </OverlayTrigger>
                                </>

                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
              <Card.Footer>
                <PaginationFilter filterProps={filterProps} action={getAllStaffAccount} dispatch={dispatch} />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StaffList;

import { Field, Formik } from "formik";
import React, { useState } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";
import {
  deleteClassGroup,
  getAllClassGroup,
  getAllClassStudents,
  getClassSubjects,
  pushId,
  removeId,
  returnList,
} from "../../../../store/actions/class-actions";
import * as Yup from "yup";
import { getAllStaffClasses } from "../../../../store/actions/results-actions";
import {
  respondToDeleteDialog,
  showErrorToast,
  showSingleDeleteDialog,
} from "../../../../store/actions/toaster-actions";

const ClassGroup = () => {
  // ACCESSING STATE FROM REDUX STORE
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  const [showDeleteButton, setDeleteButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [sessionClassSubjectId, setSessionClassSubjectId] = useState("");
  const state = useSelector((state) => state);
  const { groupList, selectedIds, classSubjects } = state.class;
  const { deleteDialogResponse } = state.alert;
  const { staffClasses } = state.results;
  // const { classStudents } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  const sessionClassSubjectIdQuery = queryParams.get("sessionClassSubjectId");
  //DELETE HANDLER
  React.useEffect(() => {
    if (deleteDialogResponse === "continue") {
      if (selectedIds.length === 0) {
        showErrorToast("No Item selected to be deleted")(dispatch);
      } else {
        deleteClassGroup(
          selectedIds,
          sessionClassIdQuery,
          sessionClassSubjectIdQuery
        )(dispatch);
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
  }, [deleteDialogResponse]);
  //DELETE HANDLER

  React.useEffect(() => {
    getAllStaffClasses()(dispatch);
  }, []);

  React.useEffect(() => {
    getAllClassGroup(sessionClassIdQuery, sessionClassSubjectIdQuery)(dispatch);
  }, [sessionClassSubjectId]);

  React.useEffect(() => {
    getClassSubjects(sessionClassIdQuery)(dispatch);
  }, [sessionClassIdQuery]);

  const checkSingleItem = (isChecked, groupId, groupList) => {
    groupList?.forEach((item) => {
      if (item.groupId === groupId) {
        item.isChecked = isChecked;
      }
    });
    if (isChecked) {
      dispatch(pushId(groupId));
    } else {
      dispatch(removeId(groupId));
    }
  };
  const checkAllItems = (isChecked, groupList) => {
    groupList.forEach((item) => {
      item.isChecked = isChecked;
      if (item.isChecked) {
        dispatch(pushId(item.groupId));
      } else {
        dispatch(removeId(item.groupId));
      }
    });
    returnList(groupList)(dispatch);
  };

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Class Group List</h4>
                </div>
              </Card.Header>

              <Card.Body className="px-0 mt-n3">
                <Formik
                  initialValues={{
                    sessionClassSubjectId: sessionClassSubjectIdQuery ? sessionClassSubjectIdQuery : "",
                  }}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    getAllClassStudents(sessionClassIdQuery)(dispatch);
                    history.push(
                      `${classLocations.addClassGroup}?sessionClassId=${sessionClassIdQuery}&sessionClassSubjectId=${values.sessionClassSubjectId}`
                    );
                  }}
                >
                  {({
                    handleSubmit,
                    setFieldValue,
                    values,
                    touched,
                    errors,
                  }) => (
                    <div>
                      <div className="d-md-flex justify-content-between mb-3">
                      <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      {" "}
                                      back
                                    </Tooltip>
                                  }
                                >
                        <svg
                          onClick={() => {
                            history.push(classLocations.sessionClassList2);
                          }}
                          style={{ cursor: "pointer" }}
                          className=" mx-3 text-primary"
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
                        <div className="d-md-flex ">
                          <div className=" me-2 mt-3 mt-md-0 dropdown">
                            <Field
                              as="select"
                              name="sessionClassSubjectId"
                              className="form-select"
                              id="sessionClassSubjectId"
                              onChange={(e) => {
                                setSessionClassSubjectId(e.target.value);
                                setFieldValue(
                                  "sessionClassSubjectId",
                                  e.target.value
                                );
                                e.target.value != "" &&
                                  history.push(
                                    `${classLocations.classGroup}?sessionClassId=${sessionClassIdQuery}&sessionClassSubjectId=${e.target.value}`
                                  );
                              }}
                            >
                              <option value="">Select Subject</option>
                              {classSubjects?.map((item, idx) => (
                                <option
                                  key={idx}
                                  value={item.sessionClassSubjectId}
                                >
                                  {item.subjectName}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <div className="me-2 mt-3 mt-md-0 ">
                            <button
                              type="button"
                              onClick={() => {
                                if (!values.sessionClassSubjectId) {
                                  showErrorToast(
                                    "Subject is required to create a class group"
                                  )(dispatch);
                                  return;
                                } else {
                                  handleSubmit();
                                }
                              }}
                              className="text-center btn-primary btn-icon me-2 mx-2 py-2 btn btn-primary"
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
                              <span> Add Class Group </span>
                            </button>
                          </div>
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
                        </div>{" "}
                      </div>
                    </div>
                  )}
                </Formik>
                {groupList?.length === 0 && !sessionClassIdQuery ? (
                  <div className="jumbotron jumbotron-fluid">
                    <div className="container d-flex justify-content-center mt-5 bg-white">
                      <h2 className="display-4">
                        Please select a class to view Group List
                      </h2>
                    </div>
                  </div>
                ) : (
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
                                  checkAllItems(e.target.checked, groupList);
                                }}
                              />
                            ) : (
                              "S/No"
                            )}
                          </th>
                          <th>Group Name</th>
                          <th className="text-center">No of Students in Grp</th>
                          <th className="text-center">
                            No of Students not in Grp
                          </th>
                          <th min-width="100px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupList?.map((item, idx) => (
                          <tr key={idx}>
                            <td className="">
                              <b>
                                {showCheckBoxes ? (
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={item.isChecked || false}
                                    onChange={(e) => {
                                      checkSingleItem(
                                        e.target.checked,
                                        item.groupId,
                                        groupList
                                      );
                                    }}
                                  />
                                ) : (
                                  idx + 1
                                )}
                              </b>
                            </td>
                            <td>
                              <strong>{item.groupName}</strong>{" "}
                            </td>
                            <td className="text-uppercase text-center">
                              <b>{item.numberOfStudentsInGroup}</b>
                            </td>
                            <td className="text-uppercase text-center">
                              <b>{item.numberOfStudentNotInGroup}</b>
                            </td>

                            <td>
                              <div className="flex align-items-center list-user-action">
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      {" "}
                                      edit
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    className="btn btn-sm btn-icon btn-warning"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Edit"
                                    to={`${classLocations.editClassGroup}?sessionClassId=${sessionClassIdQuery}&groupId=${item.groupId}`}
                                  >
                                    <span className="btn-inner">
                                      <svg
                                        width="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M15.1655 4.60254L19.7315 9.16854"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </span>
                                  </Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      {" "}
                                      delete
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    className="btn btn-sm btn-icon btn-danger mx-2"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                    onClick={() => {
                                      dispatch(pushId(item.groupId));
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
                                  </button>
                                </OverlayTrigger>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassGroup;

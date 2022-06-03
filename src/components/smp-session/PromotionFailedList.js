import React, { useState } from "react";
import { Row, Col, Tooltip, OverlayTrigger, Button, Badge } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../Card";
import {
  getAllStudents,
  pushId,
  removeId,
  returnList,
  deleteStudent,
} from "../../store/actions/student-actions";
import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../router/spm-path-locations";
import {
  respondToDeleteDialog,
  showErrorToast,
  showSingleDeleteDialog,
} from "../../store/actions/toaster-actions";


const PromotionFailedList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDeleteButton, setDeleteButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentList, selectedIds } = state.student;
  const { deleteDialogResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllStudents()(dispatch);
  }, []);

  //DELETE HANDLER
  React.useEffect(() => {
    if (deleteDialogResponse === "continue") {
      if (selectedIds.length === 0) {
        showErrorToast("No Item selected to be deleted")(dispatch);
      } else {
        deleteStudent(selectedIds)(dispatch);
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
  const checkSingleItem = (isChecked, userAccountId, studentList) => {
    studentList.forEach((item) => {
      if (item.userAccountId === userAccountId) {
        item.isChecked = isChecked;
      }
    });
    if (isChecked) {
      dispatch(pushId(userAccountId));
    } else {
      dispatch(removeId(userAccountId));
    }
  };
  const checkAllItems = (isChecked, studentList) => {
    studentList.forEach((item) => {
      item.isChecked = isChecked;
      if (item.isChecked) {
        dispatch(pushId(item.userAccountId));
      } else {
        dispatch(removeId(item.userAccountId));
      }
    });
    returnList(studentList)(dispatch);
  };

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Failed Student List</h4>
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
                        <th className="text-center">
                          { "S/No"}
                        </th>
                        <th>Full Name</th>
                        <th className="text-center">Reg No.</th>
                        <th className="text-center">Average Score</th>
                        <th className="text-center">Status</th>
                        <th className="text-center" min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentList.map((student, idx) => (
                        <tr key={idx}>
                          <td className="text-center">
                            { idx + 1}</td>
                          <td>
                            {student.firstName}{" "}{student.middleName}{" "}
                            {student.lastName}
                          </td>
                          <td className="text-center">{student.registrationNumber}</td>
                          <td className="text-center"><span>50</span></td>
                          <td className="text-center"><Badge bg="danger"><span>Failed</span></Badge></td>
                          <td className="text-center">
                            <div className="flex align-items-center list-user-action">
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2"> details</Tooltip>}
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  data-original-title="Details"
                                  // to={`${studentsLocations.studentDetails}?studentAccountId=${student.studentAccountId}`}
                                  to='#'
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
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-end mx-30">
                  <Button
                    type="button"
                    variant="btn btn-danger mx-2"
                    onClick={() => {
                      history.go(-2);
                    }}
                  >
                    Cancel
                  </Button>{" "}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PromotionFailedList;
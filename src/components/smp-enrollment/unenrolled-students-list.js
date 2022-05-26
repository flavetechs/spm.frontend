import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Tooltip,
  OverlayTrigger,
  Button,
  Modal,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../Card";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import {
  getAllUnenrolledStudents,
  pushId,
  removeId,
  returnList,
  enrollStudent,
} from "../../store/actions/enrollment-actions";
import { useDispatch, useSelector } from "react-redux";
import { studentsLocations } from "../../router/spm-path-locations";
import { showErrorToast } from "../../store/actions/toaster-actions";
import { getAllSessionClasses } from "../../store/actions/class-actions";
const UnenrolledStudentsList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  const [showEnrollButton, setEnrollButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { unenrolledStudents, selectedIds, successful } = state.enrollment;
  const { itemList } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
  });

  React.useEffect(() => {
    getAllUnenrolledStudents()(dispatch);
    getAllSessionClasses()(dispatch);
  }, [showCheckBoxes]);

  
  //ENROLL HANDLER
  React.useEffect(() => {
    if (viewModal) {
      if (selectedIds.length === 0) {
        showErrorToast("No Student selected to be enrolled")(dispatch);
      } else {
        enrollStudent(selectedIds)(dispatch);
        setEnrollButton(!showEnrollButton);
        setShowCheckBoxes(false);
      }
    } else {
      setEnrollButton(true);
      setShowCheckBoxes(false);
      selectedIds.forEach((id) => {
        dispatch(removeId(id));
      });
    }
  }, []);
  //ENROLL HANDLER
  
  const checkSingleItem = (isChecked, studentContactId, unenrolledStudents) => {
    unenrolledStudents.forEach((item) => {
      if (item.studentContactId === studentContactId) {
        item.isChecked = isChecked;
      }
    });
    if (isChecked) {
      dispatch(pushId(studentContactId));
    } else {
      dispatch(removeId(studentContactId));
    }
  };
  const checkAllItems = (isChecked, unenrolledStudents) => {
    unenrolledStudents.forEach((item) => {
      item.isChecked = isChecked;
      if (item.isChecked) {
        dispatch(pushId(item.studentContactId));
      } else {
        dispatch(removeId(item.studentContactId));
      }
    });
    returnList(unenrolledStudents)(dispatch);
  };
  const handleSubmitError=()=>{
      showErrorToast("No Student selected to be enrolled")(dispatch);
       setViewModal(false);
}
  if (successful) {
setViewModal(false);
  }
  
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Unenrolled Students List</h4>
                </div>
              </Card.Header>
              <Formik
                initialValues={{
                  sessionClassId: "",
                  studentContactIds: [],
                }}
                validationSchema={validation}
                onSubmit={(values) => {
                  console.log("values", values);
                  console.log('selectedIds', selectedIds)
                  values.studentContactIds = selectedIds;
                  enrollStudent(values)(dispatch);
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                  isValid,
                }) => (
                  <div>
                      <Modal show={viewModal} onHide={()=>setViewModal(false)}
                        id="viewModal"
                        centered
                      >
                            <Modal.Header closeButton>
                              <Modal.Title className="h5">
                                Enroll Student(s)
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="mb-3">
                                {touched.sessionClassId &&
                                  errors.sessionClassId && (
                                    <div className="text-danger">
                                      {errors.sessionClassId}
                                    </div>
                                  )}
                                <label
                                  className="form-label text-dark h6"
                                  htmlFor="sessionClassId"
                                >
                                  Class:
                                </label>
                                <Field
                                  as="select"
                                  name="sessionClassId"
                                  className="form-select"
                                  id="sessionClassId"
                                >
                                  <option value="">Select Class</option>
                                  {itemList.map((item, idx) => (
                                    <option
                                      key={idx}
                                      value={item.sessionClassId}
                                    >
                                      {item.class}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                              <div className="d-flex justify-content-end">
                                <Button
                                  variant="danger"
                                  className="mx-2"
                                  onClick={() => {
                                    setViewModal(false);
                                    setEnrollButton(true);
                                    setShowCheckBoxes(false);
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="primary"
                                  className=""
                                  onClick={()=>selectedIds.length === 0 ? handleSubmitError() : handleSubmit()}
                                >
                                  Confirm Enroll
                                </Button>
                              </div>
                            </Modal.Body>
                          
                        
                      </Modal>
                  </div>
                )}
              </Formik>
              <div className="d-flex justify-content-end">
                {showEnrollButton ? (
                  <button
                    type="button"
                    className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary "
                    onClick={() => {
                      setEnrollButton(!showEnrollButton);
                      setShowCheckBoxes(!showCheckBoxes);
                    }}
                  >
                    <i className="btn-inner">
                      <svg
                        width="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M19.2036 8.66919V12.6792"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M21.2497 10.6741H17.1597"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </i>
                    <span> Enroll Students</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    data-toggle="modal" 
                    data-target="#viewModal"
                    className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                    onClick={() => {
                       setViewModal(true);
                    }}
                  >
                    <i className="btn-inner">
                      <svg
                        width="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M19.2036 8.66919V12.6792"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M21.2497 10.6741H17.1597"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </i>
                    <span> Enroll Selected</span>
                  </button>
                )}
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
                                checkAllItems(
                                  e.target.checked,
                                  unenrolledStudents
                                );
                               
                              }}
                            />
                          ) : (
                            "S/No"
                          )}
                        </th>
                        <th>Full Name</th>
                        <th>Registration No</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unenrolledStudents.map((student, idx) => (
                        <tr key={idx}>
                          <td className="">
                            {showCheckBoxes ? (
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={student.isChecked || false}
                                onChange={(e) => {
                                  checkSingleItem(
                                    e.target.checked,
                                    student.studentContactId,
                                    unenrolledStudents
                                  );

                                }}
                              />
                            ) : (
                              idx + 1
                            )}
                          </td>
                          <td>{student.studentName}</td>
                          <td>{student.studentRegNumber}</td>

                          <td>
                            <div className="flex align-items-center list-user-action">
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2"> details</Tooltip>}
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  to={`${studentsLocations.studentDetails}?studentAccountId=${student.studentContactId}`}
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
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2"> enroll</Tooltip>}
                              >
                              <Link
                                className="btn btn-sm btn-icon btn-warning"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Enroll"
                                to="#"
                                data-id={student.studentContactId}
                                onClick={() => {
                                  dispatch(pushId(student.studentContactId));
                                  setViewModal(true);
                                }}
                              >
                                <span className="btn-inner">
                                  <svg
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Enroll"
                                    width="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M19.2036 8.66919V12.6792"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M21.2497 10.6741H17.1597"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </span>
                              </Link>
                              </OverlayTrigger>
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

export default UnenrolledStudentsList;

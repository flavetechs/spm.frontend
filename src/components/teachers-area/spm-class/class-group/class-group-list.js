import { Field, Formik } from "formik";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";
import { getAllClassStudents } from "../../../../store/actions/class-actions";
import * as Yup from "yup";
import { getAllStaffClasses } from "../../../../store/actions/results-actions";

const ClassGroup = () => {
  // ACCESSING STATE FROM REDUX STORE
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { staffClasses } = state.results;
  // const { classStudents } = state.class;
  // ACCESSING STATE FROM REDUX STORE
  //VALIDATION
  const validation = Yup.object().shape({
    sessionClassId: Yup.string().required("Class is required"),
  });
  //VALIDATION
  React.useEffect(() => {
    getAllStaffClasses()(dispatch);
  }, []);

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
                    sessionClassId: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    getAllClassStudents(values.sessionClassId)(dispatch);
                    history.push(`${classLocations.addClassGroup}?sessionClassId=${values.sessionClassId}`)
                  }}
                >
                  {({ handleSubmit, values, touched, errors }) => (
                    <div className="d-md-flex justify-content-end mb-3">
                      <div className=" me-3 mt-3 mt-xl-0 dropdown">
                        <div>
                          {errors.sessionClassId && (
                            <div className="text-danger">
                              {errors.sessionClassId}
                            </div>
                          )}
                        </div>
                        <Field
                          as="select"
                          name="sessionClassId"
                          className="form-select"
                          id="sessionClassId"
                        >
                          <option value="">Select Class</option>
                          {staffClasses?.map((item, idx) => (
                            <option key={idx} value={item.sessionClassId}>
                              {item.sessionClass}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <div className="me-3 mt-3 mt-md-0 ">
                        <button
                          type="button"
                          onClick={() => handleSubmit()}
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
                    </div>
                  )}
                </Formik>
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>S/No</th>
                        <th>Group Name</th>
                        <th>No of Students in Grp</th>
                        <th>No of Students not in Grp</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {itemList?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="">{idx + 1}</td>
                        {/* //<td>{item.session}</td> 
                        <td>
                          <strong>{item.class}</strong>{" "}
                        </td>
                        <td className="text-uppercase">
                          <b>{item.formTeacher}</b>
                        </td>
                        <td>
                          <b>{item.examScore}</b>
                        </td>
                        <td>
                          <b>{item.assessmentScore}</b>
                        </td>
                        <td>
                          <b>{item.passMark}</b>
                        </td>

                        <td>
                          <div className="flex align-items-center list-user-action">
                                 <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2"> edit</Tooltip>
                                  }
                                >
                                  <Link
                                    className="btn btn-sm btn-icon btn-warning"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Edit"
                                    to={`${studentsLocations.studentEdit}?studentAccountId=${student.studentAccountId}`}
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
                          </div>
                        </td>
                      </tr>
                    ))} */}
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

export default ClassGroup;

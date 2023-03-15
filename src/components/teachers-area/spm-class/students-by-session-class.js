import { useEffect, useState } from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { studentsLocations } from "../../../router/spm-path-locations";
import { getAllClassStudents } from "../../../store/actions/class-actions";
import { getAllStaffClasses } from "../../../store/actions/results-actions";
import { ReturnFilteredList } from "../../../utils/tools";
import Card from "../../Card";
import { SearchInput } from "../../partials/components/search-input";


const StudentListByClass = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const locations = useLocation();
  const [objectArray, setObjectArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const queryParams = new URLSearchParams(locations.search);
  const sessionClassIdQuery = queryParams.get("sessionClassId");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { classStudents} = state.class;
  const { staffClasses } = state.results;
  // ACCESSING STATE FROM REDUX STORE

  useEffect(() => {
    getAllStaffClasses()(dispatch);
    getAllClassStudents(sessionClassIdQuery)(dispatch);
  }, [sessionClassIdQuery]);


  useEffect(() => {
    setObjectArray(ReturnFilteredList(classStudents, searchQuery,
      ["firstName", "lastName", "registrationNumber", "sessionClass"]
    ));
  }, [searchQuery, classStudents])


  const filteredStudentList = ReturnFilteredList(classStudents, searchQuery,
    ["firstName", "lastName", "registrationNumber", "sessionClass"])


  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title mb-3">
                    <b>{staffClasses.find(i=>i.sessionClassId === sessionClassIdQuery)?.sessionClass} Students List</b>
                  </h4>
                </div>
              </Card.Header>
             
              <Card.Body className="px-0">
                <div>  <SearchInput setSearchQuery={setSearchQuery} /></div>
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
                         
                        S/No
                        </th>
                        <th>Full Name</th>
                        <th>Registration No</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {objectArray?.map((student, idx) => (
                        <tr key={idx}>
                          <td className="">
                            <b>
                                {idx + 1} 
                            </b>
                          </td>
                          <td className="text-uppercase">
                            <b>
                              {student.firstName} {student.middleName}{" "}
                              {student.lastName}
                            </b>
                          </td>
                         
                          <td className="text-uppercase">
                            <b>{student.registrationNumber}</b>
                          </td>

                          <td>
                            <div className="flex align-items-center list-user-action">
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    {" "}
                                    Student Details
                                  </Tooltip>
                                }
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  to={`${studentsLocations.studentDetails}?studentAccountId=${student.studentAccountId}`}
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
              </Card.Body>
        
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StudentListByClass;

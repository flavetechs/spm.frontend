import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { PrintCSV } from "../../../utils/export-csv";
import { getStudentClassTimeTable, getStudentExamTimeTable } from "../../../store/actions/timetable-actions";
import { timeTableLocations } from "../../../router/students-path-locations";
import { useHistory } from "react-router-dom";


const StudentExamTimeTable = () => {

  //VARIABLE DECLARATIONS
  let history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentselectedExamTimetable } = state.timetable;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getStudentExamTimeTable()(dispatch);
  }, [dispatch]);

  return (
    <>
      <div>
        <Row>
          <Col sm="12" id="student-timetable">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">
                    <span>{`${studentselectedExamTimetable?.className} Exam Timetable`}</span>
                  </h4>
                </div>
                <div>
                  {/* <Button className="text-center btn-primary btn-icon mt-lg-0 mt-md-0 mt-3 ms-2"
                    onClick={() => PrintCSV("student-timetable")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
                      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                      <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                    </svg> {""}
                    <span>Print</span>
                  </Button> */}
                  <Button className="text-center btn-primary btn-icon mt-lg-0 mt-md-0 mt-3 ms-2"
                    onClick={() => {
                      history.push(`${timeTableLocations.printTimeTable}?timetableType=examTimeTable`);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
                      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                      <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                    </svg> {""}
                    <span>Print</span>
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table className="table striped='column' table-bordered border-3 table-striped">
                    <thead className="border border-3">
                      <tr>
                        <th></th>
                        {studentselectedExamTimetable?.timetable?.days?.map((items, index) => (
                          <th className="text-center border border-3" key={index} >
                            {items.day}
                          </th>

                        ))}
                      </tr>
                    </thead>
                    <tbody className="border border-3">
                      {studentselectedExamTimetable?.timetable?.times?.map((item, index) => (
                        <tr key={index}>
                          <td className="border border-3">
                            {item.period}
                          </td>
                          {
                            item?.periodActivities?.map((activityItem, idx) => {
                              return (
                                <td
                                  key={idx}
                                  className="border border-3"
                                >
                                  {activityItem.activity}
                                </td>
                              )

                            })
                          }
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

export default StudentExamTimeTable;

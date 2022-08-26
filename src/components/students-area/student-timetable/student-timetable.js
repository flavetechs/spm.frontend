import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { getStudentTimeTable } from "../../../store/actions/timetable-actions";


const StudentTimeTable = () => {

  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentselectedTimetable } = state.timetable;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getStudentTimeTable()(dispatch);
  }, []);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">
                    <span>{`${studentselectedTimetable?.className} Class Timetable`}</span>
                  </h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table className="table striped='column' table-bordered border-3">
                    <thead>
                      <tr>
                        <th></th>
                        {studentselectedTimetable?.timetable?.days?.map((items, index) => (
                          <th className="text-center" key={index} >{items.day}
                          </th>

                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {studentselectedTimetable?.timetable?.times?.map((item, index) => (
                        <tr key={index}>
                          <td >
                            {item.period}
                          </td>
                          {
                            item?.periodActivities?.map((activityItem, idx) => {
                              return (
                                <td key={idx}
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

export default StudentTimeTable;

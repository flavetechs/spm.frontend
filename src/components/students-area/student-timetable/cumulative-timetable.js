import React, { useState } from "react";
import { Row, Col, Button, OverlayTrigger, Tooltip, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { timeTableLocations } from "../../../router/students-path-locations";
import { getCumulativeExamTimetable, getTimetableActiveClass } from "../../../store/actions/timetable-actions";

const CumulativeTimeTable = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { cumulativeExamTimetable } = state.timetable;
  const { classSubjects } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATION
  const dispatch = useDispatch();
  let history = useHistory();

  //VARIABLE DECLARATION

  React.useEffect(() => {
    getCumulativeExamTimetable()(dispatch);
  }, []);
  const [selectedClassId, setSelectedClassId] = useState("");
  //VARIABLE DECLARATIONS


  React.useEffect(() => {
    getTimetableActiveClass()(dispatch);
  }, ["123", dispatch]);

  return (
    <>
      <Row id="cumulative-exam-timetable">
        <Col sm="12">
          <Card className="mt-0">
            <Card.Header className="d-flex justify-content-between flex-wrap">
              <div className="header-title">
                <h4>{`Cumulative Exam Timetable`}</h4>
              </div>
            </Card.Header>
            <div className="mx-3 mt-2">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
              >
                <svg
                  onClick={() => {
                    history.goBack();
                  }}
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
            </div>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div className="form-group h6 mb-4">
                  <select
                    as="select"
                    name="sessionClassSubjectId"
                    className="form-select"
                    id="sessionClassSubjectId"
                    //   onChange={(e) => {
                    //     setSessionClassSubjectId(
                    //       e.target.value
                    //     );}}
                  >
                    <option value="">Select Subject</option>
                    {classSubjects?.map((item, idx) => (
                      <option key={idx} value={item.sessionClassSubjectId}>
                        {item.subjectName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <Button
                    className="text-center btn-primary btn-icon  mb-md-0 mb-3 ms-0 ms-lg-5"
                    onClick={() => {
                      history.push(
                        `${timeTableLocations.printTimeTable}?timetableType=cumulativeTimeTable`
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-printer"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                      <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                    </svg>{" "}
                    {""}
                    <span>Print</span>
                  </Button>
                </div>
              </div>
              <div className="table-responsive">
                {cumulativeExamTimetable?.map((item) => (
                  <div>
                    <h4 className="mx-2">{item.className}</h4>
                    <table
                      id="role-list-table"
                      className="table striped='column' table-bordered border-3 mb-4"
                    >
                      <thead>
                        <tr>
                          <th>Time</th>
                          {item.timetable.days.map((item, idx) => (
                            <th>{item.day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {item?.timetable.times?.map((item, idx) => (
                          <tr>
                            <td> {item.period}</td>
                            {item?.periodActivities?.map((activity, i) => (
                              <td>{activity.activity}</td>
                            ))}
                          </tr>
                        ))}
                        {/* <td className="text-center" key={index}>
                          {items.className}
                        </td> */}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CumulativeTimeTable;

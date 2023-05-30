import React from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getMyWardsClassTimetable,
  getMyWardsExamTimetable,
} from "../../../store/actions/parent-actions";
import { getCumulativeExamTimetable } from "../../../store/actions/timetable-actions";
import { PrintCSV } from "../../../utils/export-csv";
import Card from "../../Card";

const PrintTimeTable = () => {
  // VARIABLE DECLARATION
  const dispatch = useDispatch();
  const locations = useLocation();
  const history = useHistory();
  // VARIABLE DECLARATION

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { myWardsClassTimetable, myWardsExamTimetable } =
    state.parent;
    const { cumulativeExamTimetable } =  state.timetable;
  // ACCESSING STATE FROM REDUX STORE

  const queryParams = new URLSearchParams(locations.search);
  const classLkIdQuery = queryParams.get("classLkId") || "";
  const wardNameQuery = queryParams.get("ward") || "";
  const timeTableType = queryParams.get("timetableType");
  const timeTable =
    timeTableType === "examTimeTable"
      ? myWardsExamTimetable
      : timeTableType === "classTimeTable"
      ? myWardsClassTimetable
      : timeTableType === "cumulativeTimeTable" && cumulativeExamTimetable;

  React.useEffect(() => {
    if (classLkIdQuery) {
      timeTableType === "examTimeTable"
        ? getMyWardsExamTimetable(classLkIdQuery)(dispatch)
        : timeTableType === "classTimeTable" &&
         getMyWardsClassTimetable(classLkIdQuery)(dispatch)
    }else if( timeTableType === "cumulativeTimeTable"){
          getCumulativeExamTimetable()(dispatch);
    }
  }, [dispatch, classLkIdQuery]);

  React.useEffect(() => {
    PrintCSV("print-student-table");
    setTimeout(() => {
      history.goBack();
    }, 500);
  }, []);
  return (
    <>
      <Row id="print-student-table" style={{ width: "100%" }}>
        <Card className="mt-0">
          <Card.Header className="d-flex justify-content-between flex-wrap">
            <div className="header-title">
              <h4>{`${
                timeTableType === "examTimeTable"
                  ? timeTable?.className + " Exam Timetable"
                  : timeTableType === "cumulativeTimeTable"
                  ? " Cumulative Exam Timetable"
                  : timeTable?.className + " Class Timetable"
              }`}</h4>
            </div>
          </Card.Header>
          <Card.Body>
            <div style={{ width: "100%", overflowX: "auto" }}>
              {timeTableType === "cumulativeTimeTable" ? (
                cumulativeExamTimetable?.map((item) => (
                  <div>
                    <h4 className="mx-2">{item.className}</h4>
                    <table
                      id="role-list-table"
                      className="table striped='column' table-bordered border-3"
                      style={{
                        border: "1px solid rgb(90, 89, 89)",
                        borderCollapse: "collapse",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: 15,
                              backgroundColor: "rgb(74, 72, 72)",
                              color: "white",
                              textAlign: "left",
                            }}
                          >
                            Time
                          </th>
                          {item.timetable.days.map((item, idx) => (
                            <th
                              style={{
                                padding: 15,
                                backgroundColor: "rgb(74, 72, 72)",
                                color: "white",
                                textAlign: "left",
                              }}
                            >
                              {item.day}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {item?.timetable.times?.map((item, idx) => (
                          <tr>
                            <td
                              style={{
                                padding: 15,
                                border: "1px solid rgb(90, 89, 89)",
                                textAlign: "left",
                              }}
                            >
                              {" "}
                              {item.period}
                            </td>
                            {item?.periodActivities?.map((activity, i) => (
                              <td
                                style={{
                                  padding: 15,
                                  border: "1px solid rgb(90, 89, 89)",
                                  textAlign: "left",
                                }}
                              >
                                {activity.activity}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              ) : (
                <table
                  style={{
                    border: "1px solid rgb(90, 89, 89)",
                    borderCollapse: "collapse",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        className="table-th"
                        style={{
                          padding: 15,
                          backgroundColor: "rgb(74, 72, 72)",
                          color: "white",
                          textAlign: "left",
                        }}
                      ></th>
                      {timeTable?.timetable?.days?.map((items, index) => (
                        <th
                          className="table-th"
                          key={index}
                          style={{
                            padding: 15,
                            backgroundColor: "rgb(74, 72, 72)",
                            color: "white",
                            textAlign: "left",
                          }}
                        >
                          {items.day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeTable?.timetable?.times?.map((item, index) => (
                      <tr key={index}>
                        <td
                          className="table-td"
                          style={{
                            padding: 15,
                            border: "1px solid rgb(90, 89, 89)",
                            textAlign: "left",
                          }}
                        >
                          {item.period}
                        </td>
                        {item?.periodActivities?.map((activityItem, idx) => {
                          return (
                            <td
                              style={{
                                padding: 15,
                                border: "1px solid rgb(90, 89, 89)",
                                textAlign: "left",
                                textAlign: "left",
                              }}
                              className="table-td"
                              key={idx}
                            >
                              {activityItem.activity}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};
export default PrintTimeTable;

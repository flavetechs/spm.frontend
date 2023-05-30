import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Card";
import { PrintCSV } from "../../../../utils/export-csv";
import { useHistory, useLocation } from "react-router-dom";
import {
  getAllExamTimetable,
  getAllTimetable,
  getCumulativeExamTimetable,
} from "../../../../store/actions/timetable-actions";
import "./timetable.scss";

const PrintTimeTable = () => {
  const locations = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const queryParams = new URLSearchParams(locations.search);
  const selectedClassId = queryParams.get("selectedClassId");
  const timeTableType = queryParams.get("type");

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedTimetable, selectedExamTimetable, cumulativeExamTimetable } =
    state.timetable;
  // ACCESSING STATE FROM REDUX STORE
  const timeTable =
    timeTableType === "examTimeTable"
      ? selectedExamTimetable
      : timeTableType === "classTimeTable"
      ? selectedTimetable
      : timeTableType === "cumulativeTimeTable" && cumulativeExamTimetable;

  useEffect(() => {
    PrintCSV("printExamTable");
    setTimeout(() => {
      history.goBack();
    }, 500);
  }, []);

  useEffect(() => {
    timeTableType === "examTimeTable"
      ? getAllExamTimetable(selectedClassId)(dispatch)
      : timeTableType === "classTimeTable"
      ? getAllTimetable(selectedClassId)(dispatch)
      : timeTableType === "cumulativeTimeTable" &&
        getCumulativeExamTimetable()(dispatch);
  }, []);

  const filteredCumulativeExamTimetable = cumulativeExamTimetable
    ?.map((item) => item.timetable.days)
    .flat()
    .filter(
      (item, index, self) => index === self.findIndex((t) => t.day === item.day)
    );

  return (
    <>
      <Row id="printExamTable" style={{ width: "100%" }}>
        <Card className="mt-0">
          <Card.Header className="d-flex justify-content-between flex-wrap">
            <div className="header-title">
              <h4>{`${
                timeTableType === "examTimeTable"
                  ? timeTable?.className + " Exam Timetable"
                  : timeTableType === "classTimeTable"
                  ? timeTable?.className + " Class Timetable"
                  : " Cumulative Exam Timetable"
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

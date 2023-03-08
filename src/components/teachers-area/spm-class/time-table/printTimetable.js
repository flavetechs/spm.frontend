import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../Card";
import { PrintCSV } from "../../../../utils/export-csv";
import { useHistory, useLocation } from "react-router-dom";
import { getAllExamTimetable, getAllTimetable } from "../../../../store/actions/timetable-actions";

const PrintTimeTable = () => {
  const locations = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(locations.search);
  const selectedClassId = queryParams.get("selectedClassId");
  const timeTableType = queryParams.get("type");

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedTimetable,selectedExamTimetable } = state.timetable;
  // ACCESSING STATE FROM REDUX STORE
const timeTable =   timeTableType === "examTimeTable" ? selectedExamTimetable : 
timeTableType === "classTimeTable" && selectedTimetable


  useEffect(() => {
    PrintCSV("printExamTable");
  }, []);

  useEffect(() => {
    timeTableType === "examTimeTable" ?
    getAllExamTimetable(selectedClassId)(dispatch):
    timeTableType === "classTimeTable" &&
    getAllTimetable(selectedClassId)(dispatch)
  }, []);

  return (
    <>
      <Row id="printExamTable" style={{ width: "100%" }}>
        <Card className="mt-0">
          <Card.Header className="d-flex justify-content-between flex-wrap">
            <div className="header-title">
              <h4>{`${timeTable?.className} Class Timetable`}</h4>
            </div>
          </Card.Header>
          <Card.Body>
            <div style={{ width: "100%", overflowX: "auto" }}>
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
            </div>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
};
export default PrintTimeTable;

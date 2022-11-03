import React, { useEffect, useRef, useState } from "react";
import { Row, Button, Table, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  respondDialog,
  showHideDialog,
} from "../../../store/actions/toaster-actions";
import { ExportCSV, PrintCSV } from "../../../utils/export-csv";
import { hasAccess, NavPermissions } from "../../../utils/permissions";
import MasterListSmallTable from "./master-list-small-table";

const MasterListLargeTable = ({ masterEntry, setShowMasterListTable }) => {
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dialogResponse } = state.alert;

  if (masterEntry?.resultList === null) {
    masterEntry.resultList = [];
  }

  const subjectList = masterEntry?.resultList
    .map((result, idx) => result.subjects)
    .flat();
  const filteredSubjectList = subjectList?.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.subjectName === item.subjectName)
  );
  useEffect(() => {
    if (dialogResponse === "continue") {
      PrintCSV("master-list");
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
    }
    return () => {
      respondDialog("")(dispatch);
      showHideDialog(false, null)(dispatch);
    };
  }, [dialogResponse, dispatch]);

  return (
    <>
      <div id="master-list" ref={tableRef}>
      <MasterListSmallTable
        masterEntry={masterEntry}
        setShowMasterListTable={setShowMasterListTable}
      />
      <Row className="pt-3"style={{paddingTop:"15px"}}>
        <div className="d-flex justify-content-end"  style={{display:"flex",justifyContent:"flex-end"}}>
          {hasAccess(NavPermissions.exportMasterList) && (
            <Button
              type="button"
              className="btn-sm mx-2 d-flex"
              style={{display:"flex"}}
              variant="btn btn-success"
              onClick={() => setShowMenuDropdown(!showMenuDropdown)}
            >
              <div>Export</div>
              <div className="dropdown show px-1">
                <svg
                  width="10"
                  fill="white"
                  viewBox="0 0 320 512"
                  onClick={() => setShowMenuDropdown(!showMenuDropdown)}
                >
                  <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                </svg>
                {showMenuDropdown && (
                  <div
                    x-placement="bottom-start"
                    aria-labelledby=""
                    className="dropdown-menu show"
                    style={{
                      position: "absolute",
                      inset: "-25px auto auto -100px",
                      transform: "translate(0px, 42px)",
                    }}
                    data-popper-placement="bottom-end"
                    data-popper-escaped="false"
                    data-popper-reference-hidden="false"
                  >
                    {/* <div
                      onClick={() => {
                        // ExportCSV("master-list", "master-list");
                        setShowMenuDropdown(false);
                      }}
                      className="dropdown-item"
                      role="button"
                      draggable="false"
                    >
                      Excel
                    </div> */}
                    <div
                      onClick={() => {
                        showHideDialog(
                          true,
                          "Are you sure you want to print result"
                        )(dispatch);
                      }}
                      className="dropdown-item"
                      role="button"
                      draggable="false"
                    >
                      Print
                    </div>
                    {/* <div
                    onClick={() => {
                      setShowMenuDropdown(false);
                    }}
                    className="dropdown-item"
                    role="button"
                    draggable="false"
                  >
                    Word
                  </div>
                  <div
                    onClick={() => {}}
                    className="dropdown-item"
                    role="button"
                    draggable="false"
                  >
                    PDF
                  </div> */}
                  </div>
                )}
              </div>
            </Button>
          )}
        </div>
       
          <Table size="md" bordered responsive className="mt-2"  style={{border:"1px solid black" ,borderCollapse:"collapse"}} >
            <thead>
              <tr
                className="text-center"
                style={{ background: "#d8efd1", textTransform: "uppercase" }}
              >
                <td
                  className=" h6 px-2"
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "80px",
                    border: "1px solid grey",
                  }}
                >
                  S/No
                </td>
                <td
                  className="h6 px-2"
                  colSpan={3}
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "80px",
                    border: "1px solid grey",
                  }}
                >
                  Student Name
                </td>
                <td
                  className=" h6 px-2"
                  colSpan={3}
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "80px",
                    border: "1px solid grey",
                  }}
                >
                  Registration No
                </td>
                <td
                  className=" h6 px-2"
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "80px",
                    border: "1px solid grey",
                  }}
                >
                  Position
                </td>
                <td
                  className=" h6 px-2"
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "80px",
                    border: "1px solid grey",
                  }}
                >
                  Total Subjects Offered
                </td>
                <td
                  className=" h6 px-2"
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "80px",
                    border: "1px solid grey",
                  }}
                >
                  Total Score
                </td>
                <td
                  className=" h6 px-2"
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "80px",
                    border: "1px solid grey",
                  }}
                >
                  Average Score
                </td>
                <td
                  className="h6 px-2"
                  style={{
                    whiteSpace: "pre-wrap",
                    width: "80px",
                    border: "1px solid grey",
                  }}
                >
                  Result Status
                </td>
                {filteredSubjectList?.map((subject, idx) => (
                  <td
                    colSpan="3"
                    className=" h6"
                    style={{ border: "1px solid grey" }}
                    key={idx}
                  >
                    {subject.subjectName}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="12" style={{ border: "1px solid grey" }}></td>
                {filteredSubjectList?.map((subject) => (
                  <>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        maxWidth: "5px",
                        padding: 2,
                        border: "1px solid grey",
                      }}
                    >
                      C.A
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        maxWidth: "5px",
                        padding: 2,
                        border: "1px solid grey",
                      }}
                    >
                      Exam
                    </td>
                    <td
                      style={{
                        writingMode: "vertical-rl",
                        maxWidth: "5px",
                        padding: 2,
                        border: "1px solid grey",
                      }}
                    >
                      Total
                    </td>
                  </>
                ))}
              </tr>
              {masterEntry?.resultList.map((item, index) => (
                <tr
                  style={{ maxHeight: "30px", textTransform: "uppercase" }}
                  key={index}
                  className="text-center"
                >
                  <td className="fw-bold" style={{ border: "1px solid grey" }}>
                    {index + 1}
                  </td>
                  <td
                    className="fw-bold text-start"
                    style={{ border: "1px solid grey" }}
                    colSpan={3}
                  >
                    {item.studentName}
                  </td>
                  <td
                    className="fw-bold text-start"
                    style={{ border: "1px solid grey" }}
                    colSpan={3}
                  >
                    {item.registrationNumber}
                  </td>
                  <td className="fw-bold" style={{ border: "1px solid grey" }}>
                    {item.position}
                  </td>
                  <td className="fw-bold" style={{ border: "1px solid grey" }}>
                    {item.totalSubjects}
                  </td>
                  <td className="fw-bold" style={{ border: "1px solid grey" }}>
                    {item.totalScore}
                  </td>
                  <td className="fw-bold" style={{ border: "1px solid grey" }}>
                    {item.averageScore}
                  </td>
                  <td className="fw-bold" style={{ border: "1px solid grey" }}>
                    <Badge bg={item.status === "PASSED" ? "success" : "danger"}>
                      {item.status}
                    </Badge>
                  </td>

                  {filteredSubjectList.map((filtered) => (
                    <>
                      <td className="px-3" style={{ border: "1px solid grey" }}>
                        {item.subjects.find(
                          (subject) =>
                            subject.subjectName === filtered.subjectName
                        )
                          ? item.subjects.map(
                              (i) =>
                                i.subjectName === filtered.subjectName &&
                                i.assessmentScore
                            )
                          : ""}
                      </td>

                      <td className="px-3" style={{ border: "1px solid grey" }}>
                        {item.subjects.find(
                          (subject) =>
                            subject.subjectName === filtered.subjectName
                        )
                          ? item.subjects.map(
                              (i) =>
                                i.subjectName === filtered.subjectName &&
                                i.examScore
                            )
                          : ""}
                      </td>

                      <td className="px-3" style={{ border: "1px solid grey" }}>
                        {item.subjects.find(
                          (subject) =>
                            subject.subjectName === filtered.subjectName
                        )
                          ? item.subjects.map(
                              (i) =>
                                i.subjectName === filtered.subjectName &&
                                i.total
                            )
                          : ""}
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        
      </Row>
      </div>
    </>
  );
};

export default MasterListLargeTable;

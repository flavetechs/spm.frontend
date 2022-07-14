import React, { useRef } from "react";
import { Row, Button, Table, Badge } from "react-bootstrap";
import { ExportCSV } from "../../utils/export-csv";


const MasterListLargeTable = ({ masterEntry }) => {
  const tableRef = useRef(null);

  if (masterEntry?.resultList == null) {
    masterEntry.resultList = [];
  }

  const subjectList = masterEntry?.resultList
    .map((result, idx) => result.subjects)
    .flat();
  const filteredSubjectList = subjectList.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.subjectName === item.subjectName)
  );

  return (
    <>
   
      <Row className="pt-3">
        <div className="d-flex justify-content-end">

          <Button
            type="button"
            className="btn-sm mx-2"
            variant="btn btn-success"
            onClick={() => {
              ExportCSV('master-list', 'master-list')
            }}
          >
            Download
          </Button>
        </div>

        <Table
          size="md"
          bordered
          responsive
          className="mt-2"
          id="master-list"
          style={{border: "1px solid grey"}}
          ref={tableRef}
        >
          <thead>
            <tr className="text-center" style={{ background: "#d8efd1",textTransform: "uppercase" }}>
              <td
                className=" h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px"}}
              >
                S/No
              </td>
              <td
                className="h6 px-2"
                colSpan={3}
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Student Name
              </td>
              <td
                className=" h6 px-2"
                colSpan={3}
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Registration No
              </td>
              <td
                className=" h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Position
              </td>
              <td
                className=" h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Total Subjects Offered
              </td>
              <td
                className=" h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Total Score
              </td>
              <td
                className=" h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Average Score
              </td>
              <td
                className="h6 px-2"
                style={{ whiteSpace: "pre-wrap", width: "80px" }}
              >
                Result Status
              </td>
              {filteredSubjectList?.map((subject, idx) => (
                <td colSpan="3" className=" h6" key={idx}>
                  {subject.subjectName}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="12"></td>
              {filteredSubjectList?.map((subject, idx) => (
                <>
                  <td
                    style={{
                      writingMode: "vertical-rl",
                      maxWidth: "5px",
                      padding: 2,
                    }}
                  >
                    C.A
                  </td>
                  <td
                    style={{
                      writingMode: "vertical-rl",
                      maxWidth: "5px",
                      padding: 2,
                    }}
                  >
                    Exam
                  </td>
                  <td
                    style={{
                      writingMode: "vertical-rl",
                      maxWidth: "5px",
                      padding: 2,
                    }}
                  >
                    Total
                  </td>
                </>
              ))}
            </tr>
            {masterEntry?.resultList.map((item, index) => (
              <tr
                style={{ maxHeight: "30px",textTransform: "uppercase" }}
                key={index}
                className="text-center"
              >
                <td className="fw-bold">{index + 1}</td>
                <td className="fw-bold text-start" colSpan={3}>{item.studentName}</td>
                <td className="fw-bold text-start" colSpan={3}>
                  {item.registrationNumber}
                </td>
                <td className="fw-bold">{item.position}</td>
                <td className="fw-bold">{item.totalSubjects}</td>
                <td className="fw-bold">{item.totalScore}</td>
                <td className="fw-bold">{item.averageScore}</td>
                <td className="fw-bold">
                  <Badge bg={item.status == "PASSED" ? "success" : "danger"}>
                    {item.status}
                  </Badge>
                </td>

                {filteredSubjectList.map((filtered, id) => (
                  <>
                    <td className="px-3">
                      {item.subjects.find(
                        (subject) => subject.subjectName == filtered.subjectName
                      )
                        ? item.subjects.map(
                            (i) =>
                              i.subjectName == filtered.subjectName &&
                              i.assessmentScore
                          )
                        : ""}
                    </td>

                    <td className="px-3">
                      {item.subjects.find(
                        (subject) => subject.subjectName == filtered.subjectName
                      )
                        ? item.subjects.map(
                            (i) =>
                              i.subjectName == filtered.subjectName && i.examScore
                          )
                        : ""}
                    </td>

                    <td className="px-3">
                      {item.subjects.find(
                        (subject) => subject.subjectName == filtered.subjectName
                      )
                        ? item.subjects.map(
                            (i) => i.subjectName == filtered.subjectName && i.total
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
    </>
  );
};

export default MasterListLargeTable;

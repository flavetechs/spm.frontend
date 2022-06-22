import { useRef } from "react";
import { Row, Button, Table, Badge } from "react-bootstrap";
// import { useDownloadExcel } from "react-export-table-to-excel";

const MasterListLargeTable = ({ listEntry }) => {
  const tableRef = useRef(null);
//   const { onDownload } = useDownloadExcel({
//     currentTableRef: tableRef.current,
//     filename: "Master-list Table",
//     sheet: "Result List"
// });

  if (listEntry?.resultList == null) {
    listEntry.resultList = [];
  }
  const list = listEntry?.resultList.map((list, idx) => list.subjects);
  const subjectList = list
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.subjectName === item.subjectName)
    )
    .flat();

  return (
    <>
      <Row className="pt-3">
        <div className="d-flex justify-content-end">
            <Button
              type="button"
              className="btn-sm mx-2"
              variant="btn btn-success"
              // onClick={onDownload}
            >
              Download
            </Button>
        </div>

        <Table size="md" bordered responsive className="mt-2 border-secondary" ref={tableRef}>
          <thead>
            <tr className="text-center" style={{ background: "#d8efd1" }}>
              <td className="text-uppercase h6 px-2">S/No</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Student Name</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Registration No</td>
              <td className="text-uppercase h6 px-2">Position</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Total Subjects Offered</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Total Score</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Average Score</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Result Status</td>
              {subjectList?.map((subject, idx) => (
                <td colspan="3" className="text-uppercase h6">
                  {subject.subjectName}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="8"></td>
              {subjectList?.map((subject, idx) => (
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
            {listEntry?.resultList.map((item, index) => (
              <tr
                style={{ maxHeight: "30px" }}
                key={index}
                className="text-center"
              >
                <td className="fw-bold">{index + 1}</td>
                <td className="fw-bold text-start">{item.studentName}</td>
                <td className="fw-bold text-start">
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

                {item.subjects.map((subject, idx) => (
                  <>
                    <td className="px-3">{subject.assessmentScore}</td>
                    <td className="px-3">{subject.examScore}</td>
                    <td className="px-3">{subject.total}</td>
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

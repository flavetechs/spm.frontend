import React, { useRef } from "react";
import { Row, Button, Table, Badge } from "react-bootstrap";
// import { useDownloadExcel } from "react-export-table-to-excel";

const CumulativeMasterListLargeTable = ({ cumulativeListEntry }) => {
  const tableRef = useRef(null);
//   const { onDownload } = useDownloadExcel({
//     currentTableRef: tableRef.current,
//     filename: "Master-list Table",
//     sheet: "Result List"
// });

  if (cumulativeListEntry?.resultList == null) {
   cumulativeListEntry.resultList = [];
  }
  const list = cumulativeListEntry?.resultList.map((list, idx) => list.subjects).flat();
  const subjectList = list.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.subjectName === item.subjectName)
    )
    
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
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>S/No</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Student Name</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Registration No</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Position</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Result Status</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}} colSpan="3">Term Cumulative Ave. Score</td>
              <td className="text-uppercase h6 px-2" style={{whiteSpace: 'pre-wrap', width:'80px'}}>Cumulative Average Score</td>
              {subjectList?.map((subject, idx) => (
                <td colSpan="3" className="text-uppercase h6" key={idx}>
                  {subject.subjectName}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5"></td>
                <>
                  <td style={{ writingMode: "vertical-rl", maxWidth: "5px", padding: 2 }}>
                    1st
                  </td>
                  <td style={{ writingMode: "vertical-rl",maxWidth: "5px",padding: 2 }}>
                    2nd
                  </td>
                  <td
                    style={{writingMode: "vertical-rl",maxWidth: "5px",padding: 2 }}>
                    3rd
                  </td>
                </>
              <td></td>
              {subjectList?.map((subject, idx) => (
                <>
                  <td style={{ writingMode: "vertical-rl", maxWidth: "5px", padding: 2 }}>
                    1st
                  </td>
                  <td style={{ writingMode: "vertical-rl",maxWidth: "5px",padding: 2 }}>
                    2nd
                  </td>
                  <td
                    style={{writingMode: "vertical-rl",maxWidth: "5px",padding: 2 }}>
                    3rd
                  </td>
                </>
              ))}
            </tr>
            {cumulativeListEntry?.resultList.map((item, index) => (
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
                <td className="fw-bold">
                  <Badge bg={item.status == "PASSED" ? "success" : "danger"}>
                    {item.status}
                  </Badge>
                </td>
                <>
                <td>{item.totalScore}</td>
                <td>{item.totalScore}</td>
                <td>{item.totalScore}</td>
                </>
                <td className="fw-bold">{item.averageScore}</td>
                
 {subjectList.map((list, id) => (
                  <>
                    <td className="px-3">{item.subjects.find(subject=>subject.subjectName == list.subjectName) ? 
                   item.subjects.map(i=>i.subjectName == list.subjectName && i.assessmentScore) : ""}</td>

                     <td className="px-3">{item.subjects.find(subject=>subject.subjectName == list.subjectName) ?
                     item.subjects.map(i=>i.subjectName == list.subjectName && i.examScore) : ""}</td>

                    <td className="px-3">{item.subjects.find(subject=>subject.subjectName == list.subjectName) ?
                   item.subjects.map(i=>i.subjectName == list.subjectName && i.total) : ""} </td> 
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

export default CumulativeMasterListLargeTable;

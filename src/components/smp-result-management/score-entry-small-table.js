import { Row, Table } from "react-bootstrap";

const SmallTable = ({ scoreEntries, subjectId }) => {
  return (
    <>
      <div>
        <Row className="pt-3">
          <Table responsive bordered size="sm" className="w-50">
            {scoreEntries
              ?.filter((entry) => entry.subjectId == subjectId)
              .map((subject, idx) => (
                <tbody key={idx}>
                  <tr>
                    <th className="h6">Class Name</th>
                    <td className="fw-bold">{subject.sessionClassName}</td>
                  </tr>
                  <tr>
                    <th className="h6">Subject Name</th>
                    <td className="fw-bold">{subject.subjectName}</td>
                  </tr>
                  <tr>
                    <th className="h6">Subject Teacher</th>
                    <td className="fw-bold">{subject.subjectTeacher}</td>
                  </tr>
                  <tr>
                    <th className="h6">Test Score</th>
                    <td className="fw-bold">{subject.assessmentScore}</td>
                  </tr>
                  <tr>
                    <th className="h6">Exam Score</th>
                    <td className="fw-bold">{subject.examsScore}</td>
                  </tr>
                </tbody>
              ))}
          </Table>
        </Row>
      </div>
    </>
  );
};

export default SmallTable;

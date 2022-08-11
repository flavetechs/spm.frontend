import { Row, Table } from "react-bootstrap";

const AdminSmallTable = ({ previousScoreEntry }) => {
  return (
    <>
      <div>
        <Row className="pt-3">
          <Table responsive bordered size="sm" className="w-50" style={{ background: '#d8efd1'}}>
            <tbody>
              <tr>
                <th className="h6">Class Name</th>
                <td className="fw-bold">{previousScoreEntry?.sessionClassName}</td>
              </tr>
              <tr>
                <th className="h6 ">Subject Name</th>
                <td className="fw-bold text-capitalize">{previousScoreEntry?.subjectName}</td>
              </tr>
              <tr>
                <th className="h6 ">Subject Teacher</th>
                <td className="fw-bold text-capitalize">{previousScoreEntry?.subjectTeacher}</td>
              </tr>
              <tr>
                <th className="h6">Assessment Score</th>
                <td className="fw-bold">{previousScoreEntry?.assessmentScore}</td>
              </tr>
              <tr>
                <th className="h6">Exam Score</th>
                <td className="fw-bold">{previousScoreEntry?.examsScore}</td>
              </tr>
            </tbody>


          </Table>
        </Row>
      </div>
    </>
  );
};

export default AdminSmallTable;

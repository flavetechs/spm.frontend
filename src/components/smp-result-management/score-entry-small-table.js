import { Row, Table } from "react-bootstrap";

const SmallTable = ({ scoreEntry }) => {
  return (
    <>
      <div>
        <Row className="pt-3">
          <Table responsive bordered size="sm" className="w-50">
            <tbody>
              <tr>
                <th className="h6">Class Name</th>
                <td className="fw-bold">{scoreEntry?.sessionClassName}</td>
              </tr>
              <tr>
                <th className="h6 ">Subject Name</th>
                <td className="fw-bold text-capitalize">{scoreEntry?.subjectName}</td>
              </tr>
              <tr>
                <th className="h6 ">Subject Teacher</th>
                <td className="fw-bold text-capitalize">{scoreEntry?.subjectTeacher}</td>
              </tr>
              <tr>
                <th className="h6">Assessment Score</th>
                <td className="fw-bold">{scoreEntry?.assessmentScore}</td>
              </tr>
              <tr>
                <th className="h6">Exam Score</th>
                <td className="fw-bold">{scoreEntry?.examsScore}</td>
              </tr>
            </tbody>


          </Table>
        </Row>
      </div>
    </>
  );
};

export default SmallTable;

import { Row, Table } from "react-bootstrap";

const SmallTable = ({ scoreEntry }) => {
  return (
    <>
      <div>
        <Row className="pt-3">
          <Table responsive bordered size="sm" className="w-50" style={{ background: '#d8efd1'}}>
            <tbody>
              <tr>
                <th className="h6">Class Name</th>
                <th className="fw-bold h6">{scoreEntry?.sessionClassName}</th>
              </tr>
              <tr>
                <th className="h6 ">Subject Name</th>
                <th className="fw-bold text-capitalize h6">{scoreEntry?.subjectName}</th>
              </tr>
              <tr>
                <th className="h6 ">Subject Teacher</th>
                <th className="fw-bold text-capitalize h6">{scoreEntry?.subjectTeacher}</th>
              </tr>
              <tr>
                <th className="h6">Assessment Score</th>
                <th className="fw-bold h6">{scoreEntry?.assessmentScore}</th>
              </tr>
              <tr>
                <th className="h6">Exam Score</th>
                <th className="fw-bold h6">{scoreEntry?.examsScore}</th>
              </tr>
            </tbody>
          </Table>
        </Row>
      </div>
    </>
  );
};

export default SmallTable;

import { Button, Row, Table } from "react-bootstrap";

const MasterListSmallTable = ({ masterEntry, setShowMasterListTable}) => {
  return (
    <>
      <div>
       <Button variant="btn btn-success btn-sm" onClick={()=> setShowMasterListTable(false)}>
          Back
        </Button>
        <Row className="pt-3">
          <Table size="sm" responsive bordered className="w-50 border-secondary" style={{ background: '#d8efd1'}}>
            <tbody>
              <tr>
                <th className="h6">Session</th>
                <td className="fw-bold">{masterEntry?.session}</td>
              </tr>
              <tr>
                <th className="h6">Term</th>
                <td className="fw-bold text-capitalize">{masterEntry?.termName}</td>
              </tr>
              <tr>
                <th className="h6">Class</th>
                <td className="fw-bold text-capitalize">{masterEntry?.sessionClass}</td>
              </tr>
              <tr>
                <th className="h6">Form Teacher</th>
                <td className="fw-bold text-capitalize">{masterEntry?.formTeacher}</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </div>
    </>
  );
};

export default MasterListSmallTable;

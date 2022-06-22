import { Row, Table } from "react-bootstrap";

const MasterListSmallTable = ({listEntry}) => {
  return (
    <>
      <div>
        <Row className="pt-3">
          <Table responsive bordered size="sm" className="w-50" style={{ background: '#d8efd1'}}>
            <tbody>
              <tr>
                <th className="h6">Session</th>
                <td className="fw-bold">{listEntry?.session}</td>
              </tr>
              <tr>
                <th className="h6 ">Term</th>
                <td className="fw-bold text-capitalize">{listEntry?.termName}</td>
              </tr>
              <tr>
                <th className="h6 ">Form Teacher</th>
                <td className="fw-bold text-capitalize">{listEntry?.formTeacher}</td>
              </tr>
            </tbody>


          </Table>
        </Row>
      </div>
    </>
  );
};

export default MasterListSmallTable;

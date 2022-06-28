import { Row, Table } from "react-bootstrap";

const PublishResultEditTable = ({publishSingleStudent}) => {
  return (
    <>
      <div>
        <Row className="pt-5">
          <Table responsive bordered size="sm" className="w-50 table-bordered border-dark" style={{ background: '#d8efd1'}}>
            <tbody>
              <tr>
                <th className="fw-bold h6 text-uppercase">Student Name</th>
                <td className="fw-bold text-uppercase">{publishSingleStudent?.studentName}</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">Student Reg No.</th>
                <td className="fw-bold text-uppercase">{publishSingleStudent?.registrationNumber}</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">Class Name</th>
                <td className="fw-bold text-uppercase">{publishSingleStudent?.sessionClassName}</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">Form Teacher</th>
                <td className="fw-bold text-uppercase">Festus Chima</td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </div>
    </>
  );
};

export default PublishResultEditTable;

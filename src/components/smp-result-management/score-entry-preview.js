import { Button, Row, Table } from "react-bootstrap";

const Preview = ({ scoreEntry, setPreviewMode, isPreviewMode }) => {
  return (
    <>
      <Row className="pt-3">
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="btn-sm mx-2"
            variant="btn btn-success"
            onClick={() => {
              setPreviewMode(!isPreviewMode);
            }}
          >
            Close Preview
          </Button>
        </div>
        <Table size="md" bordered responsive className="mt-2">
          <thead>
            <tr className="text-center">
              <td className="text-uppercase h6">S/No</td>
              <td className="text-uppercase h6">Students Full Name</td>
              <td className="text-uppercase h6">Student Registration No</td>
              <td className="text-uppercase h6">Exam score</td>
              <td className="text-uppercase h6">Assessment score</td>
              <td className="text-uppercase h6 px-2">Total Score</td>
              <td className="text-uppercase h6 px-2">Grade</td>
              <td className="text-uppercase h6 px-2">Remark</td>
              <td className="text-uppercase h6 px-2">Is Offered</td>
            </tr>
          </thead>
          <tbody>
            {scoreEntry?.classScoreEntries.map((item, index) => (
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

                <td
                  className="fw-bold text-center"
                  style={{ maxWidth: "150px" }}
                >
                  {item.examsScore}
                </td>

                <td
                  className="fw-bold text-center"
                  style={{ maxWidth: "150px" }}
                >
                  {item.assessmentScore}
                </td>
                <td className="fw-bold text-center">
                  {+item.examsScore + +item.assessmentScore}
                </td>
                <td></td>
                <td></td>
                <td style={{ width: "5px" }}>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={item.isOffered}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default Preview;

import { Row, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Formik, Field } from "formik";

const LargeTable = ({
  validation,
  scoreEntries,
  subjectId,
  editClick,
  setEditClick,
  setIdentifier,
  identifier,
}) => {
  return (
    <>
      <Row className="pt-3">
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="btn-sm"
            variant="btn btn-primary"
            onClick={() => {}}
          >
            Save
          </Button>
          <Button
            type="button"
            className="btn-sm mx-2"
            variant="btn btn-success"
            onClick={() => {}}
          >
            Preview
          </Button>
        </div>

        <Formik
          initialValues={{ examScore: 0, assessment: 0 }}
          validationSchema={validation}
          enableReinitialize={true}
          onSubmit={(values) => {}}
        >
          {({
            handleSubmit,
            values,
            setFieldValue,
            touched,
            errors,
            isValid,
          }) => (
            <Table size="md" hover bordered responsive className="mt-2">
              <thead>
                <tr className="text-center">
                  <td className="text-uppercase h6">S/No</td>
                  <td className="text-uppercase h6">Students Full Name</td>
                  <td className="text-uppercase h6">Student Registration No</td>
                  <td className="text-uppercase h6">Exam score</td>
                  <td className="text-uppercase h6">Assessment score</td>
                  <td className="text-uppercase h6 px-2">Is Offered</td>
                </tr>
              </thead>
              <tbody>
                {scoreEntries
                  ?.filter((entry) => entry.subjectId == subjectId)
                  .map((entry, idx) =>
                    entry.classScoreEntries.map((list, index) => (
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          !editClick ? (
                            <Tooltip id="button-tooltip-2">
                              double click to edit
                            </Tooltip>
                          ) : (
                            <Tooltip id="button-tooltip-2">
                              double click to close edit
                            </Tooltip>
                          )
                        }
                      >
                        <tr
                          key={index}
                          className="text-center"
                          onDoubleClick={() => {
                            setEditClick(!editClick);
                            setIdentifier(index);
                          }}
                        >
                          <td className="fw-bold">{index + 1}</td>
                          <td className="fw-bold text-start">
                            {list.studentName}
                          </td>
                          <td className="fw-bold text-start">
                            {list.registrationNumber}
                          </td>
                          {!editClick ? (
                            <td className="fw-bold">{list.examsScore}</td>
                          ) : (
                            <td
                              className="fw-bold text-center"
                              onDoubleClick={() => {
                                setEditClick(!editClick);
                              }}
                            >
                              {identifier == index && (
                                <Field
                                  className="w-50 text-center"
                                  type="text"
                                  name="examScore"
                                  onChange={(e) => {
                                    setFieldValue("examScore", e.target.value);
                                  }}
                                />
                              )}
                            </td>
                          )}
                          {!editClick ? (
                            <td className="fw-bold">{list.assessmentScore}</td>
                          ) : (
                            <td
                              className="fw-bold text-center"
                              onDoubleClick={() => {
                                setEditClick(!editClick);
                              }}
                            >
                              {identifier == index && (
                                <Field
                                  className="text-center w-50"
                                  type="text"
                                  name="assessment"
                                  onChange={(e) => {
                                    setFieldValue("assessment", e.target.value);
                                  }}
                                />
                              )}
                            </td>
                          )}
                          <td style={{ width: "5px" }}>
                            {" "}
                            {identifier == index && (
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                  values.assessment > 0 || values.examScore > 0
                                }
                              />
                            )}
                          </td>
                          <td>{/*spinner*/}</td>
                        </tr>
                      </OverlayTrigger>
                    ))
                  )}
              </tbody>
            </Table>
          )}
        </Formik>
      </Row>
    </>
  );
};

export default LargeTable;

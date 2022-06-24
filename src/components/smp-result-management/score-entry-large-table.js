import { Row, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Formik, Field } from "formik";
import { setAssessmentScoreEntry, setExamScoreEntry } from "../../store/actions/results-actions";
import { useDispatch } from "react-redux";
import { getAllClassScoreEntryPreview } from "../../store/actions/results-actions";

const LargeTable = ({
  validation,
  scoreEntry,
  isEditMode,
  setEditMode,
  setIndexRow,
  setPreviewMode,
  indexRow,
  isPreviewMode,
  idsForPreview,
}) => {

  console.log('scoreEntry', scoreEntry);

  const dispatch = useDispatch();
  const handleFocus = (event) => event.target.select();

  return (
    <>
      <Row className="pt-3">
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="btn-sm mx-2"
            variant="btn btn-success"
            onClick={() => {
              setEditMode(false);
              setPreviewMode(!isPreviewMode);
              getAllClassScoreEntryPreview(
                idsForPreview.sessionClassId,
                idsForPreview.subjectId
              )(dispatch);
            }}
          >
            Preview
          </Button>
        </div>

        <Formik
          initialValues={{ examScore: 0, assessmentScore: 0 }}
          validationSchema={validation}
          enableReinitialize={true}
          onSubmit={(values) => { }}
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
                <tr className="text-center" style={{background:'#d8efd1'}}>
                  <td className="text-uppercase h6">S/No</td>
                  <td className="text-uppercase h6 text-start">Students Full Name</td>
                  <td className="text-uppercase h6 text-start">Student Registration No</td>
                  <td className="text-uppercase h6">Assessment score</td>
                  <td className="text-uppercase h6">Exam score</td>
                  <td className="text-uppercase h6 px-2">Is Offered</td>
                  <td className="text-uppercase h6 px-2">Status</td>
                </tr>
              </thead>
              <tbody>
                {
                  scoreEntry?.classScoreEntries.map((item, index) => (

                    <OverlayTrigger
                      key={index}
                      placement="top"
                      overlay={!isEditMode ? (
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
                        style={{ maxHeight: '30px' }}
                        key={index}
                        className="text-center"
                        onDoubleClick={() => {
                          setEditMode(!isEditMode);
                          setIndexRow(index);
                        }}
                      >
                        <td className="fw-bold">{index + 1}</td>
                        <td className="fw-bold text-start">
                          {item.studentName}
                        </td>
                        <td className="fw-bold text-start">
                          {item.registrationNumber}
                        </td>

                        <td className="fw-bold text-center" style={{ maxWidth: '150px' }}>

                          {!isEditMode ? (
                            <span className="fw-bold">{item.assessmentScore}</span>
                          ) : (
                            indexRow == index ? (
                              <Field
                                style={{ maxHeight: '25px', maxWidth: '120px', height: '25px', zIndex: 1000 }}
                                className="fw-bold"
                                type="text"
                                maxLength={scoreEntry?.assessmentScore}
                                name={`${item.studentContactId}_assessmentScore`}
                                defaultValue={item.assessmentScore}
                                onFocus={handleFocus}
                                onChange={(e) => {
                                  setFieldValue(`${item.studentContactId}_assessmentScore`, e.target.value);
                                }}
                                onBlur={(e) => {
                                  setAssessmentScoreEntry(item.studentContactId, e.target.value, scoreEntry)(dispatch);
                                }}
                              />
                            ) : (
                              <span className="fw-bold">{item.assessmentScore}</span>
                            )
                          )}
                        </td>

                        <td className="fw-bold text-center" style={{ maxWidth: '150px' }} >

                          {!isEditMode ? (
                            <span className="fw-bold">{item.examsScore}</span>
                          ) : (
                            indexRow == index ? (
                              <Field
                                style={{ maxHeight: '25px', maxWidth: '120px', height: '25px', zIndex: 1000 }}
                                className=" fw-bold "
                                type="text"
                                maxLength={scoreEntry?.examsScore}
                                name={`${item.studentContactId}_examScore`}
                                defaultValue={item.examsScore}
                                onFocus={handleFocus}
                                onChange={(e) => {
                                  setFieldValue(`${item.studentContactId}_examScore`, e.target.value);
                                }}
                                onBlur={(e) => {
                                  setExamScoreEntry(item.studentContactId, e.target.value, scoreEntry)(dispatch);
                                }}
                              />
                            ) : (
                              <span className="fw-bold">{item.examsScore}</span>
                            )
                          )}
                        </td>


                        <td style={{ width: "5px" }}>
                          {" "}
                          <Field
                            type="checkbox"
                            className="form-check-input"
                            checked={item.isOffered}
                          />
                        </td>
                        <td>

                          {item.isSaved ?
                            <span style={{ color: 'green' }}>
                              <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>
                            :
                            <span>
                              <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M21.25 12.0005C21.25 17.1095 17.109 21.2505 12 21.2505C6.891 21.2505 2.75 17.1095 2.75 12.0005C2.75 6.89149 6.891 2.75049 12 2.75049C17.109 2.75049 21.25 6.89149 21.25 12.0005Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M15.4316 14.9429L11.6616 12.6939V7.84692" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                            </span>}
                        </td>
                      </tr>

                    </OverlayTrigger>

                  ))
                }
              </tbody>
            </Table>
          )}
        </Formik>
      </Row>
    </>
  );
};

export default LargeTable;

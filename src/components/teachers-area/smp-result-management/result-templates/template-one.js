import { useEffect, useRef } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAllStudentResult, resetStudentResultState } from "../../../../store/actions/results-actions";
import Card from "../../../Card";

const ResultTemplateOne = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentResult } = state.results;
  const locations = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  // ACCESSING STATE FROM REDUX STORE
  useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const studentContactId = queryParams.get("studentContactId");
    const sessionClassId = queryParams.get("sessionClassId");
    const termId = queryParams.get("termId");
   if(termId){
    getAllStudentResult(
      sessionClassId,
      termId,
      studentContactId
    )(dispatch);

   }
  }, []);

  return (
    <>
      <div className="col-md-12 mx-auto" id="result-table" ref={tableRef}>
        <Row>
          <Col sm="12">
            <Card>
              <div>
                <Row>
                  <div className="m-4">
                    <Button
                      variant="btn btn-danger btn-sm"
                      onClick={() => {
                        history.goBack();
                        resetStudentResultState()(dispatch);
                      }}
                    >
                      Back
                    </Button>
                    {!studentResult?.isPreview && (
                      <Button
                        variant="btn btn-primary btn-sm mx-2"
                        onClick={() => {}}
                      >
                        Print
                      </Button>
                    )}
                  </div>
                  <Col
                    xs="12"
                    className="d-flex flex-column justify-content-center"
                  >
                    <div className="d-flex justify-content-center">
                      <img
                        style={{ width: "15%" }}
                        src="https://thumbs.dreamstime.com/b/education-people-school-logo-design-template-education-people-school-logo-design-template-117344868.jpg"
                        alt="logo"
                      />
                    </div>
                    <h4 className="text-center text-uppercase ">
                      School Name International Model
                    </h4>
                  </Col>
                </Row>
              </div>
              <Card.Body>
                <Row>
                  <h5 className="text-uppercase text-center fw-bold">
                    Result for{" "}
                    {`${studentResult?.session} ${studentResult?.term} TERM`}
                  </h5>
                  <div className="text-dark fw-bold mt-4 d-md-flex justify-content-around">
                    <div>
                      {" "}
                      <h6 className="text-center text-uppercase">
                        grade Setting
                      </h6>
                      <Table
                        responsive
                        bordered
                        size="sm"
                        className=" table-bordered border-dark"
                      >
                        <tbody>
                          {studentResult?.gradeSetting.map((result, idx) => (
                            <tr key={idx}>
                              <th className="fw-bold h6 text-uppercase">
                                {result.limit}
                              </th>
                              <td className="fw-bold text-uppercase">
                                {result.grade}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <Table
                      responsive
                      bordered
                      size="sm"
                      className=" table-bordered border-dark"
                      style={{ background: "#b9d7f7" }}
                    >
                      <tbody>
                        <tr>
                          <td
                            className="text-uppercase"
                            style={{ width: "30vw", color: "#2d2d2d" }}
                          >
                            Student Name
                          </td>
                          <td
                            className="fw-bold"
                            style={{ width: "30vw", color: "#2d2d2d" }}
                          >
                            {studentResult?.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            Student Reg No.
                          </td>
                          <td
                            className="fw-bold text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            {studentResult?.registrationNumber}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            Class Name
                          </td>
                          <td
                            className="fw-bold ext-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            {studentResult?.sessionClassName}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            Position
                          </td>
                          <td
                            className="fw-bold text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            {studentResult?.position} out of{" "}
                            {studentResult?.noOfStudents} student(s)
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            Total
                          </td>
                          <td className="fw-bold" style={{ color: "#2d2d2d" }}>
                            {studentResult?.total}/{studentResult?.totalScores}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            Average
                          </td>
                          <td className="fw-bold" style={{ color: "#2d2d2d" }}>
                            {studentResult?.average}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            Remark
                          </td>
                          <td
                            className="fw-bold text-uppercase"
                            style={{ color: "#2d2d2d" }}
                          >
                            {studentResult?.remark}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div>
                      <h6 className="text-center text-uppercase">
                        cognitive behaviour
                      </h6>
                      <Table
                        responsive
                        bordered
                        size="sm"
                        className=" table-bordered border-dark"
                      >
                        <tbody>
                          {studentResult?.cognitiveBehaviour?.map(
                            (cognitive, idx) => (
                              <tr key={idx}>
                                <th className="fw-bold h6 text-uppercase">
                                  {cognitive.behaviour}
                                </th>
                                <td className="fw-bold text-uppercase">
                                  {cognitive.remark}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <Table
                    size="md"
                    bordered
                    responsive
                    className="mt-4 border-secondary"
                  >
                    <tbody>
                      <tr
                        className="text-center text-uppercase h6 fw-bold"
                        style={{ background: "#b9d7f7" }}
                      >
                        <td style={{ color: "#2d2d2d" }}>S/No</td>
                        <td
                          className=" text-start"
                          style={{ color: "#2d2d2d" }}
                        >
                          Subject
                        </td>
                        <td style={{ color: "#2d2d2d" }}>Assessment Score</td>
                        <td style={{ color: "#2d2d2d" }}>Exam Score</td>
                        <td style={{ color: "#2d2d2d" }}>Total Score</td>
                        <td className="px-2" style={{ color: "#2d2d2d" }}>
                          Grade
                        </td>
                        <td className="px-2" style={{ color: "#2d2d2d" }}>
                          Remark
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      {studentResult?.studentSubjectEntries.map(
                        (item, index) => (
                          <tr key={index} className="h6 text-center">
                            <td className="">{index + 1}</td>
                            <td className="text-start">{item.sibjectName}</td>
                            <td className="">{item.assessmentScore}</td>
                            <td className="">{item.examScore}</td>
                            <td className="">{item.totalScore}</td>
                            <td className="text-uppercase">{item.grade}</td>
                            <td className="text-uppercase">{item.remark}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </Row>
                <div className="d-md-flex justify-content-end mt-5">
                  <div>
                    <div className="d-flex justify-content-center">
                      <div>
                        <img src="" alt="" />
                      </div>
                    </div>
                    <div className="h6 text-center">
                      Principal's signature and Stamp
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ResultTemplateOne;

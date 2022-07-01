import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Card from "../Card";

const PrintResult = ({ publishSingleStudent, session, term }) => {
  console.log(publishSingleStudent);
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <div>
                <Row>
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
                    Result for {`${session} ${term} TERM`}
                  </h5>
                  <div className="text-dark fw-bold mt-4 d-md-flex justify-content-around">
                    <div>
                      <div className="py-2">
                        STUDENT NAME:{" "}
                        <span className="text-capitalize">
                          {publishSingleStudent?.studentName}
                        </span>
                      </div>
                      <div className="py-2">
                        REGISTRATION NUMBER:{" "}
                        <span className="text-capitalize">
                          {publishSingleStudent?.registrationNumber}
                        </span>
                      </div>
                      <div className="py-2">
                        CLASS:{" "}
                        <span className="text-capitalize">
                          {publishSingleStudent?.sessionClassName}
                        </span>
                      </div>
                    </div>
                    <div className="px-2">
                      <div className="py-2">
                        POSITION: <span className="text-capitalize">1st</span>
                      </div>
                      <div className="py-2">
                        AVERAGE: <span className="text-capitalize">70</span>
                      </div>
                      <div className="py-2">
                        REMARK:{" "}
                        <span className="text-capitalize">Excellent</span>
                      </div>
                    </div>
                  </div>
                  <Table
                    size="md"
                    bordered
                    responsive
                    className="mt-4 border-secondary"
                  >
                    <thead>
                      <tr
                        className="text-center text-uppercase h6 fw-bold"
                        style={{ background: "#59a9ea" }}
                      >
                        <td className="">S/No</td>
                        <td className="h6 text-start fw-bold">Subject</td>
                        <td className="">Assessment Score</td>
                        <td className="">Exam Score</td>
                        <td className="">Total Score</td>
                        <td className="px-2">Grade</td>
                        <td className="px-2">Remark</td>
                      </tr>
                    </thead>
                    <tbody>
                      {publishSingleStudent?.studentSubjectEntries.map(
                        (item, index) => (
                          <tr key={index} className="h6 text-center">
                            <td className="">{index + 1}</td>
                            <td className="text-start">{item.sibjectName}</td>
                            <td className="">{item.assessmentScore}</td>
                            <td className="">{item.examScore}</td>
                            <td className="">{item.totalScore}</td>
                            <td className="">{item.grade}</td>
                            <td className="">{item.remark}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </Row>
                <div className="d-md-flex justify-content-around mt-5">
                  <div>
                    <div className="d-flex justify-content-center">
                      <img
                        style={{ width: "18%" }}
                        src="https://citycoseals.co.uk/legal-wafers_files/small_221.jpg"
                        alt="stamp"
                      />
                    </div>
                    <div className="h6 text-center">Stamp</div>
                  </div>
                  <div>
                    <div className="d-flex justify-content-center">
                      <div className=" w-100 border-bottom border-secondary" style={{height:"5rem"}}></div>
                    </div>
                    <div className="h6 text-center">Principal's signature</div>
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

export default PrintResult;

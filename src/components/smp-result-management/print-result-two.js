import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Card from "../Card";

const PrintResultTwo = ({ publishSingleStudent, session, term }) => {

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
                        POSITION: <span className="">{'1st'} out of {50} students</span>
                      </div>
                      <div className="py-2">
                        AVERAGE: <span className="text-capitalize">70</span>
                      </div>
                      <div className="py-2">
                        REMARK:{" "}
                        <span className="text-capitalize">Excellent</span>
                      </div>
                    </div>
  
          {/* <Table responsive bordered size="sm" className="w-50 table-bordered border-dark" style={{ background: '#59a9ea'}}>
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
            </tbody>
          </Table> */}
        
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
                        <td className=" text-start">Subject</td>
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
                            <td className="text-uppercase">{item.grade}</td>
                            <td className="text-uppercase">{item.remark}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </Table>
                </Row>
                <div className="d-md-flex justify-content-around mt-5">
                  <div>
                    <div className="d-flex justify-content-center">
                      <div><img src="" alt="" /></div>
                    </div>
                    <div className="h6 text-center">Principal's signature and Stamp</div>
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

export default PrintResultTwo;

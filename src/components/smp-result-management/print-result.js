import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Card from "../Card";

const PrintResult = ({ publishSingleStudent, session, term }) => {

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
<div> <h6 className="text-center text-uppercase">grade Setting</h6>
                  <Table responsive bordered size="sm" className=" table-bordered border-dark" >  
            <tbody>
              <tr>
                <th className="fw-bold h6 text-uppercase">80-100</th>
                <td className="fw-bold text-uppercase">A</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">60-79</th>
                <td className="fw-bold text-uppercase">B</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">50-59</th>
                <td className="fw-bold text-uppercase">C</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">40-49</th>
                <td className="fw-bold text-uppercase">D</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">20-39</th>
                <td className="fw-bold text-uppercase">E</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">0-19</th>
                <td className="fw-bold text-uppercase">F</td>
              </tr>
            </tbody>
          </Table>
  </div>
          <Table responsive bordered size="sm" className=" table-bordered border-dark" style={{ background: '#b9d7f7'}}>
            <tbody >
              <tr>
                <td className="text-uppercase" style={{ width: '30vw'}}>Student Name</td>
                <td className="fw-bold" style={{ width: '30vw'}}>{publishSingleStudent?.studentName}</td>
              </tr>
              <tr>
                <td className="fw-bold h6 text-uppercase">Student Reg No.</td>
                <td className="fw-bold">{publishSingleStudent?.registrationNumber}</td>
              </tr>
              <tr>
                <td className="fw-bold h6 text-uppercase">Class Name</td>
                <td className="fw-bold">{publishSingleStudent?.sessionClassName}</td>
              </tr>
              <tr>
                <td className="fw-bold h6 text-uppercase">Position</td>
                <td className="fw-bold ">{'1st'} out of {50} student</td>
              </tr>
              <tr>
                <td className="fw-bold h6 text-uppercase">Total</td>
                <td className="fw-bold">{150}/{1000}</td>
              </tr>
              <tr>
                <td className="fw-bold h6 text-uppercase">Average</td>
                <td className="fw-bold">{70}</td>
              </tr>
              <tr>
                <td className="fw-bold h6 text-uppercase">Remark</td>
                <td className="fw-bold">{"Excellent"}</td>
              </tr>
            </tbody>
          </Table>
          <div> <h6 className="text-center text-uppercase">cognitive behaviour</h6>
          <Table responsive bordered size="sm" className=" table-bordered border-dark" >
            <tbody>
              <tr>
                <th className="fw-bold h6 text-uppercase">Team work</th>
                <td className="fw-bold text-uppercase">Good</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">Creativity</th>
                <td className="fw-bold text-uppercase">Good</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">Responsibility</th>
                <td className="fw-bold text-uppercase">Good</td>
              </tr>
              <tr>
                <th className="fw-bold h6 text-uppercase">Attentiveness</th>
                <td className="fw-bold text-uppercase">Good</td>
              </tr>
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
                        <td className="">S/No</td>
                        <td className=" text-start">Subject</td>
                        <td className="">Assessment Score</td>
                        <td className="">Exam Score</td>
                        <td className="">Total Score</td>
                        <td className="px-2">Grade</td>
                        <td className="px-2">Remark</td>
                      </tr>
                    </tbody>
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
                <div className="d-md-flex justify-content-end mt-5">
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

export default PrintResult;

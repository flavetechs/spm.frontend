import { useEffect, useRef, useState } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getResultSettingList,
  getSchoolSettingList,
} from "../../../../store/actions/portal-setting-action";
import {
  getAllStudentResult,
  resetStudentResultState,
} from "../../../../store/actions/results-actions";
import Card from "../../../Card";
import "./template.scss";

const ResultTemplateOne = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentResult } = state.results;
  const { schoolSettingList, resultSettingList } = state.portal;
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
    if (termId) {
      getAllStudentResult(sessionClassId, termId, studentContactId)(dispatch);
    }
  }, []);
  useEffect(() => {
    getSchoolSettingList()(dispatch);
    getResultSettingList()(dispatch);
  }, []);

  const cognitiveBehaviour = [
    { behaviour: "Analyzing", remark: "good" },
    { behaviour: "Application", remark: "good" },
    { behaviour: "Creativity", remark: "good" },
    { behaviour: "Evaluation", remark: "good" },
    { behaviour: "Remembrance", remark: "good" },
  ];

  return (
    <>
      <div
        className={
          studentResult?.isPreview
            ? "col-md-12 mx-auto isPreview"
            : "col-md-12 mx-auto isPrint"
        }
        draggable="false"
        id="result-table"
        ref={tableRef}
      >
        <Row>
          <Col sm="12">
            <Card>
              <div>
                <Row>
                  <div className="m-4">
                    <div className="isPreview mx-3">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                      >
                        <svg
                          onClick={() => {
                            history.goBack();
                          }}
                          style={{ cursor: "pointer" }}
                          className=" text-primary"
                          width="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </OverlayTrigger>
                      <span>back</span>
                    </div>
                    {studentResult?.isPrint && (
                      <Button
                        variant="btn btn-primary btn-sm mx-2 isPreview"
                        onClick={() => {
                          window.print();
                        }}
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
                        style={{ maxWidth: "15%" }}
                        src={schoolSettingList?.filepath}
                        alt="logo"
                        draggable="false"
                      />
                    </div>
                    <h4
                      className="text-center text-uppercase mt-2"
                      draggable="false"
                    >
                      {schoolSettingList?.schoolName}
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
                        draggable="false"
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
                      draggable="false"
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
                        draggable="false"
                      >
                        <tbody>
                          {cognitiveBehaviour?.map((cognitive, idx) => (
                            <tr key={idx}>
                              <th className="fw-bold h6 text-uppercase">
                                {cognitive.behaviour}
                              </th>
                              <td className="fw-bold text-uppercase">
                                {cognitive.remark}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <Table
                    size="md"
                    bordered
                    responsive
                    className="mt-4 border-secondary"
                    draggable="false"
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
                    <div className="h6 text-center">
                      <div>
                        <img
                          src={resultSettingList?.filepath}
                          alt="stamp"
                          style={{ maxWidth: "12%" }}
                          draggable="false"
                        />
                      </div>
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

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import {
  getResultSetting,
  getSchoolSetting,
} from "../../../../store/actions/portal-setting-action";
import { getAllStudentResult } from "../../../../store/actions/results-actions";
import {
  respondDialog,
  showHideDialog,
} from "../../../../store/actions/toaster-actions";
import { PrintCSV } from "../../../../utils/export-csv";
import Card from "../../../Card";
import "./template.scss";

const ResultTemplateOne = (props) => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentResult } = state.results;
  const { dialogResponse } = state.alert;
  const { schoolSetting, resultSetting } = state.portal;
  const locations = useLocation();
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const results = studentResult ? studentResult : props.batchResult;
  // ACCESSING STATE FROM REDUX STORE
  useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const studentContactId = queryParams.get("studentContactId");
    const sessionClassId = queryParams.get("sessionClassId");
    const termId = queryParams.get("termId");
    if (termId) {
      getAllStudentResult(sessionClassId, termId, studentContactId)(dispatch);
    }
  }, [dispatch]);
  useEffect(() => {
    getSchoolSetting()(dispatch);
    getResultSetting()(dispatch);
  }, [dispatch]);

  const cognitiveBehaviour = [
    { behaviour: "Analyzing", remark: "good" },
    { behaviour: "Application", remark: "good" },
    { behaviour: "Creativity", remark: "good" },
    { behaviour: "Evaluation", remark: "good" },
    { behaviour: "Remembrance", remark: "good" },
  ];
  useEffect(() => {
    if (dialogResponse === "continue") {
      PrintCSV("result-table");
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
    }
    return () => {
      respondDialog("")(dispatch);
      showHideDialog(false, null)(dispatch);
    };
  }, [dialogResponse, dispatch]);

  return (
    <>
      <div className=" mb-3 d-flex justify-content-end mt-n5">
        {results?.isPrint && (
          <Button
            variant="btn btn-primary btn-sm mx-2 isPreview"
            onClick={() => {
              showHideDialog(
                true,
                "Are you sure you want to print result"
            )(dispatch);
            }}
          >
            Print
          </Button>
        )}
      </div>
      <div
        className={
          results?.isPreview
            ? "col-md-12 mx-auto isPreview"
            : "col-md-12 mx-auto isPrint"
        }
        draggable="false"
        id="result-table"
        ref={tableRef}
      >
        <Row style={{height:"100%"}}>
          <Col sm="12">
            <Card>
              <div>
                <Row>
                  <Col
                    xs="12"
                    className="d-flex flex-column justify-content-center"
                    style={{display:"flex",justifyContent: "center",flexDirection:"column"}}
                  >
                    <div className="d-flex justify-content-center" style={{display:"flex",justifyContent: "center"}}>
                      <img
                        style={{ maxWidth: "15%" }}
                        src={schoolSetting?.filepath}
                        alt="logo"
                        draggable="false"
                      />
                    </div>
                    <h4
                      className="text-center text-uppercase mt-2"
                      style={{textAlign:"center",textTransform:"uppercase"}}
                      draggable="false"
                    >
                      {schoolSetting?.schoolName}
                    </h4>
                  </Col>
                </Row>
              </div>
              <Card.Body>
                <Row>
                  <h5 className="text-uppercase text-center fw-bold"     style={{textTransform:"uppercase",textAlign:"center",fontWeight:"600"}}>
                    Result for {`${results?.session} ${results?.term} TERM`}
                  </h5>
                  <Row className="text-dark fw-bold  "style={{display:"flex",justifyContent:"space-evenly"}}>
                    <Col md="3">
                      {" "}
                      <h6 className="text-center text-uppercase" style={{textTransform:"uppercase",textAlign:"center",marginTop:"-5px"}}>
                        grade Setting
                      </h6>
                      <Table
                        responsive
                        bordered
                        size="sm"
                        className=" table-bordered border-dark"
                        style={{border:"1px solid black" ,borderCollapse:"collapse"}}
                        draggable="false"
                      >
                        <tbody>
                          {results?.gradeSetting?.map((result, idx) => (
                            <tr key={idx}>
                              <th className="fw-bold h6 text-uppercase"   style={{textTransform:"uppercase",fontWeight:"600",border:"1px solid black"}}>
                                {result.limit}
                              </th>
                              <td className="fw-bold text-uppercase" style={{textTransform:"uppercase",fontWeight:"600",border:"1px solid black"}}>
                                {result.grade}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                    <Col md="6">
                    <Table
                      responsive
                      bordered
                      size="sm"
                      className=" table-bordered border-dark"
                      style={{border:"1px solid black" ,borderCollapse:"collapse",background: "#b9d7f7"}}
                      draggable="false"
                    >
                      <tbody>
                        <tr>
                          <td
                            className="text-uppercase fw-bold"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black"  }}
                          >
                            Student Name
                          </td>
                          <td
                            className="fw-bold"
                            style={{ width: "30vw", color: "#2d2d2d",fontWeight:"600",border:"1px solid black"}}
                          >
                            {results?.studentName}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}
                          >
                            Student Reg No.
                          </td>
                          <td
                            className="fw-bold text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}
                          >
                            {results?.registrationNumber}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}
                          >
                            Class Name
                          </td>
                          <td
                            className="fw-bold text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}
                          >
                            {results?.sessionClassName}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"capitalize",fontWeight:"600",border:"1px solid black" }}
                          >
                            Position
                          </td>
                        {resultSetting?.showPositionOnResult &&  
                        <td
                            className="fw-bold text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}
                          >
                            {results?.position} 
                            
                          </td>
                          }
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black"}}
                          >
                            Total
                          </td>
                          <td className="fw-bold" style={{ color: "#2d2d2d",fontWeight:"600",border:"1px solid black" }}>
                            {results?.total}/{results?.totalScores}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}
                          >
                            Average
                          </td>
                          <td className="fw-bold" style={{ color: "#2d2d2d",fontWeight:"600" ,border:"1px solid black"}}>
                            {results?.average}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="fw-bold h6 text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}
                          >
                            Remark
                          </td>
                          <td
                            className="fw-bold text-uppercase"
                            style={{ color: "#2d2d2d",textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}
                          >
                            {results?.remark}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    </Col>
                    <Col md="3">
                      <h6 className="text-center text-uppercase"style={{textTransform:"uppercase",textAlign:"center",marginTop:"-5px"}} >
                        cognitive behaviour
                      </h6>
                      <Table
                        responsive
                        bordered
                        size="sm"
                        className=" table-bordered border-dark"
                        style={{border:"1px solid black",borderCollapse:"collapse"}}
                        draggable="false"
                      >
                        <tbody>
                          {cognitiveBehaviour?.map((cognitive, idx) => (
                            <tr key={idx}>
                              <th className="fw-bold h6 text-uppercase" style={{ textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}>
                                {cognitive.behaviour}
                              </th>
                              <td className="fw-bold text-uppercase"style={{ textTransform:"uppercase",fontWeight:"600",border:"1px solid black" }}>
                                {cognitive.remark}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                  <Table
                    size="md"
                    bordered
                    responsive
                    className="mt-4 border-secondary"
                    style={{border:"1px solid black",borderCollapse:"collapse",marginTop:"20px"}}
                    draggable="false"
                  >
                    <tbody>
                      <tr
                        className="text-center text-uppercase h6 fw-bold"
                        style={{ background: "#b9d7f7",textTransform:"uppercase",fontWeight:"600",textAlign:"center",border:"1px solid black" }}
                      >
                        <td style={{ color: "#2d2d2d",border:"1px solid black" }}>S/No</td>
                        <td
                          className=" text-start" 
                          style={{ color: "#2d2d2d",textAlign:"left",border:"1px solid black"}}
                        >
                          Subject
                        </td>
                        <td style={{ color: "#2d2d2d",border:"1px solid black" }}>Assessment Score</td>
                        <td style={{ color: "#2d2d2d" ,border:"1px solid black"}}>Exam Score</td>
                        <td style={{ color: "#2d2d2d",border:"1px solid black" }}>Total Score</td>
                        <td className="px-2" style={{ color: "#2d2d2d",border:"1px solid black" }}>
                          Grade
                        </td>
                        <td className="px-2" style={{ color: "#2d2d2d" ,border:"1px solid black"}}>
                          Remark
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      {results?.studentSubjectEntries?.map((item, index) => (
                        <tr key={index} className="h6 text-center"style={{textAlign:"center",border:"1px solid black"}}>
                          <td className=""style={{border:"1px solid black"}}>{index + 1}</td>
                          <td className="text-start" style={{textAlign:"left",border:"1px solid black"}}>{item.sibjectName}</td>
                          <td className=""style={{border:"1px solid black"}}>{item.assessmentScore}</td>
                          <td className=""style={{border:"1px solid black"}}>{item.examScore}</td>
                          <td className=""style={{border:"1px solid black"}}>{item.totalScore}</td>
                          <td className="text-uppercase"style={{textTransform:"uppercase",border:"1px solid black"}}>{item.grade}</td>
                          <td className="text-uppercase" style={{textTransform:"uppercase",border:"1px solid black"}}>{item.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
                <div className="d-md-flex justify-content-end mt-5" style={{display:"flex",justifyContent: "flex-end", marginTop:"20px"}}>
                  <div>
                    <div className="h6 text-center" style={{textAlign:"center"}}>
                      <div>
                        <img
                          src={resultSetting?.filepath}
                          alt="stamp"
                          style={{ maxWidth: "28%" }}
                          draggable="false"
                        />
                      </div>
                      {resultSetting?.headteacher}
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

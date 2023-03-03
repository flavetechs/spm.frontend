import React, { useEffect, useRef } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
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

const ResultTemplateTwo = (props) => {
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
  }, [dispatch, locations.search]);
  useEffect(() => {
    getSchoolSetting()(dispatch);
    getResultSetting()(dispatch);
  }, [dispatch, locations.search]);

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
      <div className="mb-3 d-flex justify-content-end mt-n5">
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
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className="d-flex justify-content-center"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        style={{ width: "15%" }}
                        src={schoolSetting?.filepath}
                        alt="logo"
                        draggable="false"
                      />
                    </div>
                    <h4
                      className="text-center text-uppercase mt-2 "
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                      }}
                      draggable="false"
                    >
                      {schoolSetting?.schoolName}
                    </h4>
                  </Col>
                </Row>
              </div>
              <Card.Body>
                <Row>
                  <h5
                    className="text-uppercase text-center fw-bold"
                    style={{
                      textTransform: "uppercase",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                  >
                    Result for {`${results?.session} ${results?.term} TERM`}
                  </h5>
                  <div
                    className="text-dark fw-bold mt-4 d-md-flex justify-content-around"
                    style={{ display: "flex", justifyContent: "space-around" }}
                    draggable="false"
                  >
                    <div>
                      <div className="py-2 h6">
                        STUDENT NAME:{" "}
                        <span
                          className="text-capitalize"
                          style={{ textTransform: "capitalize" }}
                        >
                          {results?.studentName}
                        </span>
                      </div>
                      <div className="py-2 h6">
                        REGISTRATION NUMBER:{" "}
                        <span
                          className="text-capitalize"
                          style={{ textTransform: "capitalize" }}
                        >
                          {results?.registrationNumber}
                        </span>
                      </div>
                      <div className=" h6">
                        CLASS:{" "}
                        <span
                          className="text-capitalize"
                          style={{ textTransform: "capitalize" }}
                        >
                          {results?.sessionClassName}
                        </span>
                      </div>
                    </div>
                    <div className="px-2 h6">
                    {resultSetting?.showPositionOnResult &&   
                    <div className="py-2">
                        POSITION:{" "}
                        <span className="">
                        {results?.position}
                        </span>
                      </div>
                      }
                      <div className="py-2 h6">
                        TOTAL:{" "}
                        <span
                          className="text-capitalize"
                          style={{ textTransform: "capitalize" }}
                        >
                          {results?.total}
                        </span>
                      </div>
                      <div className="py-2">
                        AVERAGE:{" "}
                        <span
                          className="text-capitalize"
                          style={{ textTransform: "capitalize" }}
                        >
                          {results?.average}
                        </span>
                      </div>
                      <div className="py-2">
                        REMARK:{" "}
                        <span
                          className="text-capitalize"
                          style={{ textTransform: "capitalize" }}
                        >
                          {results?.remark}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Table
                    size="md"
                    bordered
                    responsive
                    className="mt-4 border-secondary"
                    style={{border:"1px solid black",borderCollapse:"collapse",marginTop: "20px" }}
                    draggable="false"
                  >
                    <thead>
                      <tr
                        className="text-center text-uppercase h6 fw-bold"
                        style={{
                          background: "#59a9ea",
                          color: "red",
                          textTransform: "uppercase",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        <td style={{ color: "#fff",border:"1px solid black" }}>S/No</td>
                        <td
                          style={{ color: "#fff", textAlign: "left",border:"1px solid black" }}
                          className=" text-start"
                        >
                          Subject
                        </td>
                        <td style={{ color: "#fff",border:"1px solid black" }} className="">
                          Assessment Score
                        </td>
                        <td style={{ color: "#fff",border:"1px solid black" }} className="">
                          Exam Score
                        </td>
                        <td style={{ color: "#fff",border:"1px solid black" }} className="">
                          Total Score
                        </td>
                        <td style={{ color: "#fff",border:"1px solid black" }} className="px-2">
                          Grade
                        </td>
                        <td style={{ color: "#fff",border:"1px solid black" }} className="px-2">
                          Remark
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      {results?.studentSubjectEntries?.map((item, index) => (
                        <tr
                          key={index}
                          className="h6 text-center"
                          style={{ textAlign: "center" }}
                        >
                          <td className=""style={{ border:"1px solid black" }} >{index + 1}</td>
                          <td
                            className="text-start"
                            style={{ textAlign: "left" ,border:"1px solid black"}}
                          >
                            {item.sibjectName}
                          </td>
                          <td className="" style={{ border:"1px solid black"}}>{item.assessmentScore}</td>
                          <td className="" style={{ border:"1px solid black"}}>{item.examScore}</td>
                          <td className="" style={{ border:"1px solid black"}}>{item.totalScore}</td>
                          <td
                            className="text-uppercase"
                            style={{ textTransform: "uppercase", border:"1px solid black" }}
                          >
                            {item.grade}
                          </td>
                          <td
                            className="text-uppercase"
                            style={{ textTransform: "uppercase" , border:"1px solid black"}}
                          >
                            {item.remark}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Row>
                <div
                  className="d-md-flex justify-content-around mt-5"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "20px",
                  }}
                >
                  <div>
                    <div
                      className="h6 text-center"
                      style={{ textAlign: "center" }}
                    >
                      <div>
                        <img
                          src={resultSetting?.filepath}
                          alt="stamp"
                          style={{ width: "28%" }}
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

export default ResultTemplateTwo;

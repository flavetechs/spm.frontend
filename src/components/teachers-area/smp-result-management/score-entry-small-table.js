import React, { useState } from "react";
import { Row, Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LargeTable from "./score-entry-large-table";
import Preview from "./score-entry-preview";
import { useHistory, useLocation } from "react-router-dom";

const ScoreEntryTable = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [indexRow, setIndexRow] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [isPreviewMode, setPreviewMode] = useState(false);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const history = useHistory();
  const location = useLocation();
  const state = useSelector((state) => state);
  const { scoreEntry, filterProps } = state.results;
  // ACCESSING STATE FROM REDUX STORE

  //DECLARING VARIABLES
  const queryParams = new URLSearchParams(location.search);
  const sessionClassId = queryParams.get("sessionClassId");
  const subjectId = queryParams.get("subjectId");
  //DECLARING VARIABLES

  React.useEffect(() => {
    setIndexRow("");
    setEditMode(false);
    setPreviewMode(false);
  }, [dispatch]);

  return (
    <>
      <div>
        <Row className="pt-5">
          <div className="my-2">
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
         
          </div>
          <Table
            responsive
            bordered
            size="sm"
            className="w-50"
            style={{ background: "#d8efd1" }}
          >
            <tbody>
              <tr>
                <th className="h6">Class Name</th>
                <th className="fw-bold h6">{scoreEntry?.sessionClassName}</th>
              </tr>
              <tr>
                <th className="h6 ">Subject Name</th>
                <th className="fw-bold text-capitalize h6">
                  {scoreEntry?.subjectName}
                </th>
              </tr>
              <tr>
                <th className="h6 ">Subject Teacher</th>
                <th className="fw-bold text-capitalize h6">
                  {scoreEntry?.subjectTeacher}
                </th>
              </tr>
              <tr>
                <th className="h6">Assessment Score</th>
                <th className="fw-bold h6">{scoreEntry?.assessmentScore}</th>
              </tr>
              <tr>
                <th className="h6">Exam Score</th>
                <th className="fw-bold h6">{scoreEntry?.examsScore}</th>
              </tr>
            </tbody>
          </Table>
        </Row>
      </div>
      {!isPreviewMode ? (
        <LargeTable
          scoreEntry={scoreEntry}
          filterProps={filterProps}
          isEditMode={isEditMode}
          setEditMode={setEditMode}
          setIndexRow={setIndexRow}
          setPreviewMode={setPreviewMode}
          indexRow={indexRow}
          isPreviewMode={isPreviewMode}
          sessionClassId={sessionClassId}
          subjectId={subjectId}
        />
      ) : (
        <Preview
          setPreviewMode={setPreviewMode}
          isPreviewMode={isPreviewMode}
          sessionClassId={sessionClassId}
          subjectId={subjectId}
        />
      )}
    </>
  );
};

export default ScoreEntryTable;

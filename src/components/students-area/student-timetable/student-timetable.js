import React, { useState } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../../Card";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import {
  respondToDeleteDialog,
  showErrorToast,
  showSingleDeleteDialog,
} from "../../../store/actions/toaster-actions";
import { getStudentTimeTable } from "../../../store/actions/timetable-actions";



const StudentTimeTable = () => {

  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { studentselectedTimetable } = state.timetable;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getStudentTimeTable()(dispatch);
  }, []);

    console.log('studentselectedTimetable', studentselectedTimetable);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">
                    <b>Student Timetable</b>
                  </h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>
                        name
                        </th>
                        <th>
                          <b>First Name</b>
                        </th>
                        <th>
                          <b>Last Name</b>
                        </th>
                        <th>
                          <b>MIddle Name</b>
                        </th>
                        <th>
                          <b>Email</b>
                        </th>
                        <th>
                          <b>Phone Number</b>
                        </th>
  
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="text-dark">
                          <b>name</b>
                          </td>
                          <td className="text-uppercase">
                            <b>dd</b>
                          </td>
                          <td className="text-uppercase">
                            <b>dd</b>
                          </td>
                          <td className="text-uppercase">
                            <b>dd</b>
                          </td>
                          <td>
                            <b>ddd</b>
                          </td>
                          <td>
                            <b>ff</b>
                          </td>
    
                        </tr>
              
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StudentTimeTable;

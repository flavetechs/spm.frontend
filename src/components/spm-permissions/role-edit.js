import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllActivities } from "../../store/actions/activity-actions";

const RoleEdit = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { activities } = state.activities;

  React.useEffect(() => {
    getAllActivities()(dispatch);
  }, [123]);
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">Role-Permission</h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="user-list-table"
                    className="table table-striped table-bordered"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th width="300px"> </th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Update</th>
                        <th className="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td className="text-center">
                            
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkCreate"
                              />
                            
                          </td>
                          <td className="text-center">
                            
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkUpdate"
                              />
                            
                          </td>
                          <td className="text-center">
                            
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkDelete"
                              />
                            
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      style={{ marginLeft: "50%" }}
                    >
                      Save
                    </button>
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

export default RoleEdit;

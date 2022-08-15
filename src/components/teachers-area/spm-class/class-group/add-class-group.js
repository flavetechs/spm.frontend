import React from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllClassStudents } from '../../../../store/actions/class-actions';

const AddClassGroup = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const state = useSelector((state) => state);
    const { classStudents } = state.class;
    React.useEffect(() => {
        const queryParams = new URLSearchParams(locations.search);
        const sessionClassId = queryParams.get("sessionClassId");
       if(sessionClassId){
        getAllClassStudents(sessionClassId)(dispatch);
       }
      }, []);
      console.log(classStudents);
  return (
    <>
      <div>
        <Row className="d-flex justify-content-center">
          <Col sm="8">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title w-100">
                  <Form.Group className="form-group">
                    <Form.Label htmlFor="role-name" className="">
                      Group Name
                    </Form.Label>
                    <Form.Control
                      //onChange={handleRoleNameOnChange}
                      type="text"
                      className="w-100 form-control"
                      id="role-name"
                      placeholder="Role name"
                    />
                  </Form.Group>
                </div>
              </Card.Header>

              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped table-bordered"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th className="" width="300px">
                          Students
                        </th>
                        <th className="text-center">
                          Select
                           {/*{parentActivity?.map((activity,idx)=>
                          parentValue == activity.parentActivityId &&
                          <input
                            type="checkbox"
                            onChange={(e) => handleSelectAll(e)}
                          />)} */}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {classStudents?.map(
                        (item, idx) =>
                        //   parentValue == item.parentId &&
                         (
                            <tr key={idx}>
                              <td className="text-uppercase">{item.firstName} {item.lastName}</td>

                              <td className="text-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                //   checked={selectedRole?.activities.find(
                                //     (id) => id === item.activityId
                                //   )||false}
                                  id={item.activityId}
                                  onChange={(e) => {
                                    //handleSelect(e);
                                  }}
                                />
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{ cursor: "pointer" }}
                        onClick={()=>history.goBack()}
                      >
                        Back
                      </button>
                    <button
                      onClick={() => {
                        //createNewRole(selectedRole)(dispatch);
                      }}
                      type="button"
                      className="btn btn-primary mx-2"
                      style={{ cursor: "pointer" }}
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
  )
}

export default AddClassGroup
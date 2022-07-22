import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUsedPin } from "../../store/actions/pin-management-actions";

const UsedPinDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedUsedPin } = state.pin;
  console.log('selectedUsedPin now: ', selectedUsedPin);
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const pin = queryParams.get("pin");
    if (!pin) return;
    fetchSingleUsedPin(pin)(dispatch);
  }, []);

  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <h4>Used Pin Details</h4>
                <div className="pt-3">
                  <Table responsive bordered size="sm">
                    <tbody>
                      <tr>
                        <th>
                          <span className="h6">Pin</span>
                        </th>
                        <td>{selectedUsedPin?.pin}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Pin Count</span>
                        </th>
                        <td>{selectedUsedPin?.numberOfTimesUsed}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Student Name</span>
                        </th>
                        <td>{selectedUsedPin?.studentName}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Session</span>
                        </th>
                        <td>{selectedUsedPin?.session}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Term Printed</span>
                        </th>
                        <td>{selectedUsedPin?.term}</td>
                      </tr>
                      {/* <tr>
                        <th>
                          <span className="h6">Pin SerialNumber</span>
                        </th>
                        <td>{selectedUsedPin?.serialNumber}</td>
                      </tr> */}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-end">
                  <Button
                    type="button"
                    variant="btn btn-danger mx-2"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UsedPinDetails;

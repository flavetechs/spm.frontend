import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUnusedPin } from "../../store/actions/pin-management-actions";

const PinDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useLocation();
  

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedUnusedPin } = state.pin;
  console.log('selectedUnusedPin now: ', selectedUnusedPin);
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const pin = queryParams.get("pin");
    if (!pin) return;
    fetchSingleUnusedPin(pin)(dispatch);
  }, []);
  const singlePinDetail = {
    pinCode: 123653672556,
    pinCount: 3,
    studentName: "Noah Ark",
    regNo: "abc/000012/xyz",
    session: "2001/2002",
    termPrinted: "3rd",
  };
  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <h4>Pin Details</h4>
                <div className="pt-3">
                  <Table responsive bordered size="sm">
                    <tbody>
                      <tr>
                        <th>
                          <span className="h6">Pin</span>
                        </th>
                        <td>{selectedUnusedPin?.pin}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Pin Count</span>
                        </th>
                        <td>{selectedUnusedPin?.numberOfTimesUsed}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Student Name</span>
                        </th>
                        <td>{selectedUnusedPin?.studentName}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Session</span>
                        </th>
                        <td>{selectedUnusedPin?.session}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Term Printed</span>
                        </th>
                        <td>{selectedUnusedPin?.term}</td>
                      </tr>
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

export default PinDetails;

import React from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const UsedPinDetails = () => {
  const history = useHistory();
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
                        <td>{singlePinDetail?.pinCode}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Pin Count</span>
                        </th>
                        <td>{singlePinDetail?.pinCount}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Student Name</span>
                        </th>
                        <td>{singlePinDetail?.studentName}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Session</span>
                        </th>
                        <td>{singlePinDetail?.session}</td>
                      </tr>
                      <tr>
                        <th>
                          <span className="h6">Term Printed</span>
                        </th>
                        <td>{singlePinDetail?.termPrinted}</td>
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

export default UsedPinDetails;

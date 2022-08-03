import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AssignmentDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  //VARIABLE DECLARATIONS
  return (
    <>
      <div>
        <Row className="d-md-flex justify-content-center">
          <Col sm="8">
            <Card>
              <div className="d-flex justify-content-between m-4 mb-0">
                <h4>{" The placement of things"}</h4>
                <h6>
                  Deadline: <span className="text-danger">{"20-07-22"}</span>
                </h6>
              </div>
              <Card.Body>
                <hr className="mt-2" />
                <div style={{minHeight:"30vh"}}
                  dangerouslySetInnerHTML={{
                    __html:
                      "make a descriptive mark on the depth of make a descriptive mark on the depth of ",
                  }}
                ></div>
                <hr />
                <div> <span className="h6">Comment:</span> {"file available"}</div>

                <div className="d-flex justify-content-end">
                  <button
                    onClick={() => {
                      history.goBack();
                    }}
                    className="btn btn-danger btn-sm mx-3 "
                  >
                    <span>Back</span>
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AssignmentDetails;

import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import PrintResult from "./print-result";
import PrintResultTwo from "./print-result-two";

const PrintResultInput = () => {
  //VARIABLE DECLARATIONS
  const [showPrintResultTable, setShowPrintResultTable] = useState(false);
  const [view, setView] = useState(true);
  //VARIABLE DECLARATIONS

 
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h6>
                  <b>PRINT RESULT</b>
                </h6>
              </Card.Header>
              <Card.Body>
                {!showPrintResultTable ? (
                  <div className="d-flex justify-content-center">
                    <Button
                      type="button"
                      className="btn-sm mx-2"
                      variant="btn btn-primary"
                      onClick={() => {
                        setView(true);
                        setShowPrintResultTable(true)
                      }}
                    >
                      Template 1
                    </Button>

                    <Button
                      type="button"
                      className="btn-sm "
                      variant="btn btn-primary"
                      onClick={() => {
                        setView(false);
                        setShowPrintResultTable(true)
                      }}
                    >
                      Template 2
                    </Button>
                  </div>
                ) : view ? (
                  <PrintResult />
                ) : (
                  <PrintResultTwo />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PrintResultInput;

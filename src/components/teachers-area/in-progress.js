import React, { useEffect } from 'react'
import { Container, Image, InputGroup, FormControl, Row, Card, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
// img
import error01 from '../../assets/images/error/01.png'
const InProgress = (props) => {


    return (
        <>

            {/* <Row>
                <Card.Header className="d-flex justify-content-between bg-transparent">
                    <Container>
                        <Image src={error01} className="img-fluid mb-4" alt="" />
                    </Container>

                </Card.Header>
            </Row> */}

<div>
        <Row>
          <Col sm="12">
            <Card className="bg-transparent">
              <Card.Header className="d-flex justify-content-between bg-transparent">
                <div className="header-title">
                  <h4 className="card-title mt-3">CBT System </h4>
                </div>
              </Card.Header>
              <Card.Body className="px-0 bg-transparent">
                    <Card>
                      <Card.Body>
                       
                       <div className='d-flex align-items-center justify-content-center flex-wrap'>
                         <Image src={error01} className="img-fluid mb-4" alt="" width={'30%'}/>
                         <Row sm={'12'} md={'12'}>
                            <strong>CBT System not yet activated on this service</strong>
                            <h1>CBT System</h1>
                         </Row>
                       </div>
                      </Card.Body>
                    </Card>
                    
                  </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
        </>
    )
}

export default InProgress;

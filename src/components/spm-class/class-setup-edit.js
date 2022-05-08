import React from 'react'
import {Row,Col,Form,Button} from 'react-bootstrap'
import Card from '../Card'
import { useHistory } from 'react-router-dom'



const ClassSetupEdit = () => {


    let history = useHistory()

    return (
        <>
            <div>
                <Row>
                    <Col sm="12" lg="6">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Edit Class Setup</h4>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh finibus leo</p> */}
                                <Form>
                                    <Form.Group className="form-group">
                                        {/* <Form.Label htmlFor="email">Email address:</Form.Label> */}
                                        <Form.Control type="email"  id="email1"/>
                                    </Form.Group>
                                    {/* <Form.Group className="form-group">
                                        <Form.Label htmlFor="pwd">Password:</Form.Label>
                                        <Form.Control type="password"  id="pwd"/>
                                    </Form.Group> */}
                                    <div className="checkbox mb-3">
                                        <Form.Check className="form-check ">
                                            <Form.Check.Input  type="checkbox" defaultValue="" id="flexCheckDefault3"/>
                                            <Form.Check.Label  htmlFor="flexCheckDefault3">
                                                Is Active
                                            </Form.Check.Label>
                                        </Form.Check>
                                    </div>
                                    <Button type="button" variant="btn btn-danger" onClick={() => {history.go(-1)}}>Cancel</Button>{' '}
                                    <Button type="button" variant="btn btn-primary">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ClassSetupEdit


import React, { useState } from 'react';
import { Row, Col, Toast, ToastContainer, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';


export function SMP_TOAST() {
    const state = useSelector((state) => state);
    const { showStickyInfoToast, showAlertInfoToast, message } = state.alert;
    // 
    return <AlertInfoToast show={showAlertInfoToast} message={message} />
}

function AlertInfoToast(props) {
    const [show, setShow] = useState(props.show);

    return (
        <ToastContainer >
            <div>
                <Toast onClose={() => {
                    setShow(false);
                }} show={show} delay={6000} autohide >
                    <Toast.Header >
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">SMP</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body className=''>{props.message}</Toast.Body>
                </Toast>
            </div>

        </ToastContainer>

    );
}

function StickyAlert(props) {
    const [show, setShow] = useState(props.show);

    const toggleShow = () => {
        setShow(!show)
    }

    return (

        <ToastContainer >
            <Row >
                <Col md={6} className="mb-2">
                    <Toast show={show} onClose={toggleShow}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Notification</strong>
                            {/* <small>11 mins ago</small> */}
                        </Toast.Header>
                        <Toast.Body>{props.message}</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </ToastContainer>


    );
}

function Test() {
    const [showA, setShowA] = useState(true);
    const [showB, setShowB] = useState(true);

    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);

    return (
        <ToastContainer className='zindex-sticky'>
            <Row>
                <Col md={12} className="mb-2">
                    <Button onClick={toggleShowA} className="mb-2">
                        Toggle Toast <strong>with</strong> Animation
                    </Button>
                    <Toast show={showA} onClose={toggleShowA}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </ToastContainer>

    )
}
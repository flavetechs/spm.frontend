
import { Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { hideAlertInfoToast, hideErrorToast, hideSuccessToast } from '../../../../store/actions/toaster-actions';


export function SMP_TOAST() {
    const state = useSelector((state) => state);
    const { showAlertInfoToast, message } = state.alert;
    // 
    return <AlertInfoToast show={showAlertInfoToast} message={message} />
}

export function AlertInfoToast() {

    const state = useSelector((state) => state);
    const { showAlertInfoToast, message } = state.alert;
    const dispatch = useDispatch();

    return (
        <ToastContainer>
            <div>
                <Toast className='border border-success' onClose={() => { hideAlertInfoToast()(dispatch); }} show={showAlertInfoToast} delay={6000} autohide >
                    <Toast.Header >
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">success</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body className=''>{message}</Toast.Body>
                </Toast>
            </div>

        </ToastContainer>

    );
}

export function SuccessToast() {

    const state = useSelector((state) => state);
    const { showSuccessToast, message } = state.alert;
    const dispatch = useDispatch();

    return (
        <ToastContainer>
            <div>
                <Toast className='border border-success' onClose={() => { hideSuccessToast()(dispatch); }} show={showSuccessToast} delay={6000} autohide >
                    <Toast.Header >
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">success</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body className=''>{message}</Toast.Body>
                </Toast>
            </div>

        </ToastContainer>

    );
}

export function ErrorToast() {

    const state = useSelector((state) => state);
    const { showErrorToast, message } = state.alert;
    const dispatch = useDispatch();

    return (
        <ToastContainer>
            <div>
                <Toast className='border border-danger' onClose={() => { hideErrorToast()(dispatch); }} show={showErrorToast} delay={6000} autohide >
                    <Toast.Header >
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">error</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body className=''>{message}</Toast.Body>
                </Toast>
            </div>

        </ToastContainer>

    );
}

// function StickyAlert(props) {
//     const [show, setShow] = useState(props.show);

//     const toggleShow = () => {
//         setShow(!show)
//     }

//     return (

//         <ToastContainer >
//             <Row >
//                 <Col md={6} className="mb-2">
//                     <Toast show={show} onClose={toggleShow}>
//                         <Toast.Header>
//                             <img
//                                 src="holder.js/20x20?text=%20"
//                                 className="rounded me-2"
//                                 alt=""
//                             />
//                             <strong className="me-auto">Notification</strong>
//                             {/* <small>11 mins ago</small> */}
//                         </Toast.Header>
//                         <Toast.Body>{props.message}</Toast.Body>
//                     </Toast>
//                 </Col>
//             </Row>
//         </ToastContainer>


//     );
// }

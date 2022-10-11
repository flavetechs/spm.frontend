import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { respondModal, showHideTimeOutModal } from "../../../../store/actions/toaster-actions";

export function SmpTimeOutModal(props) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
  const {showTimeOutModal } = state.alert;
    return (
        <Modal show={showTimeOutModal} onHide={() =>{
             showHideTimeOutModal(false)(dispatch)
             respondModal('cancel')(dispatch);
            }
        }
            id="viewModal"
            centered
        >
            <Modal.Header closeButton >
                <div>
                <div className="d-flex"><h5>{props.title} </h5> <h6  className="mx-1 mt-1">{" "} You will be logged out in <span className="text-danger">{props.counter}</span></h6></div>  
                </div>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>


        </Modal>

    )
}
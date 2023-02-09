import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  respondModal, showHideLoginLayoutModal,

} from "../../../store/actions/toaster-actions";

export function LoginTemplateModal(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { showLoginLayoutModal } = state.alert;
  return (
         <Modal show={showLoginLayoutModal} onHide={() =>{
             showHideLoginLayoutModal(false)(dispatch)
             respondModal('cancel')(dispatch);
            }
        }
            id="viewModal"
            centered
        >
  
<div >
    {props.children}
</div>
    </Modal>
    
  );
}

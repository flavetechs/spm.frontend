import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { respondModal, showHideModal } from '../../store/actions/toaster-actions';
import { SmpModal } from '../partials/components/hoc-tools/modals';

const IdleSessionTimeOutModal = (props) => {
    const dispatch = useDispatch();
  return (
    <>
    <SmpModal title={'You Have Been Idle!'}>
    <div>Your session is Timed Out. You want to stay?</div>
                    <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => {
                            props.removeEvents();
                            clearTimeout(props.timer);
                            props.setLogout(true);
                            showHideModal(false)(dispatch);
                        }}
                    >
                       Logout
                    </Button>
                    <Button
                        variant="primary"
                        className=""
                        onClick={() => {
                            showHideModal(false)(dispatch);
                            respondModal('cancel')(dispatch);
                        }}
                    >
                       Continue Session
                    </Button>
</SmpModal>
</>
  )
}

export default IdleSessionTimeOutModal
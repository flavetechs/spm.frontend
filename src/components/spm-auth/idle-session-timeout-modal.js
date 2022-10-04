import React from 'react'
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authLocations } from '../../router/spm-path-locations';
import { loginOutUser } from '../../store/actions/auth-actions';
import { respondModal, showHideModal } from '../../store/actions/toaster-actions';
import { SmpModal } from '../partials/components/hoc-tools/modals';

const IdleSessionTimeOutModal = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
  return (
    <>
    <SmpModal title={'You Have Been Idle!'}>
    <h5 className='my-4 text-center'>Your session is <span className='text-danger'>Timed Out.</span> Do you want to stay?</h5>
    <div className='d-flex justify-content-end mt-5'>
                    <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => {
                            props.removeEvents();
                            clearTimeout(props.timer);
                            props.setLogout(true);
                            showHideModal(false)(dispatch);
                            dispatch(loginOutUser());
                            history.push(authLocations.login)
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
                            props.startTimer();
                        }}
                    >
                       Continue Session
                    </Button>
                    </div>
</SmpModal>
</>
  )
}

export default IdleSessionTimeOutModal
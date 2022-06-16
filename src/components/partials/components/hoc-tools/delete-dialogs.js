import { useState } from 'react';
import { Toast, Alert, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { respondToDeleteDialog, showSingleDeleteDialog } from '../../../../store/actions/toaster-actions';

export const SingleDeleteDialog = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { showSingleDeleteDialog: show } = state.alert;
    return (
        <Alert variant="warning align-items-center sticky-top" role="alert"
            aria-live="assertive" aria-atomic="true" style={{ display: show ? 'block' : 'none' }}>
            <Toast.Body className=" align-items-center" style={{ textAlign: 'center' }}>
                <div className="d-block">
                    <svg className="me-2" id="exclamation-triangle-fill" fill="currentColor" width="20" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </svg>
                    Are you sure you want to delete this item  ?
                </div>
                <div className="d-block">
                    <Button type="button" variant="primary" data-bs-dismiss="toast"
                        onClick={() => {
                            showSingleDeleteDialog(false)(dispatch);
                            respondToDeleteDialog('break')(dispatch);
                        }}> NO </Button>{'  '}
                    <Button onClick={() => {
                        showSingleDeleteDialog(false)(dispatch);
                        respondToDeleteDialog('continue')(dispatch);
                    }} type="button" variant="danger" data-bs-dismiss="toast"> YES </Button>
                </div>
            </Toast.Body>
        </Alert>

    );
};

export const MultipleDeleteDialog = () => {
    const [show, setShow] = useState(true);
    const state = useSelector((state) => state)
    const { showMultipleDeleteDialog } = state.alert;
    return (
        <Alert variant="warning align-items-center sticky-top" role="alert"
            aria-live="assertive" aria-atomic="true" style={{ display: showMultipleDeleteDialog ? 'block' : 'none' }}>
            <Toast.Body className=" align-items-center" style={{ textAlign: 'center' }}>
                <div className="d-block">
                    <svg className="me-2" id="exclamation-triangle-fill" fill="currentColor" width="20" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </svg>
                    Are you sure you want to delete this item  ?
                </div>
                <div className="d-block">
                    <Button type="button" variant="primary" data-bs-dismiss="toast" onClick={() => {
                        setShow(!show)
                    }}> NO </Button>{'  '}
                    <Button type="button" variant="danger" data-bs-dismiss="toast"> YES </Button>
                </div>
            </Toast.Body>
        </Alert>

    );
};
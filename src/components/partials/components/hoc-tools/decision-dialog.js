import { Toast, Alert, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { respondDialog, showHideDialog } from '../../../../store/actions/toaster-actions';

export const DecisionDialog = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { dialogShow: show, dialogMessage } = state.alert;
    return (
        <Alert variant="warning align-items-center sticky-top" role="alert"
            aria-live="assertive" aria-atomic="true" style={{ display: show ? 'block' : 'none' }}>
            <Toast.Body className=" align-items-center" style={{ textAlign: 'center' }}>
                <div className="d-block">
                    <svg className="me-2" id="exclamation-triangle-fill" fill="currentColor" width="20" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                    </svg>
                    {dialogMessage}
                </div>
                <div className="d-block">
                    <Button type="button" variant="primary" data-bs-dismiss="toast"
                        onClick={() => {
                            showHideDialog(false, null)(dispatch);
                            respondDialog('')(dispatch);
                        }}> NO </Button>{'  '}
                    <Button onClick={() => {
                        showHideDialog(false, null)(dispatch);
                        respondDialog('continue')(dispatch);
                    }} type="button" variant="danger" data-bs-dismiss="toast"> YES </Button>
                </div>
            </Toast.Body>
        </Alert>

    );
};

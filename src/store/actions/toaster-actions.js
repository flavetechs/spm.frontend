import { actions } from "../action-types/toaster-action-types"

export const showStickyInfoToast = (message) => dispatch =>{
    dispatch({
        type: actions.SHOW_STICKY_INFO_TOAST,
        payload: message
    })
}

export const hideStickyInfoToast = () => dispatch =>{
    dispatch({
        type: actions.HIDE_STICKY_INFO_TOAST
    })
}

export const showAlertInfoToast = (message) => dispatch =>{
    dispatch({
        type: actions.SHOW_ALERT_INFO_TOAST,
        payload: message
    })
}

export const hideAlertInfoToast = () => dispatch =>{
    dispatch({
        type: actions.HIDE_ALERT_INFO_TOAST
    })
}

export const showSuccessToast = (message) => dispatch =>{
    dispatch({
        type: actions.SHOW_SUCCESS_TOAST,
        payload: message
    })
}

export const hideSuccessToast = () => dispatch =>{
    dispatch({
        type: actions.HIDE_SUCCESS_TOAST
    })
}
export const showErrorToast = (message) => dispatch =>{
    dispatch({
        type: actions.SHOW_ERROR_TOAST,
        payload: message
    })
}

export const hideErrorToast = () => dispatch =>{
    dispatch({
        type: actions.HIDE_ERROR_TOAST
    })
}

export const showSingleDeleteDialog = (value) => dispatch =>{
    dispatch({
        type: actions.SHOW_SINGLE_DELETE_DIALOG,
        payload: value
    })
}

export const showMultipleDeleteDialog = (value) => dispatch =>{
    dispatch({
        type: actions.SHOW_MULTIPLE_DELETE_DIALOG,
        payload: value
    })
}

export const respondToDeleteDialog = (value) => dispatch=> {
    dispatch({
        type: actions.DELETE_DIALOG_RESPPONSE,
        payload: value
    })
}

export const respondDialog = (value) => dispatch=> {
    dispatch({
        type: actions.RESPOND_DECISION_DIALOG,
        payload: value
    })
}
export const showHideDialog = (value, message) => dispatch=> {
    dispatch({
        type: actions.SHOW_DECISION_DIALOG,
        payload: [value, message]
    })
}

export const showHideModal = (value) => (dispatch) => {
    dispatch({
        type: actions.SHOW_HIDE_MODAL,
        payload: value
    });
}

export const showHideTimeOutModal = (value) => (dispatch) => {
    dispatch({
        type: actions.SHOW_HIDE_TIME_OUT_MODAL,
        payload: value
    });
}

export const respondModal = (message) => dispatch=> {
    dispatch({
        type: actions.RESPOND_MODAL,
        payload: message
    })
}

export const timeOutRespondModal = (message) => dispatch=> {
    dispatch({
        type: actions.RESPOND_TIME_OUT_MODAL,
        payload: message
    })
}
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
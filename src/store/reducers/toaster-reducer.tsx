import { actions } from "../action-types/toaster-action-types"
import { _state } from "../states/toaster-state"
export const alertReducer = (state = _state, { type, payload }: any) => {
    switch (type) {
        case actions.SHOW_STICKY_INFO_TOAST:
            return {
                ...state,
                showStickyInfoToast: true,
                message: payload
            }
        case actions.HIDE_STICKY_INFO_TOAST:
            return {
                ...state,
                showStickyInfoToast: false,
                message: ''
            }
        case actions.SHOW_ALERT_INFO_TOAST:
            return {
                ...state,
                showAlertInfoToast: true,
                message: payload
            }
        case actions.HIDE_ALERT_INFO_TOAST:
            return {
                ...state,
                showAlertInfoToast: false,
                message: ''
            }
        default:
            return state
    }
}
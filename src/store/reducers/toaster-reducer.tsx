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
        case actions.SHOW_SUCCESS_TOAST:
            return {
                ...state,
                showSuccessToast: true,
                message: payload
            }
        case actions.HIDE_SUCCESS_TOAST:
            return {
                ...state,
                showSuccessToast: false,
                message: ''
            }

        case actions.SHOW_ERROR_TOAST:
            return {
                ...state,
                showErrorToast: true,
                message: payload
            }
        case actions.HIDE_ERROR_TOAST:
            return {
                ...state,
                showErrorToast: false,
                message: ''
            }
        case actions.SHOW_SINGLE_DELETE_DIALOG:
            return {
                ...state,
                showSingleDeleteDialog: payload,
            }
        case actions.SHOW_MULTIPLE_DELETE_DIALOG:
            return {
                ...state,
                showMultipleDeleteDialog: payload
            }

        case actions.DELETE_DIALOG_RESPPONSE:
            return {
                ...state,
                deleteDialogResponse: payload
            }
        case actions.SHOW_DECISION_DIALOG:
            return {
                ...state,
                dialogShow: payload[0],
                dialogMessage: payload[1]
            }
        case actions.RESPOND_DECISION_DIALOG:
            return {
                ...state,
                dialogResponse: payload
            }
        case actions.SHOW_HIDE_MODAL:
            return {
                ...state,
                showModal: payload
            }
            case actions.SHOW_HIDE_TIME_OUT_MODAL:
            return {
                ...state,
                showTimeOutModal: payload
            }
        
            case actions.SHOW_HIDE_LOGIN_LAYOUT_MODAL:
            return {
                ...state,
                showLoginLayoutModal: payload
            }
            case actions.RESPOND_MODAL:
            return {
                ...state,
                modalResponse: payload
            }
            case actions.RESPOND_TIME_OUT_MODAL:
                return {
                    ...state,
                    timeOutModalResponse: payload
                }
        default:
            return state
    }
}
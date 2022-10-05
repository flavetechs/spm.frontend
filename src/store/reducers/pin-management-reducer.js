import { actions } from "../action-types/pin-management-action-types";
import { _state } from "../states/pin-management-state";

export const pinReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.FETCH_UNUSED_PIN_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false
            };
        case actions.FETCH_UNUSED_PIN_SUCCESS:
            return {
                ...state,
                loading: false,
                unUsedPinList: payload,
                isSuccessful: true,
            };
        case actions.FETCH_UNUSED_PIN_FAILED:
            return {
                ...state,
                loading: false,
                isSuccessful: false,
                message: payload
            };

        case actions.FETCH_USED_PIN_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false
            };
        case actions.FETCH_USED_PIN_SUCCESS:
            return {
                ...state,
                loading: false,
                 isSuccessful: true,
                usedPinList: payload.data,
                filterProps: payload,
            };
        case actions.FETCH_USED_PIN_FAILED:
            return {
                ...state,
                loading: false,
                isSuccessful: false,
                message: payload
            };


        case actions.FETCH_SINGLE_UNUSED_PIN_LOADING:
            return {
                ...state,
                loading: true,
                isSuccessful: false,
            };
        case actions.FETCH_SINGLE_UNUSED_PIN_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedUnusedPin: payload,
                isSuccessful: true,
            };
        case actions.FETCH_SINGLE_UNUSED_PIN_FAILED:
            return {
                ...state,
                loading: false,
                selectedUnusedPin: null,
                isSuccessful: false,
            };


        case actions.FETCH_SINGLE_USED_PIN_LOADING:
            return {
                ...state,
                loading: true,
                isSuccessful: false,
            };
        case actions.FETCH_SINGLE_USED_PIN_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedUsedPin: payload,
                isSuccessful: true,
            };
        case actions.FETCH_SINGLE_USED_PIN_FAILED:
            return {
                ...state,
                loading: false,
                selectedUsedPin: null,
                isSuccessful: false,
            };


        case actions.UPLOAD_PIN_FILE_LOADING:
            return {
                ...state,
                loading: true,
                isSuccessful: false,
                message: "",
            };
        case actions.UPLOAD_PIN_FILE_SUCCESS:
            return {
                ...state,
                isSuccessful: true,
                loading: false,
                message: payload,
            };
        case actions.UPLOAD_PIN_FILE_FAILED:
            return {
                ...state,
                isSuccessful: false,
                loading: false,
                message: payload,
            };

        default:
            return state;
    }
}

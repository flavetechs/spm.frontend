import { actions } from "../action-types/pin-management-action-types";
import { _state } from "../states/pin-management-state";

export const pinReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.FETCH_ALL_PIN_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false
            };
        case actions.FETCH_ALL_PIN_SUCCESS:
            return {
                ...state,
                loading: false,
                allPinList: payload,
                isSuccessful: true,
            };
        case actions.FETCH_ALL_PIN_FAILED:
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
                usedPinList: payload,
                isSuccessful: true,
            };
        case actions.FETCH_USED_PIN_FAILED:
            return {
                ...state,
                loading: false,
                isSuccessful: false,
                message: payload
            };


        case actions.FETCH_SINGLE_PIN_LOADING:
            return {
                ...state,
                loading: true,
                isSuccessful: false,
            };
        case actions.FETCH_SINGLE_PIN_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedPin: payload,
                isSuccessful: true,
            };
        case actions.FETCH_SINGLE_PIN_FAILED:
            return {
                ...state,
                loading: false,
                selectedPin: null,
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
// function filterSelectedIds(arr, value) {
//     return arr.filter(function (ele) {
//       return ele !== value;
//     });
//   }

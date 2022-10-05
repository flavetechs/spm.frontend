import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/pin-management-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";


export const getAllUnusedPinList = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_UNUSED_PIN_LOADING,
    });   
    axiosInstance.get(`/pin/api/v1/get/unused-pins`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_UNUSED_PIN_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_UNUSED_PIN_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getAllUsedPinList = (sessionId, termId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_USED_PIN_LOADING,
    });          
    axiosInstance.get(`/pin/api/v1/get/used-pins?sessionId=${sessionId}&termId=${termId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_USED_PIN_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_USED_PIN_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const fetchSingleUnusedPin = (unusedPin) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_UNUSED_PIN_LOADING,
    });     
        axiosInstance.get(`/pin/api/v1/get-unused/pin-details?pin=${unusedPin}`)
            .then((res) => {
                dispatch({
                    type: actions.FETCH_SINGLE_UNUSED_PIN_SUCCESS,
                    payload: res.data.result
                });
            }).catch(err => {
                dispatch({
                    type: actions.FETCH_SINGLE_UNUSED_PIN_FAILED,
                    payload: err.response.data.result
                })
            });
}
export const fetchSingleUsedPin = (usedPin) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_USED_PIN_LOADING,
    });   
        axiosInstance.get(`/pin/api/v1/get-used/pin-details?pin=${usedPin}`)
            .then((res) => {
                dispatch({
                    type: actions.FETCH_SINGLE_USED_PIN_SUCCESS,
                    payload: res.data.result
                });
            }).catch(err => {
                dispatch({
                    type: actions.FETCH_SINGLE_USED_PIN_FAILED,
                    payload: err.response.data.result
                })
            });
}


export const upLoadPinFile = (upLoadFile, formData) => (dispatch) => {
    dispatch({
        type: actions.UPLOAD_PIN_FILE_LOADING
    });
                
    axiosInstance.post('/pin/api/v1/upload/pin',  formData, upLoadFile)
        .then((res) => {
            dispatch({
                type: actions.UPLOAD_PIN_FILE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllUnusedPinList(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPLOAD_PIN_FILE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


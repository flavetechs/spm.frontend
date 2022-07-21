import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/pin-management-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";


export const getAllPinList = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ALL_PIN_LOADING,
    });          //change the url
    axiosInstance.get(`/portalsetting/api/v1/get/school-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ALL_PIN_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_ALL_PIN_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getUsedPinList = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_USED_PIN_LOADING,
    });          //change the url
    axiosInstance.get(`/portalsetting/api/v1/get/school-settings`)
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

export const fetchSinglePin = (allPinId) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_PIN_LOADING,
    });              //chnage url
        axiosInstance.get(`/tercher/api/v1/get-single/${allPinId}`)
            .then((res) => {
                dispatch({
                    type: actions.FETCH_SINGLE_PIN_SUCCESS,
                    payload: res.data.result
                });
            }).catch(err => {
                dispatch({
                    type: actions.FETCH_SINGLE_PIN_FAILED,
                    payload: err.response.data.result
                })
            });
}
export const fetchSingleUsedPin = (usedPinId) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_USED_PIN_LOADING,
    });              //chnage url
        axiosInstance.get(`/tercher/api/v1/get-single/${usedPinId}`)
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
        type: actions.UPLOAD_PIN_FILE_FAILED
    });

    axiosInstance.post('/pin/api/v1/upload/pin',  formData, upLoadFile)
        .then((res) => {
            dispatch({
                type: actions.UPLOAD_PIN_FILE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPLOAD_PIN_FILE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


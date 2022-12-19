import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/candidate-admission-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const userEmailLogin = (userEmail) => (dispatch) => {

    dispatch({
        type: actions.LOGIN_CANDIDATE_LOADING
    });

    axiosInstance.post('/smp/api/v1/candidate-admission/login', userEmail)
        .then((res) => {
            console.log("res", res);
            dispatch({
                type: actions.LOGIN_CANDIDATE_SUCCESS,
                payload: res.data,
            });
        }).catch(err => {
            console.log("err", err);
            dispatch({
                type: actions.LOGIN_CANDIDATE_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
        })
}

export const confirmUserEmail = (admissionNotificationId) => (dispatch) => {

    dispatch({
        type: actions.CONFIRM_USER_EMAIL_LOADING
    });

    axiosInstance.post('/smp/api/v1/candidate-admission/confirm-email', admissionNotificationId)
        .then((res) => {
            console.log("res", res.data.result);
            dispatch({
                type: actions.CONFIRM_USER_EMAIL_SUCCESS,
                payload: res.data.result,
            });
        }).catch(err => {
            console.log("err", err);
            dispatch({
                type: actions.CONFIRM_USER_EMAIL_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
        })
}

export const logOutUserEmail = () => {
    return {
        type: actions.LOG_OUT_CANDIDATE_USER
    }
}

export const getCandidatesAdmissionList = (PageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ADMISSIONS_LIST_LOADING,
    });
    axiosInstance.get(`/smp/api/v1/candidate-admission/get-all-admission?PageNumber=${PageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ADMISSIONS_LIST_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_ADMISSIONS_LIST_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getSingleAdmissionDetail = (admissionId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_ADMISSION_LOADING,
    });
    axiosInstance.get(`/smp/api/v1/candidate-admission/get-single-admission/${admissionId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getAdmissionClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ADMISSION_CLASSES_LOADING,
    });
    axiosInstance.get(`/smp/api/v1/candidate-admission/get-admission-classes`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ADMISSION_CLASSES_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_ADMISSION_CLASSES_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const createCandidateAdmission = (values) => (dispatch) => {
    dispatch({
        type: actions.CREATE_CANDIDATE_ADMISSION_LOADING
    });
    axiosInstance.post('/smp/api/v1/candidate-admission/create', values)
        .then((res) => {
            dispatch({
                type: actions.CREATE_CANDIDATE_ADMISSION_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getCandidatesAdmissionList(1)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_CANDIDATE_ADMISSION_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const deleteCandidateAdmission = (candidateAdmissionId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CANDIDATE_ADMISSION_LOADING
    });
    const payload = {
        item: candidateAdmissionId[0]
    }

    axiosInstance.post('/smp/api/v1/candidate-admission/delete-admission', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CANDIDATE_ADMISSION_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getCandidatesAdmissionList()
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_CANDIDATE_ADMISSION_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
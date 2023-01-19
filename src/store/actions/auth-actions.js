import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/auth-action-types"
import { getActiveSession } from "./session-actions";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const loginUser = ({ userName, password }) => (dispatch) => {

    dispatch({
        type: actions.LOGIN_USER_LOADING
    });

    const payload = {
        userName,
        password
    }

    axiosInstance.post('user/api/v1/login', payload)
        .then((res) => {
            dispatch({
                type: actions.LOGIN_USER_SUCCESS,
                payload: res.data.result
            });
            getActiveSession()(dispatch);
        }).catch(err => {
            dispatch({
                type: actions.LOGIN_USER_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
        })
}

export const loginOutUser = () => {
    return {
        type: actions.LOG_OUT_USER
    }
}




export const generatePasswordResetLink = ({ resetOption, resetOptionValue, userType }) => (dispatch) => {

    dispatch({
        type: actions.GENERATE_PASSWORD_RESET_LINK_LOADING
    });

    const payload = {
        resetOption,
        resetOptionValue,
        userType
    }

    axiosInstance.post('/user/api/v1/generate/reset-link', payload)
        .then((res) => {
            dispatch({
                type: actions.GENERATE_PASSWORD_RESET_LINK_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.GENERATE_PASSWORD_RESET_LINK_FAILED,
                payload: err.response.data.result
            })
        })
}

export const ResetPassword = ({ userId, password, resetToken }) => (dispatch) => {

    dispatch({
        type: actions.RESET_PASSWORD_LOADING
    });

    const payload = {
        userId,
        password,
        resetToken
    }

    axiosInstance.post('/user/api/v1/reset/password', payload)
        .then((res) => {
            dispatch({
                type: actions.RESET_PASSWORD_LOADING,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.RESET_PASSWORD_FAILED,
                payload: err.response.data.result
            })
        })
}

export const changeMyPassword = ({ userId, oldPassword, newPassword }) => (dispatch) => {
    dispatch({
        type: actions.LOGIN_USER_LOADING
    });

    const payload = {
        userId,
        oldPassword,
        newPassword
    }

    axiosInstance.post('user/api/v1/first-time/change-password', payload)
        .then((res) => {
            dispatch({
                type: actions.LOGIN_USER_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.LOGIN_USER_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
        })
}

export const loginCBT = () => (dispatch) => {

    dispatch({
        type: actions.CBT_LOGIN_LOADING
    });

    axiosInstance.post('user/api/v1/get/cbt-token')
        .then((res) => {
            dispatch({
                type: actions.CBT_LOGIN_SUCCESS,
                payload: res.data.result
            });
            getActiveSession()(dispatch);
        }).catch(err => {
            dispatch({
                type: actions.CBT_LOGIN_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
        })
}


export const forgotPassword = ({ email }) => (dispatch) => {

    dispatch({
        type: actions.FORGET_PASSWORD_LOADING
    });

    const payload = {
        email,
    }

    axiosInstance.post('/user/api/v1/forgot-password', payload)
        .then((res) => {
            dispatch({
                type: actions.FORGET_PASSWORD_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch(err => {
            dispatch({
                type: actions.FORGET_PASSWORD_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        })
}



export const resetForgottenPassword = ({ userId, password, resetToken }) => (dispatch) => {

    dispatch({
        type: actions.RESET_FORGOTTEN_PASSWORD_LOADING
    });

    const payload = {
        userId,
        password,
        resetToken,
    }

    axiosInstance.post('/user/api/v1/reset-password', payload)
        .then((res) => {
            dispatch({
                type: actions.RESET_FORGOTTEN_PASSWORD_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch(err => {
            dispatch({
                type: actions.RESET_FORGOTTEN_PASSWORD_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        })
}
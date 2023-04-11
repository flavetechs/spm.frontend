import axiosInstance from "../../axios/axiosInstance";
import { authLocations } from "../../router/spm-path-locations";
import { actions } from "../action-types/auth-action-types"
import { getActiveSession } from "./session-actions";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const loginUser = (values) => (dispatch) => {
    dispatch({
        type: actions.LOGIN_USER_LOADING
    });



    axiosInstance.post('user/api/v1/login', values)
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




export const generatePasswordResetLink = ({ resetOption, resetOptionValue, userType, schoolUrl }) => (dispatch) => {

    dispatch({
        type: actions.GENERATE_PASSWORD_RESET_LINK_LOADING
    });

    const payload = {
        resetOption,
        resetOptionValue,
        userType,
        schoolUrl
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

export const changeMyPassword = ({ userId, oldPassword, newPassword, schoolUrl }) => (dispatch) => {
    dispatch({
        type: actions.LOGIN_USER_LOADING
    });

    const payload = {
        userId,
        oldPassword,
        newPassword,
        schoolUrl
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

export const forgotPasswordFunc = (values) => (dispatch) => {
    dispatch({
        type: actions.FORGOT_PASSWORD_LOADING
    });

    axiosInstance.post('/user/api/v1/forgot-password', values)
        .then((res) => {
            dispatch({
                type: actions.FORGOT_PASSWORD_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
        }).catch(err => {
            dispatch({
                type: actions.FORGOT_PASSWORD_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
        })
}


export const resetForgotPasswordFunc = ({ userId, password, resetToken, schoolUrl },history) => (dispatch) => {
    dispatch({
        type: actions.RESET_FORGOT_PASSWORD_LOADING
    });

    const payload = {
        userId,
        password,
        resetToken,
        schoolUrl
    }

    axiosInstance.post('/user/api/v1/reset-password', payload)
        .then((res) => {
        dispatch(loginOutUser());
         history.push(authLocations.login);
            dispatch({
                type: actions.RESET_FORGOT_PASSWORD_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
        showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        }).catch(err => {
            dispatch({
                type: actions.RESET_FORGOT_PASSWORD_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
        })
}
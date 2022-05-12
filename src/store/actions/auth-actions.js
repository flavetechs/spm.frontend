import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/auth-action-types"

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
        }).catch(err => {
            console.log('err', err.response.data.result);
            dispatch({
                type: actions.LOGIN_USER_FAILED,
                payload: err.response.data.result
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


import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/portal-setting-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";



export const getSchoolSettingList = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_SCHOOL_SETTING_LOADING,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/school-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SCHOOL_SETTING_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_SCHOOL_SETTING_FAILED,
                payload: err.response.data.result,
            });
        });
};


export const getResultSettingList = (resultlSettingId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_RESULT_SETTING_LOADING,
        payload: resultlSettingId,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/result-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_RESULT_SETTING_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_RESULT_SETTING_FAILED,
                payload: err.response.data.result,
            });
        });
};


export const getNotificationSettingList = (notificationSettingId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_NOTIFICATION_SETTING_LOADING,
        payload: notificationSettingId,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/notification-settings`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_NOTIFICATION_SETTING_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_NOTIFICATION_SETTING_FAILED,
                payload: err.response.data.result,
            });
        });
};




export const updateSchoolSetting = (updatedSchool, formData) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SCHOOL_SETTING_LOADING
    });

    axiosInstance.post('/portalsetting/api/v1/create-update/school-setting',  formData, updatedSchool)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SCHOOL_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SCHOOL_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const updateResultSetting = (updatedResult, formData) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_RESULT_SETTING_LOADING
    });

    axiosInstance.post('/portalsetting/api/v1/create-update/result-setting',formData, updatedResult)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_RESULT_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_RESULT_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const updateNotificationSetting = (updatedNotification) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_NOTIFICATION_SETTING_LOADING
    });

    axiosInstance.post('/portalsetting/api/v1/create-update-notification-setting', updatedNotification)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_NOTIFICATION_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_NOTIFICATION_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createSchoolSetting = (school) => (dispatch) => {
    dispatch({
        type: actions.CREATE_SCHOOL_SETTING_LOADING
    });
    axiosInstance.post('/portalsetting/api/v1/create-school-setting', school)
        .then((res) => {
            dispatch({
                type: actions.CREATE_SCHOOL_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_SCHOOL_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createResultSetting = (result) => (dispatch) => {
    dispatch({
        type: actions.CREATE_RESULT_SETTING_LOADING
    });
    axiosInstance.post('/portalsetting/api/v1/create-result-setting', result)
        .then((res) => {
            dispatch({
                type: actions.CREATE_RESULT_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_RESULT_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createNotificationSetting = (notification) => (dispatch) => {
    dispatch({
        type: actions.CREATE_NOTIFICATION_SETTING_LOADING
    });
    axiosInstance.post('/subject/api/v1/create/subject', notification)
        .then((res) => {
            dispatch({
                type: actions.CREATE_NOTIFICATION_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_NOTIFICATION_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

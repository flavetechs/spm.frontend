
import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/portal-setting-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";



export const getSchoolSetting = () => (dispatch) => {
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


export const getResultSetting = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_RESULT_SETTING_LOADING,
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
export const updateSelectedResultTemplate = (templateName) => (dispatch) => {
    //getResultSetting()(dispatch);
    dispatch({
        type: actions.UPDATE_SELECTED_TEMPLATE,
        payload: templateName,
    });
}

export const getNotificationSettingResult = (notificationSettingId) => (dispatch) => {
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




export const updateSchoolSetting = (formData) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SCHOOL_SETTING_LOADING
    });

    axiosInstance.post('/portalsetting/api/v1/create-update/school-setting', formData)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SCHOOL_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getSchoolSetting()(dispatch);
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

    axiosInstance.post('/portalsetting/api/v1/create-update/result-setting', formData, updatedResult)
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

export const updateNotificationSetting = (formData) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_NOTIFICATION_SETTING_LOADING
    });


    axiosInstance.post('/portalsetting/api/v1/create-update-notification-setting', formData)
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
    axiosInstance.post('', notification)
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


export const getAllAdmissionSettingByParent = (pageSize,pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ADMISSION_SETTING_LOADING,
    });

    axiosInstance.get(`/smp/api/v1/admission-settings/get-all-settings/from-admission?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ADMISSION_SETTING_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_ADMISSION_SETTING_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const getAllAdmissionSetting = (PageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ADMISSION_SETTING_LOADING,
    });

    ///smp/api/v1/admission-settings/get-all-settings?PageNumber=1
    axiosInstance.get(`/smp/api/v1/admission-settings/get-all-settings?PageNumber=${PageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ADMISSION_SETTING_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_ADMISSION_SETTING_FAILED,
                payload: err.response.data.result,
            });
        });
};
export const getSingleAdmissionSetting = (admissionSettingsId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_ADMISSION_SETTING_LOADING,
    });

    axiosInstance.get(`/smp/api/v1/admission-settings/get-single-settings?admissionSettingsId=${admissionSettingsId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_SETTING_SUCCESS,
                payload: res.data.result,
            });
        })
        .catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_SETTING_FAILED,
                payload: err.response.data.result,
            });
        });
};



export const createAdmissionSetting = (result) => (dispatch) => {
    dispatch({
        type: actions.CREATE_ADMISSION_SETTING_LOADING
    });
    axiosInstance.post('/smp/api/v1/admission-settings/create', result)
        .then((res) => {
            dispatch({
                type: actions.CREATE_ADMISSION_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllAdmissionSetting(1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_ADMISSION_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateAdmissionSetting = (result) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_ADMISSION_SETTING_LOADING
    });
    axiosInstance.post('/smp/api/v1/admission-settings/update', result)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_ADMISSION_SETTING_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_ADMISSION_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const getAppLayout = (url) => (dispatch) => {
    dispatch({
        type: actions.PORTAL_SETTING_LOADING,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/applayout-setting?url=${url}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_APP_LAYOUT_SUCCESS,
                payload: res.data.result,
            });
            
        })
        .catch((err) => {
            dispatch({
                type: actions.PORTAL_SETTING_FAILED,
                payload: err.response.data.result,
            });
        });
};

export const updateAppLayout = (layout) => (dispatch) => {
    dispatch({
        type: actions.PORTAL_SETTING_LOADING
    });
    axiosInstance.post('/portalsetting/api/v1/update-applayout-setting', layout)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_APP_LAYOUT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAppLayout(layout.schoolUrl)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.PORTAL_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const getStudentRegNo = () => (dispatch) => {
    dispatch({
        type: actions.PORTAL_SETTING_LOADING,
    });
    axiosInstance.get(`/portalsetting/api/v1/get/reg-no-setting`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENT_REG_NO_SUCCESS,
                payload: res.data.result,
            });
            
        })
        .catch((err) => {
            dispatch({
                type: actions.PORTAL_SETTING_FAILED,
                payload: err.response.data.result,
            });
        });
};


export const updateStudentRegNo = (payload) => (dispatch) => {
    dispatch({
        type: actions.PORTAL_SETTING_LOADING
    });
    axiosInstance.post('/portalsetting/api/v1/create-update/reg-no-setting', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_STUDENT_REG_NO_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.PORTAL_SETTING_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
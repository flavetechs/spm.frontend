
import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/staff-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";




export const pushId = (itemId) => {
    return {
        type: actions.PUSH_ITEM_ID,
        payload: itemId
    }
}
export const removeId = (itemId) => {
    return {
        type: actions.REMOVE_ITEM_ID,
        payload: itemId
    }
}
export const returnList = (items) => (dispatch) => {
    dispatch({
        type: actions.RETURN_ITEM_LIST,
        payload: items
    })
}

export const fetchSingleItem = (teacherAccountId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: teacherAccountId
    });

}

export const fetchSingleStaff = (teacherAccountId) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_STAFF_LOADING,
    });
    axiosInstance.get(`/tercher/api/v1/get-single/${teacherAccountId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_STAFF_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_STAFF_FAILED,
                payload: err.response.data.result
            })
        });
}


//STAFF ACTION HANDLERS
export const getAllStaffAccount = (pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STAFFACCOUNT_LOADING
    });

    axiosInstance.get(`/tercher/api/v1/getall/teachers?pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STAFFACCOUNT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_STAFFACCOUNT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createStaffAccount = (staff, formData) => (dispatch) => {
    dispatch({
        type: actions.CREATE_STAFFACCOUNT_LOADING
    });
    axiosInstance.post('/create/teacher', formData, staff)
        .then((res) => {
            dispatch({
                type: actions.CREATE_STAFFACCOUNT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllStaffAccount(1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_STAFFACCOUNT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteStaffAccount = (teacherUserAccountId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_STAFFACCOUNT_LOADING
    });
    const payload = {
        items: teacherUserAccountId
    }

    axiosInstance.post('/tercher/api/v1/delete/teacher', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_STAFFACCOUNT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllStaffAccount(1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_STAFFACCOUNT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateStaffAccount = (teacherAccountId, formData) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_STAFFACCOUNT_LOADING
    });

    axiosInstance.post('/update/teacher', formData, teacherAccountId)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_STAFFACCOUNT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
            getAllStaffAccount(1)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_STAFFACCOUNT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
export const fetchSingleTeacherClassesAndSubjects = (teacherAccountId) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_TEACHER_CLASSES_AND_SUBJECTS_LOADING,
    });
    axiosInstance.get(`/tercher/api/v1/get-teacher/classes-subject?teacherAccountId=${teacherAccountId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_TEACHER_CLASSES_AND_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_TEACHER_CLASSES_AND_SUBJECTS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const updateTeacherProfile = (formData) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_TEACHER_PROFILE_LOADING
    });
    axiosInstance.post('/update/teacher-profile/by-teacher', formData)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_TEACHER_PROFILE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_TEACHER_PROFILE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

//STAFF ACTION HANDLERS
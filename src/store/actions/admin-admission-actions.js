import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/admin-admission-action-types";
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

export const fetchAllAdminAdmissionList = (pageNumber, classId, examStatus) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ALL_ADMISSION_LIST_LOADING
    });
    axiosInstance.get(`/smp/api/v1/admission/get-all-admission?PageNumber=${pageNumber}&classId=${classId}&examStatus=${examStatus}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ALL_ADMISSION_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ALL_ADMISSION_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const fetchSingleAdminAdmissionDetail = (admissionId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_ADMISSION_DETAIL_LOADING
    });
    axiosInstance.get(`/smp/api/v1/admission/get-admission/${admissionId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_DETAIL_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_ADMISSION_DETAIL_FAILED,
                payload: err.response.data.result
            })
        });
}

export const admissionExportToCBT = (selectedClassId, categoryName) => (dispatch) => {
    dispatch({
        type: actions.ADMISSION_EXPORT_TO_CBT_LOADING
    });

    const payload = {
        classId: selectedClassId,
        categoryName
    }
    axiosInstance.post('/smp/api/v1/admission/admission/export-to-cbt', payload)
        .then((res) => {
            dispatch({
                type: actions.ADMISSION_EXPORT_TO_CBT_SUCCEESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.ADMISSION_EXPORT_TO_CBT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const getSessionClasses2 = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_SESSION_CLASSES2_LOADING
    });
    axiosInstance.get(`/class/api/v1/get-all/session-classes2`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SESSION_CLASSES2_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SESSION_CLASSES2_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAdminAdmissionClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ALL_ADMIN_ADMISSION_CLASSES_LOADING
    });
    axiosInstance.get(`/smp/api/v1/admission/get-admission-classes`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ALL_ADMIN_ADMISSION_CLASSES_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ALL_ADMIN_ADMISSION_CLASSES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const enrollSingleCandidate = (selectedIds, selectedSessionClassId) => (dispatch) => {
    dispatch({
        type: actions.ENROLL_SINGLE_CANDIDATE_LOADING
    });

    const payload = {
        admissionId: selectedIds[0],
        sessionClassId: selectedSessionClassId
    }
    axiosInstance.post('/smp/api/v1/admission/enroll-candidate', payload)
        .then((res) => {
            dispatch({
                type: actions.ENROLL_SINGLE_CANDIDATE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.ENROLL_SINGLE_CANDIDATE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const enrollMultipleCandidates = (selectedIds, selectedSessionClassId) => (dispatch) => {
    dispatch({
        type: actions.ENROLL_MULTIPLE_CANDIDATE_LOADING
    });

    const payload = {
        admissionIds: selectedIds,
        sessionClassId: selectedSessionClassId
    }
    axiosInstance.post('/smp/api/v1/admission/enroll-candidates', payload)
        .then((res) => {
            dispatch({
                type: actions.ENROLL_MULTIPLE_CANDIDATE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.ENROLL_MULTIPLE_CANDIDATE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
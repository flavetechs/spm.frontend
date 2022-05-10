import axiosInstance from "../../axios/axiosInstance"
import { actions } from "../action-types/subjects-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const getAllSubjects = () => (dispatch) => {
    dispatch({
        type: actions.SUBJECTS_LOADING
    });

    axiosInstance.get('subject/api/v1/getall/subject')
        .then((res) => {
            dispatch({
                type: actions.FETCH_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.SUBJECT_REQUEST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createUpdateSubject = ({ lookupId, name }) => (dispatch) => {
    dispatch({
        type: actions.SUBJECTS_LOADING
    });

    const payload = {
        lookupId,
        name
    }

    const url = lookupId !== '' ? '/subject/api/v1/update' : '/subject/api/v1/create'

    axiosInstance.post(url, payload)
        .then((res) => {
            dispatch({
                type: actions.CREATE_UPDATE_SUBJECT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.SUBJECT_REQUEST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const editSubject = (item) => {
    return {
        type: actions.EDIT_SUBJECT,
        payload: item
    }
}

export const pushId = (itemId) => {
    return {
        type: actions.PUSH_SUBJECT_ID,
        payload: itemId
    }
}

export const removeId = (itemId) => {
    return {
        type: actions.REMOVE_SUBJECT_ID,
        payload: itemId
    }
}

export const deleteSubjects = (lookupIds) => (dispatch) => {
    dispatch({
        type: actions.SUBJECTS_LOADING
    });

    const payload = {
        items: lookupIds
    }

    axiosInstance.post('/subject/api/v1/delete', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.SUBJECT_REQUEST_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const returnList = (subjects) => (dispatch) => {
    dispatch({
        type: actions.RETURN_LIST,
        payload: subjects
    })
}

export const fetchSingleSubject = (lookupId) => dispatch => {

    dispatch({
        type: actions.FETCH_SINGLE_SUBJECT_LOADING
    });


    console.log('lookupId', lookupId)
    axiosInstance.get(`/subject/api/v1/get/${lookupId}?roldeId=${lookupId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_SUBJECT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_SUBJECT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const updateSubjectActivityState = (id, value, selectedSubject, action) => dispatch => {
    const otherActivities = selectedSubject.activities.filter(e => e.activityId !== id);
    let targetActivity = selectedSubject.activities.find(e => e.activityId === id);
    if (targetActivity) {
        switch (action) {
            case 'canCreate':
                targetActivity.canCreate = value;
                break;
            case 'canUpdate':
                targetActivity.canUpdate = value;
                break;
            case 'canDelete':
                targetActivity.canDelete = value;
                break;
            case 'canImport':
                targetActivity.canImport = value;
                break;
            case 'canExport':
                targetActivity.canExport = value;
                break;
            default:
                break;
        }

        if (!targetActivity.canCreate && !targetActivity.canUpdate && !targetActivity.canDelete && !targetActivity.canImport && !targetActivity.canExport) {
            selectedSubject.activities = [...otherActivities];
        } else {
            selectedSubject.activities = [...otherActivities, targetActivity];
        }
        dispatch({
            type: actions.UPDATE_SUBJECT_ACTIVITY_STATE,
            payload: selectedSubject
        });
    } else {

        const newActivity = addNewActivityToSubject(id, value, action)
        selectedSubject.activities = [...otherActivities, newActivity];
        dispatch({
            type: actions.UPDATE_SUBJECT_ACTIVITY_STATE,
            payload: selectedSubject
        });
    }
}

const addNewActivityToSubject = (id, value, action) => {
    const activityId = id;
    let canCreate = false;
    let canUpdate = false;
    let canDelete = false;
    let canImport = false;
    let canExport = false;
    switch (action) {
        case 'canCreate':
            canCreate = value;
            break;
        case 'canUpdate':
            canUpdate = value;
            break;
        case 'canDelete':
            canDelete = value;
            break;
        case 'canImport':
            canImport = value;
            break;
        case 'canExport':
            canExport = value;
            break;
        default:
            break;
    }

    return {
        activityId,
        canCreate,
        canUpdate,
        canDelete,
        canImport,
        canExport
    };
}

export const updateSubjectNameState = (name, selectedSubject) => dispatch => {
    selectedSubject.name = name;
    dispatch({
        type: actions.UPDATE_SUBJECT_NAME_STATE,
        payload: selectedSubject,
    });


}
export const updateModifiedSubject = (subject) => dispatch => {
    dispatch({
        type: actions.UPDATE_SUBJECT_LOADING
    });
    axiosInstance.post('/subject/api/v1/update', subject)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_LOADING,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_LOADING,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createNewSubject = (subject) => dispatch => {
    dispatch({
        type: actions.UPDATE_SUBJECT_LOADING
    });
    axiosInstance.post('/subject/api/v1/create', subject)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_LOADING,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_LOADING,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


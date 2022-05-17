import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/class-action-types";
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

export const fetchSingleItem = (lookupId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: lookupId
    });

}

//CLASS ACTION HANDLERS

export const getAllClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASSLOOKUP_LOADING
    });

    axiosInstance.get('class/api/v1/getall/class-lookup')
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createClass = (form) => (dispatch) => {

    dispatch({
        type: actions.CREATE_CLASSLOOKUP_LOADING
    });



    axiosInstance.post('/class/api/v1/create/class-lookup', form)
        .then((res) => {
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateClass = ({ name, classId, isActive }) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_CLASSLOOKUP_LOADING
    });
    const payload = {
        lookupId: classId,
        name: name,
        isActive: isActive
    }
    axiosInstance.post('/class/api/v1/update/class-lookup', payload)
        .then((res) => {
            console.log('update res: ', res)
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage.result
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('update error: ', err)
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteClassItems = (classId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CLASS_LOADING
    });

    const payload = {
        items: classId
    }
    const url = '/class/api/v1/delete/class-lookup'
    axiosInstance.post(`${url}/${payload}`)
        .then((res) => {
            dispatch({
                type: actions.DELETE_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const fetchSingleClass = (classId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: classId
    });

}
//CLASS ACTION HANDLERS


//SUBJECT ACTION HANDLERS
export const getAllSubjects = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_SUBJECTS_LOADING
    });

    axiosInstance.get('subject/api/v1/getall/subject')
        .then((res) => {
            dispatch({
                type: actions.FETCH_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SUBJECT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createSubject = (subject) => (dispatch) => {
    dispatch({
        type: actions.CREATE_SUBJECT_LOADING
    });
    axiosInstance.post('/subject/api/v1/create/subject', subject)
        .then((res) => {
            dispatch({
                type: actions.CREATE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteSubject = (subjectId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_SUBJECT_LOADING
    });
    const payload = {
        items: subjectId
    }

    axiosInstance.post('/subject/api/v1/delete/subject', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllSubjects()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
export const updateSubject = (updatedSubject) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SUBJECT_LOADING
    });

    axiosInstance.post('/subject/api/v1/update/subject', updatedSubject)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SUBJECT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
//SUBJECT ACTION HANDLERS

//SESSION CLASS ACTION HANDLERS
export const getAllSessionClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_SESSION_CLASS_LOADING
    });

    axiosInstance.get('/class/api/v1/get-all/session-classes')
        .then((res) => {
            dispatch({
                type: actions.FETCH_SESSION_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SESSION_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createSessionClass = (sessionClass) => (dispatch) => {
    dispatch({
        type: actions.CREATE_SESSION_CLASS_LOADING
    });
    axiosInstance.post('/class/api/v1/create/session-class', sessionClass)
        .then((res) => {
            dispatch({
                type: actions.CREATE_SESSION_CLASS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_SESSION_CLASS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteSessionClass = (sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_SESSION_CLASS_LOADING
    });
    const payload = {
        items: sessionClassId
    }

    axiosInstance.post('/session/api/v1/delete', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_SESSION_CLASS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllSessionClasses()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_SESSION_CLASS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
export const updateSessionClass = (updatedSessionClass) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_SESSION_CLASS_LOADING
    });

    axiosInstance.post('/class/api/v1/update/session-class', updatedSessionClass)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_SESSION_CLASS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_SESSION_CLASS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
//SESSION CLASS ACTION HANDLERS

//GET TEACHERS ACTION HANDLER
export const getAllTeachers = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_TEACHERS_LOADING
    });

    axiosInstance.get('/user/api/v1/getall/teachers')
        .then((res) => {
            dispatch({
                type: actions.FETCH_TEACHERS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_TEACHERS_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET TEACHERS ACTION HANDLER

//GET ACTIVE SUBJECT ACTION  HANDLER
export const getAllActiveSubjects = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ACTIVE_SUBJECTS_LOADING
    });

    axiosInstance.get('/subject/api/v1/getall/active-subject')
        .then((res) => {
            dispatch({
                type: actions.FETCH_ACTIVE_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ACTIVE_SUBJECTS_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET ACTIVE SUBJECT ACTION  HANDLER

//GET ACTIVE CLASSES ACTION  HANDLER
export const getAllActiveClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ACTIVE_CLASSES_LOADING
    });

    axiosInstance.get('/class/api/v1/get-all/active-classes')
        .then((res) => {
            dispatch({
                type: actions.FETCH_ACTIVE_CLASSES_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ACTIVE_CLASSES_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET ACTIVE CLASSES ACTION  HANDLER

//CLASS SUBJECT IDS//
export const classSubjectsIds = (subjectId, subjectTeacherId, classSubjects) => (dispatch) => {
classSubjects.subjectId = subjectId;
classSubjects.subjectTeacherId = subjectTeacherId;
    console.log("classSubjects", classSubjects)
    dispatch({
        type: actions.CLASS_SUBJECT_ID,
        payload: classSubjects
    })
}
//CLASS SUBJECT IDS//
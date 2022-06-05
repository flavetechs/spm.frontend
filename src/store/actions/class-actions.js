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
            console.log('getall class res: ', res)
            dispatch({
                type: actions.FETCH_CLASSLOOKUP_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            console.log('getall class err: ', err)
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

export const updateClass = ({ name, lookupId, isActive }) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_CLASSLOOKUP_LOADING
    });
    const payload = {
        lookupId: lookupId,
        name: name,
        isActive: isActive
    }
    axiosInstance.post('/class/api/v1/update/class-lookup', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteClassItems = (classId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_CLASSLOOKUP_LOADING
    });
    const payload = {
        items: classId
    }

    axiosInstance.post('/class/api/v1/delete/class-lookup', payload)
        .then((res) => {
            console.log('delete class res: ', res)
            dispatch({
                type: actions.DELETE_CLASSLOOKUP_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllClasses()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('delete class err: ', err)
            dispatch({
                type: actions.DELETE_CLASSLOOKUP_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
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
export const getAllSessionClasses = (sessionId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SESSION_CLASS_LOADING
    });

    axiosInstance.get(`/class/api/v1/get-all/session-classes${sessionId}`)
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

export const deleteSessionClass = (selectedIds) => (dispatch) => {
    dispatch({
        type: actions.DELETE_SESSION_CLASS_LOADING
    });
    const payload = {
        item: selectedIds[0]
    }
    axiosInstance.post('/class/api/v1/delete-session-class', payload)
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
export const buildClassSubjectArray = (subjectId, subjectTeacherId, classSubjects, checkBoxValue = true) => (dispatch) => {

    var existingClassSubject = classSubjects.find(er => er.subjectId === subjectId);
    var otherClassSubject = classSubjects.filter(er => er.subjectId !== subjectId);
    if (existingClassSubject) {
        if (checkBoxValue) {
            existingClassSubject.subjectId = subjectId;
            existingClassSubject.subjectTeacherId = subjectTeacherId;
            classSubjects = [...otherClassSubject, existingClassSubject]
        } else {
            classSubjects = [...otherClassSubject]
        }
    } else {
        let newClassSubject = {
            subjectId,
            subjectTeacherId
        }
        classSubjects = [...classSubjects, newClassSubject]
    }

    dispatch({
        type: actions.PUSH_CLASS_SUBJECT_ID,
        payload: classSubjects
    })
}
//CLASS SUBJECT IDS//

//GET SINGLE SESSION CLASS
export const fetchSingleSessionClass = (sessionClassId) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_SESSION_CLASS_LOADING,
        payload: sessionClassId
    });
    axiosInstance.get(`/class/api/v1/get-single/session-classes/${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_SESSION_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_SESSION_CLASS_FAILED,
                payload: err.response.data.result
            })
        });

}

//GET TEACHERS ACTION HANDLER
export const getAllActiveTeachers = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ACTIVE_TEACHERS_LOADING
    });

    axiosInstance.get('/tercher/api/v1/getall/active-teachers')
        .then((res) => {
            dispatch({
                type: actions.FETCH_ACTIVE_TEACHERS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ACTIVE_TEACHERS_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET TEACHERS ACTION HANDLER

//GET ACTIVE SUBJECT ACTION  HANDLER
export const getAllActiveSubjects = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ACTIVE_SUBJECTS_LOADING,
    });

    axiosInstance.get('/subject/api/v1/getall/active-subject')
        .then((res) => {
            dispatch({
                type: actions.FETCH_ACTIVE_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_ACTIVE_SUBJECTS_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET ACTIVE SUBJECT ACTION  HANDLER
//GET ACTIVE SUBJECT ACTION  HANDLER
export const getAllClassStudents = (sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_STUDENTS_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/class/api/v1/get-students/${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASS_STUDENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CLASS_STUDENTS_FAILED,
                payload: err.response.data.result
            })
        });
}
//GET ACTIVE SUBJECT ACTION  HANDLER


export const pushSessionClassId = (itemId) => {
    return {
        type: actions.PUSH_SESSION_CLASS_ID,
        payload: itemId
    }
}
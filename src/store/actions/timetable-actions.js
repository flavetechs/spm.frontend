import axiosInstance from "../../axios/axiosInstance"
import { actions } from "../action-types/timetable-action-types"
import { showErrorToast, showSuccessToast } from "./toaster-actions"


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

export const fetchSingleItem = (classTimeTableId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: classTimeTableId
    });

}


//TIMETABLE ACTION HANDLERS
export const getAllTimetable = (classId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_TIMETABLE_LOADING
    });
    axiosInstance.get(`/smp/api/v1/timetable/get/class-time-table/${classId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_TIMETABLE_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_TIMETABLE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getTimetableActiveClass = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_TIMETABLE_ACTIVE_CLASS_LOADING
    });
    axiosInstance.get('/smp/api/v1/timetable/get/active-classes')
        .then((res) => {
            dispatch({
                type: actions.FETCH_TIMETABLE_ACTIVE_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_TIMETABLE_ACTIVE_CLASS_FAILED,
                payload: err.response.data.result
            })
        });
}


export const createTimetableDays = (day, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.CREATE_TIMETABLE_DAYS_LOADING
    });
    axiosInstance.post('/smp/api/v1/timetable/create/class-timetable-day', day)
        .then((res) => {
            dispatch({
                type: actions.CREATE_TIMETABLE_DAYS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_TIMETABLE_DAYS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const createTimetableTime = (time, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.CREATE_TIMETABLE_PERIOD_LOADING
    });           
    axiosInstance.post('/smp/api/v1/timetable/create/class-timetable-time', time)
        .then((res) => {
            dispatch({
                type: actions.CREATE_TIMETABLE_PERIOD_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_TIMETABLE_PERIOD_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateTimetableActivity = (activity, activityId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_TIMETABLE_ACTIVITY_LOADING
    });
    const payload = {
        activity,
        activityId
    }
    axiosInstance.post('/smp/api/v1/timetable/update/class-timetable-time-activity', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_TIMETABLE_ACTIVITY_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_TIMETABLE_ACTIVITY_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteClassTimetabledays = (classTimeTableDayId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_TIMETABLE_DAYS_LOADING
    });
    const payload = {
        item: classTimeTableDayId[0]
    }

    axiosInstance.post('/smp/api/v1/timetable/delete/class-timetable-day', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_TIMETABLE_DAYS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllTimetable(selectedClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_TIMETABLE_DAYS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const deleteClassTimetableTime = (timeId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_TIMETABLE_TIME_LOADING
    });
    const payload = {
        item: timeId[0]
    }
    axiosInstance.post('/smp/api/v1/timetable/delete/class-timetable-time', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_TIMETABLE_TIME_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllTimetable(selectedClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_TIMETABLE_TIME_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}
export const deleteClassTimetableActivity = (selectedIds, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_TIMETABLE_ACTIVITY_LOADING
    });
    const payload = {
        item: selectedIds[0]
    }

    axiosInstance.post('/smp/api/v1/timetable/delete/class-timetable-activity', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_TIMETABLE_ACTIVITY_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllTimetable(selectedClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_TIMETABLE_ACTIVITY_FALED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const updateTimetableDays = (day, examTimeTableId,classTimeTableDayId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_TIMETABLE_DAYS_LOADING
    });
    const payload = {
        day,
        classTimeTableId: examTimeTableId,
        classTimeTableDayId,
    }
    axiosInstance.post('/smp/api/v1/timetable/update/class-timetable-day', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_TIMETABLE_DAYS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_TIMETABLE_DAYS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateTimetableTime = (time, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_TIMETABLE_TIME_LOADING
    });
    axiosInstance.post('/smp/api/v1/timetable/update/class-timetable-time', time)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_TIMETABLE_TIME_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllTimetable(selectedClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_TIMETABLE_TIME_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const getStudentTimeTable = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENT_TIMETABLE_LOADING
    });
    axiosInstance.get('/smp/studenttimetable/api/v1/get/by-student')
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENT_TIMETABLE_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_STUDENT_TIMETABLE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllExamTimetable = (classId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    axiosInstance.get(`/smp/api/v1/exam-timetable/get/exam-time-table/${classId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_EXAM_TIMETABLE_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getExamTimetableActiveClass = () => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    axiosInstance.get('/smp/api/v1/exam-timetable/get/active-classes')
        .then((res) => {
            dispatch({
                type: actions.FETCH_EXAM_TIMETABLE_ACTIVE_CLASS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createExamTimetableDays = (day, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    axiosInstance.post('/smp/api/v1/exam-timetable/create/exam-timetable-day', day)
        .then((res) => {
            dispatch({
                type: actions.CREATE_EXAM_TIMETABLE_DAYS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllExamTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const createExamTimetableTime = (time, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });           
    axiosInstance.post('/smp/api/v1/exam-timetable/create/exam-timetable-time', time)
        .then((res) => {
            dispatch({
                type: actions.CREATE_EXAM_TIMETABLE_PERIOD_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllExamTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateExamTimetableActivity = (activity, activityId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    const payload = {
        activity,
        activityId
    }
    axiosInstance.post('/smp/api/v1/exam-timetable/update/exam-timetable-time-activity', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_EXAM_TIMETABLE_ACTIVITY_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllExamTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteExamClassTimetabledays = (examTimeTableDayId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    const payload = {
        item: examTimeTableDayId[0]
    }

    axiosInstance.post('/smp/api/v1/exam-timetable/delete/exam-timetable-day', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_EXAM_TIMETABLE_DAYS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllExamTimetable(selectedClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const deleteExamClassTimetableTime = (timeId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    const payload = {
        item: timeId[0]
    }
    axiosInstance.post('/smp/api/v1/exam-timetable/delete/exam-timetable-time', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_EXAM_TIMETABLE_TIME_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllExamTimetable(selectedClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteExamClassTimetableActivity = (selectedIds, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    const payload = {
        item: selectedIds[0]
    }

    axiosInstance.post('/smp/api/v1/exam-timetable/delete/exam-timetable-activity', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_EXAM_TIMETABLE_ACTIVITY_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllExamTimetable(selectedClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.TIMETABLE_FALED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const updateExamTimetableDays = (day, examTimeTableId,examTimeTableDayId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    const payload = {
        day,
        examTimeTableId,
        examTimeTableDayId,
    }
    axiosInstance.post('/smp/api/v1/exam-timetable/update/exam-timetable-day', payload)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_EXAM_TIMETABLE_DAYS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllExamTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateExamTimetableTime = (time, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.TIMETABLE_LOADING
    });
    axiosInstance.post('/smp/api/v1/exam-timetable/update/exam-timetable-time', time)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_EXAM_TIMETABLE_TIME_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllExamTimetable(selectedClassId)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.TIMETABLE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

// export const getStudentExamTimeTable = () => (dispatch) => {
//     dispatch({
//         type: actions.TIMETABLE_LOADING
//     });
//     axiosInstance.get('/smp/studenttimetable/api/v1/get/by-student')
//         .then((res) => {
//             dispatch({
//                 type: actions.FETCH_STUDENT_EXAM_TIMETABLE_SUCCESS,
//                 payload: res.data.result
//             });
//         }).catch(err => {
//             dispatch({
//                 type: actions.TIMETABLE_FAILED,
//                 payload: err.response.data.result
//             })
//         });
// }

//TIMETABLE ACTION HANDLERS
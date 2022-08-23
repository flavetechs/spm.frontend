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

export const fetchSingleItem = (classTimeTableTimeId) => dispatch => {
    dispatch({
        type: actions.GET_SINGLE_ITEM,
        payload: classTimeTableTimeId
    });

}


//TIMETABLE ACTION HANDLERS
export const getAllTimetable = (classId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_TIMETABLE_LOADING
    });
    axiosInstance.get(`/api/v1/smp/timetable/get/class-time-table/${classId}`)
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
    axiosInstance.get('/api/v1/smp/timetable/get/active-classes')
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
    axiosInstance.post('/api/v1/smp/timetable/create/class-timetable-day', day)
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
    axiosInstance.post('/api/v1/smp/timetable/create/class-timetable-time', time)
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
    axiosInstance.post('/api/v1/smp/timetable/update/class-timetable-time-activity', payload)
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

    axiosInstance.post('/api/v1/smp/timetable/delete/class-timetable-day', payload)
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

    axiosInstance.post('/api/v1/smp/timetable/delete/class-timetable-time', payload)
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

    axiosInstance.post('/api/v1/smp/timetable/delete/class-timetable-activity', payload)
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


export const updateTimetableDays = (day,classTimeTableId, selectedClassId) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_TIMETABLE_DAYS_LOADING
    });
    const payload = {
        day,
        classTimeTableId
    }
    axiosInstance.post('/api/v1/smp/timetable/create/class-timetable-day', payload)
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
    axiosInstance.post('/api/v1/smp/timetable/create/class-timetable-time', time)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_TIMETABLE_TIME_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
            getAllTimetable(selectedClassId)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_TIMETABLE_TIME_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


//TIMETABLE ACTION HANDLERS
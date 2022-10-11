import axios from "axios";
import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/student-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const pushId = (studentId) => {
    return {
        type: actions.PUSH_STUDENT_ID,
        payload: studentId
    }
}
export const removeId = (studentId) => {
    return {
        type: actions.REMOVE_STUDENT_ID,
        payload: studentId
    }
}
export const returnList = (students) => (dispatch) => {
    dispatch({
        type: actions.RETURN_STUDENT_LIST,
        payload: students
    })
}


export const getAllStudents = (pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENTS_LOADING
    });

    axiosInstance.get(`/student/api/v1/getall/students?pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_STUDENTS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const createStudent = (formData) => (dispatch) => {
    dispatch({
        type: actions.CREATE_STUDENT_LOADING
    });
    axiosInstance.post('/student/api/v1/create/student', formData)
        .then((res) => {
            dispatch({
                type: actions.CREATE_STUDENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.CREATE_STUDENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const updateStudent = (formData) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_STUDENT_LOADING
    });

    axiosInstance.post('/student/api/v1/update/student', formData)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_STUDENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_STUDENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const deleteStudent = (studentId) => (dispatch) => {
    dispatch({
        type: actions.DELETE_STUDENT_LOADING
    });
    const payload = {
        items: studentId
    }
    axiosInstance.post('/student/api/v1/delete/student', payload)
        .then((res) => {
            dispatch({
                type: actions.DELETE_STUDENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllStudents(1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.DELETE_STUDENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const fetchSingleStudent = (studentAccountId) => dispatch => {
    dispatch({
        type: actions.FETCH_SINGLE_STUDENT_LOADING,
        payload: studentAccountId
    });
    axiosInstance.get(`/student/api/v1/get-single/${studentAccountId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_STUDENT_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_SINGLE_STUDENT_FAILED,
                payload: err.response.data.result
            })
        });

}

export const getCountries = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_COUNTRY_LOADING,
    });

    axiosInstance.get(`/get-countries`)
        .then(response => {
            dispatch({
                type: actions.FETCH_COUNTRY_SUCCESS,
                payload: response.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_COUNTRY_FAILED,
                payload: err.response.data.result
            });
        })
}

export const getStates = (state) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STATE_LOADING,
    });

    axiosInstance.get(`/get-states?state=${state}`)
        .then(response => {
            dispatch({
                type: actions.FETCH_STATE_SUCCESS,
                payload: response.data.result
            });

        }).catch(err => {
            dispatch({
                type: actions.FETCH_STATE_FAILED,
                payload: err.response.data.result
            });
        })
}


export const getCities = (city) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CITY_LOADING,
    });

    axiosInstance.get(`/get-cities?city=${city}`)
        .then(response => {
            dispatch({
                type: actions.FETCH_CITY_SUCCESS,
                payload: response.data.result
            });

        }).catch(err => {
            dispatch({
                type: actions.FETCH_CITY_FAILED,
                payload: err.response.data.result
            });
        })
}

export const updateStudentProfile = (formData) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_STUDENT_PROFILE_LOADING
    });
    axiosInstance.post('/student/api/v1/update/by-student', formData)
        .then((res) => {
            dispatch({
                type: actions.UPDATE_STUDENT_PROFILE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UPDATE_STUDENT_PROFILE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


export const uploadStudentsListFile = (formData) => (dispatch) => {
    dispatch({
        type: actions.UPLOAD_STUDENTS_LIST_FILE_LOADING
    });

    axiosInstance.post('/student/api/v1/upload/students', formData)
        .then((res) => {
            dispatch({
                type: actions.UPLOAD_STUDENTS_LIST_FILE_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch);
            getAllStudents(1)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.UPLOAD_STUDENTS_LIST_FILE_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}


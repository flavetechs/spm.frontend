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


export const getAllStudents = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENTS_LOADING
    });

    axiosInstance.get('/student/api/v1/getall/students')
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

export const createStudent = (student) => (dispatch) => {
    dispatch({
        type: actions.CREATE_STUDENT_LOADING
    });
    axiosInstance.post('/student/api/v1/create/student', student)
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

export const updateStudent = (updatedStudent) => (dispatch) => {
    dispatch({
        type: actions.UPDATE_STUDENT_LOADING
    });

    axiosInstance.post('/student/api/v1/update/student', updatedStudent)
        .then((res) => {
            console.log("updateRes", res)
            dispatch({
                type: actions.UPDATE_STUDENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log("updateErr", err)
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
            getAllStudents()(dispatch);
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
                console.log("res", res.data)
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


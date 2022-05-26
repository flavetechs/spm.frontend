import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/enrollment-action-types"
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const pushId = (unenrolledStudentId) => {
    return {
        type: actions.PUSH_UNENROLLED_STUDENT_ID,
        payload: unenrolledStudentId
    }
}
export const removeId = (unenrolledStudentId) => {
    return {
        type: actions.REMOVE_UNENROLLED_STUDENT_ID,
        payload: unenrolledStudentId
    }
}
export const returnList = (unenrolledStudents) => (dispatch) => {
    dispatch({
        type: actions.RETURN_UNENROLLED_STUDENT_LIST,
        payload: unenrolledStudents
    })
}


export const getAllUnenrolledStudents = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_UNENROLLED_STUDENTS_LOADING
    });

    axiosInstance.get('/errollment/api/v1/getall/unenrolled')
        .then((res) => {
            dispatch({
                type: actions.FETCH_UNENROLLED_STUDENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_UNENROLLED_STUDENTS_FAILED,
                payload: err.response.data.result
            })
        });
}
export const enrollStudent = (values) => (dispatch) => {
    dispatch({
        type: actions.ENROLL_STUDENT_LOADING
    });
    axiosInstance.post('/errollment/api/v1/enroll/students', values)
        .then((res) => {
            dispatch({
                type: actions.ENROLL_STUDENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllUnenrolledStudents()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.ENROLL_STUDENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const getAllenrolledStudents = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_ENROLLED_STUDENTS_LOADING
    });

    axiosInstance.get('/errollment/api/v1/getall/enrolled')
        .then((res) => {
            console.log('enrolled res', res);
            dispatch({
                type: actions.FETCH_ENROLLED_STUDENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            console.log('enrolled err', err);
            dispatch({
                type: actions.FETCH_ENROLLED_STUDENTS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const unEnrollStudent = (studentContactId) => (dispatch) => {
    dispatch({
        type: actions.UNENROLL_STUDENTS_LOADING
    });
    const payload = {
        studentContactIds: studentContactId
    }
    axiosInstance.post('/errollment/api/v1/unenroll/students', payload)
        .then((res) => {
            console.log('unenrolled res', res);
            dispatch({
                type: actions.UNENROLL_STUDENTS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllenrolledStudents()(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            console.log('unenrolled err', err);
            dispatch({
                type: actions.UNENROLL_STUDENTS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}





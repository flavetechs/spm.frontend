import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/enrollment-action-types"
import { getAllStudents } from "./student-actions";
import { respondModal, showErrorToast, showHideModal, showSuccessToast } from "./toaster-actions";

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
        type: actions.RETURN_UNENROLLED_STUDENT_LIST,
        payload: students
    })
}
export const returnListEnrolled = (students) => (dispatch) => {
    dispatch({
        type: actions.RETURN_ENROLLED_STUDENT_LIST,
        payload: students
    })
}

export const resetEnrolledStudentsState = () => (dispatch) => {
    dispatch({
        type: actions.RESET_ENROLLED_STUDENTS_STATE,
        payload: []
    })
}

export const getAllUnenrolledStudents = (pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_UNENROLLED_STUDENTS_LOADING
    });
    axiosInstance.get(`/smp/server/errollment/api/v1/getall/unenrolled?PageNumber=${pageNumber}`)
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
    axiosInstance.post('/smp/server/errollment/api/v1/enroll/students', values)
        .then((res) => {
            dispatch({
                type: actions.ENROLL_STUDENT_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllStudents(1)(dispatch);
            getAllUnenrolledStudents(1)(dispatch);
            showHideModal(false)(dispatch)
            respondModal('cancel')(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.ENROLL_STUDENT_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}

export const  getAllEnrolledStudents = (sessionClassId,pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_ENROLLED_STUDENTS_LOADING
    });

    axiosInstance.get(`/smp/server/errollment/api/v1/getall/enrolled?sessionClassId=${sessionClassId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_ENROLLED_STUDENTS_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_ENROLLED_STUDENTS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const unEnrollStudent = (studentContactId, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.UNENROLL_STUDENTS_LOADING
    });
    const payload = {
        studentContactIds: studentContactId
    }
    axiosInstance.post('/smp/server/errollment/api/v1/unenroll/students', payload)
        .then((res) => {
            dispatch({
                type: actions.UNENROLL_STUDENTS_SUCCESS,
                payload: res.data.message.friendlyMessage
            });
            getAllEnrolledStudents(sessionClassId,1)(dispatch);
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.UNENROLL_STUDENTS_FAILED,
                payload: err.response.data.message.friendlyMessage
            });
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
}







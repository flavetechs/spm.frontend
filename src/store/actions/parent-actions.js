import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/parent-action-types";

export const getMyWardsList = (pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_LIST_LOADING
    });
    ////smp/maywards/api/v1/get/maywards?pageNumber=1
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards?pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch(err => {
            dispatch({
                type: actions.FETCH_MY_WARDS_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllMyWardsClassNotes = (pageNumber, classId, subjectId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_CLASS_NOTE_LOADING,
    });
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards-class-notes?pageNumber=${pageNumber}&classId=${classId}&subjectId=${subjectId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_CLASS_NOTE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_CLASS_NOTE_LOADING,
                payload: err.response.data.result
            })
        });
}

export const getAllMyWardsNotes = (pageNumber, classId, subjectId, studentContactId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_NOTE_LOADING,
    });
    axiosInstance.get(`/smp/maywards/api/v1/get/maywards-notes?pageNumber=${pageNumber}&classId=${classId}&subjectId=${subjectId}&studentContactId=${studentContactId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_NOTE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_NOTE_FAILED,
                payload: err.response.data.result
            })
        });
}


export const getSingleWardsNote = (studentNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_WARDS_NOTE_LOADING,
    });
    axiosInstance.get(`/smp/maywards/api/v1/get-single/maywards-notes?studentNoteId=${studentNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARDS_NOTE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARDS_NOTE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSingleWardsClassNote = (teacherClassNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_WARDS_CLASS_NOTE_LOADING,
    });

    axiosInstance.get(`/smp/maywards/api/v1/get-single/maywards-class-notes?teacherClassNoteId=${teacherClassNoteId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARDS_CLASS_NOTE_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_WARDS_CLASS_NOTE_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getMyWardsHomeAssessment = (pageNumber, sessionClassSubjectId, studentContactId, status) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MY_WARDS_HOME_ASSESSMENT_LOADING,
    });

    axiosInstance.get(`/smp/maywards/api/v1/get/maywards-home-assessments?pageNumber=${pageNumber}&sessionClassSubjectId=${sessionClassSubjectId}&studentContactId=${studentContactId}&status=${status}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_HOME_ASSESSMENT_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MY_WARDS_HOME_ASSESSMENT_FAILED,
                payload: err.response.data.result
            })
        });
}

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
                     ///smp/maywards/api/v1/get/maywards-class-notes?pageNumber=1&classId=d1d26a43-ca4d-4dd7-9212-08daa5d8c6be&subjectId=c881cc45-14c5-4bc1-55c2-08da54a58dda
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

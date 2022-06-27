import axiosInstance from "../../axios/axiosInstance";
import { resultManagement } from "../../router/spm-path-locations";
import { actions } from "../action-types/publish-result-action-types";

export const getAllSchoolSessions = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_SESSIONS_LOADING
    });

    axiosInstance.get("/session/api/v1/getall")
        .then((res) => {
            dispatch({
                type: actions.FETCH_SESSIONS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SESSIONS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllTerms = (sessionId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SESSIONS_TERMS_LOADING,
        payload: sessionId
    });

    axiosInstance.get(`/session/api/v1/get-session-terms?sessionId=${sessionId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SESSIONS_TERMS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SESSIONS_TERMS_FAILED,
                payload: err.response.data.result
            })
        });
}


export const getTermClasses = (sessionId, sessionTermId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_TERM_CLASSESS_LOADING,
        payload: sessionId
    });
    axiosInstance.get(`/session/api/v1/get/session-term/classes?sessionId=${sessionId}&termId=${sessionTermId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_TERM_CLASSESS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_TERM_CLASSESS_FAILED,
                payload: err.response.data.result
            })
        });
}

export const  getAllResultList = (sessionClassId, termId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_RESULT_LIST_LOADING,
        payload: sessionClassId
    });
    axiosInstance.get(`/api/v1/result/get/result-list?sessionClassid=${sessionClassId}&termId=${termId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_RESULT_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_RESULT_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const nullifyResultListOnExit = (publishResult) => (dispatch) => {
    if (window.location.pathname != resultManagement.publishResult){
        publishResult = null
    }else return publishResult
    dispatch({
        type: actions.CLOSE_RESULT_LIST,
        payload: publishResult
    });
}
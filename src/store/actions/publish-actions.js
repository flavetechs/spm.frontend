import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/publish-result-action-types";
// import { showErrorToast } from "./toaster-actions";

export const getAllSchoolSessions = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_SESSIONS_LOADING
    });

    axiosInstance.get("/session/api/v1/getall")
        .then((res) => {
            console.log('school session res', res);
            dispatch({
                type: actions.FETCH_SESSIONS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            console.log('school session err', err);
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
            console.log("getTermClasses res", res);
            dispatch({
                type: actions.FETCH_TERM_CLASSESS_SUCCESS,
                payload: res.data.result
            });
            // showHidePreview(true)(dispatch);
        }).catch((err) => {
            console.log("getTermClasses err", err);
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
    console.log("getAllResultList", sessionClassId, termId)
    axiosInstance.get(`/api/v1/result/get/result-list?sessionClassid=${sessionClassId}&termId=${termId}`)
        .then((res) => {
            console.log('getAllResultList res', res);
            dispatch({
                type: actions.FETCH_RESULT_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            console.log('getAllResultList err', err);
            dispatch({
                type: actions.FETCH_RESULT_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}

// export const publishResultList = (sessionClassId, termId) => (dispatch) => {
//     dispatch({
//         type: actions.PUBLISH_RESULT_LOADING,
//         payload: sessionClassId
//     });

//     axiosInstance.get(`/api/v1/result/update/publish-result?sessionClassId=${sessionClassId}&subjectId=${termId}`)
//         .then((res) => {
//             dispatch({
//                 type: actions.PUBLISH_RESULT_SUCCESS,
//                 payload: res.data.result
//             });
//         }).catch((err) => {
//             dispatch({
//                 type: actions.PUBLISH_RESULT_FAILED,
//                 payload: err.response.data.result
//             })
//         });
// }
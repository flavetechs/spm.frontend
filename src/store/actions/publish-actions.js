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

export const setPreviousExamScoreEntry = (studentContactId, examsScore,  previousScoreEntry,  sessionTermId) => (dispatch) => {

    debugger

    if (!examsScore) {
        examsScore = 0;
    }

    examsScore = Math.round(examsScore);

    if (examsScore > previousScoreEntry.examsScore) {
        showErrorToast(`Please ensure exam score is not more than ${previousScoreEntry.examsScore}`)(dispatch);
        return;
    }

    const entryIndex = previousScoreEntry?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entry = previousScoreEntry?.classScoreEntries.find(e => e.studentContactId == studentContactId);
    if (entry) {
        entry.examsScore = examsScore;
        entry.isSaved = false;
        entry.isOffered = examsScore > 0;
        previousScoreEntry.classScoreEntries[entryIndex] = entry;
        dispatch({
            type: actions.UPDATE_PUBLISH_RESULT,
            payload: previousScoreEntry
        });

        axiosInstance.post(`/api/v1/result/update/previous-terms/exam-score`, { studentContactId: entry.studentContactId, score: examsScore, subjectId: previousScoreEntry.subjectId, classScoreEntryId: previousScoreEntry.classScoreEntryId,  sessionTermId })
            .then((res) => {
                entry.isSaved = res.data.result.isSaved;
                entry.isOffered = res.data.result.isOffered;
                previousScoreEntry.classScoreEntries[entryIndex] = entry;
                dispatch({
                    type: actions.UPDATE_PUBLISH_RESULT,
                    payload: previousScoreEntry
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update score entry, please confirm entries')(dispatch);
            });
    }
}

export const setPreviousAssessmentResultList = (studentContactId, assessmentScore, publishResult, sessionTermId) => (dispatch) => {

    if (!assessmentScore) {
        assessmentScore = 0;
    }

    assessmentScore = Math.round(assessmentScore);

    if (assessmentScore > publishResult.assessmentScore) {
        showErrorToast(`Please ensure assessment score is not more than ${publishResult.assessmentScore}`)(dispatch);
        return;
    }

    const entryIndex = publishResult?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entries = publishResult?.classScoreEntries.find(e => e.studentContactId == studentContactId);
    if (entries) {
        entries.assessmentScore = assessmentScore;
        entries.isSaved = false;
        entries.isOffered = assessmentScore > 0;
        publishResult.classScoreEntries[entryIndex] = entries;
        dispatch({
            type: actions.UPDATE_PUBLISH_RESULT,
            payload: publishResult
        });

        axiosInstance.post(`/api/v1/result/update/previous-terms/assessment-score`, { studentContactId: entries.studentContactId, score: assessmentScore, subjectId: publishResult.subjectId, classScoreEntryId: publishResult.classScoreEntryId,  sessionTermId })
            .then((res) => {
                entries.isSaving = false;
                entries.isOffered = res.data.result.isOffered;
                entries.grade = res.data.result.grade;
                entries.remark = res.data.result.remark;
                publishResult.classScoreEntries[entryIndex] = entries;
                dispatch({
                    type: actions.UPDATE_PUBLISH_RESULT,
                    payload: publishResult
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update, score entry please confirm entries')(dispatch);
            });
    }
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
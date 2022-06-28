import axiosInstance from "../../axios/axiosInstance";
import { resultManagement } from "../../router/spm-path-locations";
import { actions } from "../action-types/publish-result-action-types";
import { showErrorToast } from "./toaster-actions";

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

export const getAllResultList = (sessionClassId, termId) => (dispatch) => {
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

export const setpublishExamScore = (studentContactId, examsScore, publishSingleStudent, sessionTermId) => (dispatch) => {

    debugger

    if (!examsScore) {
        examsScore = 0;
    }

    examsScore = Math.round(examsScore);

    if (examsScore > publishSingleStudent.examsScore) {
        showErrorToast(`Please ensure exam score is not more than ${publishSingleStudent.examsScore}`)(dispatch);
        return;
    }

    const entryIndex = publishSingleStudent?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entries = publishSingleStudent?.classScoreEntries.find(e => e.studentContactId == studentContactId);
    if (entries) {
        entries.examsScore = examsScore;
        entries.isSaving = true;
        entries.isOffered = examsScore > 0;
        publishSingleStudent.classScoreEntries[entryIndex] = entries;
        dispatch({
            type: actions.UPDATE_PUBLISH_RESULT,
            payload: publishSingleStudent
        });

        axiosInstance.post(`/api/v1/result/update/previous-terms/exam-score`, { studentContactId: entries.studentContactId, score: examsScore, subjectId: publishSingleStudent.subjectId, classScoreEntryId: publishSingleStudent.classScoreEntryId, sessionTermId })
            .then((res) => {
                entries.isSaving = false;
                entries.isOffered = res.data.result.isOffered;
                entries.grade = res.data.result.grade;
                entries.remark = res.data.result.remark;
                publishSingleStudent.classScoreEntries[entryIndex] = entries;
                dispatch({
                    type: actions.UPDATE_PUBLISH_RESULT,
                    payload: publishSingleStudent
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update score entry, please confirm entries')(dispatch);
            });
    }
}

export const setpublishAssessmentScore = (studentContactId, assessmentScore, publishSingleStudent, sessionTermId) => (dispatch) => {

    if (!assessmentScore) {
        assessmentScore = 0;
    }

    assessmentScore = Math.round(assessmentScore);

    if (assessmentScore > publishSingleStudent.assessmentScore) {
        showErrorToast(`Please ensure assessment score is not more than ${publishSingleStudent.assessmentScore}`)(dispatch);
        return;
    }

    const entryIndex = publishSingleStudent?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entries = publishSingleStudent?.classScoreEntries.find(e => e.studentContactId == studentContactId);
    if (entries) {
        entries.assessmentScore = assessmentScore;
        entries.isSaving = false;
        entries.isOffered = assessmentScore > 0;
        publishSingleStudent.classScoreEntries[entryIndex] = entries;
        dispatch({
            type: actions.UPDATE_PUBLISH_RESULT,
            payload: publishSingleStudent
        });

        axiosInstance.post(`/api/v1/result/update/previous-terms/assessment-score`, { studentContactId: entries.studentContactId, score: assessmentScore, subjectId: publishSingleStudent.subjectId, classScoreEntryId: publishSingleStudent.classScoreEntryId, sessionTermId })
            .then((res) => {
                entries.isSaving = false;
                entries.isOffered = res.data.result.isOffered;
                entries.grade = res.data.result.grade;
                entries.remark = res.data.result.remark;
                publishSingleStudent.classScoreEntries[entryIndex] = entries;
                dispatch({
                    type: actions.UPDATE_PUBLISH_RESULT,
                    payload: publishSingleStudent
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update, score entry please confirm entries')(dispatch);
            });
    }
}

export const fetchSingleStudentResultEntries = (sessionClassId, termId, studentContactId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_LOADING,
        payload: sessionClassId
    });
    axiosInstance.get(`/api/v1/result/get/single-student/result-entries?sessionClassid=${sessionClassId}&termId=${termId}&studentContactId=${studentContactId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getValueIds = (sessionClassId, termId) => (dispatch) => {
const idsObj = {};
idsObj.sessionClassId = sessionClassId;
idsObj.termId = termId;
dispatch({
    type: actions.IMPORT_IDS,
    payload: idsObj
});
}



export const nullifyResultListOnExit = (publishResults) => (dispatch) => {
    if (window.location.pathname != resultManagement.publishResult) {
        publishResults = null
    } else return publishResults
    dispatch({
        type: actions.CLOSE_RESULT_LIST,
        payload: publishResults
    });
}
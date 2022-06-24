import axiosInstance from "../../axios/axiosInstance";
import { resultManagement } from "../../router/spm-path-locations";
import { actions } from "../action-types/results-action-types"
import { showErrorToast } from "./toaster-actions";

export const getAllStaffClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_STAFF_CLASSES_LOADING
    });

    axiosInstance.get("/api/v1/result/get/staff-classes")
        .then((res) => {
            dispatch({
                type: actions.FETCH_STAFF_CLASSES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STAFF_CLASSES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getStaffClassSubjects = (sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STAFF_CLASS_SUBJECTS_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/api/v1/result/get/staff-class-subjects/${sessionClassId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STAFF_CLASS_SUBJECTS_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STAFF_CLASS_SUBJECTS_FAILED,
                payload: err.response.data.result
            })
        });
}


export const getAllClassScoreEntries = (sessionClassId, subjectId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_SCORE_ENTRIES_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/api/v1/result/get/class-score-entries/${sessionClassId}?subjectId=${subjectId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASS_SCORE_ENTRIES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CLASS_SCORE_ENTRIES_FAILED,
                payload: err.response.data.result
            })
        });
}

export const setExamScoreEntry = (studentContactId, examsScore, scoreEntry) => (dispatch) => {

    debugger

    if (!examsScore) {
        examsScore = 0;
    }

    examsScore = Math.round(examsScore);

    if (examsScore > scoreEntry.examsScore) {
        showErrorToast(`Please ensure exam score is not more than ${scoreEntry.examsScore}`)(dispatch);
        return;
    }

    const entryIndex = scoreEntry?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entry = scoreEntry?.classScoreEntries.find(e => e.studentContactId == studentContactId);
    if (entry) {
        entry.examsScore = examsScore;
        entry.isSaved = false;
        entry.isOffered = examsScore > 0;
        scoreEntry.classScoreEntries[entryIndex] = entry;
        dispatch({
            type: actions.UPDATE_SCORE_ENTRY,
            payload: scoreEntry
        });

        axiosInstance.post(`/api/v1/result/update/exam-score`, { studentContactId: entry.studentContactId, score: examsScore, subjectId: scoreEntry.subjectId, classScoreEntryId: scoreEntry.classScoreEntryId })
            .then((res) => {
                entry.isSaved = res.data.result.isSaved;
                entry.isOffered = res.data.result.isOffered;
                scoreEntry.classScoreEntries[entryIndex] = entry;
                dispatch({
                    type: actions.UPDATE_SCORE_ENTRY,
                    payload: scoreEntry
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update score entry, please confirm entries')(dispatch);
            });
    }
}

export const setAssessmentScoreEntry = (studentContactId, assessmentScore, scoreEntry) => (dispatch) => {

    if (!assessmentScore) {
        assessmentScore = 0;
    }

    assessmentScore = Math.round(assessmentScore);

    if (assessmentScore > scoreEntry.assessmentScore) {
        showErrorToast(`Please ensure assessment score is not more than ${scoreEntry.assessmentScore}`)(dispatch);
        return;
    }

    const entryIndex = scoreEntry?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entry = scoreEntry?.classScoreEntries.find(e => e.studentContactId == studentContactId);
    if (entry) {
        entry.assessmentScore = assessmentScore;
        entry.isSaved = false;
        entry.isOffered = assessmentScore > 0;
        scoreEntry.classScoreEntries[entryIndex] = entry;
        dispatch({
            type: actions.UPDATE_SCORE_ENTRY,
            payload: scoreEntry
        });

        axiosInstance.post(`/api/v1/result/update/assessment-score`, { studentContactId: entry.studentContactId, score: assessmentScore, subjectId: scoreEntry.subjectId, classScoreEntryId: scoreEntry.classScoreEntryId })
            .then((res) => {
                entry.isSaved = res.data.result.isSaved;
                entry.isOffered = res.data.result.isOffered;
                scoreEntry.classScoreEntries[entryIndex] = entry;
                dispatch({
                    type: actions.UPDATE_SCORE_ENTRY,
                    payload: scoreEntry
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update, score entry please confirm entries')(dispatch);
            });
    }
}

export const getAllClassScoreEntryPreview = (sessionClassId, subjectId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_SCORE_ENTRY_PREVIEW_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/api/v1/result/get/preview-class/score-entries?sessionClassId=${sessionClassId}&subjectId=${subjectId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CLASS_SCORE_ENTRY_PREVIEW_SUCCESS,
                payload: res.data.result
            });
            showHidePreview(true)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CLASS_SCORE_ENTRY_PREVIEW_FAILED,
                payload: err.response.data.result
            })
        });
}

export const showHidePreview = (value = false) => (dispatch) => {
    dispatch({
        type: actions.CLOSE_PREVIEW,
        payload: value
    });
}

export const  getAllMasterListentries = (sessionClassId, termId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_MASTER_LIST_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/api/v1/result/get/master-list?sessionClassid=${sessionClassId}&termId=${termId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_MASTER_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_MASTER_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const nullifyListEntryOnExit = (listEntry) => (dispatch) => {
    if (window.location.pathname != resultManagement.masterList){
    listEntry = null
    }else return listEntry

    dispatch({
        type: actions.CLOSE_MASTER_LIST,
        payload: listEntry
    });
}

export const nullifyScoreEntryOnExit = (scoreEntry) => (dispatch) => {
    if (window.location.pathname != resultManagement.scoreEntry){
        scoreEntry = null
    }else return scoreEntry

    dispatch({
        type: actions.CLOSE_SCORE_ENTRY,
        payload: scoreEntry
    });
}
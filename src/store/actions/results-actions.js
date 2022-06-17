import axiosInstance from "../../axios/axiosInstance";
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

   export const setExamScoreEntry = (scoreEntryId, examsScore, scoreEntry) => (dispatch) => {
       debugger
        const entryIndex = scoreEntry?.classScoreEntries.findIndex(e => e.scoreEntryId === scoreEntryId);
        let entry = scoreEntry?.classScoreEntries.find(e => e.scoreEntryId == scoreEntryId);
        if(entry) {
            entry.examsScore = examsScore;
            entry.isSaved = false;
            entry.isOffered = examsScore > 0;
            scoreEntry.classScoreEntries[entryIndex] = entry;
            dispatch({
                type: actions.UPDATE_SCORE_ENTRY,
                payload: scoreEntry
            });

            axiosInstance.post(`/api/v1/result/update/exam-score`, {scoreEntryId: entry.scoreEntryId, score: examsScore})
            .then((res) => {
                entry.isSaved = res.data.result.isSaved;
                entry.isOffered = res.data.result.isOffered;
                scoreEntry.classScoreEntries[entryIndex] = entry;
                dispatch({
                    type: actions.UPDATE_SCORE_ENTRY,
                    payload: scoreEntry
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update score entry please contact admin')(dispatch);
            });
        }
      }

      export const setAssessmentScoreEntry = (scoreEntryId, assessmentScore, scoreEntry) => (dispatch) => {
        debugger
         const entryIndex = scoreEntry?.classScoreEntries.findIndex(e => e.scoreEntryId === scoreEntryId);
         let entry = scoreEntry?.classScoreEntries.find(e => e.scoreEntryId == scoreEntryId);
         if(entry) {
             entry.assessmentScore = assessmentScore;
             entry.isSaved = false;
             entry.isOffered = assessmentScore > 0;
             scoreEntry.classScoreEntries[entryIndex] = entry;
             dispatch({
                 type: actions.UPDATE_SCORE_ENTRY,
                 payload: scoreEntry
             });
 
             axiosInstance.post(`/api/v1/result/update/assessment-score`, {scoreEntryId: entry.scoreEntryId, score: assessmentScore})
             .then((res) => {
                 entry.isSaved = res.data.result.isSaved;
                 entry.isOffered = res.data.result.isOffered;
                 scoreEntry.classScoreEntries[entryIndex] = entry;
                 dispatch({
                     type: actions.UPDATE_SCORE_ENTRY,
                     payload: scoreEntry
                 });
             }).catch((err) => {
                 showErrorToast('Ooopsss.... unable to update score entry please contact admin')(dispatch);
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
            }).catch((err) => {
                dispatch({
                    type: actions.FETCH_CLASS_SCORE_ENTRY_PREVIEW_FAILED,
                    payload: err.response.data.result
                })
            });
    }
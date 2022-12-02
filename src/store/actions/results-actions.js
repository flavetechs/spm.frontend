import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/results-action-types"
import { getResultSetting } from "./portal-setting-action";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

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

export const getAllFormTeacherClasses = () => (dispatch) => {
    dispatch({
        type: actions.FETCH_STAFF_CLASSES_LOADING
    });

    axiosInstance.get("/api/v1/result/get/formteacher-classes")
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

export const getAllSharedOnStaffClasses = (teacherClassNoteId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STAFF_CLASSES_LOADING
    });

    axiosInstance.get(`/classnotes/api/v1/get-note/shared-class?teacherClassNoteId=${teacherClassNoteId}`)
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
export const getStaffClassSubjectByClassLookup = (classId, sessionClassId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STAFF_CLASS_SUBJECTS_LOADING,
    });

    axiosInstance.get(`/api/v1/result/get/staff-class-subjects/by-classlookup/${classId}/${sessionClassId}`)
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



export const getAllClassScore = (sessionClassId, subjectId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_SCORE_ENTRIES_LOADING,
        payload: sessionClassId
    });
    axiosInstance.get(`/api/v1/result/get/class-score-entries/${sessionClassId}?subjectId=${subjectId}&pageNumber=${pageNumber}`)
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

export const setExamScoreEntry = (studentContactId, examsScore, scoreEntry,termId) => (dispatch) => {
    if (!examsScore) {
        examsScore = 0;
    }

    examsScore = Math.round(examsScore);

    if (examsScore > scoreEntry.examsScore) {
        showErrorToast(`Please ensure exam score is not more than ${scoreEntry.examsScore}`)(dispatch);
        return;
    }

    const entryIndex = scoreEntry?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entry = scoreEntry?.classScoreEntries.find(e => e.studentContactId === studentContactId);
    if (entry) {
        entry.examsScore = examsScore;
        entry.isSaved = false;
        entry.isOffered = examsScore > 0;
        scoreEntry.classScoreEntries[entryIndex] = entry;
        dispatch({
            type: actions.UPDATE_SCORE_ENTRY,
            payload: scoreEntry
        });

        axiosInstance.post(`/api/v1/result/update/exam-score`, { studentContactId: entry.studentContactId, score: examsScore, subjectId: scoreEntry.subjectId, classScoreEntryId: scoreEntry.classScoreEntryId,termId })
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

export const setAssessmentScoreEntry = (studentContactId, assessmentScore, scoreEntry,termId) => (dispatch) => {

    if (!assessmentScore) {
        assessmentScore = 0;
    }

    assessmentScore = Math.round(assessmentScore);

    if (assessmentScore > scoreEntry.assessmentScore) {
        showErrorToast(`Please ensure assessment score is not more than ${scoreEntry.assessmentScore}`)(dispatch);
        return;
    }

    const entryIndex = scoreEntry?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entry = scoreEntry?.classScoreEntries.find(e => e.studentContactId === studentContactId);
    if (entry) {
        entry.assessmentScore = assessmentScore;
        entry.isSaved = false;
        entry.isOffered = assessmentScore > 0;
        scoreEntry.classScoreEntries[entryIndex] = entry;
        dispatch({
            type: actions.UPDATE_SCORE_ENTRY,
            payload: scoreEntry
        });

        axiosInstance.post(`/api/v1/result/update/assessment-score`, { studentContactId: entry.studentContactId, score: assessmentScore, subjectId: scoreEntry.subjectId, classScoreEntryId: scoreEntry.classScoreEntryId, termId })
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

export const getAllClassScoreEntryPreview = (sessionClassId, subjectId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CLASS_SCORE_ENTRY_PREVIEW_LOADING,
        payload: sessionClassId
    });
    axiosInstance.get(`/api/v1/result/get/preview-class/score-entries?sessionClassId=${sessionClassId}&subjectId=${subjectId}&pageNumber=${pageNumber}`)
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

export const getAllPreviousClassScore = (sessionClassId, subjectId, sessionTermId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRIES_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/api/v1/result/get/previous-terms/class-score-entries/${sessionClassId}?subjectId=${subjectId}&sessionTermId=${sessionTermId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRIES_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRIES_FAILED,
                payload: err.response.data.result
            })
        });
}


export const setPreviousExamScoreEntry = (studentContactId, examsScore,  previousScoreEntry,  sessionTermId) => (dispatch) => {
 if (!examsScore) {
        examsScore = 0;
    }

    examsScore = Math.round(examsScore);

    if (examsScore > previousScoreEntry.examsScore) {
        showErrorToast(`Please ensure exam score is not more than ${previousScoreEntry.examsScore}`)(dispatch);
        return;
    }

    const entryIndex = previousScoreEntry?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entry = previousScoreEntry?.classScoreEntries.find(e => e.studentContactId === studentContactId);
    if (entry) {
        entry.examsScore = examsScore;
        entry.isSaved = false;
        entry.isOffered = examsScore > 0;
        previousScoreEntry.classScoreEntries[entryIndex] = entry;
        dispatch({
            type: actions.UPDATE_PREVIOUS_SCORE_ENTRY,
            payload: previousScoreEntry
        });

        axiosInstance.post(`/api/v1/result/update/previous-terms/exam-score`, { studentContactId: entry.studentContactId, score: examsScore, subjectId: previousScoreEntry.subjectId, classScoreEntryId: previousScoreEntry.classScoreEntryId,  sessionTermId })
            .then((res) => {
                entry.isSaved = res.data.result.isSaved;
                entry.isOffered = res.data.result.isOffered;
                previousScoreEntry.classScoreEntries[entryIndex] = entry;
                dispatch({
                    type: actions.UPDATE_PREVIOUS_SCORE_ENTRY,
                    payload: previousScoreEntry
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update score entry, please confirm entries')(dispatch);
            });
    }
}

export const setPreviousAssessmentScoreEntry = (studentContactId, assessmentScore, previousScoreEntry, sessionTermId) => (dispatch) => {

    if (!assessmentScore) {
        assessmentScore = 0;
    }

    assessmentScore = Math.round(assessmentScore);

    if (assessmentScore > previousScoreEntry.assessmentScore) {
        showErrorToast(`Please ensure assessment score is not more than ${previousScoreEntry.assessmentScore}`)(dispatch);
        return;
    }

    const entryIndex = previousScoreEntry?.classScoreEntries.findIndex(e => e.studentContactId === studentContactId);
    let entry = previousScoreEntry?.classScoreEntries.find(e => e.studentContactId === studentContactId);
    if (entry) {
        entry.assessmentScore = assessmentScore;
        entry.isSaved = false;
        entry.isOffered = assessmentScore > 0;
        previousScoreEntry.classScoreEntries[entryIndex] = entry;
        dispatch({
            type: actions.UPDATE_PREVIOUS_SCORE_ENTRY,
            payload: previousScoreEntry
        });

        axiosInstance.post(`/api/v1/result/update/previous-terms/assessment-score`, 
        { studentContactId: entry.studentContactId, score: assessmentScore, subjectId: previousScoreEntry.subjectId, classScoreEntryId: previousScoreEntry.classScoreEntryId,  sessionTermId })
            .then((res) => {
                entry.isSaved = res.data.result.isSaved;
                entry.isOffered = res.data.result.isOffered;
                previousScoreEntry.classScoreEntries[entryIndex] = entry;
                dispatch({
                    type: actions.UPDATE_PREVIOUS_SCORE_ENTRY,
                    payload: previousScoreEntry
                });
            }).catch((err) => {
                showErrorToast('Ooopsss.... unable to update, score entry please confirm entries')(dispatch);
            });
    }
}

export const getAllPreviousClassScoreEntryPreview = (sessionClassId, subjectId, sessionTermId, pageNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRY_PREVIEW_LOADING,
        payload: sessionClassId
    });
    axiosInstance.get(`/api/v1/result/get/previous-terms/preview-class/score-entries?sessionClassId=${sessionClassId}&subjectId=${subjectId}&sessionTermId=${sessionTermId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRY_PREVIEW_SUCCESS,
                payload: res.data.result
            });
            showHidePreview(true)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_PREVIOUS_CLASS_SCORE_ENTRY_PREVIEW_FAILED,
                payload: err.response.data.result
            })
        });
}

export const  getAllMasterList = (sessionClassId, termId) => (dispatch) => {
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

export const  getAllCumulativeMasterList = (sessionClassId, termId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_CUMULATIVE_MASTER_LIST_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/api/v1/result/get/cumulative-master-list?sessionClassid=${sessionClassId}&termId=${termId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_CUMULATIVE_MASTER_LIST_SUCCESS,
                payload: res.data.result
            });
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_CUMULATIVE_MASTER_LIST_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllBatchPrintingResultPreview = (sessionClassid, termId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_BATCH_RESULT_PREVIEW_LOADING,
        payload: sessionClassid
    });
const payload = {
    sessionClassid,
    termId
}
    axiosInstance.post(`/api/v1/result/get/students/for-batch-printing`,payload)
        .then((res) => {
            dispatch({
                type: actions.FETCH_BATCH_RESULT_PREVIEW_SUCCESS,
                payload: res.data.result
            });
        
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_BATCH_RESULT_PREVIEW_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getAllBatchPrintingResults = (sessionClassid, termId,students) => (dispatch) => {
    dispatch({
        type: actions.FETCH_BATCH_RESULT_LOADING,
        payload: sessionClassid
    });
const payload = {
    sessionClassid,
    termId,
    students
}
    axiosInstance.post(`/api/v1/result/batch-print/students-results`,payload)
        .then((res) => {
            dispatch({
                type: actions.FETCH_BATCH_RESULT_SUCCESS,
                payload: res.data.result
            });
        
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_BATCH_RESULT_FAILED,
                payload: err.response.data.result
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
            getAllBatchPrintingResultPreview(sessionClassid,termId)(dispatch);
        });
}

export const getAllStudentResult = (sessionClassId, termId, studentContactId) => (dispatch) => {
    dispatch({
        type: actions.FETCH_STUDENT_RESULT_LOADING,
        payload: sessionClassId
    });

    axiosInstance.get(`/api/v1/result/get/student-result?sessionClassId=${sessionClassId}&termId=${termId}&studentContactId=${studentContactId}`)
        .then((res) => {
            dispatch({
                type: actions.FETCH_STUDENT_RESULT_SUCCESS,
                payload: res.data.result
            });
            showHidePreview(true)(dispatch);
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_STUDENT_RESULT_FAILED,
                payload: err.response.data.result
            })
        });
}

export const getSinglePrintResult = (pin, termId, registrationNumber) => (dispatch) => {
    dispatch({
        type: actions.FETCH_SINGLE_PRINT_RESULT_LOADING,
       
    });
const payload = {
    pin,
    registractionNumber: registrationNumber,
    termId,
  
}
    axiosInstance.post('/api/v1/result/print/result', payload)
        .then((res) => {
            dispatch({
                type: actions.FETCH_SINGLE_PRINT_RESULT_SUCCESS,
                payload: res.data.result
            });
            showSuccessToast(res.data.message.friendlyMessage)(dispatch)
        }).catch((err) => {
            dispatch({
                type: actions.FETCH_SINGLE_PRINT_RESULT_FAILED,
                payload: err.response.data.result
            })
            showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
        });
    }
export const resetListEntryOnExit = () => (dispatch) => {
  dispatch({
        type: actions.RESET_MASTER_LIST,
        payload: null
    });
}

export const resetScoreEntryOnExit = () => (dispatch) => {
 dispatch({
        type: actions.RESET_SCORE_ENTRY,
        payload: null
    });
}
export const resetPreviousScoreEntryOnExit = () => (dispatch) => {
   dispatch({
        type: actions.RESET_PREVIOUS_SCORE_ENTRY,
        payload: null
    });
}

export const resetCumulativeListEntryOnExit = () => (dispatch) => {
   dispatch({
        type: actions.RESET_CUMULATIVE_MASTER_LIST,
        payload: null
    });
}

export const resetStudentResultState = () => (dispatch) => {
    dispatch({
         type: actions.RESET_STUDENT_RESULT_STATE,
         payload: null
     });
 }

// TemplateSetting action
export const setTemplateSettingState = (templateName) => (dispatch) => {
    dispatch({
         type: actions.SET_TEMPLATE_SETTING_STATE_LOADING, 
     });
     const payload = {
        selectedTemplate: templateName
      }
     axiosInstance.post('/portalsetting/api/v1/update/result-setting-template', payload)
     .then((res) => {
         dispatch({
             type: actions.SET_TEMPLATE_SETTING_STATE_SUCCESS,
             payload: res.data.message.friendlyMessage
         });
         //getResultSetting()(dispatch);
        
         showSuccessToast(res.data.message.friendlyMessage)(dispatch)
     }).catch((err) => {
         dispatch({
             type: actions.SET_TEMPLATE_SETTING_STATE_FAILED,
             payload: err.response.data.message.friendlyMessage
         });
         showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
     });
    }

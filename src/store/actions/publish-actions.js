import axiosInstance from "../../axios/axiosInstance";
import {
  scoreEntryManagement,
  studentsLocations,
} from "../../router/spm-path-locations";
import { actions } from "../action-types/publish-result-action-types";
import { showErrorToast, showSuccessToast } from "./toaster-actions";

export const getAllSchoolSessions = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_SESSIONS_LOADING,
  });

  axiosInstance
    .get("/smp/server/session/api/v1/getall")
    .then((res) => {
      dispatch({
        type: actions.FETCH_SESSIONS_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_SESSIONS_FAILED,
        payload: err.response.data.result,
      });
    });
};

export const getAllTerms = (sessionId) => (dispatch) => {
  dispatch({
    type: actions.FETCH_SESSIONS_TERMS_LOADING,
    payload: sessionId,
  });

  axiosInstance
    .get(`/session/api/v1/get-session-terms?sessionId=${sessionId}`)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SESSIONS_TERMS_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_SESSIONS_TERMS_FAILED,
        payload: err.response.data.result,
      });
    });
};

export const getTermClasses = (sessionId) => (dispatch) => {
  if (!sessionId) {
    return
  }
  dispatch({
    type: actions.FETCH_TERM_CLASSESS_LOADING,
    payload: sessionId,
  });
  axiosInstance
    .get(`smp/server/session/api/v1/get/session-term/classes?sessionId=${sessionId}`
    )
    .then((res) => {
      dispatch({
        type: actions.FETCH_TERM_CLASSESS_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_TERM_CLASSESS_FAILED,
        payload: err.response.data.result,
      });
    });
};

export const getAllResultList = (sessionClassId, termId, pageNumber) => (dispatch) => {
  dispatch({
    type: actions.FETCH_RESULT_LIST_LOADING,

  }); 
  axiosInstance.get(`/smp/server/api/v1/result/get/result-list?sessionClassid=${sessionClassId}&termId=${termId}&pageNumber=${pageNumber}`)
    .then((res) => {
      dispatch({
        type: actions.FETCH_RESULT_LIST_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
      dispatch({
        type: actions.FETCH_RESULT_LIST_FAILED,
        payload: err.response.data.result,
      });
    });
};

export const setExamScore =
  (subjectId, examScore, publishSingleStudent, termId) => (dispatch) => {
    if (!examScore) {
      examScore = 0;
    }

    examScore = Math.round(examScore);

    if (examScore > publishSingleStudent?.examScore) {
      showErrorToast(
        `Please ensure exam score is not more than ${publishSingleStudent?.examScore}`
      )(dispatch);
      return;
    }

    const entryIndex = publishSingleStudent?.studentSubjectEntries.findIndex(
      (e) => e.subjectId === subjectId
    );
    let entries = publishSingleStudent?.studentSubjectEntries.find(
      (e) => e.subjectId == subjectId
    );
    if (entries) {
      entries.examScore = examScore;
      entries.isSaving = true;
      entries.isOffered = true;
      publishSingleStudent.studentSubjectEntries[entryIndex] = entries;
      dispatch({
        type: actions.UPDATE_PUBLISH_RESULT,
        payload: publishSingleStudent,
      });

      axiosInstance
        .post(`/api/v1/result/update/exam-score`, {
          studentContactId: publishSingleStudent?.studentContactId,
          score: examScore,
          subjectId: entries.subjectId,
          classScoreEntryId: entries.classScoreEntryId,
          termId
        })
        .then((res) => {
          entries.isSaving = false;
          entries.isOffered = true;
          publishSingleStudent.studentSubjectEntries[entryIndex] = entries;
          dispatch({
            type: actions.UPDATE_PUBLISH_RESULT,
            payload: publishSingleStudent,
          });
        })
        .catch((err) => {
          showErrorToast(
            "Ooopsss.... unable to update score, please confirm entries"
          )(dispatch);
        });
    }
  };

export const setAssessmentScore =
  (subjectId, assessmentScore, publishSingleStudent, termId) => (dispatch) => {
    if (!assessmentScore) {
      assessmentScore = 0;
    }

    assessmentScore = Math.round(assessmentScore);

    if (assessmentScore > publishSingleStudent?.assessmentScore) {
      showErrorToast(
        `Please ensure assessment score is not more than ${publishSingleStudent?.assessmentScore}`
      )(dispatch);
      return;
    }

    const entryIndex = publishSingleStudent?.studentSubjectEntries.findIndex(
      (e) => e.subjectId === subjectId
    );
    let entries = publishSingleStudent?.studentSubjectEntries.find(
      (e) => e.subjectId == subjectId
    );
    if (entries) {
      entries.assessmentScore = assessmentScore;
      entries.isSaving = true;
      entries.isOffered = true;
      publishSingleStudent.studentSubjectEntries[entryIndex] = entries;
      dispatch({
        type: actions.UPDATE_PUBLISH_RESULT,
        payload: publishSingleStudent,
      });

      axiosInstance
        .post(`/api/v1/result/update/assessment-score`, {
          studentContactId: publishSingleStudent?.studentContactId,
          score: assessmentScore,
          subjectId: entries.subjectId,
          classScoreEntryId: entries.classScoreEntryId,
          termId
        })
        .then((res) => {
          entries.isSaving = false;
          entries.isOffered = true;
          //entries.grade = res.data.result.grade;
          //entries.remark = res.data.result.remark;
          publishSingleStudent.studentSubjectEntries[entryIndex] = entries;
          dispatch({
            type: actions.UPDATE_PUBLISH_RESULT,
            payload: publishSingleStudent,
          });
        })
        .catch((err) => {
          showErrorToast(
            "Ooopsss.... unable to update score, please confirm entries"
          )(dispatch);
        });
    }
  };

export const fetchSingleStudentResultEntries = (sessionClassId, termId, studentContactId) => (dispatch) => {
  dispatch({
    type: actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_LOADING,
    payload: sessionClassId,
  });
  axiosInstance.get(`/smp/server/api/v1/result/get/single-student/result-entries?sessionClassid=${sessionClassId}&termId=${termId}&studentContactId=${studentContactId}`)
    .then((res) => {
      dispatch({
        type: actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_FAILED,
        payload: err.response.data.result,
      });
    });
};

export const setSessionClassIdAndTermId = (sessionClassId, termId) => (dispatch) => {
  const idsToSet = {
    sessionClassId,
    termId,
  };

  dispatch({
    type: actions.SET_PREVIEW_IDS,
    payload: idsToSet,
  });
};

export const resetPublishPage = () => (dispatch) => {
  dispatch({
    type: actions.RESET_RESULT_PUBLISH_LIST,
    payload: null,
  });
};

export const updatePublishedResult = (sessionClassId, sessionTermId, publish) => (dispatch) => {
  dispatch({
    type: actions.UPDATE_PUBLISH_RESULT_LOADING
  });
  axiosInstance.post(`/smp/server/api/v1/result/update/publish-result`, { sessionClassId, sessionTermId, publish })
    .then((res) => {
      dispatch({
        type: actions.UPDATE_PUBLISH_RESULT_SUCCESS,
        payload: res.data.result
      });
      showSuccessToast(res.data.message.friendlyMessage)(dispatch);
      getAllResultList(sessionClassId, sessionTermId,1)(dispatch);
    }).catch((err) => {
      dispatch({
        type: actions.UPDATE_PUBLISH_RESULT_FAILED,
        payload: err.response.data.message.friendlyMessage
      });
      showErrorToast(err.response.data.message.friendlyMessage)(dispatch)
    });
}

export const getPublishedList = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_PUBLISH_LIST_LOADING
  });
  axiosInstance.get('/smp/server/api/v1/result/get/publish-list')
    .then((res) => {
      dispatch({
        type: actions.FETCH_PUBLISH_LIST_SUCCESS,
        payload: res.data.result
      });
    }).catch(err => {
      dispatch({
        type: actions.FETCH_PUBLISH_LIST_FAILED,
        payload: err.response.data.result
      })
    });
}

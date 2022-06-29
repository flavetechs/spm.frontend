import axiosInstance from "../../axios/axiosInstance";
import {
  resultManagement,
  studentsLocations,
} from "../../router/spm-path-locations";
import { actions } from "../action-types/publish-result-action-types";
import { showErrorToast } from "./toaster-actions";

export const getAllSchoolSessions = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_SESSIONS_LOADING,
  });

  axiosInstance
    .get("/session/api/v1/getall")
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

export const getTermClasses = (sessionId, sessionTermId) => (dispatch) => {
  dispatch({
    type: actions.FETCH_TERM_CLASSESS_LOADING,
    payload: sessionId,
  });
  axiosInstance
    .get(
      `/session/api/v1/get/session-term/classes?sessionId=${sessionId}&termId=${sessionTermId}`
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

export const getAllResultList = (sessionClassId, termId) => (dispatch) => {
  dispatch({
    type: actions.FETCH_RESULT_LIST_LOADING,
    payload: sessionClassId,
  });
  axiosInstance
    .get(
      `/api/v1/result/get/result-list?sessionClassid=${sessionClassId}&termId=${termId}`
    )
    .then((res) => {
      dispatch({
        type: actions.FETCH_RESULT_LIST_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_RESULT_LIST_FAILED,
        payload: err.response.data.result,
      });
    });
};

export const setExamScore =
  (subjectId, examScore, publishSingleStudent) => (dispatch) => {
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
        })
        .then((res) => {
          entries.isSaving = false;
          entries.isOffered = true;
          // console.log("hi", res.data.result)
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

export const setAssessmentScore =
  (subjectId, assessmentScore, publishSingleStudent) => (dispatch) => {
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

export const fetchSingleStudentResultEntries =
  (sessionClassId, termId, studentContactId) => (dispatch) => {
    dispatch({
      type: actions.FETCH_SINGLE_STUDENT_RESULT_ENTRIES_LOADING,
      payload: sessionClassId,
    });
    axiosInstance
      .get(
        `/api/v1/result/get/single-student/result-entries?sessionClassid=${sessionClassId}&termId=${termId}&studentContactId=${studentContactId}`
      )
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

export const getValueIds = (sessionClassId, termId) => (dispatch) => {
  const idsObj = {};
  idsObj.sessionClassId = sessionClassId;
  idsObj.termId = termId;
  dispatch({
    type: actions.IMPORT_IDS,
    payload: idsObj,
  });
};

export const nullifyResultListOnExit = (publishResults) => (dispatch) => {
  if (
    window.location.pathname != resultManagement.publishResult &&
    window.location.pathname != studentsLocations.studentDetails
  ) {
    publishResults = null;
  } else return publishResults;
  dispatch({
    type: actions.CLOSE_RESULT_LIST,
    payload: publishResults,
  });
};

import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/grade-setting-action-types";
import {
  showErrorToast,
  showSuccessToast,
} from "./toaster-actions";

export const getAllGradeClasses = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_GRADE_CLASSES_LOADING,
  });

  axiosInstance
    .get("/grade/api/v1/get/get-classes")
    .then((res) => {
      dispatch({
        type: actions.FETCH_GRADE_CLASSES_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_GRADE_CLASSES_FAILED,
        payload: err.response.data.result,
      });
    });
};

export const getPreviousGrades = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_PREVIOUS_GRADES_LOADING,
  });

  axiosInstance
    .get("/grade/api/v1/get/get-settings")
    .then((res) => {
      dispatch({
        type: actions.FETCH_PREVIOUS_GRADES_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.FETCH_PREVIOUS_GRADES_FAILED,
        payload: err.response.data.result,
      });
    });
};

export const createGradeSetting = (values) => (dispatch) => {
  dispatch({
    type: actions.CREATE_GRADE_LOADING,
  });
  axiosInstance
    .post("/grade/api/v1/create", values)
    .then((res) => {
      dispatch({
        type: actions.CREATE_GRADE_SUCCESS,
        payload: res.data.message.friendlyMessage,
      });
      showSuccessToast(res.data.message.friendlyMessage)(dispatch);
      getPreviousGrades()(dispatch);
      getAllGradeClasses()(dispatch);
    })
    .catch((err) => {
      dispatch({
        type: actions.CREATE_GRADE_FAILED,
        payload: err.response.data.message.friendlyMessage,
      });
      showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
    });
};

export const updateGradeSetting = (values) => (dispatch) => {
    dispatch({
      type: actions.UPDATE_GRADE_LOADING,
    });
    axiosInstance
      .post("/grade/api/v1/update", values)
      .then((res) => {
        dispatch({
          type: actions.UPDATE_GRADE_SUCCESS,
          payload: res.data.message.friendlyMessage,
        });
        showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        getPreviousGrades()(dispatch);
        getAllGradeClasses()(dispatch);
      })
      .catch((err) => {
        dispatch({
          type: actions.UPDATE_GRADE_FAILED,
          payload: err.response.data.message.friendlyMessage,
        });
        showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
      });
  };

export const newClassListState = (classes) => (dispatch) => { 
  classes = classes.reduce((obj, item) => {
    return {
      ...item,
    };
  }, {});
    dispatch({
        type: actions.NEW_CLASS_STATE,
        payload: classes,
      });
   }
   export const updateClassListState = (classes) => (dispatch) => { 
        classes = classes.reduce((obj, item) => {
    return {
      ...item,
    };
  }, {});
  dispatch({
    type: actions.UPDATE_CLASS_STATE,
    payload: classes,
  });
  

console.log('here',classes)
}

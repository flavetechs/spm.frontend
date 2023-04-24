import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/grade-setting-action-types";
import {
  showErrorToast,
  showSuccessToast,
} from "./toaster-actions";

export const getPreviousGrades = () => (dispatch) => {
  dispatch({
    type: actions.FETCH_PREVIOUS_GRADES_LOADING,
  });

  axiosInstance
    .get("/smp/server/grade/api/v1/get/get-settings")
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
    .post("/smp/server/grade/api/v1/create", values)
    .then((res) => {
      dispatch({
        type: actions.CREATE_GRADE_SUCCESS,
        payload: res.data.message.friendlyMessage,
      });
      showSuccessToast(res.data.message.friendlyMessage)(dispatch);
      getPreviousGrades()(dispatch);
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
      .post("/smp/server/grade/api/v1/update", values)
      .then((res) => {
        dispatch({
          type: actions.UPDATE_GRADE_SUCCESS,
          payload: res.data.message.friendlyMessage,
        });
        showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        getPreviousGrades()(dispatch);
      })
      .catch((err) => {
        dispatch({
          type: actions.UPDATE_GRADE_FAILED,
          payload: err.response.data.message.friendlyMessage,
        });
        showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
      });
  };

  export const deleteGradeSetting = (value) => (dispatch) => {
    dispatch({
      type: actions.UPDATE_GRADE_LOADING,
    });
    const payload = {
      item: value
    }
    axiosInstance
      .post("/smp/server/grade/api/v1/delete", payload)
      .then((res) => {
        dispatch({
          type: actions.UPDATE_GRADE_SUCCESS,
          payload: res.data.message.friendlyMessage,
        });
        showSuccessToast(res.data.message.friendlyMessage)(dispatch);
        getPreviousGrades()(dispatch);
      })
      .catch((err) => {
        dispatch({
          type: actions.UPDATE_GRADE_FAILED,
          payload: err.response.data.message.friendlyMessage,
        });
        showErrorToast(err.response.data.message.friendlyMessage)(dispatch);
      });
  };
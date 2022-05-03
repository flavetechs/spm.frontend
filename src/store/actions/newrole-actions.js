import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/newrole-action-types";

export const addRole = () => (dispatch) => {
  dispatch({
    type: actions.CREATE_ROLE_LOADING,
  });

  axiosInstance
    .get(`/role/api/v1/getall-activities`)
    .then((res) => {
      dispatch({
        type: actions.CREATE_ROLE_SUCCESS,
        payload: res.data.result,
      });
    })
    .catch((err) => {
      dispatch({
        type: actions.CREATE_ROLE_FAILED,
        payload: err.response.data,
      });
    });
};

export const addNewRole =
  ({ activityId, canCreate, canUpdate, canDelete, canImport, canExport }) =>
  (dispatch) => {
    dispatch({
      type: actions.CREATE_ROLE_LOADING,
    });

    const payload = {
      activityId,
      canCreate,
      canUpdate,
      canDelete,
      canImport,
      canExport,
    };
    axiosInstance
      .post(`/role/api/v1/create`, payload)
      .then((res) => {
        dispatch({
          type: actions.CREATE_ROLE_SUCCESS,
          payload: res.data.result,
        });
      })
      .catch((err) => {
        dispatch({
          type: actions.CREATE_ROLE_FAILED,
          payload: err.response.data.result,
        });
      });
  };

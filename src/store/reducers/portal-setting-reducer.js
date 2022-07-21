import { actions } from "../action-types/portal-setting-action-types";
import { _state } from "../states/portal-setting-state";

export const portalSettingReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.FETCH_SCHOOL_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_SCHOOL_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        schoolSettingList: payload,
      };
    case actions.FETCH_SCHOOL_SETTING_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.FETCH_RESULT_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_RESULT_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        resultSettingList: payload,
      };
    case actions.FETCH_RESULT_SETTING_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.FETCH_NOTIFICATION_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_NOTIFICATION_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        notificationSettingList: payload,
      };
    case actions.FETCH_NOTIFICATION_SETTING_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };


    case actions.CREATE_SCHOOL_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_SCHOOL_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_SCHOOL_SETTING_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.CREATE_RESULT_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_RESULT_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_RESULT_SETTING_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.CREATE_NOTIFICATION_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_NOTIFICATION_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_NOTIFICATION_SETTING_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };



    case actions.UPDATE_SCHOOL_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_SCHOOL_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.UPDATE_SCHOOL_SETTING_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };


    case actions.UPDATE_RESULT_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_RESULT_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.UPDATE_RESULT_SETTING_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };


    case actions.UPDATE_NOTIFICATION_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_NOTIFICATION_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.UPDATE_NOTIFICATION_SETTING_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    default:
      return state;
  }
};
function filterClasses(arr) {
  arr = []
  return arr
}

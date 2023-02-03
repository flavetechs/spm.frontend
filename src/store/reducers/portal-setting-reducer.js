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
        schoolSetting: {},
      };
    case actions.FETCH_SCHOOL_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        schoolSetting: payload,
      };
    case actions.FETCH_SCHOOL_SETTING_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };


    case actions.UPDATE_SELECTED_TEMPLATE: {
      return {
        ...state,
        selectedTemplate: payload,
      };
    }

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
        resultSetting: payload,
        selectedTemplate: payload.selectedTemplate,
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
        notificationSettingResult: "",
      };
    case actions.FETCH_NOTIFICATION_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        notificationSettingResult: payload,
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

    case actions.FETCH_ADMISSION_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_ADMISSION_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        filterProps: payload,
        admissionSettingResult: payload.data,
      };
    case actions.FETCH_ADMISSION_SETTING_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };



    case actions.CREATE_ADMISSION_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_ADMISSION_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_ADMISSION_SETTING_FAILED:
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
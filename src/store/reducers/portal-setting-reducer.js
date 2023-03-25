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
      sessionStorage.setItem("schoolAbbreviation",payload.schoolAbbreviation)
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
        submittedSuccessful: false,
      };
    case actions.FETCH_ADMISSION_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        filterProps: payload,
        admissionSettingList: payload.data,
        submittedSuccessful: false,
      };
    case actions.FETCH_ADMISSION_SETTING_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };



    case actions.FETCH_SINGLE_ADMISSION_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_SINGLE_ADMISSION_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        singleAdmissionSettingsDetail: payload,
        isSuccessful: true,
      };
    case actions.FETCH_SINGLE_ADMISSION_SETTING_FAILED:
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
        submittedSuccessful: false,
      };
    case actions.CREATE_ADMISSION_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
        submittedSuccessful: true,
      };
    case actions.CREATE_ADMISSION_SETTING_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
        submittedSuccessful: false,
      };

    case actions.UPDATE_ADMISSION_SETTING_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_ADMISSION_SETTING_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.UPDATE_ADMISSION_SETTING_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };
      case actions.UPDATE_APP_LAYOUT_SUCCESS:
        return{
          ...state,
          isSuccessful: true,
          loading: false,
          message: payload,
        };

        case actions.FETCH_APP_LAYOUT_SUCCESS:
        localStorage.setItem('appSetting', JSON.stringify(payload));
        localStorage.setItem('schoolLogo', payload.schoolLogo);
        return{
          ...state,
          isSuccessful: true,
          loading: false,
          appSetting:payload,
        };

        case actions.UPDATE_STUDENT_REG_NO_SUCCESS:
        return{
          ...state,
          isSuccessful: true,
          loading: false,
          message: payload,
        };

        case actions.FETCH_STUDENT_REG_NO_SUCCESS:
        return{
          ...state,
          isSuccessful: true,
          loading: false,
          studRegNoSettings:payload,
        };

        case actions.PORTAL_SETTING_LOADING:
        return {
          ...state,
          loading: true,
          isSuccessful: false,
          message: "",
        };
        case actions.PORTAL_SETTING_FAILED:
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
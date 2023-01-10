import { actions } from "../action-types/admin-admission-action-types";
import { _state } from "../states/admin-admission-state";



export const adminAdmissionReducer = (state = _state, { type, payload }) => {
  switch (type) {


    case actions.PUSH_ITEM_ID:
      var arrayToFilter = [...state.selectedIds, payload]
      return {
        ...state,
        selectedIds: [...new Set(arrayToFilter)],
      };
    case actions.REMOVE_ITEM_ID:
      var filteredIds = filterSelectedIds(state.selectedIds, payload)
      return {
        ...state,
        selectedIds: filteredIds
      }
    case actions.RETURN_ITEM_LIST:
      return {
        ...state,
        adminAdmissionList: payload,
      };



    case actions.FETCH_ALL_ADMISSION_LIST_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };

    case actions.FETCH_ALL_ADMISSION_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        adminAdmissionList: payload.data,
        filterProps: payload,
      };

    case actions.FETCH_ALL_ADMISSION_LIST_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload,
      };


    case actions.FETCH_ALL_ADMIN_ADMISSION_CLASSES_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };

    case actions.FETCH_ALL_ADMIN_ADMISSION_CLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        adminAdmissionClasses: payload,
        isSuccessful: true,
      };

    case actions.FETCH_ALL_ADMIN_ADMISSION_CLASSES_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload,
      };



    case actions.FETCH_SINGLE_ADMISSION_DETAIL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_SINGLE_ADMISSION_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedAdmissionDetail: payload,
        submitSuccessful: false,
      };
    case actions.FETCH_SINGLE_ADMISSION_DETAIL_FAILED:
      return {
        ...state,
        loading: false,
        selectedItem: null,
        message: payload,
      };

    case actions.ADMISSION_EXPORT_TO_CBT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
        submitSuccessful: false,
      };
    case actions.ADMISSION_EXPORT_TO_CBT_SUCCEESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
        submitSuccessful: true,
      };
    case actions.ADMISSION_EXPORT_TO_CBT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
        submitSuccessful: false,
      };

    case actions.FETCH_SESSION_CLASSES2_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };

    case actions.FETCH_SESSION_CLASSES2_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionClasses2: payload,
        isSuccessful: true,
      };

    case actions.FETCH_SESSION_CLASSES2_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload,
      };

    case actions.ENROLL_SINGLE_CANDIDATE_FAILED:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
        submitSuccessful: false,
      };
    case actions.ENROLL_SINGLE_CANDIDATE_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
        submitSuccessful: true,
      };
    case actions.ENROLL_SINGLE_CANDIDATE_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
        submitSuccessful: false,
      };

      
      case actions.ENROLL_MULTIPLE_CANDIDATE_LOADING:
        return {
          ...state,
          loading: true,
          isSuccessful: false,
          message: "",
          submitSuccessful: false,
        };
      case actions.ENROLL_MULTIPLE_CANDIDATE_SUCCESS:
        return {
          ...state,
          isSuccessful: true,
          loading: false,
          message: payload,
          submitSuccessful: true,
        };
      case actions.ENROLL_MULTIPLE_CANDIDATE_FAILED:
        return {
          ...state,
          isSuccessful: false,
          loading: false,
          message: payload,
          submitSuccessful: false,
        };

    default:
      return state;
  }
}
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}

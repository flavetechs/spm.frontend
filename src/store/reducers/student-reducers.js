import { actions } from "../action-types/student-action-types";
import { _state } from "../states/student-state";

export const studentReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.PUSH_STUDENT_ID:
      var arrayToFilter = [...state.selectedIds, payload]
      return {
        ...state,
        selectedIds: [...new Set(arrayToFilter)],
      };
    case actions.REMOVE_STUDENT_ID:
      var filteredIds = filterSelectedIds(state.selectedIds, payload)
      return {
        ...state,
        selectedIds: filteredIds
      }
    case actions.RETURN_STUDENT_LIST:
      return {
        ...state,
        studentList: payload,
      };

    case actions.FETCH_STUDENTS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        studentList: payload,
      };
    case actions.FETCH_STUDENTS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.CREATE_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_STUDENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_STUDENT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };

    case actions.UPDATE_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true,
      };
    case actions.UPDATE_STUDENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.DELETE_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_STUDENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.FETCH_SINGLE_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_SINGLE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedStudent: payload,
        submitSuccessful: false,
      };
    case actions.FETCH_SINGLE_STUDENT_FAILED:
      return {
        ...state,
        loading: false,
        selectedStudent: null,
      };

    case actions.UPDATE_STUDENT_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
        submitSuccessful: false,
      };
    case actions.UPDATE_STUDENT_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true,
        submitSuccessful: true,
      };
    case actions.UPDATE_STUDENT_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
        submitSuccessful: false,
      };


    default:
      return state;
  }
};

function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}


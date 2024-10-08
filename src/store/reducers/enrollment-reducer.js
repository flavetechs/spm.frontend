import { _state } from "../states/enrollment-state";
import { actions } from "../action-types/enrollment-action-types";
export const enrollmentReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.PUSH_STUDENT_ID:
      var arrayToFilter = [...state.selectedIds, payload]
      return {
        ...state,
        selectedIds: [...new Set(arrayToFilter)],
      };
    case actions.REMOVE_STUDENT_ID:
      var filteredIds = filterSelectedIds(state.selectedIds, payload);
      return {
        ...state,
        selectedIds: filteredIds,
      };
    case actions.RETURN_UNENROLLED_STUDENT_LIST:
      return {
        ...state,
        unenrolledStudents: payload.data
      };
    case actions.RETURN_ENROLLED_STUDENT_LIST:
      return {
        ...state,
        enrolledStudents: payload,
      };

      case actions.RESET_ENROLLED_STUDENTS_STATE:
        return {
          ...state,
          enrolledStudents: payload,
        };

    case actions.FETCH_UNENROLLED_STUDENTS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_UNENROLLED_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        unenrolledStudents: payload.data,
        filterProps: payload,
      };
    case actions.FETCH_UNENROLLED_STUDENTS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.ENROLL_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.ENROLL_STUDENT_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.ENROLL_STUDENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.FETCH_ENROLLED_STUDENTS_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };
    case actions.FETCH_ENROLLED_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        enrolledStudents: payload.data,
        filterProps: payload,
      };
    case actions.FETCH_ENROLLED_STUDENTS_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload
      };

    case actions.UNENROLL_STUDENTS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.UNENROLL_STUDENTS_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.UNENROLL_STUDENTS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };
    case actions.SHOW_HIDE_CLASS_MODAL:
      return {
        ...state,
        showModal: payload
      };

    default:
      return state
  }
}
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}


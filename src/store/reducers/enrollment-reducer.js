import { _state } from "../states/enrollment-state";
import { actions } from "../action-types/enrollment-action-types";
export const enrollmentReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.PUSH_STUDENT_ID:
      return {
        ...state,
        selectedIds: [...state.selectedIds, payload],
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
        unenrolledStudents: payload,
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
        unenrolledStudents: payload,
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

    default:
      return state;
  }
};
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}

import { actions } from "../action-types/timetable-action-types";
import { _state } from "../states/timetable-state";


export const timetableReducer = (state = _state, { type, payload }) => {
  switch (type) {

    //STAFF FETCH
    case actions.FETCH_TIMETABLE_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };
    case actions.FETCH_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        timetableList: payload,
      };
    case actions.FETCH_TIMETABLE_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload
      };

       case actions.FETCH_TIMETABLE_ACTIVE_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_TIMETABLE_ACTIVE_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        activeClasses: payload,
      };
    case actions.FETCH_TIMETABLE_ACTIVE_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.CREATE_TIMETABLE_DAYS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.CREATE_TIMETABLE_DAYS_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.CREATE_TIMETABLE_DAYS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: ''
      };
    case actions.CREATE_TIMETABLE_PERIOD_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.CREATE_TIMETABLE_PERIOD_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.CREATE_TIMETABLE_PERIOD_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: ''
      };
    case actions.CREATE_TIMETABLE_PERIOD_ACTIVITY_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.CREATE_TIMETABLE_PERIOD_ACTIVITY_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.CREATE_TIMETABLE_PERIOD_ACTIVITY_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: ''
      };


    //TIMETABLE ACTION REDUCERS

    default:
      return state;
  }
}
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}

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

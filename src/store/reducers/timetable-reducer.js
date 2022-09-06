import { actions } from "../action-types/timetable-action-types";
import { _state } from "../states/timetable-state";


export const timetableReducer = (state = _state, { type, payload }) => {
  switch (type) {

    case actions.GET_SINGLE_ITEM: {
      const selectedItem = state.selectedTimetable?.classTimeTableId == payload;
      if (selectedItem) {
        return {
          ...state,
          selectedItem
        }
      }
    }
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
        selectedTimetable: payload,
      };


    //TIMETABLE FETCH
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
        selectedTimetable: payload,
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
        message: '',
        submitSuccessful: false,
      };
    case actions.CREATE_TIMETABLE_DAYS_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
        submitSuccessful: true,
      };
    case actions.CREATE_TIMETABLE_DAYS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: '',
        submitSuccessful: false,
      };
    case actions.CREATE_TIMETABLE_PERIOD_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: '',
        submitSuccessful: false,
      };
    case actions.CREATE_TIMETABLE_PERIOD_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
        submitSuccessful: true,
      };
    case actions.CREATE_TIMETABLE_PERIOD_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: '',
        submitSuccessful: false,
      };


    case actions.UPDATE_TIMETABLE_ACTIVITY_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.UPDATE_TIMETABLE_ACTIVITY_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.UPDATE_TIMETABLE_ACTIVITY_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: ''
      };


    case actions.DELETE_TIMETABLE_DAYS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.DELETE_TIMETABLE_DAYS_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_TIMETABLE_DAYS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.DELETE_TIMETABLE_TIME_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.DELETE_TIMETABLE_TIME_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_TIMETABLE_TIME_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.DELETE_TIMETABLE_ACTIVITY_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.DELETE_TIMETABLE_ACTIVITY_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_TIMETABLE_ACTIVITY_FALED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.UPDATE_TIMETABLE_DAYS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
        submitSuccessful: false,
      };
    case actions.UPDATE_TIMETABLE_DAYS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true,
        submitSuccessful: true,
      };
    case actions.UPDATE_TIMETABLE_DAYS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
        submitSuccessful: false,
      };

    case actions.UPDATE_TIMETABLE_TIME_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
        submitSuccessful: false,
      };
    case actions.UPDATE_TIMETABLE_TIME_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true,
        submitSuccessful: true,
      };
    case actions.UPDATE_TIMETABLE_TIME_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
        submitSuccessful: false,
      };

    case actions.FETCH_STUDENT_TIMETABLE_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_STUDENT_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        studentselectedTimetable: payload,
        isSuccessful: true,
      };
    case actions.FETCH_STUDENT_TIMETABLE_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
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

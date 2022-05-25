import { actions } from "../action-types/session-action-types";
import { _state } from "../states/session-state";

export const sessionReducer = (state = _state, { type, payload }) => {
  switch (type) {


    case actions.PUSH_ITEM_ID:
      return {
        ...state,
        selectedIds: [...state.selectedIds, payload]
      }
    case actions.REMOVE_ITEM_ID:
      var filteredIds = filterSelectedIds(state.selectedIds, payload)
      return {
        ...state,
        selectedIds: filteredIds
      }
    case actions.RETURN_ITEM_LIST:
      return {
        ...state,
        sessionList: payload,
      };

  


    //SESSION FETCH
    case actions.FETCH_SESSION_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };

    case actions.FETCH_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        sessionList: payload,
      };

    case actions.FETCH_SESSION_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload
      };

    case actions.CREATE_SESSION_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.CREATE_SESSION_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.CREATE_SESSION_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: ''
      };

    case actions.UPDATE_SESSION_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.UPDATE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true
      };
    case actions.UPDATE_SESSION_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.DELETE_SESSION_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.DELETE_SESSION_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_SESSION_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.FETCH_ACTIVE_SESSION_LOADING:
      return {
        ...state,
        loading: true,
        message: '',
        isSuccessful: false
      };

    case actions.FETCH_ACTIVE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        activeSession: payload,
      };

    case actions.FETCH_ACTIVE_SESSION_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload
      };

    case actions.FETCH_SINGLE_SESSION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_SINGLE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedItem: payload,
      };
    case actions.FETCH_SINGLE_SESSION_FAILED:
      return {
        ...state,
        loading: false,
        selectedItem: null,
      };

    //SESSION ACTION REDUCERS

    default:
      return state;
  }
}
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}
import { actions } from "../action-types/class-action-types";
import { _state } from "../states/class-state"

export const classListReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.FETCH_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true
      };
    case actions.FETCH_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        classList: payload,
        isSuccessful: false
      };
    case actions.FETCH_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };
    case actions.CREATE_CLASSLOOKUP_LOADING:
      return {
        ...state, 
        loading: true,
        isSuccessful : false
        };
    case actions.CREATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state, 
        classList: payload,
        isSuccessful: true,
        loading: false
      };
    case actions.CREATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false
      };
      
    case actions.UPDATE_CLASS_SUCCESS:
      return {
        ...state,
        classId: payload.classId,
        message: "",
        name: payload.name,
      };
    case actions.DELETE_CLASS_SUCCESS: {
      return {
        ...state,
        selectedIds: [],
        message: "Successfuly deleted",
        isSuccessful: true,
        };
      }
    default:
      return state;
  }
};

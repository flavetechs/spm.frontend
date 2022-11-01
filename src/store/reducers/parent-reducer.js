import { actions } from "../action-types/parent-action-types";
import { _state } from "../states/parent-state";

export const parentReducer = (state = _state, { type, payload }) => {
  switch (type) {

    case actions.FETCH_MY_WARDS_LIST_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_MY_WARDS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        myWardList: payload.data,
        filterProps: payload
      };
    case actions.FETCH_MY_WARDS_LIST_FAILED:
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

import { actions } from "../action-types/admin-admission-action-types";
import { _state } from "../states/admin-admission-state";



export const adminAdmissionReducer = (state = _state, { type, payload }) => {
  switch (type) {

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

    default:
      return state;
  }
}


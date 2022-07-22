import { actions } from "../action-types/notification-action-types";
import { _state } from "../states/notification-state";

export const notificationReducer = (state = _state, { type, payload }) => {
  switch (type) {

    case actions.CREATE_ANNOUNCEMENT_LOADING:
        return {
          ...state,
          loading: true,
          isSuccessful: false,
          message: "",
        };
      case actions.CREATE_ANNOUNCEMENT_SUCCESS:
        return {
          ...state,
          isSuccessful: true,
          loading: false,
          message: payload,
        };
      case actions.CREATE_ANNOUNCEMENT_FAILED:
        return {
          ...state,
          isSuccessful: false,
          loading: false,
          message: payload,
        };

    case actions.FETCH_ANNOUNCEMENT_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        announcementList: payload,
      };
    case actions.FETCH_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
      case actions.UPDATE_SEEN_ANNOUNCEMENT_LOADING:
        return {
          ...state,
          loading: true,
          isSuccessful: false,
          announcementDetails:null,
        };

      case actions.UPDATE_SEEN_ANNOUNCEMENT_SUCCESS:
        return {
          ...state,
          isSuccessful: true,
          loading: false,
          announcementDetails: payload,
        };
      case actions.UPDATE_SEEN_ANNOUNCEMENT_FAILED:
        return {
          ...state,
          isSuccessful: false,
          loading: false,
          announcementDetails: null,
        };
     
    default:
      return state;
  }
};


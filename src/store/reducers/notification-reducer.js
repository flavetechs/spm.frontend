import { actions } from "../action-types/notification-action-types";
import { _state } from "../states/notification-state";

export const notificationReducer = (state = _state, { type, payload }) => {
  switch (type) {

    case actions.GET_SINGLE_ITEM: {
      const selectedItem = state.announcementList.find(d => d.announcementsId == payload);
      if (selectedItem) {
        return {
          ...state,
          selectedItem
        }
      }
    }
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
        announcementList: payload,
      };


    case actions.CREATE_ANNOUNCEMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        announcementSuccessful:true,
        message: "",
      };
    case actions.CREATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        announcementSuccessful:true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        announcementSuccessful:false,
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
        announcementDetails: null,
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

    case actions.UPDATE_ANNOUNCEMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        announcementSuccessful:false,
        message: ''
      };
    case actions.UPDATE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        announcementSuccessful:true,
        loading: false,
        message: payload
      };
    case actions.UPDATE_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        loading: false,
        message: '',
        isSuccessful: false,
        announcementSuccessful:false,
      };

    case actions.DELETE_ANNOUNCEMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.DELETE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

      case actions.RESET_ANNOUNCEMENT_SUCCESSFUL:
        return {
          ...state,
          announcementSuccessful:false,
        };

    default:
      return state;
  }
}
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}


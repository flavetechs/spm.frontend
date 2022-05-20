import { actions } from "../action-types/staff-action-types";
import { _state } from "../states/staff-state";


export const staffReducer = (state = _state, { type, payload }) => {
  switch (type) {

    case actions.GET_SINGLE_ITEM: {
        const selectedItem = state.staffList.find(d => d.teacherAccountId == payload);
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
          staffList: payload,
        };
  

        //STAFF FETCH
    case actions.FETCH_STAFFACCOUNT_LOADING:
        return {
            ...state,
            loading: true,
            message: '',
            isSuccessful: false
        };

    case actions.FETCH_STAFFACCOUNT_SUCCESS:
        return {
            ...state,
            loading: false,
            staffList: payload,
        };

    case actions.FETCH_STAFFACCOUNT_FAILED:
        return {
            ...state,
            loading: false,
            isSuccessful: false,
            message: payload
        };

    case actions.CREATE_STAFFACCOUNT_LOADING:
            return {
              ...state,
              loading: true,
              isSuccessful: false,
              message: ''
            };
    case actions.CREATE_STAFFACCOUNT_SUCCESS:
            return {
              ...state,
              isSuccessful: true,
              loading: false,
              message: payload
            };
    case actions.CREATE_STAFFACCOUNT_FAILED:
            return {
              ...state,
              isSuccessful: false,
              loading: false,
              message: ''
            };
      
    case actions.UPDATE_STAFFACCOUNT_LOADING:
            return {
              ...state,
              loading: true,
              isSuccessful: false,
              message: ''
            };
    case actions.UPDATE_STAFFACCOUNT_SUCCESS:
          return {
            ...state,
            isSuccessful: true,
            loading: false,
            message: payload
            };
    case actions.UPDATE_STAFFACCOUNT_FAILED:
        return {
            ...state,
            loading: false,
            message: '',
            isSuccessful: false
            };
      
    case actions.DELETE_STAFFACCOUNT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.DELETE_STAFFACCOUNT_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_STAFFACCOUNT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

      case actions.FETCH_SINGLE_STAFF_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_SINGLE_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedItem: payload,
      };
    case actions.FETCH_SINGLE_STAFF_FAILED:
      return {
        ...state,
        loading: false,
        selectedItem: null,
      };
          //STAFF ACTION REDUCERS

        default:
            return state;
    }
}
function filterSelectedIds(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  
import { actions } from "../action-types/staff-action-types";
import { _state } from "../states/staff-state";


export const promotionReducer = (state = _state, { type, payload }) => {
  switch (type) {

    case actions.GET_SINGLE_ITEM: {
        const selectedPromotion = state.promotionList.find(d => d.teacherAccountId == payload);
        if (selectedPromotion) {
          return {
            ...state,
            selectedPromotion
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
          promotionList: payload,
        };
  

        //PROMOTION FETCH
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
            promotionList: payload,
        };

    case actions.FETCH_STAFFACCOUNT_FAILED:
        return {
            ...state,
            loading: false,
            isSuccessful: false,
            message: payload
        };

    
          //PROMOTION ACTION REDUCERS

        default:
            return state;
    }
}
function filterSelectedIds(arr, value) {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  }
  
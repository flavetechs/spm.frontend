
import { actions } from "../action-types/promotion-action-types";
import { _state } from "../states/promotion-state";


export const promotionReducer = (state = _state, { type, payload }) => {
  switch (type) {

    case actions.GET_SINGLE_ITEM: {
      const selectedItem = state.promotionList.find(d => d.sessionClassId == payload);
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
        promotionList: payload,
      };


    //PROMOTION FETCH
    case actions.FETCH_PROMOTION_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false
      };

    case actions.FETCH_PROMOTION_SUCCESS:{
      return {
        ...state,
        loading: false,
        promotionList: payload,
      };
    }
      

    case actions.FETCH_PROMOTION_FAILED:
      return {
        ...state,
        loading: false,
        isSuccessful: false,
        message: payload
      };


    case actions.FETCH_PASSED_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_PASSED_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        passedStudentList: payload,
      };
    case actions.FETCH_PASSED_STUDENT_FAILED:
      return {
        ...state,
        loading: false,
        passedStudentList: null,
      };

    case actions.FETCH_FAILED_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_FAILED_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        failedStudentList: payload,
        isSuccessful: true,
      };
    case actions.FETCH_FAILED_STUDENT_FAILED:
      return {
        ...state,
        loading: false,
        failedStudentList: null,
        isSuccessful: false,
      };

    case actions.PROMOTE_STUDENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
      };
    case actions.PROMOTE_STUDENT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.PROMOTE_STUDENT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
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

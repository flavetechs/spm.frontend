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
        isSuccessful: false
      };
    case actions.CREATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        classList: payload,
        isSuccessful: true,
        loading: false,
        isActive: true
      };
    case actions.CREATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false
      };

    case actions.UPDATE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true
      };
    case actions.UPDATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true
      };
    case actions.UPDATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };



    case actions.FETCH_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };


    case actions.DELETE_CLASSLOOKUP_LOADING:
      return {
        ...state,
       loading: true
      };
    case actions.DELETE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: "Successfuly deleted",
        isSuccessful: true,
      };
    case actions.DELETE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: "Successfuly deleted",
        isSuccessful: false
      };

    case actions.GET_SINGLE_CLASS:{
      console.log('reducer classlist', state.classList)
      const selectedClass = state.classList.filter(d => d.lookupId == payload)[0];
      console.log('selected class', selectedClass)
      if(selectedClass){
        return {
          ...state,
          selectedClass: selectedClass,
        }
      }
    }
      

    default:
      return state;
  }
};

import { actions } from "../action-types/class-action-types";
import { _state } from "../states/class-state"

export const classReducer = (state = _state, { type, payload }) => {
  switch (type) {


    case actions.GET_SINGLE_ITEM: {
      const selectedItem = state.itemList.find(d => d.lookupId == payload);
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
        itemList: payload,
      };


    //CLASS ACTION REDUCERS

    case actions.FETCH_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true,
        message: ''
      };
    case actions.FETCH_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        loading: false,
        itemList: payload,
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
        isSuccessful: false,
        message: ''
      };
    case actions.CREATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.CREATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload
      };

    case actions.UPDATE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.UPDATE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.UPDATE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.DELETE_CLASSLOOKUP_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.DELETE_CLASSLOOKUP_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_CLASSLOOKUP_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };
    //CLASS ACTION REDUCERS


    //SUBJECT ACTION REDUCERS
    case actions.FETCH_SUBJECTS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        loading: false,
        itemList: payload,
      };
    case actions.FETCH_SUBJECT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.CREATE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.CREATE_SUBJECT_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.CREATE_SUBJECT_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload
      };

    case actions.UPDATE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.UPDATE_SUBJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true
      };
    case actions.UPDATE_SUBJECT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.DELETE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        selectedIds: [],
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_SUBJECT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };
    //SUBJECT ACTION REDUCERS

    //SESSION_CLASS ACTION REDUCERS
    case actions.FETCH_SESSION_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        itemList: payload,
      };
    case actions.FETCH_SESSION_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.CREATE_SESSION_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.CREATE_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload
      };
    case actions.CREATE_SESSION_CLASS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload
      };

    case actions.UPDATE_SESSION_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.UPDATE_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true
      };
    case actions.UPDATE_SESSION_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };

    case actions.DELETE_SESSION_CLASS_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false
      };
    case actions.DELETE_SESSION_CLASS_SUCCESS:
      return {
        ...state,
        selectedSessionId:'',
        message: payload,
        isSuccessful: true,
      };
    case actions.DELETE_SESSION_CLASS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };
    //SESSION_CLASS ACTION REDUCERS

//GET TEACHER ACTION REDUCER
case actions.FETCH_TEACHERS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_TEACHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        teacherList: payload,
      };
    case actions.FETCH_TEACHERS_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload
      };
//GET TEACHER ACTION REDUCER

//GET ACTIVE SUBJECTS REDUCER
case actions.FETCH_ACTIVE_SUBJECTS_LOADING:
  return {
    ...state,
    loading: true,
    message: "",
    isSuccessful: false,
  };
case actions.FETCH_ACTIVE_SUBJECTS_SUCCESS:
  return {
    ...state,
    loading: false,
    activeSubjects: payload,
  };
case actions.FETCH_ACTIVE_SUBJECTS_FAILED:
  return {
    ...state,
    isSuccessful: false,
    loading: false,
    message: payload
  };
  //GET ACTIVE SUBJECTS REDUCER

//GET ACTIVE CLASSES REDUCER
case actions.FETCH_ACTIVE_CLASSES_LOADING:
  return {
    ...state,
    loading: true,
    message: "",
    isSuccessful: false,
  };
case actions.FETCH_ACTIVE_CLASSES_SUCCESS:
  return {
    ...state,
    loading: false,
    activeClasses: payload,
  };
case actions.FETCH_ACTIVE_CLASSES_FAILED:
  return {
    ...state,
    isSuccessful: false,
    loading: false,
    message: payload
  };
  //GET ACTIVE CLASSES REDUCER

  //CLASS SUBJECT IDS//
case actions.PUSH_CLASS_SUBJECT_ID:
  return{
      ...state,
      classSubjects: payload
  };
  

  case actions.FETCH_SINGLE_SESSION_CLASS_LOADING: {
    return {
      ...state,
      loading: true,
    };
  }
  case actions.FETCH_SINGLE_SESSION_CLASS_SUCCESS: {
    return {
      ...state,
      loading: false,
      selectedItem: payload,
    };
  }
  case actions.FETCH_SINGLE_SESSION_CLASS_FAILED: {
    return {
      ...state,
      loading: false,
      selectedItem: null,
    };
  }
 //GET SINGLE SESSION CLASS

    default:
      return state;
  }
};
function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}

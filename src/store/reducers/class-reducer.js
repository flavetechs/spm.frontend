import { actions } from "../action-types/class-action-types";
import { _state } from "../states/class-state"

export const classReducer = (state = _state, { type, payload }) => {
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
      case actions.SUBJECTS_LOADING:
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
        subjects: payload,
        isSuccessful: true,
      };
      
    case actions.SUBJECT_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
      case actions.GET_SINGLE_SUBJECT:{
        console.log('reducer subjects', state.subjects)
        const selectedSubject = state.subjects.filter(d => d.lookupId == payload)[0];
        console.log('selected subject', selectedSubject)
        if(selectedSubject){
          return {
            ...state,
            selectedSubject: selectedSubject,
          }
        }
      };

      case actions.CREATE_SUBJECT_NAME:
        return {
          ...state,
          newSubject: payload,
        };
        case actions.CREATE_STATUS:
          return {
            ...state,
            newStatus: payload,
          };
      case actions.CREATE_SUBJECT_LOADING:
        return {
          ...state,
          loading: true,
          isSuccessful: false
        };
      case actions.CREATE_SUBJECT_SUCCESS:
        return {
          ...state,
          subjects: payload,
          isSuccessful: true,
          loading: false,
          isActive: true
        };
      case actions.CREATE_SUBJECT_FAILED:
        return {
          ...state,
          isSuccessful: false,
          loading: false
        };
        case actions.PUSH_SUBJECT_ID: 
          return {
            ...state,
            selectedIds: payload
        }
        
      case actions.DELETE_SUBJECT_LOADING:
        return {
          ...state,
         loading: true
        };
      case actions.DELETE_SUBJECT_SUCCESS:
        return {
          ...state,
          selectedIds: payload,
          message: "Successfuly deleted",
          isSuccessful: true,
        };
      case actions.DELETE_SUBJECT_FAILED:
        return {
          ...state,
          loading: false,
          message: "Successfuly deleted",
          isSuccessful: false
        };
    
        case actions.PUSH_SUBJECT_ID: 
          return {
            ...state,
            selectedIds: payload
        }
        

        case actions.FETCH_SINGLE_SUBJECT_LOADING: {
          return {
            ...state,
            loading: true,
          };
        }
        case actions.FETCH_SINGLE_SUBJECT_SUCCESS: {
          return {
            ...state,
            loading: false,
            selectedSubject: payload,
          };
        }
        case actions.FETCH_SINGLE_SUBJECT_FAILED: {
          return {
            ...state,
            loading: false,
            selectedSubject: null,
          };
        }

    case actions.UPDATE_SUBJECT_LOADING:
      return {
        ...state,
        loading: true
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

    default:
      return state;
  }
};

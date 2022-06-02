import { _state } from "../states/grade-setting-state";
import { actions } from "../action-types/grade-setting-action-types";
export const gradeReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.FETCH_GRADE_CLASSES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_GRADE_CLASSES_SUCCESS:
      return {
        ...state,
        loading: false,
        classList: payload,
      };
    case actions.FETCH_GRADE_CLASSES_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
      case actions.FETCH_PREVIOUS_GRADES_LOADING:
        return {
          ...state,
          loading: true,
          message: "",
          isSuccessful: false,
        };
      case actions.FETCH_PREVIOUS_GRADES_SUCCESS:
        return {
          ...state,
          loading: false,
          prevGradesList: payload
        };
      case actions.FETCH_PREVIOUS_GRADES_FAILED:
        return {
          ...state,
          loading: false,
          message: payload,
          isSuccessful: false,
        };

        case actions.CREATE_GRADE_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: "",
      };
    case actions.CREATE_GRADE_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_GRADE_FAILED:
      return {
        ...state,
        isSuccessful: false,
        loading: false,
        message: payload,
      };
    
      case actions.PUSH_GRADE_VALUES:
        return {
          ...state,
          grades: [...state.grades, payload]
        }

        case actions.EDIT_GRADE_VALUES:
        return {
          ...state,
          prevGradesList: payload
        }

        case actions.CHOOSE_EDIT:
        return {
          ...state,
          gradesEdit: payload
        }
        case actions.UPDATE_FETCH_CLASS:
        return {
          ...state,
          classList: [...state.classList, payload]
        }
  
        case actions.PUSH_CLASSES_ID:
          return{
            ...state,
            classes: payload
        };
        
    default:
      return state
  }
}


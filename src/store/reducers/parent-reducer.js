import { actions } from "../action-types/parent-action-types";
import { _state } from "../states/parent-state";

export const parentReducer = (state = _state, { type, payload }) => {
  switch (type) {

    case actions.FETCH_MY_WARDS_LIST_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_MY_WARDS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        myWardList: payload.data,
        filterProps: payload
      };
    case actions.FETCH_MY_WARDS_LIST_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };



    case actions.FETCH_MY_WARDS_CLASS_NOTE_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_MY_WARDS_CLASS_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        myWardsClassNotes: payload.data,
        filterProps: payload,
        isSuccessful: true,
      };
    case actions.FETCH_MY_WARDS_CLASS_NOTE_LOADING:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };


    case actions.FETCH_MY_WARDS_NOTE_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_MY_WARDS_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        myWardsNotes: payload.data,
        filterProps: payload,
        isSuccessful: true,
      };

    case actions.FETCH_MY_WARDS_NOTE_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.FETCH_SINGLE_WARDS_NOTE_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_SINGLE_WARDS_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedWardsNote: payload,
        isSuccessful: true,
      };

    case actions.FETCH_SINGLE_WARDS_NOTE_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };


    case actions.FETCH_SINGLE_WARDS_CLASS_NOTE_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_SINGLE_WARDS_CLASS_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedWardsClassNote: payload,
        isSuccessful: true,
      };

    case actions.FETCH_SINGLE_WARDS_CLASS_NOTE_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };


    case actions.FETCH_MY_WARDS_CLASS_TIMETABLE_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_MY_WARDS_CLASS_TIMETABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        myWardsClassTimetable: payload,
        isSuccessful: true,
      };

      case actions.FETCH_MY_WARDS_EXAM_TIMETABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          myWardsExamTimetable: payload,
          isSuccessful: true,
        };

    case actions.FETCH_MY_WARDS_CLASS_TIMETABLE_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };


    case actions.FETCH_SINGLE_WARD_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_SINGLE_WARD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedWardDetails: payload,
        isSuccessful: true,
      };

    case actions.FETCH_SINGLE_WARD_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };


    case actions.FETCH_SINGLE_WARD_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_SINGLE_WARD_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedWardDetails: payload,
        isSuccessful: true,
      };

    case actions.FETCH_SINGLE_WARD_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.FETCH_MY_WARDS_HOME_ASSESSMENT_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_MY_WARDS_HOME_ASSESSMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        myWardsHomeAssessment: payload.data,
        filterProps: payload,
        isSuccessful: true,
      };

    case actions.FETCH_MY_WARDS_HOME_ASSESSMENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };



    case actions.FETCH_MY_WARDS_ANNOUNCEMENT_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_MY_WARDS_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        myWardsAnnouncementList: payload.data,
        filterProps: payload,
        isSuccessful: true,
      };

    case actions.FETCH_MY_WARDS_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.FETCH_MY_WARDS_SINGLE_ANNOUNCEMENT_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };

    case actions.FETCH_MY_WARDS_SINGLE_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        myWardsSingleAnnouncement: payload,
        isSuccessful: true,
      };

    case actions.FETCH_MY_WARDS_SINGLE_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };

    case actions.UPDATE_MY_WARDS_SEEN_ANNOUNCEMENT_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        message: ''
      };
    case actions.UPDATE_MY_WARDS_SEEN_ANNOUNCEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: true,
      };
    case actions.UPDATE_MY_WARDS_SEEN_ANNOUNCEMENT_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false
      };
      case actions.FETCH_PARENTS_LOADING:
        return {
          ...state,
          loading: true,
          message: "",
          isSuccessful: false,
        };
      case actions.FETCH_PARENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          parents: payload.data,
          filterProps: payload
        };
      case actions.FETCH_PARENTS_FAILED:
        return {
          ...state,
          loading: false,
          message: payload,
          isSuccessful: false,
        };
  
  
        case actions.FETCH_SINGLE_PARENT_LOADING:
          return {
            ...state,
            loading: true,
            message: "",
            isSuccessful: false,
          };
        case actions.FETCH_SINGLE_PARENT_SUCCESS:
          return {
            ...state,
            loading: false,
            singleParent: payload
          };
        case actions.FETCH_SINGLE_PARENT_FAILED:
          return {
            ...state,
            loading: false,
            message: payload,
            isSuccessful: false
          }
          case actions.FETCH_PARENTS_WARD_LIST_LOADING:
            return {
              ...state,
              loading: true,
              message: "",
              isSuccessful: false,
            };
          case actions.FETCH_PARENTS_WARD_LIST_SUCCESS:
            return {
              ...state,
              loading: false,
              myWardList: payload.data,
              filterProps: payload
            };
          case actions.FETCH_PARENTS_WARD_LIST_FAILED:
            return {
              ...state,
              loading: false,
              message: payload,
              isSuccessful: false,
            };



    default:
      return state;
  }
};

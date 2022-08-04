import { actions } from "../action-types/roles-action-types";
import { _state } from "../states/roles-state";

export const rolesReducer = (state = _state, { type, payload }) => {
  switch (type) {
    case actions.ROLES_LOADING:
      return {
        ...state,
        loading: true,
        message: "",
        isSuccessful: false,
      };
    case actions.FETCH_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: payload,
        isSuccessful: true,
      };
    case actions.ROLE_REQUEST_FAILED:
      return {
        ...state,
        loading: false,
        message: payload,
        isSuccessful: false,
      };
    case actions.CREATE_UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: payload,
        message: "Role created successfuly",
        isSuccessful: true,
      };
    case actions.EDIT_ROLE:
      return {
        ...state,
        roleId: payload.roleId,
        message: "",
        name: payload.name,
      };
    case actions.REMOVE_ROLE_ID: {
      var filteredIds = filterSelectedIds(state.selectedIds, payload)
            return {
                ...state,
                selectedIds: filteredIds
            }
    }

    case actions.PUSH_ROLE_ID: {
      return {
        ...state,
        selectedIds: [...state.selectedIds, payload]
    }
    }

    case actions.DELETE_SUCCESS: {
      return {
        ...state,
        selectedIds: [],
        message: "Successfuly deleted",
        isSuccessful: true,
      };
    }
    case actions.RETURN_LIST: {
      return {
        ...state,
        roles: payload,
      };
    }

    case actions.FETCH_PARENT_ROLE_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_PARENT_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
      parentActivity: payload,
      };
    }
    case actions.FETCH_PARENT_ROLE_FAILED: {
      return {
        ...state,
        loading: false,
        parentActivity: null,
      };
    }

    case actions.FETCH_SINGLE_ROLE_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_SINGLE_ROLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedRole: payload,
      };
    }
    case actions.FETCH_SINGLE_ROLE_FAILED: {
      return {
        ...state,
        loading: false,
        selectedRole: null,
      };
    }

    case actions.ADD_USER_TO_ROLE_LOADING:
            return {
              ...state,
              loading: true,
              submitSuccessful: false,
            };
    case actions.ADD_USER_TO_ROLE_SUCCESS:
            return {
              ...state,
              submitSuccessful: true,
              loading: false,
              message: payload
            };
    case actions.ADD_USER_TO_ROLE_FAILED:
            return {
              ...state,
              submitSuccessful: false,
              loading: false,
              message: payload
            };
      

    case actions.REMOVE_USER_FROM_ROLE_LOADING:
      return {
                ...state,
                loading: true,
                submitSuccessful: false,
              };
    case actions.REMOVE_USER_FROM_ROLE_SUCCESS:
        return {
                ...state,
                submitSuccessful: true,
                loading: false,
                message: payload
              };
    case actions.REMOVE_USER_FROM_ROLE_FAILED:
        return {
                ...state,
                submitSuccessful: false,
                loading: false,
                message: payload
              };
  
    case actions.FETCH_NON_ADDED_USERS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_NON_ADDED_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        nonAddedUsers: payload,
      };
    }
    case actions.FETCH_NON_ADDED_USERS_FAILED: {
      return {
        ...state,
        loading: false,
        nonAddedUsers: null,
      };
    }

    case actions.FETCH_ADDED_USERS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.FETCH_ADDED_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        addedUsers: payload,
      };
    }
    case actions.FETCH_ADDED_USERS_FAILED: {
      return {
        ...state,
        loading: false,
        addedUsers: null,
      };
    }

    case actions.RESET_ACTIVITIES:
      return {
        ...state,
        selectedRole:payload,
        submitSuccessful:false,
      };

    case actions.CREATE_ROLE_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        submitSuccessful:false,
        message: "",
      };
    case actions.CREATE_ROLE_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        submitSuccessful:true,
        loading: false,
        message: payload,
      };
    case actions.CREATE_ROLE_FAILED:
      return {
        ...state,
        isSuccessful: false,
        submitSuccessful:false,
        loading: false,
        message: payload,
      };

      
    case actions.UPDATE_ROLE_LOADING:
      return {
        ...state,
        loading: true,
        isSuccessful: false,
        submitSuccessful:false,
        message: "",
      };
    case actions.UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        isSuccessful: true,
        submitSuccessful:true,
        loading: false,
        message: payload,
      };
    case actions.UPDATE_ROLE_FAILED:
      return {
        ...state,
        isSuccessful: false,
        submitSuccessful:false,
        loading: false,
        message: payload,
      };

    case actions.UPDATE_ROLE_ACTIVITY_STATE:
      return {
        ...state,
        selectedRole: payload,
      };
    case actions.UPDATE_ROLE_NAME_STATE:
      return {
        ...state,
        selectedRole: payload,
      };
    case actions.CREATE_ROLE_STATE:
      return {
        ...state,
        newRole: payload,
      };

    case actions.CREATE_ROLE_NAME_STATE:
      return {
        ...state,
        newRole: payload,
      };

      case actions.DELETE_ROLE_STATE:
         return {
        ...state,
        selectedIds: [...payload]
    }
       
    default:
      return state;
  }
};

function filterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}

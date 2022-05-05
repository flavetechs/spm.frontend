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
      var filteredIds = FilterSelectedIds(state.selectedIds, payload);
      return {
        ...state,
        selectedIds: filteredIds,
      };
    }

    case actions.PUSH_ROLE_ID: {
      return {
        ...state,
        selectedIds: [...state.selectedIds, payload],
      };
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
          deleteRole: payload,
        };
        case actions.DELETE_SELECTED_ROLE_STATE:
        return {
          ...state,
          deleteRole: payload,
        };
    default:
      return state;
  }
};

function FilterSelectedIds(arr, value) {
  return arr.filter(function (ele) {
    return ele !== value;
  });
}

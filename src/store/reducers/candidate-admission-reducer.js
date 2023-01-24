import { actions } from '../action-types/candidate-admission-action-types';
import { _state } from '../states/candidate-admission-state';

export const candidateAdmissionReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.LOGIN_CANDIDATE_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                token: '',
                isSuccessful: false,
            }

        case actions.LOGIN_CANDIDATE_SUCCESS: {
            if (payload?.result?.auth !== null) {
                localStorage.setItem('token', payload.auth?.token)
                localStorage.setItem('userDetail', JSON.stringify(payload.userDetails));

                return {
                    ...state,
                    loading: false,
                    token: payload?.result.auth.token,
                    expires: payload?.result.auth.expires,
                    message: '',
                    isSuccessful: true,
                }

            } else if (payload?.result?.auth === null) {
                sessionStorage.removeItem('friendlyMessage');
                sessionStorage.removeItem('candidateUserDetails');
                sessionStorage.removeItem('authStatus');

                sessionStorage.setItem('authStatus', JSON.stringify(payload?.result?.auth));
                sessionStorage.setItem('friendlyMessage', payload?.message?.friendlyMessage);
                sessionStorage.setItem('candidateUserDetails', JSON.stringify(payload?.result.userDetails));

                return {
                    ...state,
                    loading: false,
                    token: null,
                    expires: null,
                    message: '',
                    isSuccessful: true,
                }
            }
        }

        case actions.LOGIN_CANDIDATE_FAILED:
            return {
                ...state,
                loading: false,
                token: null,
                expires: "",
                message: payload,
                isSuccessful: false,
            }

        case actions.LOG_OUT_CANDIDATE_USER: {
            sessionStorage.removeItem('emailToken');
            sessionStorage.removeItem('authStatus');
            sessionStorage.removeItem('candidateUserDetails');
            return {
                message: '',
                token: '',
            }
        }

        case actions.FETCH_ADMISSIONS_LIST_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false,
                submitSuccessful: false,
            };

        case actions.FETCH_ADMISSIONS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                admissionList: payload.data,
                filterProps: payload,
                submitSuccessful: false,
            };

        case actions.FETCH_ADMISSIONS_LIST_FAILED:
            return {
                ...state,
                loading: false,
                isSuccessful: false,
                message: payload
            };


        case actions.FETCH_SINGLE_ADMISSION_LOADING:
            return {
                ...state,
                loading: true,
            };
        case actions.FETCH_SINGLE_ADMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                singleAdmissionDetail: payload,
                isSuccessful: true,
            };
        case actions.FETCH_SINGLE_ADMISSION_FAILED:
            return {
                ...state,
                loading: false,
                selectedItem: null,
            };



        case actions.FETCH_ADMISSION_CLASSES_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false
            };

        case actions.FETCH_ADMISSION_CLASSES_SUCCESS:
            return {
                ...state,
                loading: false,
                admissionClasses: payload,
                isSuccessful: true,
            };

        case actions.FETCH_ADMISSION_CLASSES_FAILED:
            return {
                ...state,
                loading: false,
                isSuccessful: false,
                message: payload
            };

        case actions.CREATE_CANDIDATE_ADMISSION_LOADING:
            return {
                ...state,
                loading: true,
                isSuccessful: false,
                message: "",
                submitSuccessful: false,
            };
        case actions.CREATE_CANDIDATE_ADMISSION_SUCCESS:
            return {
                ...state,
                isSuccessful: true,
                loading: false,
                message: payload,
                submitSuccessful: true,
            };
        case actions.CREATE_CANDIDATE_ADMISSION_FAILED:
            return {
                ...state,
                isSuccessful: false,
                loading: false,
                message: payload,
                submitSuccessful: false,
            };

        case actions.CONFIRM_USER_EMAIL_LOADING:
            return {
                ...state,
                loading: true,
                isSuccessful: false,
                message: "",
            };
        case actions.CONFIRM_USER_EMAIL_SUCCESS:
            return {
                ...state,
                isSuccessful: true,
                loading: false,
                message: payload,
                submitSuccessful: true,
            };
        case actions.CONFIRM_USER_EMAIL_FAILED:
            return {
                ...state,
                isSuccessful: false,
                loading: false,
                message: payload,
            };

        case actions.DELETE_CANDIDATE_ADMISSION_LOADING:
            return {
                ...state,
                loading: true,
                isSuccessful: false,
            };
        case actions.DELETE_CANDIDATE_ADMISSION_SUCCESS:
            return {
                ...state,
                isSuccessful: true,
                loading: false,
                message: payload,
            };
        case actions.DELETE_CANDIDATE_ADMISSION_FAILED:
            return {
                ...state,
                isSuccessful: false,
                loading: false,
                message: payload,
            };

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
                selectedIds: filteredIds,
            }
        case actions.RETURN_ITEM_LIST:
            return {
                ...state,
                admissionList: payload,
            };

        case actions.DELETE_DIALOG_RESPPONSE:
            return {
                ...state,
                deleteDialogResponse: payload
            }

        case actions.CUSTOMISED_MODAL_RESPONSE:
            return {
                ...state,
                customisedModalValue: payload
            }

        case actions.RESPOND_DECISION_DIALOG:
            return {
                ...state,
                dialogResponse: payload
            }

        case actions.UPDATE_CANDIDATE_ADMISSION_LOADING:
            return {
                ...state,
                loading: true,
                isSuccessful: false,
                message: "",
                submitSuccessful: false,
            };
        case actions.UPDATE_CANDIDATE_ADMISSION_SUCCESS:
            return {
                ...state,
                isSuccessful: true,
                loading: false,
                message: payload,
                submitSuccessful: true,
            };
        case actions.UPDATE_CANDIDATE_ADMISSION_FAILED:
            return {
                ...state,
                isSuccessful: false,
                loading: false,
                message: payload,
                submitSuccessful: false,
            };

        default:
            return state
    }
}
export function filterSelectedIds(arr, value) {
    return arr.filter(function (ele) {
        return ele !== value;
    });
}

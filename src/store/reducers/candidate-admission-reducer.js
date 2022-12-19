import { actions } from '../action-types/candidate-admission-action-types';
import { _state } from '../states/candidate-admission-state';
import jwt from 'jwt-decode'

export const candidateAdmissionReducer = (state = _state, { type, payload }) => {
    switch (type) {
        case actions.LOGIN_CANDIDATE_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                token: '',
                refreshToken: '',
                isSuccessful: false,
            }

        case actions.LOGIN_CANDIDATE_SUCCESS: {
            if (payload?.result?.auth !== null) {
                localStorage.removeItem('emailToken');
                localStorage.removeItem('expires');
                localStorage.removeItem('candidateUserDetails');

                localStorage.setItem('emailToken', payload?.result?.auth?.token);
                localStorage.setItem('expires', payload?.result?.auth?.expires);
                localStorage.setItem('candidateUserDetails', JSON.stringify(payload?.result?.userDetails));
            } else if (payload?.result?.auth === null) {
                localStorage.removeItem('friendlyMessage');
                localStorage.removeItem('candidateUserDetails');
                localStorage.removeItem('authStatus');

                localStorage.setItem('authStatus', JSON.stringify(payload?.result?.auth));
                localStorage.setItem('friendlyMessage', payload?.message?.friendlyMessage);
                localStorage.setItem('candidateUserDetails', JSON.stringify(payload?.result.userDetails));
            }

            return {
                ...state,
                loading: false,
                token: payload?.result.auth.token,
                expires: payload?.result.auth.expires,
                message: '',
                isSuccessful: true,
            }
        }
        // case actions.LOGIN_CANDIDATE_SUCCESS: {
        //     localStorage.removeItem('emailToken');
        //     localStorage.removeItem('expires');
        //     // localStorage.removeItem('permissions');
        //     localStorage.removeItem('candidateUserDetails');
        //     // const decodedToken = jwt<any>(payload.auth.token);
        //     localStorage.setItem('emailToken', payload.auth?.token);
        //     localStorage.setItem('expires', payload.auth?.expires);
        //     // localStorage.setItem('permissions', decodedToken.permissions);
        //     localStorage.setItem('candidateUserDetails', JSON.stringify(payload.userDetails));

        //     return {
        //         ...state,
        //         loading: false,
        //         token: payload.auth.token,
        //         expires: payload.auth.expires,
        //         // refreshToken: payload.authResult.refreshToken,
        //         message: '',
        //         isSuccessful: true,
        //     }
        // }

        case actions.LOGIN_CANDIDATE_FAILED:
            return {
                ...state,
                loading: false,
                token: null,
                expires: "",
                // refreshToken: null,
                message: payload,
                isSuccessful: false,
            }

        case actions.LOG_OUT_CANDIDATE_USER: {
            localStorage.removeItem('emailToken');
            // localStorage.removeItem('permissions');
            localStorage.removeItem('candidateUserDetails');
            return {
                message: '',
                token: '',
                // refreshToken: '',
            }
        }

        case actions.FETCH_ADMISSIONS_LIST_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false
            };

        case actions.FETCH_ADMISSIONS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                admissionList: payload.data,
                filterProps: payload,
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

        default:
            return state
    }
}
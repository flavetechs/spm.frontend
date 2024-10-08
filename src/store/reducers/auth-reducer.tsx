import { actions } from "../action-types/auth-action-types"
import { _state } from "../states/auth-state"
import jwt from 'jwt-decode'

export const authReducer = (state = _state, { type, payload }: any) => {
    switch (type) {
        case actions.LOGIN_USER_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                token: '',
                refreshToken: '',
                isSuccessful: false,
                loginSuccessful:false,
            }

        case actions.LOGIN_USER_SUCCESS: {
            localStorage.removeItem('token');
            localStorage.removeItem('permissions');
            localStorage.removeItem('userDetail');
            const decodedToken = jwt<any>(payload.authResult.token);
            localStorage.setItem('token', payload.authResult.token);
            localStorage.setItem('permissions', decodedToken.permissions);
            localStorage.setItem('parentId', decodedToken.parentId);
            localStorage.setItem('userDetail', JSON.stringify(payload.userDetail));



            return {
                ...state,
                loading: false,
                token: payload.authResult.token,
                refreshToken: payload.authResult.refreshToken,
                message: '',
                isSuccessful: true,
                loginSuccessful:true,
            }
        }

        case actions.LOGIN_USER_FAILED:
            return {
                ...state,
                loading: false,
                token: null,
                refreshToken: null,
                message: payload,
                isSuccessful: false,
                loginSuccessful:false,
            }

        case actions.LOG_OUT_USER: {
            localStorage.removeItem('token');
            localStorage.removeItem('permissions');
            localStorage.removeItem('userDetail');
            localStorage.removeItem('schoolLogo');
             localStorage.removeItem('schoolAbrev');
            return {
                message: '',
                token: '',
                refreshToken: '',
                loggedOut:true,
            }
        }

        case actions.GENERATE_PASSWORD_RESET_LINK_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false,
            }
        case actions.GENERATE_PASSWORD_RESET_LINK_SUCCESS:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: true,
            }
        case actions.GENERATE_PASSWORD_RESET_LINK_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
            }
        case actions.RESET_PASSWORD_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false,
            }
        case actions.RESET_PASSWORD_SUCCESS:
            localStorage.removeItem('token');
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                loading: false,
                token: payload.token,
                refreshToken: payload.refreshToken,
                message: 'Password change successful',
                isSuccessful: true,
            }
        case actions.RESET_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
            }

        case actions.CBT_LOGIN_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                cbtToken: '',
                cbtRefreshToken: '',
                isSuccessful: false,
            }

        case actions.CBT_LOGIN_SUCCESS: {
            return {
                ...state,
                loading: false,
                cbtToken: payload.authResult.token,
                clientUrl: payload.clientUrl,
                message: '',
                isSuccessful: true,
            }
        }

        case actions.CBT_LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                cbtToken: null,
                cbtRefreshToken: null,
                message: payload,
                isSuccessful: false,
            }


        case actions.FORGOT_PASSWORD_LOADING:
            return {
                ...state,
                loading: true,
                message: '',
                isSuccessful: false,
                changedForgotPasswordSuccessful: false,
            }
        case actions.FORGOT_PASSWORD_SUCCESS:
            sessionStorage.setItem("forgotPasswordMessage", payload)
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: true,
                changedForgotPasswordSuccessful: false,
            }
        case actions.FORGOT_PASSWORD_FAILED:
            return {
                ...state,
                loading: false,
                message: payload,
                isSuccessful: false,
                changedForgotPasswordSuccessful: false,
            }

          
            case actions.CHANGE_PASSWORD_LOADING:
                return {
                    ...state,
                    loading: true,
                    message: '',
                    isSuccessful: false,
                    
                }
            case actions.CHANGE_PASSWORD_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    isSuccessful: true,
                }
            case actions.CHANGE_PASSWORD_FAILED:
                return {
                    ...state,
                    loading: false,
                    message: payload,
                    isSuccessful: false,
                }

            case actions.RESET_FORGOT_PASSWORD_LOADING:
                return {
                    ...state,
                    loading: true,
                    message: '',
                    isSuccessful: false,
                    changedForgotPasswordSuccessful: false,
                    
                }
            case actions.RESET_FORGOT_PASSWORD_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    //message: payload,
                    isSuccessful: true,
                    changedForgotPasswordSuccessful: true,
                }
            case actions.RESET_FORGOT_PASSWORD_FAILED:
                return {
                    ...state,
                    loading: false,
                    message: payload,
                    isSuccessful: false,
                    changedForgotPasswordSuccessful: false,
                }

        default:
            return state
    }
}
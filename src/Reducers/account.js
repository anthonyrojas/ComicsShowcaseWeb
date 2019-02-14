import {
    LOGIN_ATTEMPT,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_ATTEMPT,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    EMAIL_CHANGED,
    USER_FIRST_NAME_CHANGED,
    USER_LAST_NAME_CHANGED,
    USER_PICTURE_CHANGED,
    PASSWORD_CHANGED,
    USERNAME_CHANGED,
    BIRTH_DATE_CHANGED,
    LOGIN_BUTTON_TOGGLE,
    REGISTER_BUTTON_TOGGLE,
    USER_PICTURE_CHANGED_FAILURE,
    USER_PICTURE_CHANGED_SUCCESS,
    USER_PICTURE_UPLOAD_ATTEMPT,
    CANCEL_UPLOAD_PROFILE
} from '../Actions/types';
import Cookies from 'universal-cookie';
import {
    EMPTY_STR,
    DEFAULT_NUM
} from '../constants';
const initialState = {
    email: EMPTY_STR,
    lastName: EMPTY_STR,
    firstName: EMPTY_STR,
    username: EMPTY_STR,
    password: EMPTY_STR,
    profile: EMPTY_STR,
    birthDate: DEFAULT_NUM,
    registerButtonVisible: false,
    registering: false,
    loggingIn: false,
    loginButtonVisible: false,
    statusMessage: EMPTY_STR,
    uploadingProfile: false,
    errors:{
        username: EMPTY_STR,
        email: EMPTY_STR,
        password: EMPTY_STR,
        firstName: EMPTY_STR,
        lastName: EMPTY_STR,
        profile: EMPTY_STR,
        birthMonth: EMPTY_STR,
    }
}

export default (state = initialState, action)=>{
    switch(action.type){
        case EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload
            }
        case USERNAME_CHANGED: 
            return{
                ...state,
                username: action.payload
            }
        case USER_FIRST_NAME_CHANGED:
            return{
                ...state,
                firstName: action.payload
            }
        case USER_LAST_NAME_CHANGED:
            return{
                ...state,
                lastName: action.payload
            }
        case USER_PICTURE_CHANGED:
            return{
                ...state,
                profile: action.payload
            }
        case USER_PICTURE_UPLOAD_ATTEMPT: 
            return{
                ...state,
                uploadingProfile: true,
                errors:{
                    profile: EMPTY_STR
                }
            }
        case USER_PICTURE_CHANGED_FAILURE:
            return{
                ...state,
                uploadingProfile: false,
                errors: {
                    profile: action.payload.profile
                }
            }
        case USER_PICTURE_CHANGED_SUCCESS: 
            return{
                ...state,
                uploadingProfile: false,
                profile: action.payload,
                errors: {
                    profile: EMPTY_STR
                }
            }
        case CANCEL_UPLOAD_PROFILE:
            return{
                ...state,
                profile: action.payload
            }
        case BIRTH_DATE_CHANGED: 
            return{
                ...state,
                birthDate: action.payload
            }
        case PASSWORD_CHANGED:
            return{
                ...state,
                password: action.payload
            }
        case REGISTER_BUTTON_TOGGLE:
            return{
                ...state,
                registerButtonVisible: action.payload
            }
        case LOGIN_BUTTON_TOGGLE:
            return{
                ...state,
                loginButtonVisible: action.payload
            }
        case LOGIN_ATTEMPT:
            return{
                ...state,
                loggingIn: action.payload
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                loggingIn: false,
                statusMessage: action.payload,
                username: EMPTY_STR,
                password: EMPTY_STR
            }
        case LOGIN_FAILURE:
            return{
                ...state,
                loggingIn: false,
                statusMessage: action.payload
            }
        case REGISTER_ATTEMPT:
            return{
                ...state,
                registering: action.payload.registering,
                statusMessage: action.payload.statusMessage
            }
        case REGISTER_FAILURE:
            return{
                ...state,
                registering: false,
                statusMessage: action.payload.statusMessage,
                errors:{
                    firstName: action.payload.errors.firstName,
                    lastName: action.payload.errors.lastName,
                    password: action.payload.errors.password,
                    email: action.payload.errors.email,
                    username: action.payload.errors.username,
                    profile: action.payload.errors.profile,
                    birthMonth: action.payload.errors.birthMonth,
                    birthDate: action.payload.errors.birthDate,
                    birthYear: action.payload.errors.birthYear
                }
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                registering: false,
                statusMessage: action.payload.statusMessage
            }
        default: return state;
    }
}
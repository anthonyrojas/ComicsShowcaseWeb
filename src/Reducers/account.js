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
    CANCEL_UPLOAD_PROFILE,
    RESET_USER_STATUS_MESSAGE
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
    authenticated: localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null && localStorage.getItem('token') !== EMPTY_STR ? true : false,
    errors:{
        username: EMPTY_STR,
        email: EMPTY_STR,
        password: EMPTY_STR,
        firstName: EMPTY_STR,
        lastName: EMPTY_STR,
        profile: EMPTY_STR,
        birthDate: EMPTY_STR,
    }
}

export default (state = initialState, action)=>{
    switch(action.type){
        case EMAIL_CHANGED:
            return{
                ...state,
                email: action.payload,
                errors: {
                    ...state.errors,
                    email: EMPTY_STR
                }
            }
        case USERNAME_CHANGED: 
            return{
                ...state,
                username: action.payload,
                errors: {
                    ...state.errors,
                    username: EMPTY_STR
                }
            }
        case USER_FIRST_NAME_CHANGED:
            return{
                ...state,
                firstName: action.payload,
                errors:{
                    ...state.errors,
                    firstName: EMPTY_STR
                }
            }
        case USER_LAST_NAME_CHANGED:
            return{
                ...state,
                lastName: action.payload,
                errors: {
                    ...state.errors,
                    lastName: EMPTY_STR
                }
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
                    ...state.errors,
                    profile: EMPTY_STR
                }
            }
        case USER_PICTURE_CHANGED_FAILURE:
            return{
                ...state,
                uploadingProfile: false,
                errors: {
                    ...state.errors,
                    profile: action.payload.profile
                }
            }
        case USER_PICTURE_CHANGED_SUCCESS: 
            return{
                ...state,
                uploadingProfile: false,
                profile: action.payload,
                errors: {
                    ...state.errors,
                    profile: EMPTY_STR
                }
            }
        case CANCEL_UPLOAD_PROFILE:
            return{
                ...state,
                profile: action.payload,
                errors: {
                    ...state.errors,
                    profile: EMPTY_STR
                }
            }
        case BIRTH_DATE_CHANGED: 
            return{
                ...state,
                birthDate: action.payload,
                errors: {
                    ...state.errors,
                    birthDate: EMPTY_STR
                }
            }
        case PASSWORD_CHANGED:
            return{
                ...state,
                password: action.payload,
                errors: {
                    ...state.errors,
                    password: EMPTY_STR
                }
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
                password: EMPTY_STR,
                errors: {
                    username: EMPTY_STR,
                    password: EMPTY_STR
                },
                authenticated: true
            }
        case LOGIN_FAILURE:
            return{
                ...state,
                loggingIn: false,
                statusMessage: action.payload.statusMessage,
                errors:{
                    username: action.payload.errors.username,
                    password: action.payload.errors.password
                }
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
                    birthDate: action.payload.errors.birthDate
                }
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                registering: false,
                statusMessage: action.payload.statusMessage + '. Please log in.',
                email: EMPTY_STR,
                lastName: EMPTY_STR,
                firstName: EMPTY_STR,
                username: EMPTY_STR,
                password: EMPTY_STR,
                profile: EMPTY_STR,
                birthDate: DEFAULT_NUM,
                errors: {
                    firstName: EMPTY_STR,
                    lastName: EMPTY_STR,
                    password: EMPTY_STR,
                    email: EMPTY_STR,
                    username: EMPTY_STR,
                    profile: EMPTY_STR,
                    birthDate: EMPTY_STR
                }
            }
        case RESET_USER_STATUS_MESSAGE:
            return{
                ...state,
                statusMessage: action.payload
            }
        default: return state;
    }
}
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
    BIRTH_MONTH_CHANGED,
    BIRTH_YEAR_CHANGED,
    LOGIN_BUTTON_TOGGLE,
    REGISTER_BUTTON_TOGGLE
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
    password: EMPTY_STR,
    profile: EMPTY_STR,
    birthDate: DEFAULT_NUM,
    birthMonth: DEFAULT_NUM,
    birthYear: DEFAULT_NUM,
    registerButtonVisible: false,
    registering: false,
    loggingIn: false,
    loginButtonVisible: false,
    statusMessage: EMPTY_STR,
    errors:{
        username: EMPTY_STR,
        email: EMPTY_STR,
        password: EMPTY_STR,
        firstName: EMPTY_STR,
        lastName: EMPTY_STR,
        profile: EMPTY_STR,
        birthMonth: DEFAULT_NUM,
        birthDate: DEFAULT_NUM,
        birthYear: DEFAULT_NUM
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
        case BIRTH_DATE_CHANGED: 
            return{
                ...state,
                birthDate: action.payload
            }
        case BIRTH_MONTH_CHANGED:
            return{
                ...state,
                birthMonth: action.payload
            }
        case BIRTH_YEAR_CHANGED:
            return{
                ...state,
                birthYear: action.payload
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
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    password: action.payload.password,
                    email: action.payload.email,
                    username: action.payload.username,
                    profile: action.payload.profile,
                    birthMonth: action.payload.birthMonth,
                    birthDate: action.payload.birthDate,
                    birthYear: action.payload.birthYear
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
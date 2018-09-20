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
    picture: EMPTY_STR,
    birthDate: DEFAULT_NUM,
    birthMonth: DEFAULT_NUM,
    birthYear: DEFAULT_NUM,
    registerButtonVisible: false
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
                picture: action.payload
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
        default: return state;
    }
}
import {
    LOGIN_ATTEMPT,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_ATTEMPT,
    REGISTER_FAILURE,
    REGISTER_SUCCESS
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
    birthYear: DEFAULT_NUM
}

export default (state = initialState, action)=>{
    switch(action.type){
        case LOGIN_ATTEMPT:
            return{
                ...state,
            }
    }
}
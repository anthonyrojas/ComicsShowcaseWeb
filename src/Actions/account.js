import axios from 'axios';
import {
    LOGIN_ATTEMPT,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_ATTEMPT,
    REGISTER_FAILURE,
    LOGIN_BUTTON_TOGGLE,
    USER_FIRST_NAME_CHANGED,
    USER_LAST_NAME_CHANGED,
    USER_PICTURE_CHANGED,
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    EMAIL_CHANGED,
    REGISTER_BUTTON_TOGGLE
} from './types';

export const firstNameChanged = (data)=>{
    return{
        type: USER_FIRST_NAME_CHANGED,
        payload: data
    }
}
export const lastNameChanged = (data)=>{
    return{
        type: USER_LAST_NAME_CHANGED,
        payload: data
    }
}
export const usernameChanged = (data)=>{
    return{
        type: USERNAME_CHANGED,
        payload: data
    }
}
export const emailChanged = (data)=>{
    return{
        type: EMAIL_CHANGED,
        payload: data
    }
}
export const passwordChanged = (data)=>{
    return{
        type: PASSWORD_CHANGED,
        payload: data
    }
}
export const userPictureChanged = (data)=>{
    return{
        type: USER_PICTURE_CHANGED,
        payload: data
    }
}
export const loginButtonToggle = (data)=>{
    return{
        type: LOGIN_BUTTON_TOGGLE,
        payload: data
    }
}
export const registerButtonToggle = (data)=>{
    return{
        type: REGISTER_BUTTON_TOGGLE,
        payload: data
    }
}
export const login = (data)=>{
    //validate data to make sure user has entred all the fields
    return(dispatch)=>{
        dispatch({
            type: LOGIN_ATTEMPT,
            payload: true
        });
        let {username, password, email, picture, lastName, firstName} = data;
    }
}
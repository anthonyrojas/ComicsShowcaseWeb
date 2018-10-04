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
import { HOST, EMPTY_STR, DEFAULT_NUM } from '../constants';

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
        let inputErrs = {
            username: EMPTY_STR,
            password: EMPTY_STR
        }
        let username = data.username;
        let password = data.password;
        if(username === undefined || username === null || username.trim()===''){
            inputErrs.username = 'You must enter your correct, valid username.'
        }
        if(password === undefined || password === null || password === ''){
            inputErrs.password = 'You must enter your password.'
        }
        axios.post(`${HOST}/api/users/login`, {username,password})
        .then(res=>{
            if(res.data.token != null){
                localStorage.setItem('token', `Bearer ${res.data.token}`);
                loginSuccess(dispatch, res.data.statusMessage);
            }else{
                loginFailure(dispatch, 'Something went wrong. Please try logging in again.');
            }
        })
        .catch(err => {
            loginFailure(dispatch, err.response.data.statusMessage);
        });
    }
}
export const loginSuccess = (dispatch, data)=>{
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data
    });
}
export const loginFailure = (dispatch, data)=>{
    dispatch({
        type: LOGIN_FAILURE,
        payload: data
    });
}
export const registerSuccess = (dispatch, data)=>{
    dispatch({
        type: REGISTER_SUCCESS,
        payload: data
    });
}
export const registerFailure = (dispatch, data)=>{
    dispatch({
        type: REGISTER_FAILURE,
        payload: data
    });
}
export const register = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: REGISTER_ATTEMPT,
            payload: {
                registering: true,
                statusMessage: 'Attempting to register. Please wait...'
            }
        });
        let inputErrs = {
            username: EMPTY_STR,
            password: EMPTY_STR,
            profile: EMPTY_STR,
            firstName: EMPTY_STR,
            lastName: EMPTY_STR,
            email: EMPTY_STR,
            birthMonth: DEFAULT_NUM,
            birthDate: DEFAULT_NUM,
            birthYear: DEFAULT_NUM   
        }
        if(data.username === undefined || data.username === null || data.username.trim() === ''){
            inputErrs.username = 'You must enter a valid username. Your username cannot contain whitespace.';
        }
        else if(data.username.trim().length > 5 && /\s/.test(data.username)){
            inputErrs.username = 'Your username must be more than 5 characters long and cannot contain whitespace.';
        }
        if(data.email === undefined || data.email === null || data.email.trim() === ''){
            inputErrs.email = 'Your must enter your email address.'
        }
        else if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email) === false){
            inputErrs.email = 'You must enter a valid email address.';
        }
        if(data.firstName === undefined || data.firstName === null || data.firstName.trim() === ''){
            inputErrs.firstName = 'You must enter your first name.';
        }
        if(data.lastName === undefined || data.firstName === null || data.firstName.trim() === ''){
            inputErrs.lastName = 'You must enter your last name.';
        }
        if(data.password === undefined || data.password === null || data.password === ''){
            inputErrs.password = 'You must enter a valid password';
        }
        else if(data.password.length < 6){
            inputErrs.password = 'Your password must be at least 6 characters.';
        }
        if(data.birthMonth === undefined || data.birthMonth === null || isNaN(data.birthMonth)){
            inputErrs.birthMonth = 'You must enter a valid birth month.';
        }
        else if(data.birthMonth < 1 || data.birthMonth > 12){
            inputErrs.birthMonth = 'Invalid birth month.';
        }
        if(data.birthDate === undefined || data.birthDate === null || isNaN(data.birthDate)){
            inputErrs.birthDate = 'You must enter a valid birth date.';
        }
        else if(data.birthDate < 1 || data.birthDate > 31){
            inputErrs.birthDate = 'Invalid birth date.';
        }
        if(data.birthYear === undefined || data.birthYear === null || isNaN(data.birthYear)){
            inputErrs.birthYear = 'You must enter a valid birth year.';
        }
        else if(data.birthYear < (new Date()).getFullYear() - 100 || data.birthYear > (new Date()).getFullYear()){
            inputErrs.birthYear = 'Invalid borth year.';
        }
        let formData = {
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            birthMonth: data.birthMonth,
            birthDate: data.birthDate,
            birthYear: data.birthYear,
            profileStr: null
        }
        let errorExists = false;
        Object.keys(inputErrs).every((k)=>{
            if(inputErrs[k] !== null){
                let failData = {
                    statusMessage: 'Please fill out all required fields with valid entries.',
                    errors: inputErrs
                }
                registerFailure(dispatch, failData);
            }
        });
        if(inputErrs.username != null || inputErrs)
        axios.post(`${HOST}/api/users/register`, formData)
        .then(res =>{
            registerSuccess(dispatch, res.data);
        })
        .catch(err => {
            let failData = {
                statusMessage: err.response.data.statusMessage,
                errors: inputErrs
            };
            registerFailure(dispatch, failData);
        });
    }
}
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
    BIRTH_DATE_CHANGED,
    USERNAME_CHANGED,
    PASSWORD_CHANGED,
    EMAIL_CHANGED,
    REGISTER_BUTTON_TOGGLE,
    USER_PICTURE_CHANGED_FAILURE,
    USER_PICTURE_CHANGED_SUCCESS,
    USER_PICTURE_UPLOAD_ATTEMPT,
    CANCEL_UPLOAD_PROFILE,
    RESET_USER_STATUS_MESSAGE,
    GET_ACCOUNT_ATTEMPT,
    GET_ACCOUNT_FAILED,
    AUTH_FAILED,
    GET_ACCOUNT_SUCCESS,
    EDIT_ACCOUNT,
    UPDATE_ACCOUNT_ATTEMPT,
    UPDATE_ACCOUNT_FAILURE,
    UPDATE_ACCOUNT_SUCCESS,
    CLOSE_EDIT_ACCOUNT,
    LOGOUT_ACCOUNT
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
export const birthDateChanged = (data)=>{
    return{
        type: BIRTH_DATE_CHANGED,
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
export const attemptUploadUserProfile = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: USER_PICTURE_UPLOAD_ATTEMPT,
            payload: true
        });
        let inputErr = {profile: EMPTY_STR};
        if(!data.type.includes('image')){
            inputErr.profile = 'Wrong file format uploaded. Must be an image.';
            failedUploadUserProfile(dispatch, inputErr);
        }else{
            let reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = () => {
                let successData = {
                    file: data,
                    fileData: reader.result
                }
                successUploadUserProfile(dispatch, successData);
            }
            reader.onerror = () =>{
                let failData = {
                    profile: 'Error uploading file.'
                }
                failedUploadUserProfile(dispatch, failData);
            }
        }
    }
}
export const failedUploadUserProfile = (dispatch, data)=>{
    dispatch({
        type: USER_PICTURE_CHANGED_FAILURE,
        payload: data
    });
};
export const successUploadUserProfile = (dispatch, data)=>{
    dispatch({
        type: USER_PICTURE_CHANGED_SUCCESS,
        payload: data
    });
}
export const cancelUploadProfile = (data)=>{
    return{
        type: CANCEL_UPLOAD_PROFILE,
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
                let successData = {
                    statusMessage: res.data.statusMessage,
                    history: data.history
                }
                loginSuccess(dispatch, successData);
            }else{
                let failData = {
                    statusMessage: 'Something went wrong. Please try logging in again.',
                    errors: inputErrs
                };
                loginFailure(dispatch, failData);
            }
        })
        .catch(err => {
            console.log(err);
            let failData = {
                statusMessage: (err.response !== undefined ? err.response.data.statusMessage : 'Unable to connect to server.'),
                errors: inputErrs
            };
            loginFailure(dispatch, failData);
        });
    }
}
export const loginSuccess = (dispatch, data)=>{
    dispatch({
        type: LOGIN_SUCCESS,
        payload: data.statusMessage
    });
    data.history.push('/account');
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
        payload: data.resData
    });
    data.history.push('/login');
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
            birthDate: EMPTY_STR
        }
        let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
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
        if(data.lastName === undefined || data.lastName === null || data.lastName.trim() === ''){
            inputErrs.lastName = 'You must enter your last name.';
        }
        if(data.password === undefined || data.password === null || data.password === ''){
            inputErrs.password = 'You must enter a valid password';
        }
        else if(data.password.length < 6){
            inputErrs.password = 'Your password must be at least 6 characters.';
        }
        if(data.birthDate === undefined || data.birthDate === null || data.birthDate === DEFAULT_NUM || !dateRegex.test(data.birthDate)){
            inputErrs.birthDate = 'You must enter a valid birth date.';
        }
        let formData = {
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            birthDate: data.birthDate,
            profileStr: (data.profile !== EMPTY_STR ? data.profile : null)
        }
        let errorExists = false;
        Object.keys(inputErrs).every((k)=>{
            if(inputErrs[k] !== EMPTY_STR){
                errorExists = true;
                let failData = {
                    statusMessage: 'Please fill out all required fields with valid entries.',
                    errors: inputErrs
                }
                registerFailure(dispatch, failData);
            }
        });
        if(!errorExists){
            axios.post(`${HOST}/api/users/register`, formData)
            .then(res =>{
                let successData = {
                    resData: res.data,
                    history: data.history
                }
                registerSuccess(dispatch, successData);
            })
            .catch(err => {
                let failData = {
                    statusMessage: (err.response !== undefined ? err.response.data.statusMessage : 'No internet connection'),
                    errors: inputErrs
                };
                registerFailure(dispatch, failData);
            });
        }
    }
}
export const resetUserStatusMessage = (data) =>{
    return{
        type: RESET_USER_STATUS_MESSAGE,
        payload: data
    }
}
export const redirectToLogin = (dispatch, data)=>{
    dispatch({
        type: AUTH_FAILED,
        payload: {
            statusMessage: 'Please login.'
        }
    });
    data.history.push('/login');
}
export const updateAccount = (data) =>{
    return(dispatch)=>{
        dispatch({
            type: UPDATE_ACCOUNT_ATTEMPT,
            payload: {
                updatingAccount: true
            }
        });
        let inputErrs = {
            username: EMPTY_STR,
            password: EMPTY_STR,
            profile: EMPTY_STR,
            firstName: EMPTY_STR,
            lastName: EMPTY_STR,
            email: EMPTY_STR,
            birthDate: EMPTY_STR
        }
        let dateRegex = /^\d{4}-\d{2}-\d{2}$/;
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
        if(data.lastName === undefined || data.lastName === null || data.lastName.trim() === ''){
            inputErrs.lastName = 'You must enter your last name.';
        }
        //password is not required, this can be null or empty and will be populated by the server
        // if(data.password === undefined || data.password === null || data.password === ''){
        //     inputErrs.password = 'You must enter a valid password';
        // }
        // else if(data.password.length < 6){
        //     inputErrs.password = 'Your password must be at least 6 characters.';
        // }
        if(data.birthDate === undefined || data.birthDate === null || data.birthDate === DEFAULT_NUM || !dateRegex.test(data.birthDate)){
            inputErrs.birthDate = 'You must enter a valid birth date.';
        }
        let formData = {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            birthDate: data.birthDate,
            profileStr: (data.profile !== EMPTY_STR ? data.profile : null)
        }
        let errorExists = false;
        Object.keys(inputErrs).every((k)=>{
            if(inputErrs[k] !== EMPTY_STR){
                errorExists = true;
                let failData = {
                    statusMessage: 'Please fill out all required fields with valid entries.',
                    errors: inputErrs
                }
                updateAccountFailure(dispatch, failData);
            }
        });
        if(!errorExists){
            if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === null){
                let authFailData = {
                    history: data.history
                }
                redirectToLogin(dispatch, authFailData);
            }
            let config = {
                headers: {
                    Authorization : `${localStorage.getItem('token')}`
                }
            };
            axios.put(`${HOST}/api/users/account`, formData, config)
            .then(res =>{
                let successData = {
                    resData: res.data,
                    history: data.history
                }
                updateAccountSuccess(dispatch, successData);
            })
            .catch(err => {
                let failData = {
                    statusMessage: (err.response !== undefined ? err.response.data.statusMessage : 'No internet connection'),
                    errors: inputErrs
                };
                updateAccountFailure(dispatch, failData);
            });
        }
    }
}
export const updateAccountSuccess = (dispatch, data) => {
    dispatch({
        type: UPDATE_ACCOUNT_SUCCESS,
        payload: data.resData
    })
}
export const updateAccountFailure = (dispatch, data) => {
    dispatch({
        type: UPDATE_ACCOUNT_FAILURE,
        payload: data
    })
}
export const getAccountAttempt = (data) =>{
    return(dispatch)=>{
        if(localStorage.getItem('token') === undefined || localStorage.getItem('token') === EMPTY_STR){
            let authFailData = {
                history: data.history,
            };
            redirectToLogin(dispatch, authFailData);
        }
        dispatch({
            type: GET_ACCOUNT_ATTEMPT,
            payload: data
        });
        let auth = {
            headers: {
                Authorization : `${localStorage.getItem('token')}`
            }
        };
        axios.get(`${HOST}/api/users/account`, auth)
        .then(res=>{
            getAccountSuccess(dispatch, res.data);
        })
        .catch(err=>{
            let failData = (err.response !== undefined ? err.response.data.statusMessage : 'No internet connection');
            getAccountFailed(dispatch, failData);
        });
    }
}
export const getAccountFailed = (dispatch, data)=>{
    dispatch({
        type: GET_ACCOUNT_FAILED,
        payload: data
    });
}
export const getAccountSuccess=(dispatch, data)=>{
    dispatch({
        type: GET_ACCOUNT_SUCCESS,
        payload: data
    });
}
export const openEditAccount=(data)=>{
    let profileData = EMPTY_STR;
    if(data.profileStr !== undefined && data.profileStr !== null && data.profileStr !== EMPTY_STR){
        profileData = {
            fileData: data.profileStr
        }
    }
    data.profile = profileData;
    return{
        type: EDIT_ACCOUNT,
        payload: data
    };
}
export const closeEditAccount = (data) => {
    return{
        type: CLOSE_EDIT_ACCOUNT,
        payload: data
    }
}
export const logout = (data) => {
    localStorage.removeItem('token');
    return{
        type: LOGOUT_ACCOUNT,
        payload: data
    }
}
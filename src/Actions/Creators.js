import {
    GET_CREATORS_ATTEMPT,
    GET_CREATORS_FAILURE,
    GET_CREATORS_SUCCESS,
    ADD_CREATOR_ATTEMPT,
    ADD_CREATOR_FAILURE,
    ADD_CREATOR_SUCCESS,
    DELETE_CREATOR_ATTEMPT,
    DELETE_CREATOR_FAILURE,
    DELETE_CREATOR_SUCCESS,
    UPDATE_CREATOR_ATTEMPT,
    UPDATE_CREATOR_FAILURE,
    UPDATE_CREATOR_SUCCESS,
    CREATOR_FIRST_NAME_CHANGED,
    CREATOR_LAST_NAME_CHANGED
} from './types';
import axiosClient from '../axiosClient';

export const creatorLastNameChanged = (data) => {
    return({
        type: CREATOR_LAST_NAME_CHANGED,
        payload: data
    });
}
export const creatorFirstNameChanged = (data) => {
    return({
        type: CREATOR_FIRST_NAME_CHANGED,
        pyaload: data
    });
}
export const getCreators = (data) => {
    return async(dispatch)=>{
        dispatch({
            type: GET_CREATORS_ATTEMPT,
            payload: true
        });
        try{
            let res = await axiosClient.get('/api/creators');
            dispatch({
                type: GET_CREATORS_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: GET_CREATORS_FAILURE,
                payload: e.response
            });
        }
    }
}
export const addCreator = (data) => {
    return async (dispatch)=>{
        dispatch({
            type: ADD_CREATOR_ATTEMPT,
            payload: true
        });
        try{
            let reqData = {
                firstName: data.firstName,
                lastName: data.lastName
            };
            let res = await axiosClient.post('/api/creators', reqData);
            dispatch({
                type: ADD_CREATOR_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: ADD_CREATOR_FAILURE,
                payload: e.response
            });
        }
    }
}
export const deleteCreator = (data) => {
    return async (dispatch)=>{
        dispatch({
            type: DELETE_CREATOR_ATTEMPT,
            payload: true
        });
        try{
            let res = await axiosClient.delete(`/api/creators/${data}`);
            dispatch({
                type: DELETE_CREATOR_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: DELETE_CREATOR_FAILURE,
                payload: e.response
            });
        }
    }
}
export const updateCreator = (data) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_CREATOR_ATTEMPT,
            payload: true
        });
        try{
            let res = await axiosClient(`/api/creators`, data);
            dispatch({
                type: UPDATE_CREATOR_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: UPDATE_CREATOR_FAILURE,
                payload: e.response
            });
        }
    }
}
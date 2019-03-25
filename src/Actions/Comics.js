import {HOST, EMPTY_STR, EMPTY_ARR} from '../constants';
import axios from 'axios';
import {
    GET_COMICS_ATTEMPT,
    GET_COMICS_FAILURE,
    GET_COMICS_SUCCESS,
    ADD_COMIC_ATTEMPT
} from './types';
import {HOST, EMPTY_ARR, EMPTY_STR} from '../constants';

export const getComicsAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: GET_COMICS_ATTEMPT,
            payload: data.statusMessage
        });
        let config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        axios.get(`${HOST}/api/comics/user/${data.userID}`, config)
        .then(res =>{
            dispatch({
                type: GET_COMICS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err=>{
            let failData = (err.response !== undefined ? err.response.data.statusMessage : 'No internet connection');
            dispatch({
                type: GET_COMICS_FAILURE,
                payload: failData
            })
        });
    }
}
export const addComicAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: ADD_COMIC_ATTEMPT,
            payload: data.statusMessage
        });
        let config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        axios.post(`${HOST}/api/comics`, data.comicData, config)
        .then(res=>{})
        .catch(err=>{});
    }
}
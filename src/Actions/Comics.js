import {HOST, EMPTY_STR, EMPTY_ARR} from '../constants';
import axios from 'axios';
import {
    GET_COMICS_ATTEMPT,
    GET_COMICS_FAILURE,
    GET_COMICS_SUCCESS,
    ADD_COMIC_ATTEMPT,
    ADD_COMIC_SUCCESS,
    ADD_COMIC_FAILURE,
    GET_COMIC_ATTEMPT,
    GET_COMIC_SUCCESS,
    GET_COMIC_FAILURE,
    COMIC_TITLE_CHANGED,
    COMIC_DESCRIPTION_CHANGED,
    COMIC_FIVE_DIGIT_ID_CHANGED,
    COMIC_UPC_CHANGED,
    COMIC_PUBLISHER_CHANGED,
    COMIC_CREATORS_CHANGED,
    COMIC_CONDITION_CHANGED
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
        .then(res=>{
            dispatch({
                type: ADD_COMIC_SUCCESS,
                payload: res.data
            });
        })
        .catch(err=>{
            let failData = (
                err.response !== undefined ? 
                err.reponse.data.statusMessage :
                'No internet connection.'
            )
            dispatch({
                type: ADD_COMIC_FAILURE,
                payload: failData
            });
        });
    }
}
export const getComicAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: GET_COMIC_ATTEMPT,
            payload: data.statusMessage
        });
        let config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
        axios.get(`${HOST}/api/comics/${data.comicId}`, config)
        .then(res => {
            dispatch({
                type: GET_COMIC_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            let failData = (
                err.response !== undefined ?
                err.response.data.statusMessage : 
                'No internet connection'
            );
            dispatch({
                type: GET_COMIC_FAILURE,
                payload: failData
            });
        });
    }
}
export const getComicConditions = (data)=>{}
export const comicTitleChanged = (data)=>{
    return({
        type: COMIC_TITLE_CHANGED,
        payload: data
    });
}
export const comicDescriptionChanged = (data)=>{
    return({
        type: COMIC_DESCRIPTION_CHANGED,
        payload: data
    });
}
export const comicFiveDigitIdChanged = (data)=>{
    return({
        type: COMIC_FIVE_DIGIT_ID_CHANGED,
        payload: data
    });
}
export const comicUPCChanged = (data)=>{
    return({
        type: COMIC_UPC_CHANGED,
        payload: data
    });
}
export const comicConditionChanged = (data)=>{
    return({
        type: COMIC_CONDITION_CHANGED,
        payload: data
    });
}
export const comicPublisherChanged = (data)=>{
    return({
        type: COMIC_PUBLISHER_CHANGED,
        payload: data
    });
}
export const comicCreatorsChanged = (data)=>{
    return({
        type: COMIC_CREATORS_CHANGED,
        payload: data
    });
}
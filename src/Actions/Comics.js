import {
    GET_COMICS_ATTEMPT,
    GET_COMICS_FAILURE,
    GET_COMICS_SUCCESS,
    ADD_COMIC_ATTEMPT,
    ADD_COMIC_SUCCESS,
    ADD_COMIC_FAILURE,
    UPDATE_COMIC_ATTEMPT,
    UPDATE_COMIC_FAILURE,
    UPDATE_COMIC_SUCCESS,
    DELETE_COMIC_ATTEMPT,
    DELETE_COMIC_FAILURE,
    DELETE_COMIC_SUCCESS,
    GET_COMIC_ATTEMPT,
    GET_COMIC_SUCCESS,
    GET_COMIC_FAILURE,
    COMIC_TITLE_CHANGED,
    COMIC_DESCRIPTION_CHANGED,
    COMIC_FIVE_DIGIT_ID_CHANGED,
    COMIC_UPC_CHANGED,
    COMIC_PUBLISHER_CHANGED,
    COMIC_CREATORS_CHANGED,
    COMIC_CONDITION_CHANGED,
    GET_COMIC_CONDITIONS_SUCCESS,
    GET_COMIC_CONDITIONS_FAILURE,
    CHANGE_COMICS_PAGINATION_LIMIT
} from './types';
import axiosClient from '../axiosClient';
import { ComicBook } from '../Models/ComicBook';

export const getComicsAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: GET_COMICS_ATTEMPT,
            payload: {
                statusMessage: data.statusMessage,
                page: data.page,
                limit: data.limit,
                skipComics: data.skipComics
            }
        });
        axiosClient.get(`/api/comics/user/${data.userID}?limit=${data.limit}&skip=${data.skipComics}`)
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
    return async (dispatch)=>{
        dispatch({
            type: ADD_COMIC_ATTEMPT,
            payload: true
        });
        let comic = new ComicBook(data);
        let comicErrors = comic.validate();
        if(comicErrors.errorExists){
            dispatch({
                type: ADD_COMIC_FAILURE,
                payload: {
                    errors: comicErrors.errors,
                    statusMessage: 'There are errors in your submission.'
                }
            });
        }else{
            try{
                let res = await axiosClient.post('/api/comics', comic.toJson());
                dispatch({
                    type: ADD_COMIC_SUCCESS,
                    payload: res.data
                })
            }catch(e){
                dispatch({
                    type: ADD_COMIC_FAILURE,
                    payload: e.response.data
                })
            }
        }
    }
}
export const updateComicAttempt = (data) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_COMIC_ATTEMPT,
            payload: true
        });
        let comic = new ComicBook(data);
        comic.id = data.id
        let comicErrors = comic.validate();
        if(comicErrors.errorExists){
            dispatch({
                type: UPDATE_COMIC_FAILURE,
                payload: {
                    statusMessage: 'There are errors in your submission.',
                    errors: comicErrors.errors
                }
            });
        }else{
            try{
                const res = await axiosClient(`/api/comics/${comic.id}`, comic.toJson());
                dispatch({
                    type: UPDATE_COMIC_SUCCESS,
                    payload: res.data
                });
            }catch(e){
                dispatch({
                    type: UPDATE_COMIC_FAILURE,
                    payload: e.response.data
                })
            }
        }
    }
}
export const getComicAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: GET_COMIC_ATTEMPT,
            payload: data.statusMessage
        });
        axiosClient.get(`/api/comics/${data.comicId}`)
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
export const deleteComicAttempt = (data) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_COMIC_ATTEMPT,
            payload: true
        });
        try{
            const res = await axiosClient.delete(`/api/comics/${data}`);
            dispatch({
                type: DELETE_COMIC_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: DELETE_COMIC_FAILURE,
                payload: e.response.data
            })
        }
    }
}
export const getComicConditions = (data)=>{
    axiosClient.get('/api/comics/comics-conditions')
    .then(res => {
        dispatch({
            type: GET_COMIC_CONDITIONS_SUCCESS,
            payload: res.data
        });
    })
    .catch(err => {
        let failData = (
            err.response !== undefined ?
            err.response.data.statusMessage :
            'Unable to retrieve comic conditions.'
        );
        dispatch({
            type: GET_COMIC_CONDITIONS_FAILURE,
            payload: failData
        });
    });
}
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
export const changeComicsPaginationLimit = (data)=>{
    return({
        type: CHANGE_COMICS_PAGINATION_LIMIT,
        payload: data
    });
}
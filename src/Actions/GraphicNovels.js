import {
    GRAPHIC_NOVEL_CONDITION_CHANGED,
    GRAPHIC_NOVEL_CREATORS_CHANGED,
    GRAPHIC_NOVEL_DESCRIPTION_CHANGED,
    GRAPHIC_NOVEL_IMAGE_CHANGED_ATTEMPT,
    GRAPHIC_NOVEL_IMAGE_CHANGED_FAILURE,
    GRAPHIC_NOVEL_IMAGE_CHANGED_SUCCESS,
    GRAPHIC_NOVEL_ISBN_CHANGED,
    GRAPHIC_NOVEL_PUBLISHER_CHANGED,
    GRAPHIC_NOVEL_TITLE_CHANGED,
    GRAPHIC_NOVEL_TYPE_CHANGED,
    GET_GRAPHIC_NOVELS_ATTEMPT,
    GET_GRAPHIC_NOVELS_FAILURE,
    GET_GRAPHIC_NOVELS_SUCCESS,
    GET_GRAPHIC_NOVEL_ATTEMPT,
    GET_GRAPHIC_NOVEL_FAILURE,
    GET_GRAPHIC_NOVEL_SUCCESS,
    ADD_GRAPHIC_NOVEL_ATTEMPT,
    ADD_GRAPHIC_NOVEL_FAILURE,
    ADD_GRAPHIC_NOVEL_SUCCESS,
    UPDATE_GRAPHIC_NOVEL_ATTEMPT,
    UPDATE_GRAPHIC_NOVEL_FAILURE,
    UPDATE_GRAPHIC_NOVEL_SUCCESS,
    DELETE_GRAPHIC_NOVEL_ATTEMPT,
    DELETE_GRAPHIC_NOVEL_FAILURE,
    DELETE_GRAPHIC_NOVEL_SUCCESS
} from './types';
import axiosClient from '../axiosClient';
import { EMPTY_STR } from '../constants';
import { GraphicNovel } from '../Models/GraphicNovel';

export const getGraphicNovels = (data) => {
    return async (dispatch) => {
        dispatch({
            type: GET_GRAPHIC_NOVELS_ATTEMPT,
            payload: true
        });
        try{
            let res = await axiosClient.get('/api/graphicNovels');
            dispatch({
                type: GET_GRAPHIC_NOVELS_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: GET_GRAPHIC_NOVELS_FAILURE,
                payload: e.reponse.message
            });
        }
    }
}
export const getGraphicNovel = (data) => {
    return async (dispatch) => {
        dispatch({
            type: GET_GRAPHIC_NOVEL_ATTEMPT,
            payload: true
        });
        try{
            let res = await axiosClient.get(`/api/graphic/${data}`);
            dispatch({
                type: GET_GRAPHIC_NOVEL_SUCCESS,
                payload: res.data
            });
        }catch(e){
            dispatch({
                type: GET_GRAPHIC_NOVEL_FAILURE,
                payload: e.response.message
            })
        }
    }
}
export const graphicNovelTitleChanged = (data) => {
    return{
        type: GRAPHIC_NOVEL_TITLE_CHANGED,
        payload: data
    }
}
export const graphicNovelIsbnChanged = (data) => {
    return{
        type: GRAPHIC_NOVEL_ISBN_CHANGED,
        payload: data
    }
}
export const graphicNovelPublisherChanged = (data) => {
    return{
        type: GRAPHIC_NOVEL_PUBLISHER_CHANGED,
        payload: data
    }
}
export const graphicNovelTypeChanged = (data) => {
    return{
        type: GRAPHIC_NOVEL_TYPE_CHANGED,
        payload: data
    }
}
export const graphicNovelConditionChanged = (data) => {
    return{
        type: GRAPHIC_NOVEL_CONDITION_CHANGED,
        payload: data
    }
}
export const graphicNovelCreatorsChanged = (data) =>{
    return{
        type: GRAPHIC_NOVEL_CREATORS_CHANGED,
        payload: data
    }
}
export const graphicNovelDescriptionChanged = (data) => {
    return{
        type: GRAPHIC_NOVEL_DESCRIPTION_CHANGED,
        payload: data
    }
}
export const graphicNovelImageChanged = (data) => {
    return(dispatch)=>{
        dispatch({
            type: GRAPHIC_NOVEL_IMAGE_CHANGED_ATTEMPT,
            payload: true
        });
        let inputErr = {image: EMPTY_STR};
        if(!data.types.include('image')){
            inputErr.image = 'Wrong file format uploaded. Must be an image.';
            dispatch({
                type: GRAPHIC_NOVEL_IMAGE_CHANGED_FAILURE,
                payload: inputErr
            })
        }else{
            let reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = () => {
                let successData = {
                    file: data,
                    fileData: reader.result
                };
                dispatch({
                    type: GRAPHIC_NOVEL_IMAGE_CHANGED_SUCCESS,
                    payload: successData
                });
            }
            reader.onerror = () => {
                inputErr.image = 'Error reading file.';
                dispatch({
                    type: GRAPHIC_NOVEL_IMAGE_CHANGED_FAILURE,
                    payload: inputErr
                });
            }
        }
    }
}
export const addGraphicNovel = (data) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_GRAPHIC_NOVEL_ATTEMPT,
            payload: true
        });
        let graphicNovel = new GraphicNovel(data);
        const errors = graphicNovel.validate();
        if(errors.errorExists){
            dispatch({
                type: ADD_GRAPHIC_NOVEL_FAILURE,
                payload: { errors: errors.errors, statusMessage: 'There are errors present in your submission.' }
            })
        }
        else{
            try{
                const res = await axiosClient.post('/api/graphicnovels', graphicNovel.toJson());
                dispatch({
                    type: ADD_GRAPHIC_NOVEL_SUCCESS,
                    payload: res.data
                })
            }catch(e){
                dispatch({
                    type: ADD_GRAPHIC_NOVEL_FAILURE,
                    payload: e.response.data.errors
                });
            }
        }
    }
}
export const updateGraphicNovel = (data) => {
    return async (dispatch) => {
        dispatch({
            type: UPDATE_GRAPHIC_NOVEL_ATTEMPT,
            payload: true
        });
        let graphicNovel = new GraphicNovel(data);
        graphicNovel.id = data.id;
        const errors = graphicNovel.validate();
        if(errors.errorExists){
            dispatch({
                type: UPDATE_GRAPHIC_NOVEL_FAILURE,
                payload: {
                    errors: errors.errors,
                    statusMessage: 'There are errors present in your submission'
                }
            });
        }else{
            try{
                const res = await axiosClient.put(`/api/graphicnovels/${graphicNovel.id}`, graphicNovel.toJson());
                dispatch({
                    type: UPDATE_GRAPHIC_NOVEL_SUCCESS,
                    payload: res.data
                })
            }catch(e){
                dispatch({
                    type: UPDATE_GRAPHIC_NOVEL_FAILURE,
                    payload: e.response.data
                })
            }
        }
    }
}
export const deleteGraphicNovel = (data) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_GRAPHIC_NOVEL_ATTEMPT,
            payload: true
        });
        try{
            const res = await axiosClient.delete(`/api/graphicnovels/${data}`);
            dispatch({
                type: DELETE_GRAPHIC_NOVEL_SUCCESS,
                payload: res.data
            })
        }catch(e){
            dispatch({
                type: DELETE_GRAPHIC_NOVEL_FAILURE,
                payload: e.response.data
            })
        }
    }
}
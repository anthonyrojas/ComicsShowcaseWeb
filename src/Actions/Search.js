import {
    SEARCH_ATTEMPT,
    SEARCH_CATEGORY_CHANGED,
    SEARCH_FAIL,
    SEARCH_FIELD_CHANGED,
    SEARCH_SUCCESS
} from './types';
import {HOST, EMPTY_STR} from '../constants';
import axios from 'axios';
export const searchFieldChanged = (data)=>{
    return{
        type: SEARCH_FIELD_CHANGED,
        payload: data
    }
}
export const searchCategoryChanged = (data)=>{
    return{
        type: SEARCH_CATEGORY_CHANGED,
        payload: data
    }
}
export const searchSuccess = (dispatch, data)=>{
    dispatch({
        type: SEARCH_SUCCESS,
        payload: data
    });
}
export const searchFailure = (dispatch, data)=>{
    dispatch({
        type: SEARCH_FAIL,
        payload: data
    });
}
export const searchAttempt = (data)=>{
    return(dispatch)=>{
        dispatch({
            type: SEARCH_ATTEMPT,
            payload: 'Searching...'
        });
        let searchErrs = {
            searchField: EMPTY_STR,
            searchCategory: EMPTY_STR
        };
        if(data.searchField === undefined || data.searchField === null || data.searchField.trim() === ''){
            searchErrs.searchField = 'You must enter something in the search bar.';
        }
        if(data.searchCategory === undefined || data.searchCategory === null || data.searchCategory.trim() === ''){
            searchErrs.searchCategory = 'You must specify your search criteria.';
        }
        if(searchErrs.searchField !== EMPTY_STR || searchErrs.searchField !== EMPTY_STR){
            let failData = {
                statusMessage: 'You must enter all required fields.',
                errors: searchErrs
            }
            searchFailure(dispatch, failData);
        }
        axios.post(`${HOST}/api/public/${data.searchCategory}`, {searchValue: data.searchField})
        .then(res =>{
            searchSuccess(dispatch, res.data);
        })
        .catch(err =>{
            let failData = {
                statusMessage: err.response.data.statusMessage,
                errors:{
                    searchField: EMPTY_STR,
                    searchCategory: EMPTY_STR
                }
            }
            searchFailure(dispatch, err.response.data.statusMessage);
        });
    }
}
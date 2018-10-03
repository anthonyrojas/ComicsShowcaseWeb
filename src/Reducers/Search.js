import {
    SEARCH_ATTEMPT,
    SEARCH_CATEGORY_CHANGED,
    SEARCH_FAIL,
    SEARCH_FIELD_CHANGED,
    SEARCH_SUCCESS
} from '../Actions/types';
import {EMPTY_STR, DEFAULT_NUM, EMPTY_ARR} from '../constants';
const initialState = {
    searchResults: EMPTY_ARR,
    searchField: EMPTY_STR,
    searchCategory: EMPTY_ARR,
    searching: false,
    statusMessage: EMPTY_STR,
    errors: {
        searchField: EMPTY_STR,
        searchCategory: EMPTY_STR
    }
}
export default (state=initialState, action)=>{
    switch(action.type){
        case SEARCH_FIELD_CHANGED:
            return{
                ...state,
                searchField: action.payload
            }
        case SEARCH_CATEGORY_CHANGED:
            return{
                ...state,
                searchCategory: action.payload
            }
        case SEARCH_ATTEMPT:
            return{
                ...state,
                searching: true,
                statusMessage: action.payload
            }
        case SEARCH_FAIL:
            return{
                ...state,
                searching: false,
                statusMessage: action.payload.statusMessage,
                errors:{
                    searchField: action.payload.errors.searchField,
                    searchCategory: action.payload.errors.searchCategory
                }
            }
        case SEARCH_SUCCESS:
            return{
                ...state,
                searching: false,
                statusMessage: action.payload.statusMessage,
                searchResults: action.payload.users
            }
        default: return state;
    }
}
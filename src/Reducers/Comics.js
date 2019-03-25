import {
    GET_COMICS_ATTEMPT,
    GET_COMICS_FAILURE,
    GET_COMICS_SUCCESS
} from '../Actions/types';
import {EMPTY_ARR, EMPTY_STR} from '../constants';
const initialState = {
    comicsLoading: false,
    comicsList: EMPTY_ARR,
    statusMessage: action.payload,
    error: EMPTY_STR
}
export default (state = initialState, action)=>{
    switch(action.type){
        case GET_COMICS_ATTEMPT:
            return{
                ...state,
                comicsLoading: true,
                statusMessage: action.payload
            }
        case GET_COMICS_FAILURE:
            return{
                ...state,
                comicsLoading: false,
                comicsList: EMPTY_ARR,
                statusMessage: action.payload
            }
        case GET_COMICS_SUCCESS: 
            return{
                ...state,
                comicsList: action.payload.comics,
                statusMessage: action.payload.statusMessage,
                comicsLoading: false
            }
        default: state
    }
}
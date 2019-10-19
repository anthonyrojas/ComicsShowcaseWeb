import {
    CREATOR_FIRST_NAME_CHANGED,
    CREATOR_LAST_NAME_CHANGED,
    ADD_CREATOR_ATTEMPT,
    ADD_CREATOR_FAILURE,
    ADD_CREATOR_SUCCESS,
    UPDATE_CREATOR_ATTEMPT,
    UPDATE_CREATOR_FAILURE,
    UPDATE_CREATOR_SUCCESS,
    GET_CREATORS_ATTEMPT,
    GET_CREATORS_FAILURE,
    GET_CREATORS_SUCCESS
} from '../Actions/types';
import {EMPTY_ARR, EMPTY_STR, DEFAULT_NUM} from '../constants';

const initialState = {
    creators: EMPTY_ARR,
    firstName: EMPTY_STR,
    lastName: EMPTY_STR,
    statusMessage: EMPTY_STR,
    fetchingCreators: true,
    creatorChange: false,
    errors: {
        firstName: EMPTY_STR,
        lastName: EMPTY_STR
    }
}
export default (state = initialState, action) => {
    switch(action.type){
        case CREATOR_FIRST_NAME_CHANGED:
            return{
                ...state,
                firstName: action.payload
            }
        case CREATOR_LAST_NAME_CHANGED:
            return{
                ...state,
                lastName: action.payload
            }
        case GET_CREATORS_ATTEMPT:
            return{
                ...state,
                statusMessage: '',
                fetchingCreators: action.payload
            }
        case GET_CREATORS_SUCCESS:
            return{
                ...state,
                creators: action.payload.creators,
                statusMessage: action.payload.statusMessage
            }
        case GET_CREATORS_FAILURE: 
            return{
                ...state,
                creators: EMPTY_ARR,
                statusMessage: action.payload.statusMessage
            }
        default: return state
    }
}
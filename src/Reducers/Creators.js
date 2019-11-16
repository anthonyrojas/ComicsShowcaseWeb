import {
    CREATOR_FIRST_NAME_CHANGED,
    CREATOR_LAST_NAME_CHANGED,
    ADD_CREATOR_ATTEMPT,
    ADD_CREATOR_FAILURE,
    ADD_CREATOR_SUCCESS,
    UPDATE_CREATOR_ATTEMPT,
    UPDATE_CREATOR_FAILURE,
    UPDATE_CREATOR_SUCCESS,
    DELETE_CREATOR_ATTEMPT,
    DELETE_CREATOR_FAILURE,
    DELETE_CREATOR_SUCCESS,
    GET_CREATORS_ATTEMPT,
    GET_CREATORS_FAILURE,
    GET_CREATORS_SUCCESS,
    CREATOR_MODAL_DISPLAY_TOGGLE
} from '../Actions/types';
import {EMPTY_ARR, EMPTY_STR} from '../constants';

const initialState = {
    creators: EMPTY_ARR,
    firstName: EMPTY_STR,
    lastName: EMPTY_STR,
    statusMessage: EMPTY_STR,
    fetchingCreators: true,
    creatorChange: false,
    deletingCreator: false,
    errors: {
        firstName: EMPTY_STR,
        lastName: EMPTY_STR
    },
    displayCreatorModal: false
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
                fetchingCreators: action.payload,
                errors: initialState.errors
            }
        case GET_CREATORS_SUCCESS:
            return{
                ...state,
                fetchingCreators: false,
                creators: action.payload.creators,
                statusMessage: action.payload.statusMessage
            }
        case GET_CREATORS_FAILURE: 
            return{
                ...state,
                creators: EMPTY_ARR,
                fetchingCreators: false,
                statusMessage: action.payload.statusMessage
            }
        case ADD_CREATOR_ATTEMPT:
            return{
                ...state,
                creatorChange: action.payload,
                errors: initialState.errors
            }
        case ADD_CREATOR_SUCCESS:
            return{
                ...state,
                creators: [...creators, action.payload.creator],
                statusMessage: action.payload.statusMessage,
                firstName: EMPTY_STR,
                lastName: EMPTY_STR,
            }
        case ADD_CREATOR_FAILURE:
            return{
                ...state,
                errors: action.payload.errors,
                statusMessage: action.payload.statusMessage
            }
        case UPDATE_CREATOR_ATTEMPT:
            return{
                ...state,
                creatorChange: action.payload,
                errors: initialState.errors
            }
        case UPDATE_CREATOR_SUCCESS:
            const creatorIndex = state.creators.findIndex(c => c.id === action.payload.creator.id);
            const creators = state.creators;
            creators[creatorIndex] = action.payload.creator;
            return{
                ...state,
                creators: creators,
                statusMessage: action.payload.statusMessage,
                firstName: EMPTY_STR,
                lastName: EMPTY_STR,
            }
        case UPDATE_CREATOR_FAILURE:
            return{
                ...state,
                statusMessage: action.payload.statusMessage,
                errors: action.payload.errors
            }
        case DELETE_CREATOR_ATTEMPT:
            return{
                ...state,
                statusMessage: action.payload.statusMessage,
                errors: initialState.errors,
                deletingCreator: true
            }
        case DELETE_CREATOR_SUCCESS:
            let creators = state.creators;
            const creatorIndex = creators.findIndex(c => c.id === action.payload.id);
            creators.splice(creatorIndex, 1);
            return {
                ...state,
                statusMessage: action.payload.statusMessage,
                creators: creators,
                errors: initialState.errors,
                deletingCreator: false
            }
        case DELETE_CREATOR_FAILURE:
            return{
                ...state,
                deletingCreator: false,
                statusMessage: action.payload.statusMessage,
            }
        case CREATOR_MODAL_DISPLAY_TOGGLE:
            return{
                ...state,
                displayCreatorModal: action.payload
            }
        default: return state
    }
}
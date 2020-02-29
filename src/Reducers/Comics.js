import {
    GET_COMICS_ATTEMPT,
    GET_COMICS_FAILURE,
    GET_COMICS_SUCCESS,
    GET_COMIC_ATTEMPT,
    GET_COMIC_SUCCESS,
    GET_COMIC_FAILURE,
    COMIC_TITLE_CHANGED,
    COMIC_DESCRIPTION_CHANGED,
    COMIC_UPC_CHANGED,
    COMIC_CONDITION_CHANGED,
    COMIC_FIVE_DIGIT_ID_CHANGED,
    COMIC_PUBLISHER_CHANGED,
    COMIC_CREATORS_CHANGED,
    COMIC_IMAGE_CHANGED_ATTEMPT,
    COMIC_IMAGE_CHANGED_FAILURE,
    COMIC_IMAGE_CHANGED_SUCCESS,
    GET_COMIC_CONDITIONS_FAILURE,
    GET_COMIC_CONDITIONS_SUCCESS,
    GET_COMIC_CONDITIONS_ATTEMPT,
} from '../Actions/types';
import {EMPTY_ARR, EMPTY_STR, DEFAULT_NUM} from '../constants';
const initialState = {
    id: -1,
    title: EMPTY_STR,
    description: EMPTY_STR,
    upc: EMPTY_STR,
    fiveDigitId: EMPTY_STR,
    imageStr: EMPTY_STR,
    pubisher: EMPTY_STR,
    condition: DEFAULT_NUM,
    creators: EMPTY_ARR,
    comicsLoading: false,
    comicLoading: false,
    comicsList: EMPTY_ARR,
    comicsErr: EMPTY_STR,
    comicErr: EMPTY_STR,
    uploadingImage: false,
    statusMessage: EMPTY_STR,
    comicConditionsLoading: false,
    comicConditions: EMPTY_ARR,
    comic: EMPTY_STR,
    errors: {
        title: EMPTY_STR,
        description: EMPTY_STR,
        upc: EMPTY_STR,
        //the five digit issue identifier
        //[0-3]: issue number
        //[4]: variant
        //[5]: printing,
        imageStr: EMPTY_STR,
        fiveDigitId: EMPTY_STR,
        condition: EMPTY_STR,
        user: EMPTY_STR,
        publisher:EMPTY_STR,
        creators: EMPTY_STR,
        comicConditions: EMPTY_STR
    }
}
export default (state = initialState, action)=>{
    switch(action.type){
        case GET_COMICS_ATTEMPT:
            return{
                ...state,
                comicsLoading: true,
                statusMessage: action.payload.statusMessage,
                errors: initialState.errors
            }
        case GET_COMICS_FAILURE:
            return{
                ...state,
                comicsLoading: false,
                comicsList: EMPTY_ARR,
                statusMessage: action.payload.statusMessage,
            }
        case GET_COMICS_SUCCESS: 
            return{
                ...state,
                comicsList: action.payload.comics,
                statusMessage: action.payload.statusMessage,
                comicsLoading: false
            }
        case GET_COMIC_ATTEMPT:
            return{
                ...state,
                comicLoading: true,
                statusMessage: EMPTY_STR
            }
        case GET_COMIC_SUCCESS:
            return{
                ...state,
                comicLoading: false,
                comic: action.payload.comic,
            }
        case GET_COMIC_FAILURE: 
            return{
                ...state,
                comicLoading: false,
                statusMessage: action.payload.statusMessage
            }
        case COMIC_TITLE_CHANGED: 
            return{
                ...state,
                title: action.payload
            }
        case COMIC_DESCRIPTION_CHANGED:
            return{
                ...state,
                description: action.payload
            }
        case COMIC_UPC_CHANGED:
            return{
                ...state,
                upc: action.payload
            }
        case COMIC_CONDITION_CHANGED:
            return{
                ...state,
                condition: action.payload
            }
        case COMIC_FIVE_DIGIT_ID_CHANGED:
            return{
                ...state,
                fiveDigitId: action.payload
            }
        case COMIC_PUBLISHER_CHANGED: {
            return{
                ...state,
                publisher: action.payload
            }
        }
        case COMIC_CREATORS_CHANGED:
            return{
                ...state,
                creators: action.payload
            }
        case COMIC_IMAGE_CHANGED_ATTEMPT:
            return{
                ...state,
                uploadingImage: true,
                statusMessage: action.payload,
                errors: {
                    ...state.errors,
                    imageStr: EMPTY_STR
                }
            }
        case COMIC_IMAGE_CHANGED_FAILURE:
            return{
                ...state,
                uploadingImage: false,
                errors: {
                    ...state.errors,
                    imageStr: action.payload
                }
            }
        case COMIC_IMAGE_CHANGED_SUCCESS:
            return{
                ...state,
                uploadingImage: false,
                imageStr: action.payload,
                errors: {
                    ...state.errors,
                    imageStr: EMPTY_STR
                }
            }
        case GET_COMIC_CONDITIONS_ATTEMPT:
            return{
                ...state,
                comicConditionsLoading: true
            }
        case GET_COMIC_CONDITIONS_FAILURE:
            return{
                ...state,
                comicConditionsLoading: false,
                comicConditions: action.payload
            }
        case GET_COMIC_CONDITIONS_SUCCESS:
            return{
                ...state,
                comicConditionsLoading: false,
                comicConditions: action.payload.comicsConditions
            }
        default: return state
    }
}
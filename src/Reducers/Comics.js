import {
    GET_COMICS_ATTEMPT,
    GET_COMICS_FAILURE,
    GET_COMICS_SUCCESS,
    GET_COMIC_ATTEMPT,
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
    GET_COMIC_CONDITIONS_ATTEMPT
} from '../Actions/types';
import {EMPTY_ARR, EMPTY_STR, DEFAULT_NUM} from '../constants';
const initialState = {
    comicsPaginate: DEFAULT_NUM,
    comicSkip: DEFAULT_NUM,
    comicLimit: 10,
    comicsCount: DEFAULT_NUM,
    comicsLoading: false,
    comicLoading: false,
    comicsList: EMPTY_ARR,
    comicsErr: EMPTY_STR,
    comicErr: EMPTY_STR,
    uploadingImage: false,
    statusMessage: action.payload,
    comicConditionsLoading: false,
    comicConditions: EMPTY_ARR,
    comic: {
        title: EMPTY_STR,
        description: EMPTY_STR,
        UPC: DEFAULT_NUM,
        //the five digit issue identifier
        //[0-3]: issue number
        //[4]: variant
        //[5]: printing,
        imageStr: EMPTY_STR,
        fiveDigitId: DEFAULT_NUM,
        condition: EMPTY_STR,
        user: EMPTY_STR,
        publisher:EMPTY_STR,
        creators: EMPTY_ARR
    },
    errors: {
        title: EMPTY_STR,
        description: EMPTY_STR,
        UPC: EMPTY_STR,
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
                statusMessage: action.payload
            }
        case GET_COMICS_FAILURE:
            return{
                ...state,
                comicsLoading: false,
                comicsList: EMPTY_ARR,
                statusMessage: EMPTY_STR,
                comicsErr: action.payload
            }
        case GET_COMICS_SUCCESS: 
            return{
                ...state,
                comicsList: action.payload.comics,
                comicsCount: action.payload.comicsCount,
                statusMessage: action.payload.statusMessage,
                comicsLoading: false
            }
        case GET_COMIC_ATTEMPT:
            return{
                ...state,
                comicLoading: true,
                statusMessage: action.payload
            }
        case GET_COMIC_SUCCESS:
            return{
                ...state,
                comicLoading: false,
                comic: {
                    title: action.payload.comic.title,
                    description: action.payload.comic.description,
                    UPC: action.payload.comic.UPC,
                    imageStr: action.payload.comic.imageStr,
                    fiveDigitId: action.payload.comic.fiveDigitId,
                    condition: action.payload.comic.condition,
                    user: action.payload.comic.user,
                    publisher: action.payload.comic.publisher,
                    creators: action.payload.comic.creators
                },
                statusMessage: action.payload.statusMessage
            }
        case GET_COMIC_FAILURE: 
            return{
                ...state,
                comicLoading: false,
                comicErr: action.payload,
                statusMessage: EMPTY_STR
            }
        case COMIC_TITLE_CHANGED: 
            return{
                ...state,
                comic: {
                    title: action.payload
                }
            }
        case COMIC_DESCRIPTION_CHANGED:
            return{
                ...state,
                comic: {
                    description: action.payload
                }
            }
        case COMIC_UPC_CHANGED:
            return{
                ...state,
                comic: {
                    UPC: action.payload
                }
            }
        case COMIC_CONDITION_CHANGED:
            return{
                ...state,
                comic:{
                    condition: action.payload
                }
            }
        case COMIC_FIVE_DIGIT_ID_CHANGED:
            return{
                ...state,
                comic:{
                    fiveDigitId: action.payload
                }
            }
        case COMIC_PUBLISHER_CHANGED: {
            return{
                ...state,
                comic: {
                    publisher: action.payload
                }
            }
        }
        case COMIC_CREATORS_CHANGED:
            return{
                ...state,
                comic: {
                    creators: action.payload
                }
            }
        case COMIC_IMAGE_CHANGED_ATTEMPT:
            return{
                ...state,
                uploadingImage: true,
                statusMessage: action.payload,
                errors: {
                    imageStr: EMPTY_STR
                }
            }
        case COMIC_IMAGE_CHANGED_FAILURE:
            return{
                ...state,
                uploadingImage: false,
                errors: {
                    imageStr: action.payload
                }
            }
        case COMIC_IMAGE_CHANGED_SUCCESS:
            return{
                ...state,
                uploadingImage: false,
                comic: {
                    imageStr: action.payload
                },
                errors: {
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
        default: state
    }
}
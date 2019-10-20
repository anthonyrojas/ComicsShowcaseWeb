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
} from '../Actions/types';
import { EMPTY_ARR, EMPTY_STR, DEFAULT_NUM } from '../constants';

const initialState = {
    title: EMPTY_STR,
    isbn: EMPTY_STR,
    description: EMPTY_STR,
    imageStr: EMPTY_STR,
    graphicNovelType: DEFAULT_NUM,
    bookCondition: DEFAULT_NUM,
    publisher: EMPTY_STR,
    creators: EMPTY_ARR,
    uploadingImage: false,
    loadingGraphicNovels: true,
    loadingGraphicNovel: true,
    changingGraphicNovels: false,
    updatingGraphicNovel: false,
    removingGraphicNovel: false,
    graphicNovels: EMPTY_ARR,
    graphicNovel: EMPTY_STR,
    statusMessage: EMPTY_STR,
    errors: {
        title: EMPTY_STR,
        isbn: EMPTY_STR,
        description: EMPTY_STR,
        imageStr: EMPTY_STR,
        graphicNovelType: EMPTY_STR,
        bookCondition: EMPTY_STR,
        publisher: EMPTY_STR,
        creators: EMPTY_STR
    }
}
export default (state = initialState, action) => {
    switch(action.type){
        case GRAPHIC_NOVEL_CONDITION_CHANGED:
            return{
                ...state,
                bookCondition: action.payload
            }
        case GRAPHIC_NOVEL_CREATORS_CHANGED:
            return{
                ...state,
                creators: action.payload
            }
        case GRAPHIC_NOVEL_DESCRIPTION_CHANGED:
            return{
                ...state,
                description: action.payload
            }
        case GRAPHIC_NOVEL_ISBN_CHANGED:
            return{
                ...state,
                isbn: action.payload
            }
        case GRAPHIC_NOVEL_PUBLISHER_CHANGED:
            return{
                ...state,
                publisher: action.payload
            }
        case GRAPHIC_NOVEL_TITLE_CHANGED:
            return{
                ...state,
                title: action.payload
            }
        case GRAPHIC_NOVEL_TYPE_CHANGED:
            return{
                ...state,
                title: action.payload
            }
        case GRAPHIC_NOVEL_IMAGE_CHANGED_ATTEMPT:
            return{
                ...state,
                imageStr: EMPTY_STR,
                uploadingImage: true
            }
        case GRAPHIC_NOVEL_IMAGE_CHANGED_SUCCESS:
            return{
                ...state,
                imageStr: action.payload,
                uploadingImage: false
            }
        case GRAPHIC_NOVEL_IMAGE_CHANGED_FAILURE:
            return{
                ...state,
                imageStr: state.imageStr,
                uploadingImage: false,
                errors: {
                    ...state.errors,
                    imageStr: action.payload.imageStr
                }
            }
        case GET_GRAPHIC_NOVELS_ATTEMPT:
            return{
                ...state,
                loadingGraphicNovels: action.payload,
                statusMessage: EMPTY_STR
            }
        case GET_GRAPHIC_NOVELS_FAILURE:
            return{
                ...state,
                loadingGraphicNovels: false,
                statusMessage: action.payload.statusMessage
            }
        case GET_GRAPHIC_NOVELS_SUCCESS:
            return{
                ...state,
                loadingGraphicNovels: false,
                graphicNovels: action.payload.graphicNovels,
                statusMessage: action.payload.statusMessage
            }
        case GET_GRAPHIC_NOVEL_ATTEMPT:
            return{
                ...state,
                loadingGraphicNovel: action.payload,
                statusMessage: EMPTY_STR,
                graphicNovel: EMPTY_STR,
                errors: initialState.errors
            }
        case GET_GRAPHIC_NOVEL_SUCCESS:
            return{
                ...state,
                loadingGraphicNovel: false,
                graphicNovel: action.payload.graphicNovel
            }
        case GET_GRAPHIC_NOVEL_FAILURE:
            return{
                ...state,
                loadingGraphicNovel: false,
                errors: action.payload.errors,
                statusMessage: action.payload.statusMessage
            }
        case ADD_GRAPHIC_NOVEL_ATTEMPT:
            return{
                ...state,
                changingGraphicNovels: action.payload,
                statusMessage: EMPTY_STR,
                errors: initialState.errors
            }
        case ADD_GRAPHIC_NOVEL_SUCCESS: 
            return{
                ...state,
                changingGraphicNovels: false,
                graphicNovels: [...state.graphicNovels, action.payload.graphicNovel],
                statusMessage: action.payload.statusMessage,
                title: EMPTY_STR,
                isbn: EMPTY_STR,
                description: EMPTY_STR,
                imageStr: EMPTY_STR,
                graphicNovelType: DEFAULT_NUM,
                bookCondition: DEFAULT_NUM,
                publisher: EMPTY_STR,
                creators: EMPTY_ARR,
            }
        case ADD_GRAPHIC_NOVEL_FAILURE:
            return{
                ...state,
                changingGraphicNovels: false,
                errors: action.payload.errors,
                statusMessage: action.payload.statusMessage
            }
        case UPDATE_GRAPHIC_NOVEL_ATTEMPT:
            return{
                ...state,
                statusMessage: EMPTY_STR,
                updatingGraphicNovel: action.payload,
                errors: initialState.errors
            }
        case UPDATE_GRAPHIC_NOVEL_SUCCESS:
            const graphicNovels = state.graphicNovels;
            const index = graphicNovels.findIndex(g => g.id === action.payload.graphicNovel.id);
            graphicNovels[index] = action.payload.graphicNovel;
            return{
                ...state,
                statusMessage: action.payload.statusMessage,
                graphicNovels: graphicNovels,
                updatingGraphicNovel: false
            }
        case UPDATE_GRAPHIC_NOVEL_FAILURE:
            return{
                ...state,
                updatingGraphicNovel: false,
                statusMessage: action.payload.statusMessage,
                errors: action.payload.errors
            }
        case DELETE_GRAPHIC_NOVEL_ATTEMPT:
            return{
                ...state,
                deletingGraphicNovel: true,
                errors: initialState.errors
            }
        case DELETE_GRAPHIC_NOVEL_FAILURE:
            return{
                ...state,
                deletingGraphicNovel: false,
                statusMessage: action.payload.statusMessage
            }
        case DELETE_GRAPHIC_NOVEL_SUCCESS:
            const graphicNovels = state.graphicNovels;
            graphicNovels.filter(graphicNovel => graphicNovel.id !== action.payload.id);
            return{
                ...state,
                graphicNovels: graphicNovels,
                deletingGraphicNovel: false,
                statusMessage: action.payload.statusMessage
            }
        case GET_GRAPHIC_NOVEL_ATTEMPT:
            return{
                ...state,
                loadingGraphicNovel: action.payload,
                statusMessage: false,
                errors: initialState.errors
            }
        case GET_GRAPHIC_NOVEL_SUCCESS:
            return{
                ...state,
                loadingGraphicNovel: false,
                statusMessage: action.payload.statusMessage,
                graphicNovel: action.payload.graphicNovel
            }
        case GET_GRAPHIC_NOVEL_FAILURE:
            return{
                ...state,
                loadingGraphicNovel: false,
                statusMessage: action.payload.statusMessage,
                errors: action.payload.errors
            }
        default: return state
    }
}
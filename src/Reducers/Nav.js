import {
    TOGGLE_SIDENAV
} from '../Actions/types';
const initialState = {
    navVisibility: false
}
export default (state = initialState, action)=>{
    switch(action.type){
        case TOGGLE_SIDENAV:
            return{
                ...state,
                navVisibility: !state.navVisibility
            }
        default: return state;
    }
}
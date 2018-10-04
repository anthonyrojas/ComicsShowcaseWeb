import {
    TOGGLE_SIDENAV
} from './types';

export const toggleSidenav = (data)=>{
    return{
        type: TOGGLE_SIDENAV,
        payload: data
    }
}
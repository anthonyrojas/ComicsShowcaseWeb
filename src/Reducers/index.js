import {combineReducers} from 'redux';
import Account from './Account';
import Search from './Search';
import Nav from './Nav';
export default combineReducers({
    account: Account,
    search: Search,
    nav: Nav
});
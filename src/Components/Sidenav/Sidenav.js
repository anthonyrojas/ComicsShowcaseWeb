import React,{Component} from 'react';
import {Drawer, List, ListItemIcon, ListItemText, Icon, ListItem} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleSidenav} from '../../Actions/Nav';
import {
    logout
} from '../../Actions/Account';
class Sidenav extends Component{
    onClickLogout(e){
        e.preventDefault();
        this.props.logout(false);
        this.props.history.push('/login');
    }
    render(){
        return(
            <Drawer open={this.props.navVisibility} onClose={this.props.toggleSidenav}>
                <div
                tabIndex={0}
                role="button"
                onClick={this.props.toggleSidenav}
                onKeyDown={this.props.toggleSidenav}
                style={{minWidth: '20vw'}}
                >
                <List component='nav'>
                    <Link style={{textDecoration: 'none'}} to='/'>
                        <ListItem button>
                            <ListItemIcon><Icon>home</Icon></ListItemIcon>
                            <ListItemText primary='Home'></ListItemText>
                        </ListItem>
                    </Link>
                    {
                        !this.props.authenticated ? 
                        <React.Fragment>
                            <Link style={{textDecoration: 'none'}} to='/login'>
                                <ListItem button>
                                    <ListItemIcon><Icon>account_circle</Icon></ListItemIcon>
                                    <ListItemText primary='Login'></ListItemText>
                                </ListItem>
                            </Link>
                            <Link style={{textDecoration: 'none'}} to='/register'>
                                <ListItem button>
                                    <ListItemIcon><Icon>person_add</Icon></ListItemIcon>
                                    <ListItemText primary='Register'></ListItemText>
                                </ListItem>
                            </Link>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Link style={{textDecoration: 'none'}} to='#' onClick={this.onClickLogout.bind(this)}>
                                <ListItem button>
                                    <ListItemIcon><Icon>exit_to_app</Icon></ListItemIcon>
                                    <ListItemText primary='Logout'></ListItemText>
                                </ListItem>
                            </Link>
                            <Link style={{textDecoration: 'none'}} to='/account'>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon>account_circle</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Account' />
                                </ListItem>
                            </Link>
                            <Link style={{textDecoration: 'none'}} to='/comics'>
                                <ListItem button>
                                    <ListItemIcon>
                                        <Icon>menu_book</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary='Comic Books' />
                                </ListItem>
                            </Link>
                        </React.Fragment>
                    }
                </List>
                </div>
            </Drawer>
        );
    }
}
const mapStateToProps = state =>({
    navVisibility: state.nav.navVisibility,
    authenticated: state.account.authenticated
});
export default withRouter(connect(mapStateToProps, {
    toggleSidenav,
    logout
})(Sidenav));
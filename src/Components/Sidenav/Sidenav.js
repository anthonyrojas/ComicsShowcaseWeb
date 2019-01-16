import React,{Component} from 'react';
import {Drawer, List, ListItemIcon, ListItemText, Icon, ListItem} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleSidenav} from '../../Actions/Nav';
class Sidenav extends Component{
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
                </List>
                </div>
            </Drawer>
        );
    }
}
const mapStateToProps = state =>({
    navVisibility: state.nav.navVisibility
});
export default withRouter(connect(mapStateToProps, {
    toggleSidenav
})(Sidenav));
import React,{PureComponent} from 'react';
import {connect} from 'react-redux';
import {toggleSidenav} from '../../Actions/Nav';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
class Navbar extends PureComponent{
    render(){
        return(
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit" aria-label="Menu" onClick={this.props.toggleSidenav}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="title" color="inherit">Comics Showcase</Typography>
                </Toolbar>
          </AppBar>
        );
    }
}
const mapStateToProps = state =>({
    navVisbility: state.navVisbility
});
export default connect(mapStateToProps,{
    toggleSidenav
})(Navbar);
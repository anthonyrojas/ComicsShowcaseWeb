import React, {Component} from 'react';
import './Login.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    loginButtonToggle,
    login,
    passwordChanged,
    usernameChanged,
    resetUserStatusMessage
} from '../../Actions/Account';
import {EMPTY_STR} from '../../constants';

class Login extends Component{
    onUsernameChanged(e){
        this.props.usernameChanged(e.target.value);
    }
    onPasswordChanged(e){
        this.props.passwordChanged(e.target.value);
    }
    onCloseUserSnackbar(e){
        this.props.resetUserStatusMessage(EMPTY_STR);
    }
    onLoginFormChanged(e){
        let empty = false;
        if(this.props.username === undefined || this.props.username === null || this.props.username === EMPTY_STR){
            empty = true;
        }
        if(this.props.password === undefined || this.props.password === null || this.props.password === EMPTY_STR){
            empty = true;
        }
        if(empty){
            this.props.loginButtonToggle(false);
        }else{
            this.props.loginButtonToggle(true);
        }
    }
    onSubmitLogin(e){
        e.preventDefault();
        let data = {
            username: this.props.username,
            password: this.props.password,
            history: this.props.history
        }
        this.props.login(data);
    }
    render(){
        return(
            <div className='login'>
                <Snackbar
                    open={this.props.statusMessage !== EMPTY_STR}
                    anchorOrigin={{horizontal:'right', vertical: 'top'}}
                    message={this.props.statusMessage}
                    action={
                        <IconButton 
                            key='snackbar-close'
                            aria-label='Close'
                            onClick={this.onCloseUserSnackbar.bind(this)}
                            color='inherit'
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                />
                <Modal
                    className='modal-container'
                    open={this.props.loggingIn}
                >
                    <div className='modal-paper'>
                        <Typography variant='subheading'>Signing In...</Typography>
                        <CircularProgress color='primary' />
                    </div>
                </Modal>
                <Grid container direction='row' wrap='wrap' justify='center' alignContent='center' alignItems='center' className='min-100vh'>
                    <Grid item xs={12} md={10} lg={8} xl={6}>
                        <Paper elevation={16} square className='px-3 py-2'>
                            <Typography variant='display1' align='center'>Login</Typography>
                            <hr className='my-2'/>
                            <Typography variant='subheading' align='left' gutterBottom>
                            Hello there! Log into your account to enjoy all the benefits and good fun that comes with using this service. You will be able to take full control of how you display and show off your collection online, amongst other things.
                            </Typography>
                            <form className='py-2' method='POST' autoComplete='off' onChange={this.onLoginFormChanged.bind(this)}>
                                <TextField required 
                                    error={this.props.errors.username !== EMPTY_STR}
                                    helperText={this.props.errors.username}
                                    margin='normal' 
                                    label='Username' 
                                    fullWidth 
                                    value={this.props.username}
                                    onChange={this.onUsernameChanged.bind(this)}
                                />
                                <TextField required 
                                    error={this.props.errors.password !== EMPTY_STR}
                                    helperText={this.props.errors.password}
                                    margin='normal' 
                                    label='Password' 
                                    fullWidth 
                                    type='password' 
                                    value={this.props.password}
                                    onChange={this.onPasswordChanged.bind(this)}
                                />
                                {
                                    this.props.loginButtonVisible ?
                                    <Button variant='contained' color='primary' onClick={this.onSubmitLogin.bind(this)}>Login</Button> :
                                    null
                                }
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = state =>({
    username: state.account.username,
    password: state.account.password,
    statusMessage: state.account.statusMessage,
    loginButtonVisible: state.account.loginButtonVisible,
    loggingIn: state.account.loggingIn,
    errors: state.account.errors
});
export default connect(mapStateToProps, {
    loginButtonToggle,
    login,
    passwordChanged,
    usernameChanged,
    resetUserStatusMessage
})(Login);
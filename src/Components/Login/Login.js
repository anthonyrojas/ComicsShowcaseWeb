import React, {PureComponent} from 'react';
import './Login.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {
    loginButtonToggle,
    loginFailure,
    loginSuccess,
    passwordChanged,
    usernameChanged
} from '../../Actions/Account';

class Login extends PureComponent{
    onUsernameChanged(e){
        this.props.usernameChanged(e.target.value);
    }
    onPasswordChanged(e){
        this.props.passwordChanged(e.target.value);
    }
    render(){
        return(
            <div className='login'>
                <Grid container direction='row' wrap='wrap' justify='center' alignContent='center' alignItems='center' className='min-100vh'>
                    <Grid item direction='column' xs={12} md={10} lg={8} xl={6}>
                        <Paper elevation={16} square className='px-3 py-2'>
                            <Typography variant='display1' align='center'>Login</Typography>
                            <hr className='my-2'/>
                            <Typography variant='subheading' align='left' gutterBottom>
                            Hello there! Log into your account to enjoy all the benefits and good fun that comes with using this service. You will be able to take full control of how you display and show off your collection online, amongst other things.
                            </Typography>
                            <form className='py-2' method='POST' autoComplete='off'>
                                <TextField required 
                                    margin='normal' 
                                    label='Username' 
                                    fullWidth 
                                    value={this.props.username}
                                    onChange={this.onUsernameChanged.bind(this)}
                                />
                                <TextField required 
                                    margin='normal' 
                                    label='Password' 
                                    fullWidth 
                                    type='password' 
                                    value={this.props.password}
                                    onChange={this.onPasswordChanged.bind(this)}
                                />
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
    loginButtonVisibility: state.account.loginButtonVisible
});
export default connect(mapStateToProps, {
    loginButtonToggle,
    loginFailure,
    loginSuccess,
    passwordChanged,
    usernameChanged
})(Login);
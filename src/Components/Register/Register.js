import React, {Component} from 'react';
import './Register.css';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import {
    emailChanged,
    firstNameChanged,
    lastNameChanged,
    passwordChanged,
    usernameChanged
} from '../../Actions/Account';
class Register extends Component{
    onEmailChanged(e){
        this.props.emailChanged(e.target.value);
    }
    onFirstNameChanged(e){
        this.props.firstNameChanged(e.target.value);
    }
    onLastNameChanged(e){
        this.props.lastNameChanged(e.target.value);
    }
    onPasswordChanged(e){
        this.props.passwordChanged(e.target.value);
    }
    onUsernameChanged(e){
        this.props.usernameChanged(e.target.value);
    }
    render(){
        return(
            <div className='register'>
            <Grid container direction='row' wrap='wrap' alignContent='center' justify='center' alignItems='center' className='min-100vh'>
                <Grid item xs={12} sm={10} lg={8} xl={6}>
                    <Paper elevation={16} className='px-3 py-2'>
                        <Typography variant='display1' align='center'>Register</Typography>
                        <hr className='my-2'/>
                        <Typography variant='subheading' gutterBottom>
                            Thank you for your interest in joining! It is an exciting time when you can finally join others who are so similar to you and that is what you will be doing by joining this platform. Please fill out all the necessary fields listed below. We cannot wait to welcome you!
                        </Typography>
                        <form className='py-2' method='POST'>
                            <TextField required
                                margin='normal'
                                label='Email'
                                fullWidth
                                value={this.props.email}
                                onChange={this.onEmailChanged.bind(this)}
                            />
                            <TextField required 
                                margin='normal'
                                label='First Name'
                                fullWidth
                                value={this.props.firstName}
                                onChange={this.onFirstNameChanged.bind(this)}
                            />
                            <TextField required 
                                margin='normal'
                                label='Last Name'
                                fullWidth
                                value={this.props.lastName}
                                onChange={this.onLastNameChanged.bind(this)}
                            />
                            <TextField required
                                margin='normal'
                                label='Password'
                                fullWidth
                                value={this.props.password}
                                onChange={this.onPasswordChanged.bind(this)}
                            />
                            <TextField required
                                margin='normal'
                                label='Username'
                                fullWidth
                                value={this.props.username}
                                onChange={this.onUsernameChanged.bind(this)}
                            />
                            <Input type='file' />
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
    email: state.account.email,
    firstName: state.account.firstName,
    lastName: state.account.lastName,
    password: state.account.password
});
export default connect(mapStateToProps,{
    emailChanged,
    firstNameChanged,
    lastNameChanged,
    usernameChanged,
    passwordChanged
})(Register);
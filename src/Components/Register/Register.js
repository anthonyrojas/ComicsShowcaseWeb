import React, {Component} from 'react';
import './Register.css';
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import {
    emailChanged,
    firstNameChanged,
    lastNameChanged,
    passwordChanged,
    usernameChanged,
    birthDateChanged,
    userPictureChanged,
    attemptUploadUserProfile,
    cancelUploadProfile,
    register,
    registerButtonToggle
} from '../../Actions/Account';
import { EMPTY_STR } from '../../constants';
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
    onBirthDateChanged(e){
        this.props.birthDateChanged(e.target.value);
    }
    onPasswordChanged(e){
        this.props.passwordChanged(e.target.value);
    }
    onUsernameChanged(e){
        this.props.usernameChanged(e.target.value);
    }
    onFileUpload(e){
        if(e.target.files[0] !== undefined && e.target.files[0] !== null){
            const file = e.target.files[0];
            this.props.attemptUploadUserProfile(file);
        }
    }
    cancelFileUpload(e){
        this.props.cancelUploadProfile(EMPTY_STR);
    }
    onFormChanged(e){
        let empty = false;
        if(this.props.firstName === undefined || this.props.firstName === null || this.props.firstName === EMPTY_STR){
            empty = true;
        }
        if(this.props.lastName === undefined || this.props.lastName === null || this.props.lastName === EMPTY_STR){
            empty = true;
        }
        if(this.props.username === undefined || this.props.username === null || this.props.username === EMPTY_STR){
            empty = true;
        }
        if(this.props.password === undefined || this.props.password === null || this.props.password === EMPTY_STR){
            empty = true;
        }
        if(this.props.email === undefined || this.props.email === null || this.props.emeail === EMPTY_STR){
            empty = true;
        }
        if(this.props.birthDate === undefined || this.props.birthDate === null || this.props.birthDate === EMPTY_STR){
            empty=true;
        }
        if(!empty){
            this.props.registerButtonToggle(true);
        }else{
            this.props.registerButtonToggle(false);
        }
    }
    onSubmitRegister(e){
        e.preventDefault();
        let data = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            birthDate: this.props.birthDate,
            username: this.props.username,
            password: this.props.password,
            profile: (this.props.profile !== EMPTY_STR ? this.props.profile.fileData : null)
        }
        this.props.register(data);
    }
    render(){
        return(
            <div className='register'>
            <Modal
                className='modal-container'
                open={this.props.registering}
            >
                <div className='modal-paper'>
                    <Typography variant='subheading'>Registering...</Typography>
                    <CircularProgress color='primary' />
                </div>
            </Modal>
            <Snackbar
                open={this.props.statusMessage !== EMPTY_STR}
                anchorOrigin={{horizontal:'right', vertical: 'top'}}
                message={this.props.statusMessage}
            />
            <Modal
                className='modal-container'
                open={this.props.uploadingProfile}
            >
                <div className='modal-paper'>
                    <Typography variant='subheading'>Uploading Profile</Typography>
                </div>
            </Modal>
            <Grid container direction='row' wrap='wrap' alignContent='center' justify='center' alignItems='center' className='min-100vh py-3'>
                <Grid item xs={12} sm={10} lg={8} xl={6}>
                    <Paper elevation={16} className='px-3 py-2'>
                        <Typography variant='display1' align='center'>Register</Typography>
                        <hr className='my-2'/>
                        <Typography variant='subheading' gutterBottom>
                            Thank you for your interest in joining! It is an exciting time when you can finally join others who are so similar to you and that is what you will be doing by joining this platform. Please fill out all the necessary fields listed below. We cannot wait to welcome you!
                        </Typography>
                        <form className='py-2' method='POST' onChange={this.onFormChanged.bind(this)}>
                            <TextField required
                                error={this.props.errors.email !== EMPTY_STR}
                                helperText={this.props.errors.email}
                                margin='normal'
                                label='Email'
                                fullWidth
                                type='email'
                                value={this.props.email}
                                onChange={this.onEmailChanged.bind(this)}
                            />
                            <TextField required 
                                error={this.props.errors.firstName !== EMPTY_STR}
                                helperText={this.props.errors.firstName}
                                margin='normal'
                                label='First Name'
                                fullWidth
                                value={this.props.firstName}
                                onChange={this.onFirstNameChanged.bind(this)}
                            />
                            <TextField required 
                                error={this.props.errors.lastName !== EMPTY_STR}
                                helperText={this.props.errors.lastName}
                                margin='normal'
                                label='Last Name'
                                fullWidth
                                value={this.props.lastName}
                                onChange={this.onLastNameChanged.bind(this)}
                            />
                            <TextField required
                                error={this.props.errors.birthDate !== EMPTY_STR}
                                helperText={this.props.errors.birthDate}
                                margin='normal'
                                label='Birth Date'
                                fullWidth
                                type='date'
                                value={this.props.birthDate}
                                onChange={this.onBirthDateChanged.bind(this)}
                            />
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
                            <Grid container direction='row' alignItems='center' justify='center'>
                                <Grid 
                                    container 
                                    wrap='wrap'
                                    direction='column' 
                                    justify='center' 
                                    alignItems='center' 
                                    className='grid-item-centered-w-padding'
                                >
                                    <input type='file' style={{display: 'none'}} id='upload-picture-input' onChange={this.onFileUpload.bind(this)} ref={(fileUpload) => this.fileUpload = fileUpload}/>
                                    <Button variant='contained' color='default' onClick={()=>this.fileUpload.click()}>Upload Picture &nbsp; <CloudUploadIcon /></Button>
                                    {
                                        this.props.errors.profile !== EMPTY_STR ? 
                                        <Typography variant='body2' color='secondary' component='p'>{this.props.errors.profile}</Typography> 
                                        : null
                                    }
                                </Grid>
                                <Grid 
                                    container 
                                    wrap='wrap'
                                    direction='column' 
                                    justify='center' 
                                    alignItems='center' 
                                    className='grid-item-centered-w-padding'
                                >
                                    <Typography variant='body2' component='p'>
                                        {this.props.profile !== EMPTY_STR ? 
                                            <React.Fragment>
                                                {this.props.profile.file.name} &nbsp;
                                                <Fab size='small' color='secondary' onClick={this.cancelFileUpload.bind(this)}><CancelOutlinedIcon className='text-white'/></Fab>
                                            </React.Fragment>
                                            : null}
                                    </Typography>
                                    {
                                        this.props.profile !== EMPTY_STR ?
                                        <Avatar alt='user profile' src={this.props.profile.fileData} className='avatar-lg'/> :
                                        null 
                                    }
                                </Grid>
                            </Grid>
                            {
                                this.props.registerButtonVisible
                                ? 
                                <Button variant='contained' color='primary' onClick={this.onSubmitRegister.bind(this)}>Register</Button>
                                :
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
    email: state.account.email,
    firstName: state.account.firstName,
    lastName: state.account.lastName,
    birthDate: state.account.birthDate,
    password: state.account.password,
    profile: state.account.profile,
    uploadingProfile: state.account.uploadingProfile,
    registering: state.account.registering,
    registerButtonVisible: state.account.registerButtonVisible,
    errors: state.account.errors,
    statusMessage: state.account.statusMessage
});
export default connect(mapStateToProps,{
    emailChanged,
    firstNameChanged,
    lastNameChanged,
    usernameChanged,
    passwordChanged,
    attemptUploadUserProfile,
    cancelUploadProfile,
    birthDateChanged,
    register,
    registerButtonToggle
})(Register);
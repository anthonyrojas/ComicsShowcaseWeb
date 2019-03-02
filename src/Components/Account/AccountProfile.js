import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    attemptUploadUserProfile,
    cancelUploadProfile
} from '../../Actions/Account';
import './Account.css';
import Avatar from '@material-ui/core/Avatar';
import ReportIcon from '@material-ui/icons/Report';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { EMPTY_STR } from '../../constants';
import Fab from '@material-ui/core/Fab';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { CircularProgress } from '@material-ui/core';
class AccountProfile extends Component{
    onChangeProfile(e){
        if(e.target.files[0] !== undefined && e.target.files[0] !== null){
            const file = e.target.files[0];
            this.props.attemptUploadUserProfile(file);
        }
    }
    onCancelFileUpload(e){
        this.props.cancelUploadProfile(EMPTY_STR);
    }
    render(){
        let profileRender;
        if(this.props.editAccount && !this.props.uploadingProfile){
            profileRender=<React.Fragment>
                <Typography 
                    variant='body2' 
                    align='center'
                >
                    Profile
                </Typography>
                {
                    this.props.profile !== null && this.props.profile !== EMPTY_STR ?
                    <Grid item xs={12} className='text-center'>
                        <Avatar 
                            className='account-profile my-1' 
                            alt='user profile' 
                            src={this.props.profile.fileData}
                        /> 
                        <Fab 
                            size='small' 
                            color='secondary' 
                            className='mb-1'
                            onClick={this.onCancelFileUpload.bind(this)}
                        >
                            <CancelOutlinedIcon 
                                className='text-white'
                            />
                        </Fab>
                    </Grid>
                    : 
                    null
                }
                <Button 
                    variant='contained' 
                    color='default' 
                    onClick={()=>this.fileUpload.click()}
                >
                    Upload Picture &nbsp; <CloudUploadIcon />
                </Button>
                <input 
                    type='file' 
                    className='file-upload-input' 
                    ref={(fileUpload)=>this.fileUpload=fileUpload} onChange={this.onChangeProfile.bind(this)}
                />
            </React.Fragment>;
        }else if(this.props.editAccount && this.props.uploadingProfile){
            profileRender=<React.Fragment>
                <CircularProgress color='primary' thickness={5} size={60}/>
                <Typography variant='subheading'>Uploading Image</Typography>
            </React.Fragment>;
        }else if(this.props.accountProfile !== undefined && this.props.accountProfile !== null){
            profileRender=<Avatar className='account-profile' alt='user profile' src={this.props.accountProfile}/>;
        }else{
            profileRender=<React.Fragment>
                    <Avatar className='account-profile' alt='user profile'>
                        <ReportIcon color='secondary' className='profile-missing-icon'/>
                    </Avatar>
                    <Typography align='center' variant='body1' color='error'>No Photo</Typography>
            </React.Fragment>;
        }
        return(
            <Grid container direction='column' alignItems='center' justify='center'>
            {profileRender}
            </Grid>
        );
    }
}
const mapStateToProps = state =>({
    profile: state.account.profile,
    uploadingProfile: state.account.uploadingProfile,
    editAccount: state.account.editAccount
});
export default connect(mapStateToProps,{
    attemptUploadUserProfile,
    cancelUploadProfile
})(AccountProfile);
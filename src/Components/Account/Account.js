import React, {Component} from 'react';
import './Account.css';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import {
    getAccountAttempt,
    getAccountFailed,
    getAccountSuccess,
    openEditAccount,
    updateAccount,
    resetUserStatusMessage,
    closeEditAccount
} from '../../Actions/Account';
import { EMPTY_STR } from '../../constants';
import AccountUsername from './AccountUsername';
import AccountFirstName from './AccountFirstName';
import AccountLastName from './AccountLastName';
import AccountBirthDate from './AccountBirthDate';
import AccountProfile from './AccountProfile';
import AccountEmail from './AccountEmail';
import AccountPassword from './AccountPassword';
class Account extends Component{
    onCloseUserSnackbar(e){
        this.props.resetUserStatusMessage(EMPTY_STR);
    }
    onClickEditButton(e){
        this.props.openEditAccount(this.props.account);
    }
    onClickCancelEdit(e){
        this.props.closeEditAccount(false);
    }
    onClickUpdateAccount(e){
        let data = {
            id: this.props.account.id,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            birthDate: this.props.birthDate,
            username: this.props.username,
            password: this.props.password,
            profile: (this.props.profile !== EMPTY_STR ? this.props.profile.fileData : null),
            history: this.props.history
        }
        this.props.updateAccount(data);
    }
    render(){
        let accountRender;
        if(this.props.fetchingAccount){
            accountRender = <React.Fragment>
                    <Grid item xs={12} className='mb-4 text-center'>
                        <CircularProgress color='primary'/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='subheading' align='center'>
                        Fetching Account Info...
                        </Typography>
                    </Grid>
            </React.Fragment>;
        }else if(this.props.accountErr){
            accountRender = <React.Fragment>
                <Grid item xs={12}>
                    <Typography variant='title' color='error' align='center'>
                    {this.props.accountErr}
                    </Typography>
                </Grid>
            </React.Fragment>;
        }else{
            accountRender= <React.Fragment>
                <Grid item
                    xs={12}
                    md={3}
                >
                    <AccountProfile accountProfile={this.props.account.profileStr} editAccount={this.props.editAccount}/>
                </Grid>
                <Grid item
                    xs={12}
                    md={9}
                    className='my-2'
                >
                    <AccountUsername accountUsername={this.props.account.username}/>
                    <AccountFirstName accountFirstName={this.props.account.firstName}/>
                    <AccountLastName accountLastName={this.props.account.lastName}/>
                    <AccountEmail accountEmail={this.props.account.email}/>
                    <AccountBirthDate accountBirthDate={this.props.account.birthDate}/>
                    <AccountPassword accountPassword={EMPTY_STR} />
                </Grid>
                <Grid item
                    xs={12}
                    className='mt-1 text-center'
                >
                {
                    this.props.editAccount ? 
                    <React.Fragment>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={this.onClickUpdateAccount.bind(this)}
                        >
                            Update
                        </Button>
                        <Button 
                            variant='contained' 
                            color='secondary'
                            className='mx-1'
                            onClick={this.onClickCancelEdit.bind(this)}
                        >
                            Cancel
                        </Button>
                    </React.Fragment>
                    :
                    <Button 
                        color='default' 
                        variant='contained' 
                        onClick={this.onClickEditButton.bind(this)}
                    >
                        Edit Account Info
                    </Button>
                }   
                </Grid>
            </React.Fragment>;
        }
        return(
            <div className='account min-80vh'>
            <Grid container
                direction='row'
                wrap='wrap'
                alignContent='center'
                alignItems='center'
                justify='center'
                className='py-4 h-100'
            >
                <Modal
                    className='modal-container'
                    open={this.props.updatingAccount}
                >
                    <div className='modal-paper'>
                        <Typography variant='subheading'>Updating Account</Typography>
                        <CircularProgress color='primary' size={60} thickness={5}/>
                    </div>
                </Modal>
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
                <Grid item xs={12} sm={12} md={10} lg={8} className='h-100'>
                    <Paper
                        elevation={16}
                        className='px-3 py-2 h-100'
                    >
                        <Grid container
                            direction='row'
                            wrap='wrap'
                            alignItems='center'
                            justify='center'
                        >
                            {accountRender}
                        </Grid>
                    </Paper>
                    </Grid>
            </Grid>
            </div>
        );
    }
}
const mapStateToProps = state =>({
    fetchingAccount: state.account.fetchingAccount,
    accountErr: state.account.accountErr,
    account: state.account.account,
    statusMessage: state.account.statusMessage,
    username: state.account.username,
    email: state.account.email,
    firstName: state.account.firstName,
    lastName: state.account.lastName,
    birthDate: state.account.birthDate,
    password: state.account.password,
    profile: state.account.profile,
    updatingAccount: state.account.updatingAccount,
    editAccount: state.account.editAccount
});
export default connect(mapStateToProps,{
    getAccountAttempt,
    getAccountFailed,
    getAccountSuccess,
    openEditAccount,
    updateAccount,
    resetUserStatusMessage,
    closeEditAccount
})(Account);
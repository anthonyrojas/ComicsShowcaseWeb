import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    usernameChanged
} from '../../Actions/Account';
import './Account.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { EMPTY_STR } from '../../constants';
class AccountUsername extends Component{
    onChangeUsername(e){
        this.props.usernameChanged(e.target.value);
    }
    render(){
        return(
            <React.Fragment>
            {
                this.props.editAccount ?
                <TextField 
                    value={this.props.username} 
                    onChange={this.onChangeUsername.bind(this)} 
                    fullWidth 
                    label='Username' 
                    variant='filled' 
                    className='mb-1'
                    required
                    error={this.props.usernameErr !== EMPTY_STR}
                    helperText={this.props.usernameErr}
                />
                :
                <React.Fragment>
                    <Typography 
                        variant='caption' 
                        className='text-underline'
                    >
                        Username
                    </Typography>
                    <Typography 
                        variant='display1'
                        className='mb-half text-white'
                    >
                    {this.props.accountUsername}
                    </Typography>
                </React.Fragment>
            }
            </React.Fragment>
        );
    }
}
const mapStateToProps = state =>({
    username: state.account.username,
    editAccount: state.account.editAccount,
    usernameErr: state.account.errors.username
});
export default connect(mapStateToProps,{
    usernameChanged
})(AccountUsername);
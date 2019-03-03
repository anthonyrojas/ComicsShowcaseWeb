import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    passwordChanged
} from '../../Actions/Account';
import './Account.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { EMPTY_STR } from '../../constants';
class AccountPassword extends Component{
    onChangePassword(e){
        this.props.passwordChanged(e.target.value);
    }
    render(){
        return(
            <React.Fragment>
            {
                this.props.editAccount ?
                <TextField 
                    value={this.props.password} 
                    onChange={this.onChangePassword.bind(this)} 
                    fullWidth 
                    label='Password' 
                    variant='filled' 
                    className='mb-1'
                    required
                    type='password'
                    helperText={this.props.passwordErr}
                    error={this.props.passwordErr !== EMPTY_STR}
                />
                :
                <React.Fragment>
                    <Typography 
                        variant='caption' 
                        className='text-underline'
                    >
                        Password
                    </Typography>
                    <Typography 
                        variant='subheading'
                        className='mb-half'
                        color='error'
                    >
                    [REDACTED]
                    </Typography>
                </React.Fragment>
            }
            </React.Fragment>
        );
    }
}
const mapStateToProps = state =>({
    password: state.account.password,
    editAccount: state.account.editAccount,
    passwordErr: state.account.errors.password
});
export default connect(mapStateToProps,{
    passwordChanged
})(AccountPassword);
import React, { Component } from 'react';
import {
    emailChanged
} from '../../Actions/Account';
import {connect} from 'react-redux';
import './Account.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
class AccountEmail extends Component {
    onChangeEmail(e){
        this.props.emailChanged(e.target.value);
    }
    render(){
        return(
            <React.Fragment>
            {
                this.props.editAccount ?
                <TextField 
                    value={this.props.email} 
                    onChange={this.onChangeEmail.bind(this)} 
                    fullWidth 
                    label='Email' 
                    variant='filled' 
                    className='my-1'
                    type='email'
                    required
                />
                :
                <React.Fragment>
                    <Typography 
                        variant='caption' 
                        className='text-underline'
                    >
                        Email
                    </Typography>
                    <Typography 
                        variant='subheading' 
                        className='mb-1'
                    >
                        {this.props.accountEmail}
                    </Typography>
                </React.Fragment>
            }
            </React.Fragment>
        );
    }
}
const mapStateToProps = state =>({
    email: state.account.email,
    editAccount: state.account.editAccount
});
export default connect(mapStateToProps,{
    emailChanged
})(AccountEmail);
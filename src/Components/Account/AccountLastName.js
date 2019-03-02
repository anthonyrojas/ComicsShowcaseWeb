import React, { Component } from 'react';
import {
    lastNameChanged
} from '../../Actions/Account';
import {connect} from 'react-redux';
import './Account.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
class AccountLastName extends Component {
    onChangeLastName(e){
        this.props.lastNameChanged(e.target.value);
    }
    render(){
        return(
            <React.Fragment>
            {
                this.props.editAccount ?
                <TextField 
                    value={this.props.lastName} 
                    onChange={this.onChangeLastName.bind(this)} 
                    fullWidth 
                    label='Last Name' 
                    variant='filled' 
                    className='my-1'
                    required
                />
                :
                <React.Fragment>
                    <Typography 
                        variant='caption' 
                        className='text-underline'
                    >
                        Last Name
                    </Typography>
                    <Typography 
                        variant='subheading' 
                        className='mb-1'
                    >
                        {this.props.accountLastName}
                    </Typography>
                </React.Fragment>
            }
            </React.Fragment>
        );
    }
}
const mapStateToProps = state =>({
    lastName: state.account.lastName,
    editAccount: state.account.editAccount
});
export default connect(mapStateToProps,{
    lastNameChanged
})(AccountLastName);
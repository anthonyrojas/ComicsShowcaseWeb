import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    firstNameChanged
} from '../../Actions/Account';
import './Account.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { EMPTY_STR } from '../../constants';
class AccountFirstName extends Component{
    onChangeFirstName(e){
        this.props.firstNameChanged(e.target.value);
    }
    render(){
        return(
            <React.Fragment>
                {
                    this.props.editAccount ?
                    <TextField 
                        value={this.props.firstName} 
                        label='First Name' 
                        fullWidth 
                        variant='filled' 
                        className='my-1' 
                        onChange={this.onChangeFirstName.bind(this)}
                        required
                        error={this.props.firstNameErr !== EMPTY_STR}
                        helperText={this.props.firstNameErr}
                    />
                    :
                    <React.Fragment>
                        <Typography 
                            variant='caption' 
                            className='text-underline'
                        >
                            First Name
                        </Typography>
                        <Typography 
                            variant='subheading' 
                            className='mb-1'
                        >
                            {this.props.accountFirstName}
                        </Typography>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }
}
const mapStateToProps = state =>({
    firstName: state.account.firstName,
    editAccount: state.account.editAccount,
    firstNameErr: state.account.errors.firstName
});
export default connect(mapStateToProps,{
    firstNameChanged
})(AccountFirstName);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    usernameChanged
} from '../../Actions/Account';
import './Account.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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
    editAccount: state.account.editAccount
});
export default connect(mapStateToProps,{
    usernameChanged
})(AccountUsername);
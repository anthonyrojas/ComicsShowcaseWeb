import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    birthDateChanged
} from '../../Actions/Account';
import './Account.css';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { EMPTY_STR } from '../../constants';
class AccountBirthDate extends Component{
    onBirthDateChanged(e){
        this.props.birthDateChanged(e.target.value);
    }
    render(){
        let jsDate = new Date(this.props.accountBirthDate);
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return(
            <React.Fragment>
            {
                this.props.editAccount ?
                <TextField 
                    value={this.props.birthDate} 
                    onChange={this.onBirthDateChanged.bind(this)} 
                    type='date' 
                    label='Birth Date' 
                    fullWidth 
                    variant='filled' 
                    className='my-1'
                    error={this.props.birthDateErr !== EMPTY_STR}
                    helperText={this.props.birthDateErr}
                    required
                />
                :
                <React.Fragment>
                    <Typography 
                        variant='caption' 
                        className='text-underline'
                    >
                        Birth Date
                    </Typography>
                    <Typography 
                        variant='subheading' 
                        className='mb-1'
                    >
                        {`${monthNames[jsDate.getMonth()]} ${jsDate.getDate()}, ${jsDate.getFullYear()}`}
                    </Typography>
                </React.Fragment>
            }
            </React.Fragment>
        );
    }
}
const mapStateToProps = state =>({
    birthDate: state.account.birthDate,
    editAccount: state.account.editAccount,
    birthDateErr: state.account.errors.birthDate
});
export default connect(mapStateToProps,{
    birthDateChanged
})(AccountBirthDate);
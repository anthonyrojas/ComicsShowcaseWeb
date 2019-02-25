import React, {Component} from 'react';
import './Account.css';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {
    getAccountAttempt,
    getAccountFailed,
    getAccountSuccess
} from '../../Actions/Account';
class Account extends Component{
    componentDidMount(){
        this.props.getAccountAttempt(true);
    }
    render(){
        return(
            <div className='account'>
                <Grid container
                    direction='row'
                    wrap='wrap'
                    alignContent='center'
                    alignItems='center'
                    justify='center'
                >
                    <Paper
                        elevation={16}
                        className='px-3 py-2'
                    >
                    {
                        this.props.fetchingAccount 
                        ? 
                        <React.Fragment>
                            <Grid item xs={12} className='mb-4'>
                                <CircularProgress color='primary'/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='subheading' align='center'>
                                Fetching Account Info...
                                </Typography>
                            </Grid>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Grid item
                                xs={12}
                                md={6}
                            >
                                <img src={this.props.account.profileStr} alt='account profile' />
                            </Grid>
                            <Grid item
                                xs={12}
                                md={6}
                            >
                                <Typography variant='subheading' align='center'>
                                {this.props.account.username}
                                </Typography>
                            </Grid>
                        </React.Fragment>
                    }
                    </Paper>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = state =>({
    fetchingAccount: state.account.fetchingAccount,
    accountErr: state.account.accountErr,
    account: state.account.account
});
export default connect(mapStateToProps,{
    getAccountAttempt,
    getAccountFailed,
    getAccountSuccess
})(Account);
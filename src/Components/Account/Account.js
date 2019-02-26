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
import { EMPTY_STR } from '../../constants';
class Account extends Component{
    componentDidMount(){
        this.props.getAccountAttempt(true);
    }
    render(){
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
                <Grid item xs={12} sm={12} md={10} lg={8} className='h-100'>
                    <Paper
                        elevation={16}
                        className='px-3 py-2 h-100'
                    >
                    {
                        this.props.fetchingAccount 
                        ? 
                        <React.Fragment>
                            <Grid container 
                                direction='column' 
                                wrap='wrap'
                                justify='center'
                                alignItems='center'
                            >
                                <Grid item xs={12} className='mb-4'>
                                    <CircularProgress color='primary'/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='subheading' align='center'>
                                    Fetching Account Info...
                                    </Typography>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            {
                                this.props.accountErr !== EMPTY_STR ? 
                                <Grid item xs={12}>
                                    <Typography variant='title' color='error' align='center'>
                                    {this.props.accountErr}
                                    </Typography>
                                </Grid>
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
                        </React.Fragment>
                    }
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
    account: state.account.account
});
export default connect(mapStateToProps,{
    getAccountAttempt,
    getAccountFailed,
    getAccountSuccess
})(Account);
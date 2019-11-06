import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    getAccountAttempt
} from '../../Actions/Account'
class PrivateRoute extends Component{
    componentDidMount(){
        this.props.getAccountAttempt(true);
    }
    componentDidUpdate(){
        if(!this.props.authenticated){
            this.forceUpdate();
        }
    }
    render(){
        const {component: Component, ...props} = this.props;
        return(
            <Route
            exact
            {...props}
            render={
                props=>(
                    this.props.authenticated ? 
                    <Component {...props} /> :
                    <Redirect to='/login' />
                )
            }
            />
        );
    }
}
const mapStateToProps = state =>({
    authenticated: state.account.authenticated
})
export default connect(mapStateToProps,{
    getAccountAttempt
})(PrivateRoute);
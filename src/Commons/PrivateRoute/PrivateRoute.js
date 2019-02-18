import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
class PrivateRoute extends Component{
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
})(PrivateRoute);
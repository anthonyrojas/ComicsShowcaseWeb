import React,{Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
class UserAuthRoute extends Component{
    componentDidUpdate(){
        if(this.props.authenticated){
            this.forceUpdate();
        }
    }
    render(){
        const {component: Component, ...props} = this.props;
        return(
            <Route
                exact
                {...props}
                render={props => (
                    this.props.authenticated ? 
                    <Redirect to='/account' /> :
                    <Component {...props} />
                )}
            />
        );
    }
}
const mapStateToProps = state =>({
    authenticated: state.account.authenticated
})
export default connect(mapStateToProps,{
})(UserAuthRoute);
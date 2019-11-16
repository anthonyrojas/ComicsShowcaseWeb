import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {
    toggleDisplayCreatorModal
} from '../../Actions/Creators';
class AddCreatorButton extends Component{
    render(){
        <React.Fragment>
            <Button variant='raised' color='primary'>
                Add Creator
            </Button>
        </React.Fragment>
    }
}
const mapStateToProps = state => ({
    displayCreatorModal: state.creators.displayCreatorModal
});
export default connect(mapStateToProps,{
    toggleDisplayCreatorModal
})(AddCreatorButton);
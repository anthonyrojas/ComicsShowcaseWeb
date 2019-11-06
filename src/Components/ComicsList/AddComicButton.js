import React, { Component } from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';

class AddComicButton extends Component {
    render() {
        return (
            <Button color='primary' variant='raised'>
                Add Comic Book
            </Button>
        )
    }
}

const mapStateToProps = state => ({
});
export default connect(mapStateToProps, {
})(AddComicButton)
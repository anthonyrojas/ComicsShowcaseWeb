import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import React, { Component } from 'react';
import {
    comicTitleChanged
} from '../../../Actions/Comics'
import { isEmptyOrNullOrUndefined } from '../../../Library/Helpers';
class Title extends Component {
    handleChangeTitle(e){
        this.props.comicTitleChanged(e.target.value);
    }
    render(){
        return(
            <Grid item xs={12} lg={10}>
                <TextField
                    variant='outlined'
                    label='Title'
                    fullWidth
                    value={this.props.title}
                    error={!isEmptyOrNullOrUndefined(titleErr)}
                    helperText={this.props.titleErr}
                    onChange={this.handleChangeTitle.bind(this)}
                />
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    title: state.comics.title,
    titleErr: state.comics.errors
});

export default connect(mapStateToProps, {
    comicTitleChanged
})(Title)
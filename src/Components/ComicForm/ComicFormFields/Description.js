import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux'
import {
    comicDescriptionChanged
} from '../../../Actions/Comics';
import { isEmptyOrNullOrUndefined } from '../../../Library/Helpers';
class Description extends Component {
    handleDescriptionChange(e){
        this.props.comicDescriptionChanged(e.target.value);
    }
    render(){
        return(
            <Grid item xs={12} lg={10}>
                <TextField 
                    variant='outlined'
                    label='Description'
                    fullWidth
                    value={this.props.description}
                    error={!isEmptyOrNullOrUndefined(descriptionErr)}
                    helperText={this.props.descriptionErr}
                    onChange={this.handleDescriptionChange.bind(this)}
                    multiline={true}
                />
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    description: state.comics.description,
    descriptionErr: state.comics.errors.description
})
export default connect(mapStateToProps, {
    comicDescriptionChanged
})(Description);
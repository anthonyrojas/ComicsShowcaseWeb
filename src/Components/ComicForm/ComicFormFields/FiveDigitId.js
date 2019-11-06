import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux'
import {
    comicFiveDigitIdChanged
} from '../../../Actions/Comics';
import { isEmptyOrNullOrUndefined } from '../../../Library/Helpers';

class FiveDigitId extends Component {
    handleFiveDigitChange(e){
        this.props.comicFiveDigitIdChanged(e.target.value);
    }
    render(){
        return(
            <Grid item xs={12} lg={10}>
                <TextField 
                    variant='outlined'
                    fullWidth
                    value={this.props.fiveDigitId}
                    onChange={this.handleFiveDigitChange.bind(this)}
                    error={!isEmptyOrNullOrUndefined(this.props.fiveDigitIdErr)}
                    helperText={this.props.fiveDigitIdErr}
                />
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    fiveDigitId: state.comics.fiveDigitId,
    fiveDigitIdErr: state.comics.errors.fiveDigitId
})
export default connect(mapStateToProps, {
    comicFiveDigitIdChanged
})(FiveDigitId);
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import {
    comicUPCChanged
} from '../../../Actions/Comics'
import { isEmptyOrNullOrUndefined } from '../../../Library/Helpers';

class Upc extends Component {
    handleUpcChanged(e){
        this.props.comicUPCChanged(e.target.value);
    }
    render(){
        return(
            <Grid item xs={12} lg={10}>
                <TextField
                    variant='outlined'
                    fullWidth
                    value={this.props.upc}
                    error={!isEmptyOrNullOrUndefined(this.props.upc)}
                    helperText={this.props.upcErr}
                    onChange={this.handleUpcChanged.bind(this)}
                />
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    upc: state.comics.upc,
    upcErr: state.comics.errors.upc
})
export default connect(mapStateToProps, {
    comicUPCChanged
})(Upc);
import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import {connect} from 'react-redux';
import {
    comicPublisherChanged
} from '../../../Actions/Comics'
import { isEmptyOrNullOrUndefined } from '../../../Library/Helpers';
import {
    PUBLISHER_MARVEL,
    PUBLISHER_DARK_HORSE,
    PUBLISHER_DC,
    PUBLISHER_IDW,
    PUBLISHER_IMAGE,
    PUBLISHER_OTHER,
    PUBLISHER_VALIANT,
    PUBLISHER_VERTIGO
} from '../../../Library/Enums';

const publishers = [
    PUBLISHER_DARK_HORSE,
    PUBLISHER_DC,
    PUBLISHER_IDW,
    PUBLISHER_IMAGE,
    PUBLISHER_MARVEL,
    PUBLISHER_VALIANT,
    PUBLISHER_VERTIGO,
    PUBLISHER_OTHER,
]

class Publisher extends Component {
    handlePublisherChange(e){
        this.props.comicPublisherChanged(e.target.value);
    }
    render(){
        return(
            <Grid item xs={12} lg={10}>
                <FormControl 
                    variant='outlined' 
                    fullWidth 
                    error={!isEmptyOrNullOrUndefined(this.props.publisherErr)}
                >
                    <InputLabel id='publisher-input-label'>Publisher</InputLabel>
                    <Select
                        labelId='publisher-input-label'
                        id='publisher-input'
                        fullWidth
                        value={this.props.publisher}
                    >
                        {
                            publishers.map((publisher)=>(
                                <MenuItem key={publisher.value} value={publisher.value}>{publisher.name}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>{this.props.publisherErr}</FormHelperText>
                </FormControl>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    publisher: state.comics.publisher,
    publisherErr: state.comics.errors.publisher
})
export default connect(mapStateToProps,{
    comicPublisherChanged
})(Publisher);
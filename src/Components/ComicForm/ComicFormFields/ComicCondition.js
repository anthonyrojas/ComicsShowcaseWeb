import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux';
import {
    comicConditionChanged
} from '../../../Actions/Comics'
import {
    COMIC_CONDITION_GOOD,
    COMIC_CONDITION_MINT,
    COMIC_CONDITION_NEAR_MINT,
    COMIC_CONDITION_NEW,
    COMIC_CONDITION_POOR
} from '../../../Library/Enums'
import { isEmptyOrNullOrUndefined } from '../../../Library/Helpers';

const conditionOptions = [
    COMIC_CONDITION_NEW,
    COMIC_CONDITION_MINT,
    COMIC_CONDITION_NEAR_MINT,
    COMIC_CONDITION_GOOD,
    COMIC_CONDITION_POOR
];

class ComicCondition extends Component {
    render(){
        return(
            <Grid item xs={12} lg={10}>
                <FormControl
                    variant='outlined'
                    fullWidth
                    error={!isEmptyOrNullOrUndefined(this.props.comicConditionErr)}
                >
                    <InputLabel id='comic-condition-input-label'>
                        Comic Condition
                    </InputLabel>
                    <Select
                        labelId='comic-condition-input-label'
                        id='comic-condition-input'
                        fullWidth
                        value={this.props.comicCondition}
                    >
                        {
                            conditionOptions.map((condition)=>(
                                <MenuItem key={condition.value} value={condition.value}>
                                    {condition.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>{this.props.comicConditionErr}</FormHelperText>
                </FormControl>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    comicCondition: state.comics.condition,
    comicConditionErr: state.comics.errors.condition
});
export default connect(mapStateToProps,{
    comicConditionChanged
})(ComicCondition);
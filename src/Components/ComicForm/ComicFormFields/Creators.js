import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';
import {connect} from 'react-redux';
import {
    comicCreatorsChanged
} from '../../../Actions/Comics';
import {
    getCreators
} from '../../../Actions/Creators'
import { isEmptyOrNullOrUndefined } from '../../../Library/Helpers';

class Creators extends Component{
    handleCreatorsChange(e){
        this.props.comicCreatorsChanged(e.target.value);
    }
    refreshCreators(){
        this.props.getCreators(true);
    }
    render(){
        return(
            <Grid item xs={12} lg={10}>
                <FormControl
                    variant='outlined'
                    fullWidth
                    error={!isEmptyOrNullOrUndefined(this.props.comicsCreatorsErr)}
                >
                    <InputLabel variant='outlined' id="creators-input-label">
                        Creators
                    </InputLabel>
                    <Select
                        labelId='creators-input-label'
                        fullWidth
                        id='creators-input'
                        multiple
                        input={<OutlinedInput 
                            fullWidth 
                            id='select-multiple-creators' 
                        />}
                        onChange={this.handleCreatorsChange.bind(this)}
                        renderValue={
                            selected => (
                                <React.Fragment>
                                    {
                                        selected.map(creator => (
                                            <Chip
                                                key={creator.id}
                                                label={`${creator.firstName} ${creator.lastName}`}
                                            />
                                        ))
                                    }
                                </React.Fragment>
                            )
                        }
                    >
                        {
                            creators.map((creator)=>(
                                <MenuItem value={creator.id}>
                                    {creator.firstName} {creator.lastName}
                                </MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>{this.props.comicsCreatorsErr}</FormHelperText>
                </FormControl>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    creators: state.creators.creators,
    comicsCreators: state.comics.creators,
    comicsCreatorsErr: state.comics.errors.creators,
    fetchingCreators: state.creators.fetchingCreators
})
export default connect(mapStateToProps, {
    comicCreatorsChanged,
    getCreators
})(Creators);
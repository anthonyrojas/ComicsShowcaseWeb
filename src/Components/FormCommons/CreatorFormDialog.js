import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {
    creatorFirstNameChanged,
    creatorLastNameChanged,
    addCreator
} from '../../Actions/Creators';
import { isEmptyOrNullOrUndefined } from '../../Library/Helpers';

class CreatorFormDialog extends Component{
    handleFirstNameChange(e){
        this.props.creatorFirstNameChanged(e.target.value);
    }
    handleLastNameChanged(e){
        this.props.creatorLastNameChanged(e.target.value);
    }
    render(){
        return(
            <Dialog open={this.props.displayCreatorModal}>
                <DialogTitle>Add New Creator</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter information for a new creator.
                    </DialogContentText>
                    <Grid
                        container
                        justify='center'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Grid item xs={12} lg={10}>
                            <TextField 
                                label='First Name'
                                value={this.props.firstName}
                                error={!isEmptyOrNullOrUndefined(this.props.firstNameErr)}
                                helperText={this.props.firstNameErr}
                                onChange={this.handleFirstNameChange.bind(this)}
                            />
                            <TextField 
                                label='Last Name'
                                value={this.props.lastName}
                                error={!isEmptyOrNullOrUndefined(this.props.lastNameErr)}
                                helperText={this.props.lastNameErr}
                                onChange={this.handleLastNameChanged.bind(this)}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' color='primary'>Add</Button>
                    <Button variant='text' color='secondary'>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}
const mapStateToProps = state => ({
    displayCreatorModal: state.creators.displayCreatorModal,
    firstName: state.creators.firstName,
    lastName: state.creators.lastName,
    firstNameErr: state.creators.errors.firstName,
    lastNameErr: state.creators.errors.lastName
})
export default connect(mapStateToProps, {
    creatorFirstNameChanged,
    creatorLastNameChanged,
    addCreator
})(CreatorFormDialog);
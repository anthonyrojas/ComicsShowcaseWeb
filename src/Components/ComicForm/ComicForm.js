import React, { Component } from 'react'
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Creators from './ComicFormFields/Creators';
import Description from './ComicFormFields/Description';
import FiveDigitId from './ComicFormFields/FiveDigitId';
import Publisher from './ComicFormFields/Publisher';
import Title from './ComicFormFields/Title';
import Upc from './ComicFormFields/Upc';
import ComicCondition from './ComicFormFields/ComicCondition';

class ComicForm extends Component {
    render() {
        return (
            <Grid container
            alignContent='center'
            alignItems='center'
            justify='center'>
                <Title />
                <Description />
                <FiveDigitId />
                <Upc />
                <Publisher />
                <Creators />
                <ComicCondition />
            </Grid>
        )
    }
}
const mapStateToProps = state => ({
    comicErrors: state.comics.errors,
    title: state.comics.title,
    description: state.comics.description,
    upc: state.comics.upc,
    fiveDigitId: state.comics.fiveDigitId,
    publisher: state.comics.publisher,
    condition: state.comics.condition
});
export default connect(mapStateToProps, {
})(ComicForm);
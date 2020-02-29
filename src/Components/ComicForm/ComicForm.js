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
import AddCreatorButton from '../FormCommons/AddCreatorButton';
import Button from '@material-ui/core/Button';
import {
    addComicAttempt,
    updateComicAttempt
} from '../../Actions/Comics';

class ComicForm extends Component {
    addComic(){
        this.props.addComicAttempt({
            title: this.props.title,
            description: this.props.description,
            upc: this.props.upc,
            fiveDigitId: this.props.fiveDigitId,
            publisher: this.props.publisher,
            condition: this.props.condition
        });
    }
    updateComic(){
        this.props.updateComicAttempt({
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            upc: this.props.upc,
            fiveDigitId: this.props.fiveDigitId,
            publisher: this.props.publisher,
            condition: this.props.condition
        });
    }
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
                <AddCreatorButton />
                <ComicCondition />
                {
                    this.props.id < 0 ?
                    <Button color='primary' onClick={this.addComic.bind(this)}>Submit</Button>
                    :
                    <Button color='primary' onClick={this.updateComic.bind(this)}>Submit</Button>
                }
            </Grid>
        )
    }
}
const mapStateToProps = state => ({
    id: state.comic.id,
    comicErrors: state.comics.errors,
    title: state.comics.title,
    description: state.comics.description,
    upc: state.comics.upc,
    fiveDigitId: state.comics.fiveDigitId,
    publisher: state.comics.publisher,
    condition: state.comics.condition
});
export default connect(mapStateToProps, {
    addComicAttempt,
    updateComicAttempt
})(ComicForm);
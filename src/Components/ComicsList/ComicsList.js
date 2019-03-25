import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {getComicsAttempt} from '../../Actions/Comics';

class ComicsList extends Component {

  render() {
    return (
      <div className='comics-list'>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    comicsList: state.comics.comics
});

const mapDispatchToProps = {
    getComicsAttempt
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicsList);

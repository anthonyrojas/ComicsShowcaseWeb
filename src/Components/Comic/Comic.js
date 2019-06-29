import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
class Comic extends Component {
  render() {
    return (
      <div>
        <Grid
            container
            direction='row'
            wrap='wrap'
            justify='center'
            className='h-100 py-4'
        >
        </Grid>
      </div>
    )
  }
}
export default Comic;
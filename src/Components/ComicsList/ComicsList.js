import React, { Component } from 'react';
import './ComicsList.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {
    getComicsAttempt,
    getComicConditions,

} from '../../Actions/Comics';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';

class ComicsList extends Component {

  render() {
    return (
      <div className='comics-list'>
        <Grid
            direction='row'
            wrap='wrap'
            alignContent='center'
            justify='center'
            className='h-100 py-4'
        >
            <Modal
                className='modal-container'
                open={this.props.comicsLoading}
            >
                <div className='modal-paper'>
                    <Typography variant='subheading'>Loading Comics</Typography>
                    <CircularProgress color='primary' size={60} thickness={5}/>
                </div>
            </Modal>
            <Grid item xs={12} md={10} md={8}>
                <Paper
                    elevation={16}
                    className='px-3 py-2 h-100'
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Title
                                </TableCell>
                                <TableCell>
                                    UPC
                                </TableCell>
                                <TableCell>
                                    Publisher
                                </TableCell>
                                <TableCell>
                                    Issue Ext.
                                </TableCell>
                            </TableRow>
                            <TableBody>
                                {
                                    this.props.comicsList.map((comic)=>{
                                        <TableRow key={comic.id}>
                                            <TableCell colSpan={2}>
                                                {comic.title}
                                            </TableCell>
                                            <TableCell>
                                                {comic.upc}
                                            </TableCell>
                                            <TableCell>
                                                {comic.publisherStruct.name}
                                            </TableCell>
                                            <TableCell>
                                                {comic.fiveDigitId}
                                            </TableCell>
                                        </TableRow>
                                    })
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5,10,15]}
                                        rowsPerPage={this.props.comicLimit}
                                        count={this.props.comicsCount}
                                        page={this.props.comicsPaginate}
                                        SelectProps={{
                                            native: true
                                        }}
                                    >

                                    </TablePagination>
                                </TableRow>
                            </TableFooter>
                        </TableHead>
                    </Table>
                </Paper>
            </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    comicsList: state.comics.comics
});

const mapDispatchToProps = {
    getComicsAttempt,
    getComicConditions
}

export default connect(mapStateToProps, mapDispatchToProps)(ComicsList);

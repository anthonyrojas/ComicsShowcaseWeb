import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {
    getComicsAttempt,
    getComicConditions
} from '../../Actions/Comics';
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
import TableFooter from '@material-ui/core/TableFooter';
import Typography from '@material-ui/core/Typography';

class ComicsTable extends Component {
    state = {
        rowsPerPage: 5,
        page: 0
    }
    componentDidMount(){
        this.props.getComicsAttempt();
    }
    onChangePaginationPage(e){
        this.setState({
            ...this.state,
            page: e.target.value
        });
    }
    onChangePaginationRows(e){
        let page = this.state.page;
        const rowCount = e.target.value;
        const totalCount = this.props.comicsList.length;
        while((rowCount * page) > totalCount){
            let page = page - 1;
        }
        this.setState({
            ...this.state,
            rowsPerPage: rowCount,
            page: page
        });
    }
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
                                    this.props.comicsList.map((comic)=>(
                                        <TableRow key={comic.id}>
                                            <TableCell colSpan={2}>
                                                <Link to={`/comic/${comic.id}`}>
                                                    {comic.title}
                                                </Link>
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
                                    ))
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5,10,15]}
                                        rowsPerPage={this.state.rowsPerPage}
                                        count={this.props.comicsList.length}
                                        page={this.state.page}
                                        onChangePage={this.onChangePaginationPage.bind(this)}
                                        onChangeRowsPerPage={this.onChangePaginationRows.bind(this)}
                                    />
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
    comicsList: state.comics.comicsList,
    comicsLoading: state.comics.comicsLoading,
    comicsErr: state.comics.comicsErr,
    comicConditions: state.comics.comicConditions
});

const mapDispatchToProps = {
    getComicsAttempt,
    getComicConditions
}
export default connect(mapStateToProps, mapDispatchToProps)(ComicsTable);
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Parallax from '../../Commons/Parallax/Parallax';
import './Home.css';
const home = (props) => (
    <div className="home">
        <div className="main-banner-overlay mt-2">
            <div className="main-banner">
            <Typography variant="display4" gutterBottom style={{color: '#FFF'}}>Comics Showcase</Typography>
            </div>
        </div>
        <Grid container direction='row' alignContent='center' alignItems='center' justify='center' className='my-2'>
            <Grid item xs={12} lg={10} xl={8}>
                <Paper className="px-1 py-3" elevation={6} square>
                    <Typography variant='display1' align='center' color='textPrimary' gutterBottom>Welcome</Typography>
                    <Typography variant='subheading' align='left' color='default'>
                    You have found a place for you to proudly display your comic collection without shame and keep track of it. This site tries to accomodate as many type of fans and collecion items as possible. Our the goal of this website is that you are not only able to keep an inventory but also simplify the process of selling your items if you decide to do so. Enjoy and be nice! 
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
        <Parallax image={require('./Assets/watchmen-bg.png')}/>
        <Grid container direction='row' justify='center' alignContent='center' alignItems='center' spacing={32}>
        </Grid>
    </div>
);

export default home;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Parallax from '../../Commons/Parallax/Parallax';
import './Home.css';
import { Icon } from '@material-ui/core';
const home = (props) => (
    <div className="home">
        <div className="main-banner-overlay mt-2">
            <div className="main-banner">
            <Typography variant="display4" align='center' gutterBottom style={{color: '#FFF'}}>Comics Showcase</Typography>
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
        <Parallax classes='my-1' image={require('./Assets/watchmen-bg.png')}/>
        <Grid container direction='row' justify='center' alignContent='center' alignItems='center' className='my-3' wrap='wrap' spacing={0}>
            <Grid item xs={12} sm={10} md={8} lg={4} className='px-half py-half'>
                <Paper className='px-1 py-2 text-center grd-blue-to-green-br' elevation={24} square>
                    <Icon style={{fontSize: 52}} className='i-circle-purple' color='inherit'>library_books</Icon>
                    <Typography variant='headline' align='center' gutterBottom>Display Your Collection</Typography>
                    <hr />
                    <Typography variant='subheading' align='left' color='default'>
                        You can grow and update your collection online to boost your presence here. Don't feel shy or hide the love for your hobby of reading, viewing, and collecting comic book related materials.
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={4} className='px-half py-half'>
                <Paper className='px-1 py-2 text-center grd-blue-to-green-br' elevation={24} square>
                    <Icon style={{fontSize: 52}} className='i-circle-purple' color='inherit'>supervisor_account</Icon>
                    <Typography variant='headline' align='center' gutterBottom>Find/Invite Your Friends</Typography>
                    <hr />
                    <Typography variant='subheading' align='left' color='default'>
                        Bring along your friends to join you and everyone else here. Or, if your curious, you can always search them up to see if they are already here via email. Everyone who loves comics are welcome here!
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={4} className='px-half py-half'>
                <Paper className='px-1 py-2 text-center grd-blue-to-green-br' elevation={24} square>
                    <Icon style={{fontSize: 52}} className='i-circle-purple' color='inherit'>monetization_on</Icon>
                    <Typography variant='headline' align='center' gutterBottom>Prep Your Sales</Typography>
                    <hr />
                    <Typography variant='subheading' align='left' color='default'>
                        In the future, should this take off in popularity, perhaps a marketplace functionality will be added. Otherwise, you can direct your potential buyers to your profile to view what you've got to sell.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </div>
);

export default home;
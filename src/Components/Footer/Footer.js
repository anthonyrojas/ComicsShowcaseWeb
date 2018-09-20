import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Footer.css';
const footer = (props)=>(
    <footer>
        <Grid container alignContent='center' alignItems='center' justify='center' wrap='wrap' spacing={0} className='footer-content'>
            <Grid item xs={12} sm={12} md={8} lg={4}>
                <Card square className='m-half'>
                    <CardContent>
                        <Typography component='p' variant='body2' align='center'>
                            Made for the purpose of bringing together comic fans. Please enjoy your visit. It is expected of you to behave and respect others. User information will never be sold or misused.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={4}>
                <Card square className='m-half'>
                    <CardContent>
                        <Typography component='h3' variant='headline' align='center'>Comics Showcase</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8} lg={4}>
                <Card square className='m-half'>
                    <CardContent>
                        <Typography component='p' variant='body2' align='center'>
                            I do not own any images displayed on this website. Images are provided via users and the internet. Any images pertaining to any publication is owned by them.
                        </Typography>
                    </CardContent>
                </Card>            
            </Grid>
        </Grid>
        <div className='footer-copyright'>
            <Typography component='p' align='center' variant='body1'>&copy; 2018</Typography>
        </div>
    </footer>
);
export default footer;
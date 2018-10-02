import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Home from './Components/Home/Home';
import store from './store';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Footer from './Components/Footer/Footer';
import { AppBar, Toolbar, Drawer, Typography, List, ListItem, ListItemText, ListItemIcon, Icon } from '@material-ui/core';
import {Home as HomeIcon} from '@material-ui/icons' ;
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#42A5F5',
      main: '#1E88E5',
      dark: '#0D47A1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <AppBar position="fixed">
              <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit">Comics Showcase</Typography>
              </Toolbar>
            </AppBar>
            <Drawer open={true}>
              <div
                tabIndex={0}
                role="button"
                style={{minWidth: '18vw'}}
              >
                <List component='nav'>
                  <ListItem button>
                    <ListItemIcon><Icon>home</Icon></ListItemIcon>
                    <ListItemText primary='Home'></ListItemText>
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon><Icon>account_circle</Icon></ListItemIcon>
                    <ListItemText primary='Account'></ListItemText>
                  </ListItem>
                </List>
              </div>
            </Drawer>
            <Router>
              <Switch>
                <Route exact path='/' component={Home}></Route>
              </Switch>
            </Router>
            <Footer />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;

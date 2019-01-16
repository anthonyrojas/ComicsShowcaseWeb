import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Sidenav from './Components/Sidenav/Sidenav';
import store from './store';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Footer from './Components/Footer/Footer';
import { AppBar, Toolbar, Drawer, Typography, List, ListItem, ListItemText, ListItemIcon, Icon } from '@material-ui/core';
import {Home as HomeIcon} from '@material-ui/icons' ;
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Aux from './HOC/AuxHOC';
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
  constructor(props){
    super(props);
    this.state = {
      navDrawerOpen: false
    }
  }
  toggleNavDrawer = ()=>{
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    })
  }
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Router>
              <Aux>
                <Navbar />
                <Sidenav />
                <Switch>
                  <Route exact path='/' component={Home}></Route>
                  <Route exact path='/login' component={Login}></Route>
                  <Route exact path='/register' component={Register}></Route>
                </Switch>
              </Aux>
            </Router>
            <Footer />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;

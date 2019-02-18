import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch, Link, withRouter} from 'react-router-dom';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Sidenav from './Components/Sidenav/Sidenav';
import store from './store';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import Footer from './Components/Footer/Footer';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Account from './Components/Account/Account';
import Aux from './HOC/AuxHOC';
import UserAuthRoute from './Commons/UserAuthRoute/UserAuthRoute';
import PrivateRoute from './Commons/PrivateRoute/PrivateRoute';
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
                  <UserAuthRoute path='/login' component={Login} />
                  <UserAuthRoute path='/register' component={Register} />
                  <PrivateRoute path='/account' component={Account} />
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

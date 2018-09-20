import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Components/Home/Home';
import store from './store';
import './App.css';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Footer from './Components/Footer/Footer';

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
                <Typography variant="title" color="inherit">Comics Showcase</Typography>
              </Toolbar>
            </AppBar>
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

import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Snackbars from './Snackbars';
import Movies from './Movies';
import TVShows from './TVShows';
import Sidebar from '../components/sidebar/Sidebar';

const App = () => {
  const darkMode = useSelector(state => state.sidebar.darkMode);

  const theme = createMuiTheme({
    palette: { type: darkMode ? 'dark' : 'light' },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router basename="/">
          <Sidebar>
            <Switch>
              <Route exact path="/">
                <Movies />
              </Route>
              <Route exact path="/movies">
                <Movies />
              </Route>
              <Route exact path="/tvshows">
                <TVShows />
              </Route>
            </Switch>
          </Sidebar>
        </Router>
        <Snackbars />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default App;

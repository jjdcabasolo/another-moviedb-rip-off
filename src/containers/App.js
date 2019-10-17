import React, { useLayoutEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Snackbars from './Snackbars';
import Movies from './Movies';
import TVShows from './TVShows';
import Sidebar from '../components/sidebar/Sidebar';

import { browserActions } from '../reducers/ducks';

const App = () => {
  const darkMode = useSelector(state => state.sidebar.darkMode);
  const height = useSelector(state => state.browser.height);
  const width = useSelector(state => state.browser.width);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const updateSize = () => {
      dispatch(browserActions.changeBrowserSize(window.innerHeight, window.innerWidth));
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const theme = createMuiTheme({
    palette: { type: darkMode ? 'dark' : 'light' },
    browserSize: { width, height },
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

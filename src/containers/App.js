import React, { useLayoutEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Snackbars from './Snackbars';
import Sidebar from '../components/navigation/sidebar/Sidebar';
import Appbar from '../components/navigation/appbar/Appbar';
import ResponsiveComponent from '../utils/components/ResponsiveComponent';

import { browserActions } from '../reducers/ducks';

import { routes } from '../routes';

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

  const renderRoutes = () => (
    <Switch>
      { routes.map(e => (
        <Route exact path={e.path}>
          {e.component}
        </Route>
      )) }
    </Switch>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Router basename="/">
          <ResponsiveComponent
            mobileComponent={<Appbar>{renderRoutes()}</Appbar>}
            tabletComponent={<Sidebar>{renderRoutes()}</Sidebar>}
            desktopComponent={<Sidebar>{renderRoutes()}</Sidebar>}
          />
        </Router>
        <Snackbars />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default App;

import React, { useLayoutEffect } from 'react';

import { HashRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';

import Snackbars from './Snackbars';
import InitAPICalls from './InitAPICalls';
import Sidebar from '../components/navigation/sidebar/Sidebar';
import Appbar from '../components/navigation/appbar/Appbar';
import Helmet from '../components/navigation/Helmet';
import ResponsiveComponent from '../utils/components/ResponsiveComponent';

import { browserActions } from '../reducers/ducks';

import Routes from '../routes';

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
  }, [dispatch]);

  const theme = createMuiTheme({
    palette: {
      primary: { main: darkMode ? amber[200] : amber[500] },
      type: darkMode ? 'dark' : 'light',
    },
    browserSize: { width, height },
  });

  return (
    <>
      <Helmet isDefault />

      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router basename="/">
            <ResponsiveComponent
              mobileComponent={<Appbar><Routes/></Appbar>}
              tabletComponent={<Sidebar><Routes/></Sidebar>}
              desktopComponent={<Sidebar><Routes/></Sidebar>}
            />
          </Router>
          <Snackbars />
          <InitAPICalls />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </>
  );
};

export default App;

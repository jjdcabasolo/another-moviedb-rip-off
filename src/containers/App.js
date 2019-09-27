import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import MomentUtils from '@date-io/moment';
// import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider, lighten } from '@material-ui/core/styles';

import Snackbars from './Snackbars';
import Home from './Home';
import Sidebar from '../components/sidebar/Sidebar';

const App = () => {
  const darkMode = useSelector(state => state.sidebar.darkMode);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: darkMode ? lighten('#015893', 0.6) : '#015893',
      },
      secondary: {
        main: '#5FAFE5',
      },
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      {/* <MuiPickersUtilsProvider utils={MomentUtils}> */}
        <Router basename="/">
          <Sidebar>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/movies" component={Home} />
            </Switch>
          </Sidebar>
        </Router>
      <Snackbars />
      {/* </MuiPickersUtilsProvider> */}
    </MuiThemeProvider>
  );
};

export default App;

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  moviesReducer,
  sidebarReducer,
  snackbarReducer,
  browserReducer,
} from './ducks';

const appReducer = combineReducers({
  router: routerReducer,
  browser: browserReducer,
  movies: moviesReducer,
  sidebar: sidebarReducer,
  snackbar: snackbarReducer,
});

const rootReducer = (state, action) => appReducer(action.type === 'CLEAR_REDUX_STATES' ? undefined : state, action);

export default rootReducer;

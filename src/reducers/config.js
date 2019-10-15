import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  moviesReducer,
  sidebarReducer,
  snackbarReducer,
} from './ducks';

const appReducer = combineReducers({
  router: routerReducer,
  movies: moviesReducer,
  sidebar: sidebarReducer,
  snackbar: snackbarReducer,
});

const rootReducer = (state, action) => appReducer(action.type === 'CLEAR_REDUX_STATES' ? undefined : state, action);

export default rootReducer;

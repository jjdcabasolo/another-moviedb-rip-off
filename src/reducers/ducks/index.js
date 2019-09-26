import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { sidebarReducer } from './sidebar';
import { snackbarReducer } from './snackbar';

const appReducer = combineReducers({
  router: routerReducer,
  sidebar: sidebarReducer,
  snackbar: snackbarReducer,
});

const rootReducer = (state, action) => appReducer(action.type === 'USER_LOGOUT' ? undefined : state, action);

export default rootReducer;

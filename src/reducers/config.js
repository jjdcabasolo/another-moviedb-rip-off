import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import {
  browserReducer,
  moviesReducer,
  sidebarReducer,
  snackbarReducer,
  tmdbConfigReducer,
  tvShowsReducer,
} from "./ducks";

const appReducer = combineReducers({
  router: routerReducer,
  browser: browserReducer,
  movies: moviesReducer,
  sidebar: sidebarReducer,
  snackbar: snackbarReducer,
  tmdbConfig: tmdbConfigReducer,
  tvShows: tvShowsReducer,
});

const rootReducer = (state, action) =>
  appReducer(action.type === "CLEAR_REDUX_STATES" ? undefined : state, action);

export default rootReducer;

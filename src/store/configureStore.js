import { createStore, compose, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";

import rootReducer from "../reducers/config";

export const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(reduxThunk, routerMiddleware(history)),
    window.devToolsExtension
      ? window.devToolsExtension({ trace: true, traceLimit: 25 })
      : (f) => f
  )
);

if (module.hot) {
  //Enable webpack hot module replacement for reducers
  module.hot.accept("../reducers/ducks", () => {
    const nextRootReducer = require("../reducers/ducks").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;

import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import NotFound from "../components/notFound/NotFound";
import ComponentLoader from "../components/common/ComponentLoader";

const Movies = lazy(() => import("../containers/Movies"));
const TVShows = lazy(() => import("../containers/TVShows"));

const renderComponent = (component) => (
  <Suspense fallback={<ComponentLoader />}>
    {component === "movies" && <Movies />}
    {component === "tvshows" && <TVShows />}
  </Suspense>
);

const Routes = () => (
  <Switch>
    <Redirect exact from="/" to="/movies" />
    <Route exact path="/movies">
      {renderComponent("movies")}
    </Route>
    <Route exact path="/movies/search">
      {renderComponent("movies")}
    </Route>
    <Route exact path="/movies/:movieId">
      {renderComponent("movies")}
    </Route>
    <Route exact path="/movies/:movieId/:section">
      {renderComponent("movies")}
    </Route>

    <Route exact path="/tvshows">
      {renderComponent("tvshows")}
    </Route>
    <Route exact path="/tvshows/search">
      {renderComponent("tvshows")}
    </Route>
    <Route exact path="/tvshows/:tvShowId">
      {renderComponent("tvshows")}
    </Route>
    <Route exact path="/tvshows/:tvShowId/:section">
      {renderComponent("tvshows")}
    </Route>

    <Route>
      <NotFound />
    </Route>
  </Switch>
);

export default Routes;

import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import NotFound from '../components/notFound/NotFound';
import ComponentLoader from '../components/common/ComponentLoader';

const Movies = lazy(() => import('../containers/Movies'));
const TVShows = lazy(() => import('../containers/TVShows'));

const renderComponent = component => (
  <Suspense fallback={<ComponentLoader />}>
    {component === 'movies' && <Movies />}
    {component === 'tvshows' && <TVShows />}
  </Suspense>
);

const Routes = () => {
  return (
    <Switch>
      {/* { routes.map(e => (
        <>
          <Route exact path={e.path}>
            <Suspense fallback={<ComponentLoader />}>
              {e.component}
            </Suspense>
          </Route>
          { e.child && (
            <Route exact path={e.child.path}>
              {e.child.component}
            </Route>
          )}
        </>
      )) }
      <Route component={NotFound} /> */}
      <Redirect exact from='/' to='/movies'/>
      <Route exact path="/movies">
        {renderComponent('movies')}
      </Route>
      <Route exact path="/movies/:movieId">
        {renderComponent('movies')}
      </Route>
      <Redirect exact from='/' to='/tvshows'/>
      <Route exact path="/tvshows">
        {renderComponent('tvshows')}
      </Route>
      <Route exact path="/tvshows/:movieId">
        {renderComponent('tvshows')}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;

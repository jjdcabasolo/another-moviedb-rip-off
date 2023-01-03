import React from "react";
import { Route } from "react-router";
import { routes as config } from "./config";

const generateSitemapRoutes = () => {
  let childrenRoutes = [];
  config.forEach(
    (e) =>
      (childrenRoutes = childrenRoutes.concat([
        <Route path={e.path} key={e.path} />,
      ]))
  );

  return <Route>{childrenRoutes}</Route>;
};

export default generateSitemapRoutes();

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import Typography from "../custom/base/Typography";

const useStyles = makeStyles((theme) => ({
  loaderContainerDesktop: {
    height: "100vh",
    [theme.breakpoints.only("xs")]: {
      height: `calc(100vh - ${theme.spacing(9)}px)`,
    },
  },
  loaderContainerDrawerOpen: {
    height: `calc(100vh - ${theme.spacing(7)}px)`,
  },
  loaderContainerDrawerClosed: {
    height: `calc(100vh - ${theme.spacing(10)}px)`,
  },
  loader: {
    color: theme.palette.colorScheme.divider,
  },
}));

const ComponentLoader = ({
  isItemDrawerOpen,
  location,
  label = "Hang tight! Contents are loading.",
}) => {
  const classes = useStyles();

  const [showReload, setShowReload] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowReload(true), 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Grid
      alignItems="center"
      className={clsx({
        [classes.loaderContainerDesktop]: location === "itemcontainer",
        [classes.loaderContainerDrawerOpen]:
          location === "itemdrawer" && isItemDrawerOpen,
        [classes.loaderContainerDrawerClosed]:
          location === "itemdrawer" && !isItemDrawerOpen,
      })}
      container
      direction="column"
      justify="center"
      spacing={2}
    >
      <Grid item>
        <CircularProgress size={80} thickness={4} className={classes.loader} />
      </Grid>
      <Grid item>
        <Typography variant="body2">{label}</Typography>
      </Grid>
      {showReload && (
        <>
          <Grid item>
            <Typography variant="body2">
              Contents taking too long to load? Try reloading.
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={handleReload}>Reload page</Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

ComponentLoader.defaultProps = {
  isItemDrawerOpen: false,
  label: "Hang tight! Contents are loading.",
  location: "",
};

ComponentLoader.propTypes = {
  isItemDrawerOpen: PropTypes.bool,
  label: PropTypes.string,
  location: PropTypes.string,
};

export default ComponentLoader;

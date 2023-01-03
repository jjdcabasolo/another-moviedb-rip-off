import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import FowardIcon from "../../assets/icons/forward";

import Fab from "../custom/base/Fab";

const useStyles = makeStyles((theme) => ({
  fab: {
    backgroundColor: theme.palette.colorScheme.background,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.colorScheme.background,
    },
  },
  seeMoreContainer: {
    height: "100%",
    width: theme.spacing(20),
  },
}));

const SeeMoreIconButton = ({ handleSeeMore }) => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      className={classes.seeMoreContainer}
      container
      direction="column"
      item
      justify="center"
      onClick={handleSeeMore}
      spacing={2}
      wrap="nowrap"
      xs={12}
    >
      <Grid item>
        <Fab className={classes.fab}>
          <FowardIcon />
        </Fab>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center" noWrap>
          Show all
        </Typography>
      </Grid>
    </Grid>
  );
};

SeeMoreIconButton.propTypes = {
  handleSeeMore: PropTypes.func.isRequired,
};

export default SeeMoreIconButton;

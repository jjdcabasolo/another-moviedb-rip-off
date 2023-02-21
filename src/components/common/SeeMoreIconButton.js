import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Fab from "../custom/base/Fab";
import Typography from "../custom/base/Typography";
import FowardIcon from "../../assets/icons/forward";

const useStyles = makeStyles((theme) => ({
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
        <Fab>
          <FowardIcon />
        </Fab>
      </Grid>
      <Grid item>
        <Typography variant="body1" align="center" noWrap>
          show all
        </Typography>
      </Grid>
    </Grid>
  );
};

SeeMoreIconButton.propTypes = {
  handleSeeMore: PropTypes.func.isRequired,
};

export default SeeMoreIconButton;

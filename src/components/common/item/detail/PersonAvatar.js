import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid } from "@material-ui/core";
import Typography from "../../../custom/base/Typography";

import BrokenImage from "../../BrokenImage";

import { TMDB_IMAGE_PREFIX } from "../../../../constants";

const useStyles = makeStyles((theme) => ({
  primary: {
    fontWeight: 600,
  },
  secondary: {
    fontWeight: 200,
  },
  avatar: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    height: theme.spacing(14),
    width: theme.spacing(14),
    "& img": {
      filter: `brightness(${theme.palette.type === "dark" ? "70%" : "90%"})`,
    },
  },
  text: {
    width: "inherit",
    marginTop: theme.spacing(1),
  },
  horizontalScrollItemWidth: {
    width: theme.spacing(16),
  },
  brokenImage: {
    color: theme.palette.action.disabled,
  },
}));

const PersonAvatar = ({
  character,
  col,
  image,
  isHorizontalScroll = false,
  name,
}) => {
  const classes = useStyles();

  const isImageValid = image !== null;

  return (
    <Grid
      alignItems="center"
      className={clsx({
        [classes.horizontalScrollItemWidth]: isHorizontalScroll,
      })}
      container
      direction="column"
      item
      wrap="nowrap"
      xs={col}
    >
      <Grid item>
        {isImageValid ? (
          <Avatar
            alt={`${name}'s avatar.`}
            className={classes.avatar}
            src={`${TMDB_IMAGE_PREFIX}/w780${image}`}
          />
        ) : (
          <BrokenImage type="avatar" extraClass={classes.avatar} />
        )}
      </Grid>
      <Grid item className={classes.text}>
        <Typography align="center" variant="body2" className={classes.primary}>
          {name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          align="center"
          className={classes.secondary}
          color="textSecondary"
          variant="body2"
        >
          {character}
        </Typography>
      </Grid>
    </Grid>
  );
};

PersonAvatar.defaultProps = {
  character: "",
  col: 12,
  image: "",
  isHorizontalScroll: false,
  name: "",
};

PersonAvatar.propTypes = {
  character: PropTypes.string,
  col: PropTypes.number,
  image: PropTypes.string,
  isHorizontalScroll: PropTypes.bool,
  name: PropTypes.string,
};

export default PersonAvatar;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Divider, Grid } from "@material-ui/core";
import IconButton from "../../custom/composed/IconButton";

import FacebookIcon from "../../../assets/icons/facebook";
import InstagramIcon from "../../../assets/icons/instagram";
import TwitterIcon from "../../../assets/icons/twitter";
import IMDbIcon from "../../../assets/icons/imdb";
import TMDbIcon from "../../../assets/icons/tmdb";
import ShareIcon from "../../../assets/icons/share";

import { snackbarActions } from "../../../reducers/ducks";

const useStyles = makeStyles((theme) => ({
  divider: {
    height: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  },
  dividerContainer: {
    alignItems: "center",
    display: "flex",
  },
  logo: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const ItemLinks = ({ facebook, imdb, instagram, tmdb, twitter }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [start, setStart] = useState("");

  useEffect(() => {
    const links = [facebook, instagram, twitter, imdb, tmdb].filter(
      (e) => e !== null
    );
    setStart(links[0] || "");
  }, [facebook, instagram, twitter, imdb, tmdb]);

  const handleShareLinkClick = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        dispatch(
          snackbarActions.showSnackbar(`Link copied to clipboard!`, "success")
        );
      },
      () => {
        dispatch(
          snackbarActions.showSnackbar(
            `Error on copying to clipboard. Try again.`,
            "error"
          )
        );
      }
    );
  };

  const renderIconButtonWithTooltip = (src, link, title) => (
    <Grid item>
      <IconButton
        svgSrc={src}
        tooltipTitle={title}
        handleOnClick={
          link ? () => window.open(link, "_blank") : handleShareLinkClick
        }
      />
    </Grid>
  );

  return (
    <Grid container spacing={1}>
      {facebook &&
        facebook !== null &&
        renderIconButtonWithTooltip(<FacebookIcon />, facebook, "Facebook")}
      {instagram &&
        instagram !== null &&
        renderIconButtonWithTooltip(<InstagramIcon />, instagram, "Instagram")}
      {twitter &&
        twitter !== null &&
        renderIconButtonWithTooltip(<TwitterIcon />, twitter, "Twitter")}
      {start.match(/(facebook)|(twitter)|(instagram)/g) && (
        <Grid item className={classes.dividerContainer}>
          <Divider orientation="vertical" className={classes.divider} />
        </Grid>
      )}
      {imdb &&
        imdb !== null &&
        renderIconButtonWithTooltip(<IMDbIcon />, imdb, "IMDb")}
      {tmdb &&
        tmdb !== null &&
        renderIconButtonWithTooltip(<TMDbIcon />, tmdb, "TMDb")}
      {renderIconButtonWithTooltip(<ShareIcon />, null, "Copy share link")}
    </Grid>
  );
};

ItemLinks.defaultProps = {
  facebook: null,
  imdb: null,
  instagram: null,
  tmdb: null,
  twitter: null,
};

ItemLinks.propTypes = {
  facebook: PropTypes.string,
  imdb: PropTypes.string,
  instagram: PropTypes.string,
  tmdb: PropTypes.string,
  twitter: PropTypes.string,
};

export default ItemLinks;

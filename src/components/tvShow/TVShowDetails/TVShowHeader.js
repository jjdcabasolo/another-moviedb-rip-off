import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, useMediaQuery } from "@material-ui/core";
import Chip from "../../custom/base/Chip";
import Typography from "../../custom/base/Typography";

import ItemBreadcrumbs from "../../common/item/ItemBreadcrumbs";
import ItemLinks from "../../common/item/ItemLinks";
import Statistic from "../../common/item/detail/Statistic";

import { getTVShowStatus } from "../../../utils/functions";

import {
  TV_SHOW_BREADCRUMBS_CONFIG,
  TMDB_IMAGE_PREFIX,
} from "../../../constants";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
  },
  subtitle: {
    fontWeight: 400,
  },
  chip: {
    margin: theme.spacing(0.25, 0.5, 0.25, 0),
  },
  releaseYear: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.fontWeightLight,
    marginLeft: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      marginLeft: theme.spacing(1),
      fontSize: theme.typography.h5.fontSize,
    },
  },
  posterImage: {
    filter: "brightness(70%)",
    border: `1px solid ${theme.palette.colorScheme.divider}`,
    borderRadius: theme.shape.borderRadius,
    height: "355px",
    margin: theme.spacing(1),
    width: "250px",
    objectFit: "cover",
    objectPosition: "50% 0%",
  },
  container: {
    height: "fit-content",
  },
}));

const TVShowHeader = ({ sectionVisibility }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    facebook,
    genres,
    imdb,
    instagram,
    name,
    number_of_episodes: numberOfEpisodes,
    number_of_seasons: numberOfSeasons,
    original_name: originalName,
    overview,
    poster_path: posterPath,
    status,
    tagline,
    tmdb,
    twitter,
  } = tvShow;

  const hasImage = isDesktop && posterPath;

  const breadcrumbs = TV_SHOW_BREADCRUMBS_CONFIG.filter(
    (e) => sectionVisibility[e.visibilityId]
  );

  useEffect(() => {
    setIsImageLoaded(false);
  }, [posterPath]);

  return (
    <>
      {hasImage && (
        <Grid item xs={4} container spacing={2}>
          <img
            src={`${TMDB_IMAGE_PREFIX}/w500${posterPath}`}
            alt={`${name || originalName}'s background cover.`}
            className={classes.posterImage}
            style={isImageLoaded ? {} : { display: "none" }}
            onLoad={() => setIsImageLoaded(true)}
          />
        </Grid>
      )}
      <Grid
        item
        xs={hasImage ? 8 : 12}
        container
        spacing={2}
        justifyContent="flex-start"
        alignItems="flex-start"
        className={classes.container}
      >
        <Grid item xs={12}>
          <Chip
            className={classes.chip}
            label={getTVShowStatus(status)}
            variant="outlined"
          />
          {genres.map((i) => (
            <Chip
              key={`tv-show-header-chip-${i.id}`}
              className={classes.chip}
              label={i.name}
              variant="outlined"
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <ItemLinks
            facebook={facebook}
            imdb={imdb}
            instagram={instagram}
            tmdb={tmdb}
            twitter={twitter}
          />
        </Grid>
        {overview && overview.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="body2">{overview}</Typography>
          </Grid>
        )}
        {tagline && (
          <Grid item xs={12}>
            <Typography
              color="textSecondary"
              variant="body2"
              className={classes.tagline}
            >
              <em>"{tagline}"</em>
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <ItemBreadcrumbs content={breadcrumbs} />
        </Grid>
        <Grid item xs={12}>
          <Grid item container justify="center" alignItems="center">
            <Statistic
              col={6}
              count={numberOfSeasons}
              label="Seasons"
              divider
            />
            <Statistic col={6} count={numberOfEpisodes} label="Episodes" />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

TVShowHeader.propTypes = {
  sectionVisibility: PropTypes.shape({
    cast: PropTypes.bool.isRequired,
    episodes: PropTypes.bool.isRequired,
    production: PropTypes.bool.isRequired,
    recommendations: PropTypes.bool.isRequired,
    seasonList: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TVShowHeader;

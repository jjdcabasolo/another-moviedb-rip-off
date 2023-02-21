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

import { toMillionsOrBillions } from "../../../utils/functions";

import {
  MOVIE_BREADCRUMBS_CONFIG,
  TMDB_IMAGE_PREFIX,
} from "../../../constants";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.25, 0.5, 0.25, 0),
  },
  ellipsis: {
    fontSize: "1rem",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
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

const MovieHeader = ({ sectionVisibility }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const movie = useSelector((state) => state.movies.movie);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    budget,
    facebook,
    genres,
    imdb,
    instagram,
    original_title: originalTitle,
    overview,
    poster_path: posterPath,
    revenue,
    tagline,
    title,
    tmdb,
    twitter,
  } = movie;

  const hasImage = isDesktop && posterPath;

  const breadcrumbs = MOVIE_BREADCRUMBS_CONFIG.filter(
    (e) => sectionVisibility[e.visibilityId]
  );

  useEffect(() => {
    setIsImageLoaded(false);
  }, [posterPath]);

  const renderStatistics = () => {
    const income = revenue - budget;
    const hasIncome = income > 0;

    return [
      revenue !== 0 && (
        <Statistic
          col={4}
          count={toMillionsOrBillions(revenue)}
          divider
          key="movie-budget-revenue"
          label="Revenue"
        />
      ),
      budget !== 0 && (
        <Statistic
          col={4}
          count={toMillionsOrBillions(budget)}
          divider={!Number.isNaN(revenue) && hasIncome}
          key="movie-budget-budget"
          label="Budget"
        />
      ),
      hasIncome && (
        <Statistic
          col={4}
          count={toMillionsOrBillions(income)}
          key="movie-budget-income"
          label="Income"
        />
      ),
    ];
  };

  return (
    <>
      {hasImage && (
        <Grid item xs={4} container spacing={2}>
          <img
            src={`${TMDB_IMAGE_PREFIX}/w500${posterPath}`}
            alt={`${title || originalTitle}'s background cover.`}
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
          {genres.map((i) => (
            <Chip
              className={classes.chip}
              key={`movie-header-chip-${i.id}`}
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
          <Grid container justify="center" alignItems="center">
            {renderStatistics()}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

MovieHeader.propTypes = {
  sectionVisibility: {
    collection: false,
  },
};

MovieHeader.propTypes = {
  sectionVisibility: PropTypes.shape({
    cast: PropTypes.bool.isRequired,
    collection: PropTypes.bool,
    crew: PropTypes.bool.isRequired,
    production: PropTypes.bool.isRequired,
    recommendations: PropTypes.bool.isRequired,
    trailer: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieHeader;

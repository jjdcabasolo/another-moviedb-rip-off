import React from "react";

import clsx from "clsx";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import Typography from "../../custom/base/Typography";

import BrokenImage from "../../common/BrokenImage";
import ItemHorizontalContainer from "../../common/item/ItemHorizontalContainer";

import { getTVShowSeasonDetails } from "../../../api";

import { tvShowsActions } from "../../../reducers/ducks";

import { TMDB_IMAGE_PREFIX } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
  image: {
    filter: "brightness(70%)",
    border: `1px solid ${theme.palette.brokenImage.border}`,
    borderRadius: theme.shape.borderRadius,
    width: "250px",
    objectFit: "cover",
    objectPosition: "50% 0%",
    height: "355px",
  },
  emphasis: {
    fontWeight: 600,
  },
  horizontalScrollItemSpacing: {
    cursor: "pointer",
    marginRight: theme.spacing(2),
    width: "250px",
    "&:last-child": {
      marginRight: 0,
    },
  },
  brokenImageContainer: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  lastEntry: {
    width: theme.spacing(2.5),
  },
  titleContainer: {
    zIndex: 1,
    height: "355px",
    position: "absolute",
    width: "250px",
    padding: theme.spacing(2),
  },
  typographyContainer: {
    bottom: theme.spacing(2),
    position: "absolute",
  },
  outlinedText: {
    backgroundColor: theme.palette.outlinedText.background,
    color: theme.palette.outlinedText.color,
    padding: theme.spacing(0.5, 0),
  },
  titleHeight: {
    lineHeight: "28px",
  },
  dateHeight: {
    lineHeight: "22px",
    fontWeight: 200,
  },
  activeSeason: {
    textDecoration: "underline",
  },
  activeImage: {
    filter: "brightness(40%)",
  },
}));

const TVShowSeasonList = () => {
  const classes = useStyles();

  const tvShow = useSelector((state) => state.tvShows.tvShow);
  const selectedSeason = useSelector((state) => state.tvShows.selectedSeason);
  const dispatch = useDispatch();

  const { seasons } = tvShow;

  const handleCardClick = (index) => {
    if (selectedSeason !== index) {
      const parmesanio = process.env.REACT_APP_TMDB_PARMESANIO;

      getTVShowSeasonDetails(
        parmesanio,
        tvShow.id,
        index,
        (response) => {
          dispatch(tvShowsActions.setEpisode(response));
        },
        () => {}
      );
      dispatch(tvShowsActions.setSelectedSeason(index));
    }
  };

  const renderTitle = ({ isActive, seasonName, airDate }) => {
    return (
      <Box className={classes.titleContainer}>
        <Box className={classes.typographyContainer}>
          <Typography
            className={clsx(classes.title, classes.titleHeight)}
            variant="body1"
          >
            <span
              className={clsx(classes.outlinedText, classes.titleHeight, {
                [classes.activeSeason]: isActive,
              })}
            >
              {seasonName}
            </span>
          </Typography>
          {airDate && (
            <Typography className={classes.subtitle} variant="caption">
              <span
                className={clsx(classes.outlinedText, classes.dateHeight, {
                  [classes.activeSeason]: isActive,
                })}
              >
                {moment(airDate).format("MMM D, YYYY")}
              </span>
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Grid container item xs={12} className={classes.container}>
      <ItemHorizontalContainer imageSize={355} scrollAmount={266}>
        {seasons.map((season) => {
          const {
            air_date: airDate,
            id,
            name,
            poster_path: posterPath,
            season_number: seasonNumber,
          } = season;

          const isActive = seasonNumber === selectedSeason;
          const seasonName =
            seasonNumber === 0 ? name : `Season ${seasonNumber}`;

          let imagePath = TMDB_IMAGE_PREFIX;
          if (posterPath) imagePath += `/w780${posterPath}`;

          return (
            <Grid
              className={classes.horizontalScrollItemSpacing}
              container
              direction="column"
              onClick={() => handleCardClick(seasonNumber)}
              key={`tv-show-season-list-${id}`}
            >
              {posterPath ? (
                <img
                  className={clsx(classes.image, {
                    [classes.activeImage]: isActive,
                  })}
                  alt="Season cover"
                  src={imagePath}
                />
              ) : (
                <BrokenImage
                  type="baseImage"
                  extraClass={`${classes.image} ${classes.brokenImageContainer}`}
                />
              )}
              {renderTitle({ isActive, seasonName, airDate })}
            </Grid>
          );
        })}
      </ItemHorizontalContainer>
    </Grid>
  );
};

export default TVShowSeasonList;

import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import moment from "moment";
import { usePath } from "../../../hooks";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Tooltip,
  useMediaQuery,
} from "@material-ui/core";
import Typography from "../../custom/base/Typography";
import Chip from "../../custom/base/Chip";
import { AvatarGroup } from "@material-ui/lab";

import BrokenImage from "../../common/BrokenImage";

import { TMDB_IMAGE_PREFIX, NO_DATE_TEXT } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    marginBottom: theme.spacing(1),
    maxWidth: "100%",
    position: "relative",
  },
  dividerContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(4),
    },
  },
  image: {
    filter: `brightness(${theme.palette.type === "dark" ? "70%" : "90%"})`,
    border: `1px solid ${theme.palette.brokenImage.border}`,
    borderRadius: theme.shape.borderRadius,
    height: theme.spacing(25),
    objectFit: "cover",
    objectPosition: "50% 0%",
    width: "100%",
  },
  brokenImageContainer: {
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(1),
  },
  avatar: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  chip: {
    margin: theme.spacing(0.25, 0.5, 0.25, 0),
  },
  titleContainer: {
    top: 0,
    zIndex: 1,
    height: theme.spacing(25),
    position: "absolute",
    width: "100%",
    padding: theme.spacing(2),
  },
  typographyContainer: {
    bottom: theme.spacing(2),
    position: "absolute",
    width: `calc(100% - ${theme.spacing(4)}px)`,
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
}));

const renderCrew = (crew, label) =>
  crew && (
    <Grid item xs={6}>
      <Typography color="textSecondary" variant="caption">
        {label}
      </Typography>
      <Typography variant="body2">{crew.name || crew.original_name}</Typography>
    </Grid>
  );

const TVShowEpisode = ({ episode, isCollapsed, isLastItem }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only("md"));
  const classes = useStyles();

  const [, , section] = usePath();
  const isSectionActive = section && section.length !== 0;

  const maxGuestsToShow = isSmallTablet ? 12 : 10;

  const {
    air_date: airDate,
    crew,
    episode_number: episodeNumber,
    guest_stars: guestStars,
    name,
    name: episodeName,
    original_name: originalName,
    overview,
    still_path: stillPath,
  } = episode;

  if (!airDate) return null;

  let episodeImagePath = TMDB_IMAGE_PREFIX;
  if (stillPath) episodeImagePath += `/w780${stillPath}`;

  const [director] = crew.filter((e) => e.job === "Director");
  const [writer] = crew.filter((e) => e.job === "Writer");
  const sectionActiveGridSize = isSectionActive ? 12 : 6;

  const getEpisodeStatus = () =>
    moment(airDate).diff(moment()) > 0 ? "Coming Soon" : "Aired";

  const renderTitle = () => {
    return (
      <Box className={classes.titleContainer}>
        <Box className={classes.typographyContainer}>
          <Typography
            className={clsx(classes.title, classes.titleHeight)}
            variant="body1"
          >
            <span className={clsx(classes.outlinedText, classes.titleHeight)}>
              {`${episodeNumber} · ${episodeName}`}
            </span>
          </Typography>
          {airDate && (
            <Typography className={classes.subtitle} variant="caption">
              <span className={clsx(classes.outlinedText, classes.dateHeight)}>
                {airDate ? moment(airDate).format("MMM D, YYYY") : NO_DATE_TEXT}
              </span>
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Grid
      container
      direction="column"
      item
      md={isCollapsed ? 6 : sectionActiveGridSize}
      sm={isCollapsed ? 6 : sectionActiveGridSize}
      xs={12}
    >
      <Grid item className={classes.gridItem}>
        {stillPath ? (
          <img
            className={classes.image}
            alt={`${
              name || originalName
            } Episode ${episodeNumber} ${episodeName}'s stills.`}
            src={episodeImagePath}
          />
        ) : (
          <BrokenImage
            type="baseImage"
            extraClass={`${classes.image} ${classes.brokenImageContainer}`}
          />
        )}
        {renderTitle()}
      </Grid>
      <Grid item className={classes.gridItem} container>
        <Chip
          className={classes.chip}
          label={getEpisodeStatus()}
          variant="outlined"
        />
      </Grid>
      {overview.length > 0 && (
        <Grid item className={classes.gridItem}>
          <Typography variant="body2">{overview}</Typography>
        </Grid>
      )}
      {director &&
        Object.keys(director).length > 0 &&
        writer &&
        Object.keys(writer).length > 0 && (
          <Grid item className={classes.gridItem} container>
            {renderCrew(director, "Director")}
            {renderCrew(writer, "Writer")}
          </Grid>
        )}
      {guestStars.length > 0 && (
        <Grid item className={classes.gridItem}>
          <Typography color="textSecondary" variant="caption">
            Guests
          </Typography>
          <AvatarGroup max={maxGuestsToShow}>
            {guestStars.map((guest, i) => {
              const { id, profile_path: profilePath } = guest;

              let guestImagePath = TMDB_IMAGE_PREFIX;
              if (stillPath) guestImagePath += `/w45${profilePath}`;

              if (i < maxGuestsToShow) {
                return (
                  <Tooltip
                    arrow
                    enterTouchDelay={50}
                    key={`tv-show-episode-avatar-group-${id}`}
                    leaveTouchDelay={3000}
                    placement="top"
                    title={`${guest.name} as ${guest.character}`.toLowerCase()}
                  >
                    <Avatar className={classes.avatar} src={guestImagePath} />
                  </Tooltip>
                );
              }

              return null;
            })}
          </AvatarGroup>
        </Grid>
      )}
      {!isCollapsed && (isMobile || isSectionActive) && isLastItem && (
        <Grid item className={classes.dividerContainer}>
          <Divider />
        </Grid>
      )}
    </Grid>
  );
};

TVShowEpisode.defaultProps = {
  episode: {
    air_date: "",
    crew: [],
    episode_number: 0,
    guest_stars: [],
    name: "",
    overview: "",
    still_path: "",
  },
  isCollapsed: false,
  isLastItem: false,
};

TVShowEpisode.propTypes = {
  episode: PropTypes.shape({
    air_date: PropTypes.string,
    crew: PropTypes.arrayOf(PropTypes.shape()),
    episode_number: PropTypes.number,
    guest_stars: PropTypes.arrayOf(PropTypes.shape()),
    name: PropTypes.string,
    overview: PropTypes.string,
    still_path: PropTypes.string,
  }),
  isCollapsed: PropTypes.bool,
  isLastItem: PropTypes.bool,
};

export default TVShowEpisode;

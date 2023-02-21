import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import clsx from "clsx";
import { Box, Container, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "../custom/base/Typography";

import { TMDB_IMAGE_PREFIX, NO_DATE_TEXT } from "../../constants";

const useStyles = makeStyles((theme) => ({
  image: {
    position: "absolute",
    filter: "brightness(70%)",
    objectFit: "cover",
    objectPosition: "50% 0%",
    borderBottom: `1px solid ${theme.palette.colorScheme.divider}`,
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(8),
      height: "75vh",
      width: "100%",
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: theme.spacing(6),
      height: "45vh",
      width: theme.browserSize.width - theme.spacing(10.5),
    },
    [`${theme.breakpoints.only("sm")} and (orientation: landscape)`]: {
      width: theme.browserSize.width,
    },
    [`${theme.breakpoints.only("md")} and (orientation: landscape)`]: {
      marginTop: theme.spacing(10.5),
      height: "75vh",
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      height: "75vh",
      width: "100%",
    },
  },
  noImagePadding: {
    marginTop: theme.spacing(30),
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: theme.spacing(20),
    },
  },
  typographyContainer: {
    position: "absolute",
    bottom: theme.spacing(5),
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      bottom: theme.spacing(3),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.between("sm", "md")]: {
      paddingRight: theme.spacing(7),
    },
  },
  title: {
    fontWeight: 600,
  },
  outlinedText: {
    backgroundColor: theme.palette.outlinedText.background,
    color: theme.palette.outlinedText.color,
    padding: theme.spacing(1, 0),
  },
  dateHeight: {
    lineHeight: "32px",
  },
  titleHeight: {
    lineHeight: "60px",
  },
  titleContainer: {
    zIndex: 1,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: `calc(75vh + ${theme.spacing(8)}px)`,
      padding: 0,
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: `calc(45vh + ${theme.spacing(6)}px)`,
      padding: theme.spacing(0, 7),
    },
    [`${theme.breakpoints.only("sm")} and (orientation: landscape)`]: {
      padding: 0,
      "& .MuiContainer-root": {
        padding: theme.spacing(2),
      },
    },
    [`${theme.breakpoints.only("md")} and (orientation: landscape)`]: {
      height: `calc(75vh + ${theme.spacing(10.5)}px)`,
      padding: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      height: "75vh",
    },
  },
  titleContainerNoImage: {
    zIndex: 1,
    position: "relative",
  },
  releaseYear: {
    fontWeight: theme.typography.fontWeightLight,
  },
  subtitle: {
    fontWeight: 400,
  },
}));

const GradientBackground = ({
  isItemSelected,
  isLoading,
  isMovie,
  isVisible,
  item,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const episodeRunTime = item?.episode_run_time || null;
  const imagePath = isMobile ? item?.poster_path : item?.backdrop_path;

  const contents = {
    title: isMovie
      ? item?.title || item?.original_title
      : item?.name || item?.original_name,
    date: isMovie ? item?.release_date : item?.first_air_date,
    runtime: isMovie
      ? item?.runtime
      : episodeRunTime
      ? episodeRunTime[0]
      : null,
    src: `${TMDB_IMAGE_PREFIX}/w1280${imagePath}`,
  };

  useEffect(() => {
    setIsImageLoaded(false);
  }, [contents.src]);

  const renderTitle = () => {
    // eslint-disable-next-line no-bitwise
    const runtimeHours = ~~(contents?.runtime / 60);
    const runtimeMinutes = contents?.runtime % 60;

    return (
      <Box
        className={clsx({
          [classes.titleContainer]: imagePath,
          [classes.titleContainerNoImage]: !imagePath,
        })}
      >
        <Container maxWidth="md">
          <Box className={classes.typographyContainer}>
            <Typography
              className={clsx(classes.title, classes.titleHeight)}
              variant="h4"
            >
              <span className={clsx(classes.outlinedText, classes.titleHeight)}>
                {contents.title}
                {contents.date && (
                  <span className={classes.releaseYear}>
                    {` (${moment(contents.date).format("YYYY")})`}
                  </span>
                )}
              </span>
            </Typography>
            <Typography className={classes.subtitle} variant="subtitle">
              <span className={clsx(classes.outlinedText, classes.dateHeight)}>
                {contents.date
                  ? moment(contents.date).format("MMMM D, YYYY")
                  : NO_DATE_TEXT}
                {contents?.runtime ? (
                  ` · ${runtimeHours !== 0 ? `${runtimeHours}hr ` : ""}${
                    runtimeMinutes !== 0 ? `${runtimeMinutes}min` : ""
                  }`
                ) : (
                  <></>
                )}
              </span>
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  };

  if (isLoading) return null;
  if (!imagePath && isItemSelected)
    return <div className={classes.noImagePadding}>{renderTitle()}</div>;
  if (isVisible)
    return (
      <Box>
        <img
          src={contents.src}
          alt={`${contents.title}'s background cover.`}
          style={isImageLoaded ? {} : { display: "none" }}
          className={classes.image}
          onLoad={() => setIsImageLoaded(true)}
        />
        {renderTitle()}
      </Box>
    );
  return null;
};

GradientBackground.defaultProps = {
  item: {
    backdrop_path: "",
    episode_run_time: [0],
    first_air_date: "",
    name: "",
    original_name: "",
    original_title: "",
    release_date: "",
    runtime: 0,
    title: "",
  },
};

GradientBackground.propTypes = {
  image: PropTypes.string,
  isItemSelected: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default GradientBackground;

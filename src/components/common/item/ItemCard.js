import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import moment from "moment";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import Typography from "../../custom/base/Typography";

import BrokenImage from "../BrokenImage";

import { scrollToID } from "../../../utils/functions";

import { moviesActions, tvShowsActions } from "../../../reducers/ducks";

import { TMDB_IMAGE_PREFIX, NO_DATE_TEXT } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  media: {
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(23),
    filter: "brightness(70%)",
  },
  mediaDrawerOpen: {
    height: 0,
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(45),
    },
    width: "100%",
  },
  mediaDrawerClosed: {
    height: 0,
    width: "100%",
  },
  typoOverlayMediaDrawerOpen: {
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(-25),
    },
    [theme.breakpoints.between("sm", "lg")]: {
      marginTop: theme.spacing(-25),
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: -((theme.browserSize.height - theme.spacing(22)) / 2),
    },
  },
  typoOverlayMediaDrawerClosed: {
    marginTop: theme.spacing(-21),
  },
  typoOverlay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    padding: theme.spacing(2),
    color: theme.palette.grey[100],
    pointerEvents: "none",
    overflow: "hidden",
    width: "100%",
    bottom: 0,
    height: "100%",
  },
  cardContainer: {
    transition: theme.transitions.create("padding", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1, 0),
    },
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1),
    },
  },
  itemExtension: {
    maxWidth: "20%",
    flexBasis: "20%",
  },
  rank: {
    fontWeight: "400",
    color: theme.palette.grey[300],
    marginRight: theme.spacing(1),
  },
  rankText: {
    fontWeight: 600,
    color: theme.palette.grey[50],
  },
  cardTitle: {
    letterSpacing: "0.02em",
    fontWeight: theme.typography.fontWeightMedium,
  },
  horizontalScrollItemWidth: {
    padding: 0,
    width: theme.spacing(45),
    [theme.breakpoints.only("xs")]: {
      width: `calc(100vw - ${theme.spacing(6)}px)`,
    },
  },
  horizontalScrollItemSpacing: {
    padding: 0,
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    [theme.breakpoints.only("xs")]: {
      "&:first-child": {
        paddingTop: theme.spacing(1),
      },
    },
  },
  brokenImageContainer: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    padding: theme.spacing(1),
    position: "absolute",
    width: "100%",
  },
  card: {
    backgroundColor: theme.palette.brokenImage.background,
    border: `1px solid ${theme.palette.brokenImage.border}`,
  },
  textImageInvalid: {
    color: theme.palette.text.primary,
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

const ItemCard = ({
  col,
  content,
  drawerOpen,
  handleDrawerToggle,
  hasSpacingHorizontalScroll,
  isHorizontalScroll = false,
  rank,
  type,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const dispatch = useDispatch();

  const isMovie = type === "movies";
  const date = isMovie ? content.release_date : content.first_air_date;
  const dateDisplay = date
    ? ` ${moment(date).format("MMM D, YYYY")}`
    : ` ${NO_DATE_TEXT}`;

  if (!content) return null;

  const handleCardClick = () => {
    scrollToID("scroll-to-top-anchor", false);

    if (handleDrawerToggle) handleDrawerToggle();

    if (isMovie) dispatch(moviesActions.setDetailsLoading(true));
    else {
      dispatch(tvShowsActions.setDetailsLoading(true));
    }
  };

  let isImageValid = true;
  let imagePath = TMDB_IMAGE_PREFIX;
  if (!isMobile && content && content.poster_path) {
    imagePath += `/w780${content.poster_path}`;
  } else if (isMobile && content && content.backdrop_path) {
    imagePath += `/w780${content.backdrop_path}`;
  } else isImageValid = false;

  return (
    <Grid
      className={clsx(classes.cardContainer, {
        [classes.itemExtension]: col === 2 && !isHorizontalScroll,
        [classes.horizontalScrollItemWidth]: isHorizontalScroll,
        [classes.horizontalScrollItemSpacing]: hasSpacingHorizontalScroll,
      })}
      item
      xs={col}
    >
      <Link to={`/${type}/${content.id}`}>
        <Card
          onClick={handleCardClick}
          variant="outlined"
          className={classes.card}
        >
          <CardActionArea>
            {!isImageValid && (
              <BrokenImage
                type="cardMedia"
                extraClass={classes.brokenImageContainer}
              />
            )}
            <CardMedia
              className={clsx(classes.media, {
                [classes.mediaDrawerOpen]: drawerOpen,
                [classes.mediaDrawerClosed]: !drawerOpen,
              })}
              image={imagePath}
            />
            <div
              className={clsx(classes.typoOverlay, {
                [classes.typoOverlayMediaDrawerOpen]: drawerOpen,
                [classes.typoOverlayMediaDrawerClosed]: !drawerOpen,
              })}
            >
              <Typography
                variant="body1"
                className={clsx(classes.cardTitle, {
                  [classes.textImageInvalid]: !isImageValid,
                })}
              >
                <span
                  className={clsx(classes.outlinedText, classes.titleHeight)}
                >
                  {isMovie
                    ? content.title || content.original_title
                    : content.name || content.original_name}
                </span>
              </Typography>
              <Typography
                className={clsx(classes.rank, {
                  [classes.textImageInvalid]: !isImageValid,
                })}
                variant="caption"
                color="textSecondary"
              >
                <span
                  className={clsx(classes.outlinedText, classes.dateHeight)}
                >
                  {rank !== 0 && (
                    <span
                      className={clsx(classes.rankText, {
                        [classes.textImageInvalid]: !isImageValid,
                      })}
                    >
                      {`${rank} •`}
                    </span>
                  )}
                  {dateDisplay}
                </span>
              </Typography>
            </div>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
};

ItemCard.defaultProps = {
  col: 12,
  content: PropTypes.shape({
    backdrop_path: "",
    first_air_date: "",
    name: "",
    original_name: "",
    original_title: "",
    poster_path: "",
    release_date: "",
    title: "",
  }),
  drawerOpen: false,
  handleDrawerToggle: () => {},
  hasSpacingHorizontalScroll: false,
  isHorizontalScroll: false,
  rank: 0,
  type: "",
};

ItemCard.propTypes = {
  col: PropTypes.number,
  content: PropTypes.oneOfType([
    PropTypes.shape({
      backdrop_path: PropTypes.string,
      first_air_date: PropTypes.string,
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      original_name: PropTypes.string,
      original_title: PropTypes.string,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
    }),
    PropTypes.func,
  ]),
  drawerOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  hasSpacingHorizontalScroll: PropTypes.bool,
  isHorizontalScroll: PropTypes.bool,
  rank: PropTypes.number,
  type: PropTypes.string,
};

export default ItemCard;

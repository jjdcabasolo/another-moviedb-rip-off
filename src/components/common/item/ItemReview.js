import React from "react";
import PropTypes from "prop-types";

import moment from "moment";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Divider, Grid, useMediaQuery } from "@material-ui/core";
import Chip from "../../custom/base/Chip";
import Typography from "../../custom/base/Typography";
import TruncatedOverview from "../TruncatedOverview";

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: theme.spacing(2),
  },
  reviewContainer: {
    paddingBottom: theme.spacing(4),
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  author: {
    fontWeight: 600,
  },
  divider: {
    paddingBottom: theme.spacing(4),
  },
  item: {
    [theme.breakpoints.only("xs")]: {
      alignItems: "center",
      display: "flex",
    },
  },
  reviewCard: {
    border: `1px solid ${theme.palette.brokenImage.border}`,
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
    [theme.breakpoints.between("sm", "lg")]: {
      height: "150px",
      width: "150px",
      maxWidth: "150px",
      flexBasis: "1000%",
    },
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      justifyContent: "center",
      height: "fit-content",
      width: "100%",
    },
  },
  total: {
    color: theme.palette.colorScheme.secondaryText,
    fontSize: theme.typography.body2.fontSize,
  },
  date: {
    fontWeight: 200,
  },
}));

const ItemReview = ({ author, content, date, divider, rating }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const renderChip = () => {
    let label;

    if (rating === 10) label = "Perfect!";
    else if (8 <= rating && rating < 10) label = "Good~";
    else if (5 <= rating && rating < 8) label = "Fair";
    else label = "Nope.";

    return <Chip label={label} variant="outlined" />;
  };

  return (
    <>
      {divider ? (
        <Grid item xs={12} className={classes.divider}>
          <Divider />
        </Grid>
      ) : null}
      <Grid
        container
        className={classes.reviewContainer}
        spacing={2}
        wrap={isMobile ? "wrap" : "nowrap"}
      >
        <Grid
          item
          sm="auto"
          xs={12}
          container
          direction={isMobile ? "row" : "column"}
          spacing={1}
          className={classes.reviewCard}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h3">
              {rating}
              <span className={classes.total}>/10</span>
            </Typography>
          </Grid>
          <Grid item className={classes.item}>
            {renderChip()}
          </Grid>
        </Grid>
        <Grid item sm="auto" xs={12} className={classes.reviewContents}>
          <Typography>
            Review by <span className={classes.author}>{author}</span>
          </Typography>
          <Typography
            variant="caption"
            gutterBottom
            color="textSecondary"
            className={classes.date}
          >
            {`Created on ${moment(date).format("MMM D, YYYY")}`}
          </Typography>
          <Typography variant="body2" gutterBottom className={classes.content}>
            <TruncatedOverview overview={content} maxLine={8} variant="body2" />
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

ItemReview.propTypes = {
  author: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  divider: PropTypes.bool.isRequired,
  rating: PropTypes.string.isRequired,
};

export default ItemReview;
